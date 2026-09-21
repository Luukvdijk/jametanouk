"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Catches render errors below the root layout, so a visitor sees the site's
 * own voice instead of Next's default screen. The layout keeps rendering, so
 * the nav and footer stay in place.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="inhoud">
      <section className="page-hero">
        <div className="ghost-letter" aria-hidden="true">
          !
        </div>
        <div className="container">
          <p className="kicker rise r1">Er ging iets mis</p>
          <h1>
            <span className="line">
              <span className="rise r2">Even niet zoals</span>
            </span>
            <span className="line">
              <span className="rise r3">
                het <em>hoort.</em>
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose legal-prose">
            <p>
              Er is een storing op deze pagina. Probeer het nog een keer, dat
              lost het meestal op.
            </p>
            <p>
              Blijft het misgaan? Mail dan gerust direct naar{" "}
              <a href="mailto:info@jametanouk.nl">info@jametanouk.nl</a> of bel{" "}
              <a href="tel:+31611429005">06 11 42 90 05</a>. Dan pak ik het op.
            </p>
            <p>
              <button type="button" onClick={reset} className="arrow-link">
                Probeer opnieuw
              </button>
            </p>
            <p>
              <Link href="/" className="arrow-link arrow-link-muted">
                Terug naar de homepage
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
