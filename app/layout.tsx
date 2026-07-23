import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Fraunces, Jost } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jametanouk.nl"),
  title: {
    default: "Ja! met Anouk · Trouwambtenaar & ceremoniespreker",
    template: "%s · Ja! met Anouk",
  },
  description:
    "Persoonlijke huwelijksceremonies, oprecht verteld. Trouwambtenaar (BABS) en ceremoniespreker Anouk maakt van jullie JAwoord een verhaal dat bij jullie past.",
  openGraph: {
    title: "Ja! met Anouk · Trouwambtenaar & ceremoniespreker",
    description: "Persoonlijke huwelijksceremonies, oprecht verteld.",
    images: ["/images/trouwjurk.jpg"],
    type: "website",
    locale: "nl_NL",
  },
};

export const viewport: Viewport = {
  themeColor: "#191210",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${jost.variable}`}>
      <body>
        <Nav />
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="brand">
                Ja! <em>met Anouk</em>
              </span>
              <p>Liefdesverhaal, oprecht verteld.</p>
            </div>
            <nav className="footer-nav" aria-label="Footer">
              <Link href="/">Home</Link>
              <Link href="/#werkwijze">Werkwijze</Link>
              <Link href="/#pakketten">Pakketten</Link>
              <Link href="/over-mij">Over mij</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <div className="footer-contact">
              <a href="mailto:info@jametanouk.nl">info@jametanouk.nl</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Ja! met Anouk</span>
            <span>Trouwambtenaar (BABS) &middot; Ceremonies op maat</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
