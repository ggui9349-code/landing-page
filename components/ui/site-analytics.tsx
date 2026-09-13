"use client";

import { useEffect, useRef } from "react";

const SUPABASE_URL = "https://ccvwmqobmiaoqthqlhxx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdndtcW9ibWlhb3F0aHFsaHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNzEwNjUsImV4cCI6MjA4Njc0NzA2NX0.24voj74qh54VPzoc-GnCh0Av6Rdo8rikwxJUuAxBVpw";

const VISITOR_ID_KEY = "wl:visitor-id";
const SESSION_ID_KEY = "wl:site-session-id";
const SESSION_STARTED_KEY = "wl:site-session-started-at";

type AnalyticsMetadata = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface AnalyticsEventDetail {
  eventName: string;
  eventLabel?: string;
  ctaSource?: string;
  sectionId?: string;
  metadata?: AnalyticsMetadata;
}

interface RestOptions {
  query?: string;
  method?: "POST" | "PATCH";
  prefer?: string;
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  if (typeof crypto === "undefined" || !("getRandomValues" in crypto)) {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = Math.floor(Math.random() * 16);
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (char) =>
    (
      Number(char) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(char) / 4)))
    ).toString(16),
  );
}

function getStorageValue(storage: Storage, key: string) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function setStorageValue(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    // Storage can be blocked by privacy settings. Analytics remains best effort.
  }
}

function getOrCreateStorageId(storage: Storage, key: string) {
  const stored = getStorageValue(storage, key);

  if (stored) {
    return stored;
  }

  const nextId = createId();
  setStorageValue(storage, key, nextId);
  return nextId;
}

function getPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function getDeviceType() {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1100) return "tablet";
  return "desktop";
}

function getBrowserName() {
  const ua = navigator.userAgent;

  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/")) return "Opera";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/")) return "Safari";
  if (ua.includes("Firefox/")) return "Firefox";
  return "Outro";
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  };
}

function getTextLabel(element: Element | null) {
  const text = element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  return text.length > 120 ? `${text.slice(0, 117)}...` : text || null;
}

function hasDoNotTrackEnabled() {
  const privacyNavigator = navigator as Navigator & {
    globalPrivacyControl?: boolean;
  };
  const privacyWindow = window as Window & {
    doNotTrack?: string;
  };

  return (
    navigator.doNotTrack === "1" ||
    privacyWindow.doNotTrack === "1" ||
    privacyNavigator.globalPrivacyControl === true
  );
}

async function sendRest(table: string, payload: unknown, options: RestOptions = {}) {
  const body = JSON.stringify(payload);

  await fetch(`${SUPABASE_URL}/rest/v1/${table}${options.query ?? ""}`, {
    method: options.method ?? "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer ?? "return=minimal",
    },
    body,
    keepalive: body.length < 60_000,
  });
}

export function emitSiteAnalytics(detail: AnalyticsEventDetail) {
  if (typeof window === "undefined") {
    return;
  }

  if (detail.eventName === "whatsapp_open") {
    window.fbq?.("track", "Contact", {
      content_name: detail.eventLabel ?? "WhatsApp",
      content_category: "lead",
    });
  }

  if (detail.eventName === "contact_form_submit") {
    window.fbq?.("track", "Lead", {
      content_name: detail.eventLabel ?? "Formulário de avaliação",
      content_category: "lead",
    });
  }

  window.dispatchEvent(new CustomEvent("wl:analytics", { detail }));
}

