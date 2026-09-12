"use client";

import { useEffect, useRef, useState } from "react";
import {
  LuLayers3,
  LuMessagesSquare,
  LuPlay,
  LuShieldCheck,
} from "react-icons/lu";

type Pillar = {
  number: string;
  title: string;
  text: string;
};

const differentialIcons = {
  layers: LuLayers3,
  messages: LuMessagesSquare,
  shield: LuShieldCheck,
} as const;

export type Differential = {
  icon: keyof typeof differentialIcons;
  title: string;
  text: string;
};

type NavigationItem = {
  id: string;
  label: string;
};

const navigationItems: NavigationItem[] = [
  { id: "como-funciona", label: "Como funciona" },
  { id: "resultados", label: "Resultados" },
  { id: "equipe", label: "Quem somos" },
];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return [activeSection, setActiveSection] as const;
}

function SectionLinks({
  items,
  className,
  onNavigate,
}: {
  items: NavigationItem[];
  className: string;
  onNavigate?: () => void;
}) {
  const [activeSection, setActiveSection] = useActiveSection();

  return (
    <div className={className}>
      {items.map((item) => (
        <a
          href={`#${item.id}`}
          key={item.id}
          aria-current={activeSection === item.id ? "location" : undefined}
          data-state={activeSection === item.id ? "active" : "inactive"}
          onClick={() => {
            setActiveSection(item.id);
            onNavigate?.();
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export function SiteNavigation() {
  return <SectionLinks className="site-nav-links" items={navigationItems} />;
}

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="mobile-navigation" ref={rootRef}>
      <button
        ref={triggerRef}
        className="mobile-navigation-trigger"
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav
        className="mobile-navigation-panel"
        id="mobile-navigation-panel"
        aria-label="Atalhos da página"
        hidden={!isOpen}
      >
        <SectionLinks
          className="mobile-navigation-links"
          items={navigationItems}
          onNavigate={() => setIsOpen(false)}
        />
      </nav>
    </div>
  );
}

export function HistoryPillars({ items }: { items: Pillar[] }) {
  return (
    <ol className="pillars-grid" aria-label="História da WL Colchões">
      {items.map((pillar, index) => (
        <li
          className="pillar-card"
          key={pillar.number}
          data-reveal="up"
          data-reveal-delay={index * 70}
        >
          <span className="pillar-number">{pillar.number}</span>
          <h3>{pillar.title}</h3>
          <p>{pillar.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function DifferentialsGrid({
  items,
}: {
  items: Differential[];
}) {
  return (
    <ul className="differentials-grid" aria-label="Diferenciais da WL Colchões">
      {items.map((item, index) => {
        const Icon = differentialIcons[item.icon];

        return (
          <li
            className="differential-card"
            key={item.title}
            data-reveal="up"
            data-reveal-delay={(index % 2) * 55}
          >
            <span className="difference-icon" aria-hidden="true">
              <Icon />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="difference-accent" aria-hidden="true" />
          </li>
        );
      })}
    </ul>
  );
}

export function TransformationVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const startVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    setShouldLoad(true);
    setHasStarted(true);
    video.muted = false;
    video.volume = 1;
    video.load();
    void video.play().catch(() => {
      setHasStarted(false);
    });
  };

  return (
    <div
      className={`transformation-video${hasStarted ? " is-started" : ""}`}
      ref={frameRef}
    >
      <video
        ref={videoRef}
        controls={hasStarted}
        playsInline
        poster="/results/transformacao-antes-depois.webp"
        preload={shouldLoad ? "metadata" : "none"}
        aria-label="Transformação real de um colchão, do revestimento danificado ao acabamento recuperado"
      >
        <source
          src="/videos/transformacao-wl-olinda.mp4"
          type="video/mp4"
        />
        <track
          kind="captions"
          label="Português"
          src="/videos/transformacao-wl-olinda.vtt"
          srcLang="pt-BR"
        />
      </video>

      <div className="transformation-video-labels" aria-hidden="true">
        <span>Antes</span>
        <span>Depois</span>
      </div>
      <span className="transformation-video-divider" aria-hidden="true" />

      {!hasStarted ? (
        <button
          className="transformation-play"
          type="button"
          onClick={startVideo}
          aria-label="Reproduzir vídeo da transformação com som"
        >
          <span className="transformation-play-icon" aria-hidden="true">
            <LuPlay />
          </span>
          <span>Ver transformação com som</span>
        </button>
      ) : null}
    </div>
  );
}
