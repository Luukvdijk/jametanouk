"use server";

import { Resend } from "resend";
import { pakketLabel } from "@/lib/pakketten";

export type ContactValues = {
  names: string;
  email: string;
  phone: string;
  date: string;
  pakket: string;
  message: string;
  consent: boolean;
};

export type ContactState = {
  ok: boolean;
  error?: string;
  values?: ContactValues;
} | null;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 16px 6px 0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8d7f76;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-family:Georgia,serif;font-size:15px;color:#2b211d;">${value}</td>
  </tr>`;
}

function buildEmailHtml(details: {
  names: string;
  email: string;
  phone: string;
  date: string;
  pakket: string | null;
  message: string;
}): string {
  const rows = [
    detailRow("Namen", escapeHtml(details.names)),
    detailRow(
      "E-mail",
      `<a href="mailto:${escapeHtml(details.email)}" style="color:#c96a5a;">${escapeHtml(details.email)}</a>`
    ),
    details.phone ? detailRow("Telefoon", escapeHtml(details.phone)) : "",
    details.date ? detailRow("Trouwdatum", escapeHtml(details.date)) : "",
    details.pakket ? detailRow("Pakket", escapeHtml(details.pakket)) : "",
  ].join("");

  return `<!doctype html>
<html lang="nl">
<body style="margin:0;padding:0;background-color:#f6f1ec;">
  <div style="background-color:#f6f1ec;padding:32px 16px;">
    <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border:1px solid #e8ddd4;">
      <div style="background-color:#191210;padding:22px 32px;">
        <span style="font-family:Georgia,serif;font-size:20px;color:#f4ede8;">Ja! <em style="color:#ee9384;">met Anouk</em></span>
      </div>
      <div style="padding:30px 32px;">
        <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#c96a5a;">Nieuwe aanvraag via de website</p>
        <h1 style="margin:0 0 22px;font-family:Georgia,serif;font-size:24px;font-weight:normal;color:#2b211d;">${escapeHtml(details.names)}</h1>
        <table cellpadding="0" cellspacing="0" style="margin-bottom:22px;">${rows}</table>
        <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8d7f76;">Bericht</p>
        <div style="background-color:#faf6f2;border-left:3px solid #ee9384;padding:16px 20px;font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#2b211d;white-space:pre-wrap;">${escapeHtml(details.message)}</div>
      </div>
      <div style="padding:16px 32px;border-top:1px solid #eee5dd;font-family:Arial,sans-serif;font-size:12px;color:#8d7f76;">
        Beantwoord deze mail om direct te reageren naar ${escapeHtml(details.names)}.
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // honeypot: echte bezoekers laten dit veld leeg
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { ok: true };
  }

  const names = String(formData.get("names") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const pakketSlug = String(formData.get("pakket") ?? "").trim();
  const pakket = pakketLabel(pakketSlug);
  const consent = formData.get("consent") === "on";

  // bij een fout geven we de ingevulde waarden terug, zodat het formulier niet leegt
  const values: ContactValues = { names, email, phone, date, pakket: pakketSlug, message, consent };
  const fail = (error: string): ContactState => ({ ok: false, error, values });

  if (!names || !email || !message) {
    return fail("Vul in ieder geval jullie namen, e-mailadres en een bericht in.");
  }
  if (!consent) {
    return fail("Zeg nog even JA! tegen de privacyverklaring, dan kan het bericht op pad.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("Dat e-mailadres lijkt niet te kloppen. Kijk er nog even naar.");
  }
  if (date) {
    const chosen = new Date(`${date}T12:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(chosen.getTime()) || chosen < today) {
      return fail("De gekozen trouwdatum ligt in het verleden. Kies een datum in de toekomst.");
    }
  }
  if (names.length > 200 || message.length > 5000) {
    return fail("Het bericht is te lang. Kort het iets in en probeer het opnieuw.");
  }

  // Cloudflare Turnstile (alleen wanneer geconfigureerd)
  const turnstileSecret = process.env.TURNSTILE_SECRET;
  if (turnstileSecret) {
    const token = String(formData.get("cf-turnstile-response") ?? "").trim();
    if (!token) {
      return fail("De spamcontrole kon jullie bericht niet controleren. Probeer het nog een keer.");
    }
    try {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: token }),
      });
      const verifyData = (await verifyRes.json()) as { success?: boolean };
      if (!verifyData.success) {
        return fail("De spamcontrole is niet gelukt. Ververs de pagina en probeer het opnieuw.");
      }
    } catch {
      return fail(
        "De spamcontrole is niet bereikbaar. Probeer het later opnieuw of mail info@jametanouk.nl."
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return fail("Het formulier is tijdelijk niet beschikbaar. Mail dan direct naar info@jametanouk.nl.");
  }

  const lines = [
    `Namen: ${names}`,
    `E-mail: ${email}`,
    phone ? `Telefoon: ${phone}` : null,
    date ? `Trouwdatum: ${date}` : null,
    pakket ? `Pakket: ${pakket}` : null,
    "",
    message,
  ].filter((l): l is string => l !== null);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Ja! met Anouk <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? "info@jametanouk.nl",
      replyTo: email,
      subject: `Nieuwe aanvraag via jametanouk.nl van ${names}`,
      text: lines.join("\n"),
      html: buildEmailHtml({ names, email, phone, date, pakket, message }),
    });
    if (error) {
      return fail("Versturen is niet gelukt. Probeer het later opnieuw of mail info@jametanouk.nl.");
    }
    return { ok: true };
  } catch {
    return fail("Versturen is niet gelukt. Probeer het later opnieuw of mail info@jametanouk.nl.");
  }
}