export function SiteAnalyticsTracker() {
  const startedAtRef = useRef(0);
  const readyRef = useRef<Promise<void> | null>(null);
  const idsRef = useRef<{ sessionId: string; visitorId: string } | null>(null);

  useEffect(() => {
    if (hasDoNotTrackEnabled()) {
      return undefined;
    }

    const startedAt = Number(getStorageValue(sessionStorage, SESSION_STARTED_KEY)) || Date.now();
    const visitorId = getOrCreateStorageId(localStorage, VISITOR_ID_KEY);
    const sessionId = getOrCreateStorageId(sessionStorage, SESSION_ID_KEY);

    setStorageValue(sessionStorage, SESSION_STARTED_KEY, String(startedAt));
    startedAtRef.current = performance.now();
    idsRef.current = { sessionId, visitorId };

    const sessionPayload = {
      id: sessionId,
      visitor_id: visitorId,
      started_at: new Date(startedAt).toISOString(),
      last_seen_at: new Date().toISOString(),
      landing_path: getPath(),
      current_path: getPath(),
      referrer: document.referrer || null,
      ...getUtmParams(),
      device_type: getDeviceType(),
      browser: getBrowserName(),
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    readyRef.current = sendRest("site_sessions_wl", sessionPayload, {
      query: "?on_conflict=id",
      prefer: "resolution=merge-duplicates,return=minimal",
    }).catch(() => undefined);

    const recordEvent = (detail: AnalyticsEventDetail) => {
      const ids = idsRef.current;

      if (!ids || !detail.eventName) {
        return;
      }

      void (async () => {
        await readyRef.current;

        await sendRest("site_events_wl", {
          session_id: ids.sessionId,
          visitor_id: ids.visitorId,
          event_name: detail.eventName,
          event_label: detail.eventLabel ?? null,
          cta_source: detail.ctaSource ?? null,
          section_id: detail.sectionId ?? null,
          path: getPath(),
          elapsed_ms: Math.max(0, Math.round(performance.now() - startedAtRef.current)),
          metadata: detail.metadata ?? {},
        }).catch(() => undefined);
      })();
    };

    const pingSession = () => {
      void sendRest(
        "site_sessions_wl",
        {
          last_seen_at: new Date().toISOString(),
          current_path: getPath(),
          viewport_width: window.innerWidth,
          viewport_height: window.innerHeight,
          device_type: getDeviceType(),
        },
        {
          method: "PATCH",
          query: `?id=eq.${sessionId}`,
        },
      ).catch(() => undefined);
    };

    const pageViewKey = `wl:page-view:${sessionId}:${getPath()}`;
    if (getStorageValue(sessionStorage, pageViewKey) !== "1") {
      setStorageValue(sessionStorage, pageViewKey, "1");
      recordEvent({
        eventName: "page_view",
        eventLabel: document.title,
        metadata: { title: document.title },
      });
    }

    const handleAnalyticsEvent = (event: Event) => {
      recordEvent((event as CustomEvent<AnalyticsEventDetail>).detail);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        pingSession();
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const dialog = target?.closest(".contact-dialog");
      const ctaElement = target?.closest<HTMLElement>("[data-cta-source]");

      if (ctaElement) {
        recordEvent({
          eventName: "cta_click",
          eventLabel: getTextLabel(ctaElement) ?? undefined,
          ctaSource: ctaElement.dataset.ctaSource || "sem-origem",
        });
        return;
      }

      if (dialog) {
        return;
      }

      const whatsappLink = target?.closest<HTMLAnchorElement>(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"]',
      );

      if (whatsappLink) {
        const source = whatsappLink.dataset.ctaSource || "footer-whatsapp";
        recordEvent({
          eventName: "cta_click",
          eventLabel: getTextLabel(whatsappLink) ?? "WhatsApp",
          ctaSource: source,
        });
        recordEvent({
          eventName: "whatsapp_open",
          eventLabel: "WhatsApp direto",
          ctaSource: source,
        });
      }
    };

    const sectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting || entry.intersectionRatio < 0.55) {
                  return;
                }

                const section = entry.target as HTMLElement;
                const sectionId = section.id;
                const key = `wl:section-view:${sessionId}:${sectionId}`;

                if (!sectionId || getStorageValue(sessionStorage, key) === "1") {
                  return;
                }

                setStorageValue(sessionStorage, key, "1");
                recordEvent({
                  eventName: "section_view",
                  sectionId,
                  eventLabel: sectionId,
                });
              });
            },
            { threshold: [0.55] },
          )
        : null;

    document
      .querySelectorAll<HTMLElement>("main section[id]")
      .forEach((section) => sectionObserver?.observe(section));

    const scrollDepths = [25, 50, 75, 90];
    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100 : 100;

        scrollDepths.forEach((depth) => {
          const key = `wl:scroll-depth:${sessionId}:${depth}`;

          if (progress >= depth && getStorageValue(sessionStorage, key) !== "1") {
            setStorageValue(sessionStorage, key, "1");
            recordEvent({
              eventName: "scroll_depth",
              eventLabel: `${depth}%`,
              metadata: { depth },
            });
          }
        });

        ticking = false;
      });
    };

    window.addEventListener("wl:analytics", handleAnalyticsEvent);
    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", pingSession);
    window.addEventListener("pagehide", pingSession);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleScroll();
    const interval = window.setInterval(pingSession, 30_000);

    return () => {
      sectionObserver?.disconnect();
      window.removeEventListener("wl:analytics", handleAnalyticsEvent);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", pingSession);
      window.removeEventListener("pagehide", pingSession);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
