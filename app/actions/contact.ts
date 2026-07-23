"use server";

import { Resend } from "resend";

export type ContactState = {
  ok: boolean;
  error?: string;
} | null;

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

  if (!names || !email || !message) {
    return { ok: false, error: "Vul in ieder geval jullie namen, e-mailadres en een bericht in." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Dat e-mailadres lijkt niet te kloppen. Kijk er nog even naar." };
  }
  if (names.length > 200 || message.length > 5000) {
    return { ok: false, error: "Het bericht is te lang. Kort het iets in en probeer het opnieuw." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: "Het formulier is tijdelijk niet beschikbaar. Mail ons direct via info@jametanouk.nl.",
    };
  }

  const lines = [
    `Namen: ${names}`,
    `E-mail: ${email}`,
    phone ? `Telefoon: ${phone}` : null,
    date ? `Trouwdatum: ${date}` : null,
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
    });
    if (error) {
      return {
        ok: false,
        error: "Versturen is niet gelukt. Probeer het later opnieuw of mail info@jametanouk.nl.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Versturen is niet gelukt. Probeer het later opnieuw of mail info@jametanouk.nl.",
    };
  }
}
