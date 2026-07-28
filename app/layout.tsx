import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
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
  title: "Ja! met Anouk · Binnenkort online",
  description:
    "De website van Ja! met Anouk is in de maak. Persoonlijke huwelijksceremonies, oprecht verteld. Alvast kennismaken? Mail naar info@jametanouk.nl.",
  openGraph: {
    title: "Ja! met Anouk · Binnenkort online",
    description: "Persoonlijke huwelijksceremonies, oprecht verteld. Binnenkort online.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ja! met Anouk, liefdesverhaal oprecht verteld",
      },
    ],
    type: "website",
    locale: "nl_NL",
    siteName: "Ja! met Anouk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ja! met Anouk · Binnenkort online",
    description: "Persoonlijke huwelijksceremonies, oprecht verteld. Binnenkort online.",
    images: ["/og.jpg"],
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
      <body>{children}</body>
    </html>
  );
}
