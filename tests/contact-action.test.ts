import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.hoisted(() => vi.fn());
const ipMock = vi.hoisted(() => ({ value: "203.0.113.1" }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": ipMock.value }),
}));

import { sendContactMessage } from "../app/actions/contact";
import { MAX_ATTEMPTS, resetRateLimit } from "../lib/rate-limit";

function formData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  return fd;
}

const validFields = {
  names: "Lisa & Daan",
  email: "lisa@example.com",
  message: "Wij trouwen in september en zoeken een trouwambtenaar.",
  consent: "on",
};

const OLD_ENV = { ...process.env };

let ipCounter = 0;

beforeEach(() => {
  sendMock.mockReset();
  resetRateLimit();
  // elke test krijgt een eigen bezoeker, anders tikt de limiter door
  ipCounter += 1;
  ipMock.value = `203.0.113.${ipCounter}`;
  process.env.RESEND_API_KEY = "re_test_key";
  delete process.env.CONTACT_FROM;
  delete process.env.CONTACT_TO;
  delete process.env.TURNSTILE_SECRET;
});

afterEach(() => {
  process.env = { ...OLD_ENV };
});

describe("sendContactMessage", () => {
  it("accepteert een geldig formulier en mailt naar info@jametanouk.nl", async () => {
    const futureDate = new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10);
    sendMock.mockResolvedValue({ error: null });
    const result = await sendContactMessage(
      null,
      formData({ ...validFields, phone: "0612345678", date: futureDate })
    );

    expect(result).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.to).toBe("info@jametanouk.nl");
    expect(payload.replyTo).toBe("lisa@example.com");
    expect(payload.subject).toContain("Lisa & Daan");
    expect(payload.text).toContain("Telefoon: 0612345678");
    expect(payload.text).toContain(`Trouwdatum: ${futureDate}`);
    expect(payload.text).toContain(validFields.message);
  });

  it("weigert een trouwdatum in het verleden", async () => {
    const result = await sendContactMessage(
      null,
      formData({ ...validFields, date: "2020-06-15" })
    );

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("verleden");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("geeft de ingevulde waarden terug bij een fout, zodat het formulier niet leegt", async () => {
    const zonderConsent = { ...validFields };
    delete (zonderConsent as Partial<typeof validFields>).consent;
    const result = await sendContactMessage(
      null,
      formData({ ...zonderConsent, phone: "0612345678", pakket: "ja-diner" })
    );

    expect(result?.ok).toBe(false);
    expect(result?.values).toMatchObject({
      names: "Lisa & Daan",
      email: "lisa@example.com",
      phone: "0612345678",
      pakket: "ja-diner",
      message: validFields.message,
      consent: false,
    });
  });

  it("laat telefoon en datum weg uit de mail als ze leeg zijn", async () => {
    sendMock.mockResolvedValue({ error: null });
    await sendContactMessage(null, formData(validFields));

    const payload = sendMock.mock.calls[0][0];
    expect(payload.text).not.toContain("Telefoon:");
    expect(payload.text).not.toContain("Trouwdatum:");
  });

  it("neemt het gekozen pakket op in de tekst- en html-mail", async () => {
    sendMock.mockResolvedValue({ error: null });
    await sendContactMessage(null, formData({ ...validFields, pakket: "ja-diner" }));

    const payload = sendMock.mock.calls[0][0];
    expect(payload.text).toContain("Pakket: JA! & Diner met Anouk");
    expect(payload.html).toContain("JA! &amp; Diner met Anouk");
  });

  it("negeert een onbekende pakket-waarde", async () => {
    sendMock.mockResolvedValue({ error: null });
    await sendContactMessage(null, formData({ ...validFields, pakket: "hacker-pakket" }));

    const payload = sendMock.mock.calls[0][0];
    expect(payload.text).not.toContain("Pakket:");
    expect(payload.html).not.toContain("hacker-pakket");
  });

  it("stuurt een html-mail mee en escapet html in het bericht", async () => {
    sendMock.mockResolvedValue({ error: null });
    await sendContactMessage(
      null,
      formData({ ...validFields, message: '<script>alert("x")</script>' })
    );

    const payload = sendMock.mock.calls[0][0];
    expect(payload.html).toContain("Nieuwe aanvraag via de website");
    expect(payload.html).toContain("Lisa &amp; Daan");
    expect(payload.html).not.toContain("<script>");
    expect(payload.html).toContain("&lt;script&gt;");
  });

  it("gebruikt CONTACT_TO en CONTACT_FROM wanneer die gezet zijn", async () => {
    process.env.CONTACT_TO = "anouk@jametanouk.nl";
    process.env.CONTACT_FROM = "JA! met Anouk <site@jametanouk.nl>";
    sendMock.mockResolvedValue({ error: null });
    await sendContactMessage(null, formData(validFields));

    const payload = sendMock.mock.calls[0][0];
    expect(payload.to).toBe("anouk@jametanouk.nl");
    expect(payload.from).toBe("JA! met Anouk <site@jametanouk.nl>");
  });

  it("doet niets maar meldt ok bij een ingevulde honeypot", async () => {
    const result = await sendContactMessage(
      null,
      formData({ ...validFields, website: "spam.example" })
    );

    expect(result).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it.each([
    ["namen", { ...validFields, names: "" }],
    ["e-mail", { ...validFields, email: "" }],
    ["bericht", { ...validFields, message: "" }],
  ])("weigert een formulier zonder %s", async (_veld, fields) => {
    const result = await sendContactMessage(null, formData(fields));

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("namen, e-mailadres en een bericht");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("weigert een formulier zonder JA! tegen de privacyverklaring", async () => {
    const zonderConsent = { ...validFields };
    delete (zonderConsent as Partial<typeof validFields>).consent;
    const result = await sendContactMessage(null, formData(zonderConsent));

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("JA!");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("weigert een ongeldig e-mailadres", async () => {
    const result = await sendContactMessage(
      null,
      formData({ ...validFields, email: "geen-email" })
    );

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("e-mailadres");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("weigert een te lang bericht", async () => {
    const result = await sendContactMessage(
      null,
      formData({ ...validFields, message: "x".repeat(5001) })
    );

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("te lang");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("weigert zonder captcha-token wanneer Turnstile is geconfigureerd", async () => {
    process.env.TURNSTILE_SECRET = "ts_secret";
    const result = await sendContactMessage(null, formData(validFields));

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("spamcontrole");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("verstuurt wanneer Turnstile het token goedkeurt", async () => {
    process.env.TURNSTILE_SECRET = "ts_secret";
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", fetchMock);
    sendMock.mockResolvedValue({ error: null });

    const result = await sendContactMessage(
      null,
      formData({ ...validFields, "cf-turnstile-response": "token123" })
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({ method: "POST" })
    );
    expect(result).toEqual({ ok: true });
    vi.unstubAllGlobals();
  });

  it("weigert wanneer Turnstile het token afkeurt", async () => {
    process.env.TURNSTILE_SECRET = "ts_secret";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ success: false }) }));

    const result = await sendContactMessage(
      null,
      formData({ ...validFields, "cf-turnstile-response": "slecht-token" })
    );

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("spamcontrole");
    expect(sendMock).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("slaat de captcha-check over zonder TURNSTILE_SECRET", async () => {
    sendMock.mockResolvedValue({ error: null });
    const result = await sendContactMessage(null, formData(validFields));

    expect(result).toEqual({ ok: true });
  });

  it("valt netjes terug wanneer RESEND_API_KEY ontbreekt", async () => {
    delete process.env.RESEND_API_KEY;
    const result = await sendContactMessage(null, formData(validFields));

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("info@jametanouk.nl");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("geeft een foutmelding wanneer Resend een fout teruggeeft", async () => {
    sendMock.mockResolvedValue({ error: { message: "invalid from" } });
    const result = await sendContactMessage(null, formData(validFields));

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("niet gelukt");
  });

  it("blokkeert na te veel aanvragen vanaf hetzelfde adres", async () => {
    sendMock.mockResolvedValue({ error: null });

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const ok = await sendContactMessage(null, formData(validFields));
      expect(ok).toEqual({ ok: true });
    }

    const blocked = await sendContactMessage(null, formData(validFields));
    expect(blocked?.ok).toBe(false);
    expect(blocked?.error).toContain("te veel");
    expect(sendMock).toHaveBeenCalledTimes(MAX_ATTEMPTS);
  });

  it("telt een geblokkeerde aanvraag niet als verzonden mail", async () => {
    sendMock.mockResolvedValue({ error: null });
    for (let i = 0; i < MAX_ATTEMPTS; i++) await sendContactMessage(null, formData(validFields));
    sendMock.mockClear();

    await sendContactMessage(null, formData(validFields));
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("houdt de ingevulde waarden vast wanneer de limiet bereikt is", async () => {
    sendMock.mockResolvedValue({ error: null });
    for (let i = 0; i < MAX_ATTEMPTS; i++) await sendContactMessage(null, formData(validFields));

    const blocked = await sendContactMessage(null, formData(validFields));
    expect(blocked?.values?.names).toBe(validFields.names);
  });

  it("laat de honeypot niet meetellen voor de limiet", async () => {
    sendMock.mockResolvedValue({ error: null });
    for (let i = 0; i < MAX_ATTEMPTS + 3; i++) {
      const result = await sendContactMessage(
        null,
        formData({ ...validFields, website: "spam" })
      );
      expect(result).toEqual({ ok: true });
    }

    // een echte bezoeker vanaf hetzelfde adres kan daarna gewoon nog mailen
    expect(await sendContactMessage(null, formData(validFields))).toEqual({ ok: true });
  });

  it("weigert een absurd lang e-mailadres", async () => {
    const email = `${"a".repeat(300)}@example.com`;
    const result = await sendContactMessage(null, formData({ ...validFields, email }));

    expect(result?.ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("weigert een absurd lang telefoonnummer", async () => {
    const result = await sendContactMessage(
      null,
      formData({ ...validFields, phone: "0".repeat(200) })
    );

    expect(result?.ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("geeft een foutmelding wanneer Resend een exception gooit", async () => {
    sendMock.mockRejectedValue(new Error("network down"));
    const result = await sendContactMessage(null, formData(validFields));

    expect(result?.ok).toBe(false);
    expect(result?.error).toContain("niet gelukt");
  });
});
