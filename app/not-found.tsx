import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="inhoud">
      <section className="page-hero">
        <div className="ghost-letter" aria-hidden="true">
          ?
        </div>
        <div className="container">
          <p className="kicker rise r1">404</p>
          <h1>
            <span className="line">
              <span className="rise r2">Deze pagina is</span>
            </span>
            <span className="line">
              <span className="rise r3">
                <em>zoek.</em>
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose legal-prose">
            <p>
              Hier stond niets, of niet meer. Misschien is de link verouderd of
              is er een tikfout in het adres geslopen.
            </p>
            <p>
              Ga terug naar de <Link href="/">homepage</Link>, bekijk de{" "}
              <Link href="/#pakketten">pakketten</Link> of{" "}
              <Link href="/contact">plan een kennismaking</Link>. Liever direct
              contact? Mail{" "}
              <a href="mailto:info@jametanouk.nl">info@jametanouk.nl</a> of bel{" "}
              <a href="tel:+31611429005">06 11 42 90 05</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
