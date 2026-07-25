"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { PAKKETTEN } from "@/lib/pakketten";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function Rings({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 78" fill="none" aria-hidden="true">
      <path className="sparkle" d="M60 4 l3.2 5.5 -3.2 5.5 -3.2 -5.5 z" />
      <circle className="ring ring-a" cx="46" cy="46" r="24" pathLength={1} />
      <circle className="ring ring-b" cx="74" cy="46" r="24" pathLength={1} />
    </svg>
  );
}

export default function ContactForm({ defaultPakket = "" }: { defaultPakket?: string }) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContactMessage,
    null
  );
  const [turnstileReady, setTurnstileReady] = useState(!TURNSTILE_SITE_KEY);
  const turnstileRef = useRef<TurnstileInstance>(null);

  // na een fout zet React het formulier terug op de defaultValues:
  // door de ingevulde waarden als defaults terug te geven blijft alles staan
  const prev = state && !state.ok ? state.values : undefined;

  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;

  // na een serverfout is het captcha-token verbruikt: widget resetten
  useEffect(() => {
    if (state && !state.ok) {
      turnstileRef.current?.reset();
    }
  }, [state]);

  if (state?.ok) {
    return (
      <div className="form-success" role="status">
        <Rings className="rings" />
        <h3>
          Het is een <em>JA!</em>
        </h3>
        <p>
          Jullie bericht is verstuurd. Ik lees het met aandacht en kom er zo snel mogelijk op
          terug, meestal binnen twee werkdagen.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form" noValidate>
      {pending && (
        <div className="form-sending" role="status">
          <Rings className="rings" />
          <p className="sending-title">Een momentje...</p>
          <p className="sending-text">We bezorgen jullie bericht bij Anouk.</p>
        </div>
      )}

      <div className="field-row">
        <label className="field">
          <span>Jullie namen *</span>
          <input
            type="text"
            name="names"
            required
            autoComplete="name"
            placeholder="Bijv. Lisa &amp; Daan"
            defaultValue={prev?.names}
          />
        </label>
        <label className="field">
          <span>E-mailadres *</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="jullie@email.nl"
            defaultValue={prev?.email}
          />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>Telefoonnummer</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="Optioneel"
            defaultValue={prev?.phone}
          />
        </label>
        <label className="field">
          <span>Trouwdatum</span>
          <input type="date" name="date" min={minDate} defaultValue={prev?.date} />
        </label>
      </div>

      <label className="field">
        <span>Waar gaat jullie interesse naar uit?</span>
        <select
          name="pakket"
          defaultValue={prev?.pakket ?? defaultPakket}
          key={prev?.pakket ?? defaultPakket}
        >
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
          defaultValue={prev?.message}
        />
      </label>

      <label className="hp" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="field consent">
        <input type="checkbox" name="consent" required defaultChecked={prev?.consent} />
        <span>
          Ik zeg <em>JA!</em> tegen de{" "}
          <a href="/privacy" target="_blank" rel="noopener" className="inline-link">
            privacyverklaring
          </a>
          .
        </span>
      </label>

      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={() => setTurnstileReady(true)}
          onExpire={() => setTurnstileReady(false)}
          onError={() => setTurnstileReady(false)}
          options={{ theme: "dark", appearance: "interaction-only", size: "flexible" }}
        />
      )}

      {state?.error && <p className="form-error" role="alert">{state.error}</p>}

      <button
        type="submit"
        className="btn"
        disabled={pending || !turnstileReady}
        title={turnstileReady ? undefined : "De spamcontrole laadt nog even..."}
      >
        {pending ? "Versturen..." : "Verstuur bericht"}
      </button>
    </form>
  );
}
