"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { PAKKETTEN } from "@/lib/pakketten";

export default function ContactForm({ defaultPakket = "" }: { defaultPakket?: string }) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContactMessage,
    null
  );

  if (state?.ok) {
    return (
      <div className="form-success">
        <span className="form-success-mark" aria-hidden="true" />
        <h3>Dankjewel!</h3>
        <p>
          Jullie bericht is verstuurd. Ik lees het met aandacht en kom er zo snel mogelijk op
          terug, meestal binnen twee werkdagen.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form" noValidate>
      <div className="field-row">
        <label className="field">
          <span>Jullie namen *</span>
          <input type="text" name="names" required autoComplete="name" placeholder="Bijv. Lisa &amp; Daan" />
        </label>
        <label className="field">
          <span>E-mailadres *</span>
          <input type="email" name="email" required autoComplete="email" placeholder="jullie@email.nl" />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>Telefoonnummer</span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="Optioneel" />
        </label>
        <label className="field">
          <span>Trouwdatum</span>
          <input type="date" name="date" />
        </label>
      </div>

      <label className="field">
        <span>Waar gaat jullie interesse naar uit?</span>
        <select name="pakket" defaultValue={defaultPakket} key={defaultPakket}>
          <option value="">Nog geen voorkeur</option>
          {Object.entries(PAKKETTEN).map(([slug, label]) => (
            <option key={slug} value={slug}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Vertel iets over jullie dag *</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Waar en wanneer trouwen jullie? En hoe zien jullie de ceremonie voor je?"
        />
      </label>

      <label className="hp" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {state?.error && <p className="form-error" role="alert">{state.error}</p>}

      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Versturen..." : "Verstuur bericht"}
      </button>
    </form>
  );
}
