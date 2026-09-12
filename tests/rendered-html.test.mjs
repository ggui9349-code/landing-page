import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://wl-colchoes.test/", {
      headers: { accept: "text/html", host: "wl-colchoes.test" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the WL Colchões landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Reforma de Colchões em Recife, Olinda e Paulista \| WL Colchões<\/title>/i,
  );
  assert.match(html, /Seu colchão afundou, deformou ou começou a incomodar/);
  assert.match(html, /Avaliação antes da decisão/);
  assert.match(html, /Mais de 20 anos de experiência/);
  assert.match(html, /Três cuidados fazem toda a diferença/);
  assert.match(html, /Trocar ou reformar\? Primeiro, entenda o seu caso/);
  assert.match(html, /É por dentro que a gente encontra a causa/);
  assert.match(html, /Camada de proteção/);
  assert.match(html, /colchao-camadas-v2\.webp/);
  assert.match(html, /Veja a transformação de perto/);
  assert.match(html, /Atendimento WL em Olinda/);
  assert.match(html, /transformacao-antes-depois\.webp/);
  assert.match(html, /Reproduzir vídeo da transformação com som/);
  assert.match(html, /Quem já reformou conta como foi/);
  assert.match(html, /Antes de comprar outro colchão/);
  assert.match(html, /Ver resultados/);
  assert.match(html, /Conte para a gente o que está acontecendo/);
  assert.match(html, /Tamanho do colchão/);
  assert.match(html, /Há quanto tempo\?/);
  assert.match(html, /Continuar pelo WhatsApp/);
  assert.match(html, /Washington/);
  assert.match(html, /Fundador e Diretor Técnico/);
  assert.match(html, /Guilherme/);
  assert.match(html, /Cofundador e Diretor de Atendimento/);
  assert.match(html, /responsável pelas avaliações técnicas da WL/);
  assert.doesNotMatch(html, /Exibir retrato colorido/);
  assert.match(html, /Sua aprovação vem primeiro/);
  assert.match(html, /Reformar colchão é só um remendo/);
  assert.match(html, /Avaliar meu colchão/);
  assert.doesNotMatch(html, /role="tablist"|role="tab"|aria-selected/);
  for (const section of [
    "historia",
    "metodo",
    "como-funciona",
    "resultados",
    "duvidas",
  ]) {
    assert.match(html, new RegExp(`href="#${section}"`));
  }
  assert.match(html, /aria-controls="mobile-navigation-panel"/);
  assert.match(html, /aria-label="Atalhos da página"/);
  assert.match(html, /Como funciona/);
  assert.match(html, /Paulista, Olinda, Recife e Região Metropolitana/);
  assert.match(html, /aria-label="Diferenciais da WL Colchões"/);
  assert.doesNotMatch(html, /class="differential-card is-active"/);
  assert.equal(
    (html.match(/class="differential-card"/g) ?? []).length,
    3,
  );
  assert.equal((html.match(/class="pillar-card"/g) ?? []).length, 3);
  const journeyMarkup = html.match(
    /<ol class="journey-list">([\s\S]*?)<\/ol>/,
  )?.[1];
  assert.ok(journeyMarkup);
  assert.equal((journeyMarkup.match(/<li/g) ?? []).length, 4);
  assert.doesNotMatch(html, /Cliente WL<\/strong><span>Cliente WL<\/span>/);
  assert.match(html, /Maria/);
  assert.match(html, /\/proof\/avaliacao-maria\.png/);
  assert.doesNotMatch(html, /\/proof\/avaliacao-nota-dez\.webp/);
  assert.match(html, /Avaliações reais recebidas depois do serviço/);
  assert.match(html, /aria-haspopup="dialog"/);
  assert.doesNotMatch(html, /final-phone/);
  assert.doesNotMatch(html, /<meta[^>]+name="keywords"/i);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("preserves the production structure without decorative UI traps", async () => {
  const [
    page,
    styles,
    contactFlow,
    interactions,
    teamShowcase,
    scrollReveal,
    layout,
    seo,
    robots,
    sitemap,
    manifest,
    packageJson,
  ] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(
        new URL("../components/ui/contact-flow.tsx", import.meta.url),
        "utf8",
      ),
      readFile(
        new URL("../app/interactive-sections.tsx", import.meta.url),
        "utf8",
      ),
      readFile(
        new URL("../components/ui/team-showcase.tsx", import.meta.url),
        "utf8",
      ),
      readFile(
        new URL("../components/ui/scroll-reveal-manager.tsx", import.meta.url),
        "utf8",
      ),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../lib/seo.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/manifest.ts", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
    ]);

  assert.match(page, /aria-label="WL Colchões, início"/);
  assert.match(page, /LocalBusiness/);
  assert.match(page, /HomeAndConstructionBusiness/);
  assert.match(page, /FAQPage/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /absoluteUrl\("\/#negocio"\)/);
  assert.match(page, /avaliacao-levinaldo\.webp/);
  assert.match(page, /images\/wl-logo\.png/);
  assert.ok((page.match(/images\/wl-logo\.png/g) ?? []).length >= 3);
  assert.doesNotMatch(page, /marqueeItems|marquee-section|materials-strip/);
  assert.doesNotMatch(page, /value-grid|final-limited|final-note/);
  assert.match(page, /Washington: 20\+ anos de fábrica/);
  assert.doesNotMatch(page, /ContainerScroll/);
  assert.match(styles, /translate3d\(-50%, 0, 0\)/);
  assert.doesNotMatch(styles, /marquee-group|@keyframes marquee/);
  assert.doesNotMatch(
    styles,
    /@keyframes (?:area-radar-sweep|area-ring-rotate|area-center-pulse|area-city-signal|cta-neon-breathe)/,
  );
  assert.match(styles, /@keyframes technical-layer-highlight/);
  assert.match(styles, /\.team-portrait-image[\s\S]*grayscale\(1\)/);
  const continuousAnimations =
    styles.match(/animation:[^;]*\binfinite\b[^;]*;/g) ?? [];
  assert.equal(continuousAnimations.length, 5);
  continuousAnimations.forEach((animation) => {
    assert.match(animation, /technical-|proof-carousel/);
  });
  assert.match(contactFlow, /https:\/\/wa\.me\/\$\{whatsappPhone\}/);
  assert.match(contactFlow, /Tamanho do colchão/);
  assert.match(contactFlow, /Olá, vim pelo site da WL/);
  assert.match(contactFlow, /name="time"/);
  assert.match(contactFlow, /Tudo pronto\. Agora envie a mensagem no WhatsApp/);
  assert.match(contactFlow, /Abrir WhatsApp novamente/);
  assert.match(contactFlow, /Copiar mensagem/);
  assert.match(contactFlow, /isValidBrazilianPhone/);
  assert.doesNotMatch(contactFlow, /\.reset\(|240/);
  const citySelect = contactFlow.match(
    /<select id="contact-city"[\s\S]*?<\/select>/,
  )?.[0];
  const timeSelect = contactFlow.match(
    /<select id="contact-time"[\s\S]*?<\/select>/,
  )?.[0];
  assert.ok(citySelect);
  assert.ok(timeSelect);
  assert.doesNotMatch(citySelect, /required/);
  assert.doesNotMatch(timeSelect, /required/);
  assert.match(interactions, /IntersectionObserver/);
  assert.match(interactions, /export function SiteNavigation/);
  assert.match(interactions, /export function MobileNavigation/);
  assert.match(interactions, /export function HistoryPillars/);
  assert.match(interactions, /export function DifferentialsGrid/);
  assert.doesNotMatch(interactions, /onMouseEnter|aria-pressed=\{isActive\}/);
  assert.doesNotMatch(teamShowcase, /aria-pressed|<button/);
  assert.match(scrollReveal, /IntersectionObserver/);
  assert.match(scrollReveal, /prefers-reduced-motion/);
  assert.match(scrollReveal, /observer\.unobserve/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /siteConfig\.ogImage\.path/);
  assert.match(layout, /applicationName/);
  assert.match(layout, /manifest: "\/manifest\.webmanifest"/);
  assert.match(layout, /favicon-16\.png/);
  assert.match(layout, /favicon-32\.png/);
  assert.match(layout, /apple-icon\.png/);
  assert.match(layout, /max-image-preview/);
  assert.match(layout, /geo\.region/);
  assert.match(layout, /canonical:\s*"\/"/);
  assert.doesNotMatch(layout, /keywords\s*:/);
  assert.match(seo, /NEXT_PUBLIC_SITE_URL/);
  assert.match(seo, /www\.wlcolchoes\.com\.br/);
  assert.match(seo, /og\.png/);
  assert.match(seo, /Reforma profissional de colchões/);
  assert.doesNotMatch(seo, /keywords\s*:/);
  assert.match(robots, /sitemap: absoluteUrl\("\/sitemap\.xml"\)/);
  assert.match(robots, /allow: "\/"/);
  assert.match(sitemap, /changeFrequency: "weekly"/);
  assert.match(sitemap, /priority: 1/);
  assert.match(manifest, /manifest\(\): MetadataRoute\.Manifest/);
  assert.match(manifest, /theme_color: "#0b2f63"/);
  assert.match(manifest, /icon-192\.png/);
  assert.match(manifest, /icon-512\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /framer-motion/);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(new URL("../public/images/colchao-aberto.webp", import.meta.url));
  await access(
    new URL("../public/images/colchao-camadas-v2.webp", import.meta.url),
  );
  await access(new URL("../public/images/wl-logo.png", import.meta.url));
  await access(new URL("../public/favicon-16.png", import.meta.url));
  await access(new URL("../public/favicon-32.png", import.meta.url));
  await access(new URL("../public/icon-192.png", import.meta.url));
  await access(new URL("../public/icon-512.png", import.meta.url));
  await access(new URL("../public/apple-icon.png", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/team/washington.webp", import.meta.url));
  await access(new URL("../public/team/guilherme.webp", import.meta.url));
  await access(new URL("../public/proof/avaliacao-maria.png", import.meta.url));
  await access(
    new URL("../public/results/transformacao-antes-depois.webp", import.meta.url),
  );
  await access(
    new URL("../public/videos/transformacao-wl-olinda.mp4", import.meta.url),
  );
  await access(
    new URL("../public/videos/transformacao-wl-olinda.vtt", import.meta.url),
  );
  await access(new URL("dist/server/index.js", projectRoot));
});
