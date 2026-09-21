"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NAV_OFFSET = 88;

/**
 * Anchor links such as /#werkwijze do not land on their section by themselves:
 * the App Router restores the previous scroll position on a client-side
 * navigation, and on a cold load html's scroll-behavior:smooth plus the images
 * loading late make Chrome drop the fragment scroll. Position it ourselves
 * with smooth scrolling switched off, then correct once the images have
 * settled and the layout has stopped moving.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const jump = () => {
      if (cancelled) return;
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo(0, Math.max(top, 0));
      html.style.scrollBehavior = previous;
    };

    const schedule = () => {
      jump();
      timers.push(window.setTimeout(jump, 500));
    };

    schedule();
    window.addEventListener("hashchange", schedule);
    window.addEventListener("load", jump);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener("load", jump);
    };
  }, [pathname]);

  return null;
}
