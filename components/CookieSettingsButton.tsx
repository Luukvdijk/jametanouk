"use client";

import { CONSENT_EVENT, CONSENT_KEY } from "@/components/CookieConsent";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="footer-btn"
      onClick={() => {
        localStorage.removeItem(CONSENT_KEY);
        window.dispatchEvent(new Event(CONSENT_EVENT));
      }}
    >
      Cookievoorkeuren
    </button>
  );
}
