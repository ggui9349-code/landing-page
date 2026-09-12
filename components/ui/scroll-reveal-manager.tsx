"use client";

import { useEffect } from "react";

export function ScrollRevealManager() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    elements.forEach((element) => {
      const requestedDelay = Number(element.dataset.revealDelay ?? 0);
      const safeDelay = Number.isFinite(requestedDelay)
        ? Math.min(Math.max(requestedDelay, 0), 320)
        : 0;

      element.style.setProperty("--reveal-delay", `${safeDelay}ms`);
      const bounds = element.getBoundingClientRect();
      const isInitiallyVisible =
        bounds.bottom > 0 && bounds.top < window.innerHeight * 0.92;

      if (isInitiallyVisible) {
        element.classList.add("is-visible");
      }

      element.classList.add("reveal-ready");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements
      .filter((element) => !element.classList.contains("is-visible"))
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
