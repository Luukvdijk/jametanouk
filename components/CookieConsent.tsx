"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const CONSENT_KEY = "jma-cookie-consent";
export const CONSENT_EVENT = "jma:consent-change";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string | null {
  return localStorage.getItem(CONSENT_KEY);
}

function getServerSnapshot(): string {
  return "server";
}

function loadAnalytics() {
  if (!GA_ID || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  const gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as (...args: unknown[]) => void;
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function setChoice(value: "accepted" | "rejected") {
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export default function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pathname = usePathname();

  useEffect(() => {
    if (choice === "accepted") loadAnalytics();
  }, [choice]);

  useEffect(() => {
    if (choice === "accepted" && GA_ID && window.gtag) {
      window.gtag("event", "page_view", { page_path: pathname });
    }
  }, [choice, pathname]);

  if (choice !== null) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookievoorkeuren">
      <p className="cookie-title">
        Ik zeg <em>JA!</em> tegen cookies?
      </p>
      <p className="cookie-text">
        Deze website gebruikt alleen statistiek-cookies (Google Analytics) om de site te
        verbeteren, en pas nadat jullie ja zeggen. Lees meer in de{" "}
        <Link href="/privacy" className="inline-link">
          privacyverklaring
        </Link>
        .
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-small" onClick={() => setChoice("accepted")}>
          JA, prima
        </button>
        <button
          type="button"
          className="btn btn-small btn-ghost"
          onClick={() => setChoice("rejected")}
        >
          Liever niet
        </button>
      </div>
    </div>
  );
}
