import CookieConsent from "@/components/CookieConsent";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import Nav from "@/components/Nav";
import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import Link from "next/link";
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
    default: "JA! met Anouk · Trouwambtenaar & ceremoniespreker",
    template: "%s · JA! met Anouk",
  },
  description:
    "Persoonlijke huwelijksceremonies, oprecht verteld. Trouwambtenaar (BABS) en ceremoniespreker Anouk maakt van jullie JAwoord een verhaal dat bij jullie past.",
  openGraph: {
    title: "JA! met Anouk · Trouwambtenaar & ceremoniespreker",
    description: "Persoonlijke huwelijksceremonies, oprecht verteld.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "JA! met Anouk, liefdesverhaal oprecht verteld",
      },
    ],
    type: "website",
    locale: "nl_NL",
    siteName: "JA! met Anouk",
  },
  twitter: {
    card: "summary_large_image",
    title: "JA! met Anouk · Trouwambtenaar & ceremoniespreker",
    description: "Persoonlijke huwelijksceremonies, oprecht verteld.",
    images: ["/og.jpg"],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.jametanouk.nl/#business",
      name: "JA! met Anouk",
      description:
        "Persoonlijke huwelijksceremonies, oprecht verteld. Trouwambtenaar (BABS) en ceremoniespreker.",
      url: "https://www.jametanouk.nl",
      telephone: "+31611429005",
      email: "info@jametanouk.nl",
      image: "https://www.jametanouk.nl/og.jpg",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "KVK",
        value: "63510898",
      },
      areaServed: "Nederland",
      founder: { "@type": "Person", name: "Anouk" },
      sameAs: [
        "https://www.instagram.com/jametanouk/",
        "https://l-affetto.nl/",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "JA met Anouk · Officieel trouwen",
            description:
              "Kennismaking en jullie officiële huwelijksceremonie, voltrokken door een trouwambtenaar (BABS) en juridisch vastgelegd. Dagcoördinatie mogelijk.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "JA met Anouk · Ceremonie op maat",
            description:
              "Symbolische ceremonie, buitenlandse bruiloft, geregistreerd partnerschap of herbevestiging van geloften.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "JA & Diner met Anouk",
            description:
              "Ceremonie met dagcoördinatie en een exclusief diner of culinaire beleving door L'Affetto.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.jametanouk.nl/#website",
      url: "https://www.jametanouk.nl",
      name: "JA! met Anouk",
      inLanguage: "nl-NL",
      publisher: { "@id": "https://www.jametanouk.nl/#business" },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#191210",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#inhoud" className="skip-link">
          Spring naar de inhoud
        </a>
        <Nav />
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="brand">
                JA! <em>met Anouk</em>
              </span>
              <p>Liefdesverhaal, oprecht verteld.</p>
            </div>
            <nav className="footer-nav" aria-label="Footer">
              <Link href="/">Home</Link>
              <Link href="/#werkwijze">Werkwijze</Link>
              <Link href="/#pakketten">Pakketten</Link>
              <Link href="/over-mij">Over mij</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/voorwaarden">Algemene voorwaarden</Link>
            </nav>
            <div className="footer-contact">
              <a href="mailto:info@jametanouk.nl">info@jametanouk.nl</a>
              <a href="tel:+31611429005">06 11 42 90 05</a>
              <a
                href="https://www.instagram.com/jametanouk/"
                target="_blank"
                rel="noopener"
              >
                Instagram
              </a>
              <CookieSettingsButton />
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 JA! met Anouk</span>
            <span>KvK 63510898</span>
            <span>Trouwambtenaar (BABS) &middot; Ceremonies op maat</span>
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}
