"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#werkwijze", label: "Werkwijze" },
  { href: "/#pakketten", label: "Pakketten" },
  { href: "/over-mij", label: "Over mij" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // sluit het mobiele menu wanneer de route wisselt (ook via de terug-knop)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`site-nav ${scrolled || open ? "scrolled" : ""}`}>
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          Ja! <em>met Anouk</em>
        </Link>

        <nav className="nav-links" aria-label="Hoofdmenu">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn-small nav-cta">
          Plan een kennismaking
        </Link>

        <button
          type="button"
          className={`menu-btn ${open ? "open" : ""}`}
          aria-expanded={open}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <nav aria-label="Mobiel menu">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ transitionDelay: `${80 + i * 60}ms` }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <a className="mobile-menu-mail" href="mailto:info@jametanouk.nl">
          info@jametanouk.nl
        </a>
      </div>
    </>
  );
}
