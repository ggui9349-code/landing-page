"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiPause, FiPlay } from "react-icons/fi";

const testimonials = [
  {
    src: "/proof/avaliacao-levinaldo.webp",
    alt: "Cliente avalia a reforma do colchão com cinco estrelas no WhatsApp",
    name: "Levinaldo",
    result: "5 estrelas",
    width: 510,
    height: 290,
  },
  {
    src: "/proof/avaliacao-veronica.webp",
    alt: "Cliente responde com cinco estrelas sobre o resultado da reforma",
    name: "Veronica",
    result: "5 estrelas",
    width: 510,
    height: 258,
  },
  {
    src: "/proof/avaliacao-eduardo.webp",
    alt: "Cliente dá nota cinco ao serviço de reforma de colchão",
    name: "Eduardo",
    result: "Nota 5",
    width: 510,
    height: 276,
  },
  {
    src: "/proof/avaliacao-maria.png",
    alt: "Maria relata que dormiu muito bem e avalia o colchão como nota dez",
    name: "Maria",
    result: "Nota dez",
    width: 1163,
    height: 204,
  },
] as const;

export function Testimonials() {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const moveTo = useCallback(
    (nextIndex: number) => {
      const list = listRef.current;
      const cards = list?.querySelectorAll<HTMLElement>(".testimonials__item");

      if (!list || !cards?.length) return;

      const normalizedIndex =
        (nextIndex + testimonials.length) % testimonials.length;
      const target = cards[normalizedIndex];

      list.scrollTo({
        left: target.offsetLeft - list.offsetLeft,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      setActiveIndex(normalizedIndex);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused || isInteracting || prefersReducedMotion) return;

    const timer = window.setInterval(() => moveTo(activeIndex + 1), 4600);
    return () => window.clearInterval(timer);
  }, [activeIndex, isInteracting, isPaused, moveTo, prefersReducedMotion]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let frame = 0;
    const updateActiveCard = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const cards = Array.from(
          list.querySelectorAll<HTMLElement>(".testimonials__item"),
        );
        const nearestIndex = cards.reduce((nearest, card, index) => {
          const currentDistance = Math.abs(
            card.offsetLeft - list.offsetLeft - list.scrollLeft,
          );
          const nearestDistance = Math.abs(
            cards[nearest].offsetLeft - list.offsetLeft - list.scrollLeft,
          );
          return currentDistance < nearestDistance ? index : nearest;
        }, 0);
        setActiveIndex(nearestIndex);
      });
    };

    list.addEventListener("scroll", updateActiveCard, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      list.removeEventListener("scroll", updateActiveCard);
    };
  }, []);

  return (
    <section
      className="section testimonials"
      id="depoimentos"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <div className="testimonials__header" data-reveal="up">
          <div className="testimonials__heading">
            <h2 id="testimonials-title">
              Depois da entrega, os clientes contam como ficou.
            </h2>
            <p>Mensagens reais enviadas à WL depois da reforma.</p>
          </div>

          <div className="testimonials__controls" aria-label="Controles dos depoimentos">
            <button
              type="button"
              className="testimonials__control"
              aria-label="Depoimento anterior"
              onClick={() => moveTo(activeIndex - 1)}
            >
              <FiArrowLeft aria-hidden="true" />
            </button>
            <span className="testimonials__position" aria-hidden="true">
              {String(activeIndex + 1).padStart(2, "0")}
              <span>/</span>
              {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="testimonials__control"
              aria-label={isPaused ? "Retomar depoimentos" : "Pausar depoimentos"}
              aria-pressed={isPaused}
              onClick={() => setIsPaused((current) => !current)}
            >
              {isPaused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
            </button>
            <button
              type="button"
              className="testimonials__control"
              aria-label="Próximo depoimento"
              onClick={() => moveTo(activeIndex + 1)}
            >
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={listRef}
          className="testimonials__list"
          aria-label="Avaliações reais de clientes"
          aria-live={isPaused ? "polite" : "off"}
          data-reveal="up"
          tabIndex={0}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocus={() => setIsInteracting(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsInteracting(false);
            }
          }}
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
          onPointerCancel={() => setIsInteracting(false)}
        >
          {testimonials.map((testimonial) => (
            <li
              className={`testimonials__item${
                testimonial.name === "Maria"
                  ? " testimonials__item--wide"
                  : ""
              }`}
              key={testimonial.name}
            >
              <figure>
                <div className="testimonials__image">
                  <img
                    src={testimonial.src}
                    alt={testimonial.alt}
                    width={testimonial.width}
                    height={testimonial.height}
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <span>
                    <strong>{testimonial.name}</strong>
                    <small>Cliente WL</small>
                  </span>
                  <span>{testimonial.result}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="sr-only" aria-live={isPaused ? "polite" : "off"}>
          Depoimento {activeIndex + 1} de {testimonials.length}: {testimonials[activeIndex].name}
        </p>
      </div>
    </section>
  );
}
