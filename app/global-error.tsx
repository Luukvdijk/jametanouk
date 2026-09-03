"use client";

import { useEffect } from "react";

/**
 * Last line of defence: catches errors in the root layout itself, where nav,
 * footer and globals.css are all unavailable. It replaces the whole document,
 * so it has to bring its own html, body and styling.
 */
export default function GlobalError({
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
    <html lang="nl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#191210",
          color: "#f4ede8",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          fontWeight: 300,
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <p
            style={{
              margin: "0 0 1.1rem",
              fontSize: "0.68rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#ee9384",
            }}
          >
            Er ging iets mis
          </p>
          <h1
            style={{
              margin: "0 0 1.4rem",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 6vw, 3rem)",
              lineHeight: 1.1,
            }}
          >
            JA! <em style={{ color: "#ee9384" }}>met Anouk</em>
          </h1>
          <p style={{ margin: "0 0 1rem", lineHeight: 1.7, color: "#b3a49b" }}>
            De website is even uit de lucht. Probeer het zo nog een keer.
          </p>
          <p style={{ margin: "0 0 2rem", lineHeight: 1.7, color: "#b3a49b" }}>
            Liever meteen contact? Mail{" "}
            <a href="mailto:info@jametanouk.nl" style={{ color: "#ee9384" }}>
              info@jametanouk.nl
            </a>{" "}
            of bel{" "}
            <a href="tel:+31611429005" style={{ color: "#ee9384" }}>
              06 11 42 90 05
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              font: "inherit",
              fontSize: "0.72rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#f4ede8",
              background: "transparent",
              border: "1px solid rgba(244, 237, 232, 0.3)",
              padding: "0.9rem 1.6rem",
              cursor: "pointer",
            }}
          >
            Probeer opnieuw
          </button>
        </div>
      </body>
    </html>
  );
}
