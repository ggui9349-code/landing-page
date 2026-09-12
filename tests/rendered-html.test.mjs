import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://wl-colchoes.test${pathname}`, {
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
  assert.match(
    html,
    /Seu colchão magnético perdeu o conforto\?[\s\S]{0,80}<span>A WL reforma para você voltar a dormir bem\.<\/span>/,
  );
  assert.match(html, /Seu colchão pode voltar melhor que novo\./);
  assert.match(html, /Mais de 20 anos conhecendo colchões por dentro\./);

  for (const copy of [
    "O desconforto aparece antes de o desgaste ficar visível.",
    "Demora para encontrar uma posição confortável",
    "Acorda com sensação de pouco descanso",
    "Percebe afundamento ou diferença de firmeza",
    "Sentir essa diferença não significa que você precisa comprar outro.",
  ]) {
    assert.match(html, new RegExp(copy.replace(/[.?]/g, "\\$&")));
  }

  const orderedMilestones = [
    'id="inicio"',
    'id="equipe"',
    'id="sinais"',
    'id="possibilidade"',
    'id="camadas-magneticas"',
    'id="resultados"',
    'id="depoimentos"',
    'id="como-funciona"',
    'id="garantia"',
    'id="duvidas"',
  ];
  let previousIndex = -1;
  for (const milestone of orderedMilestones) {
    const currentIndex = html.indexOf(milestone);
    assert.ok(currentIndex > previousIndex, `${milestone} is out of funnel order`);
    previousIndex = currentIndex;
  }

  const heroIndex = html.indexOf('id="inicio"');
  const authorityIndex = html.indexOf('id="equipe"');
  assert.ok(heroIndex >= 0);
  assert.ok(authorityIndex > heroIndex);
  assert.match(html, /\/images\/magnetic-mattress-hero\.png/);
  assert.match(html, /6 meses de garantia/);
  assert.match(html, /Entrega em até 3 dias/);
  assert.match(html, /a reforma recupera o colchão por camadas\./);
  assert.match(
    html,
    /define somente o que precisa ser recuperado\./,
  );
  assert.match(html, /Sustentação recuperada/);
  assert.match(html, /Conforto renovado/);
  assert.match(html, /Acabamento refeito/);
  assert.match(html, /Ímãs, controle e massagem/);
  assert.doesNotMatch(html, /Magnético, sem fórmula pronta/);
  assert.doesNotMatch(html, /comparativo-sustentacao-colchao/);
  assert.doesNotMatch(html, /Ilustração educativa|alinhamento varia conforme corpo/);
  assert.match(html, /\/images\/colchao-magnetico-camadas-v3\.png/);
  assert.match(
    html,
    /<h3>Controle e massagem entram quando fazem sentido para o projeto\.<\/h3>/,
  );
  assert.match(html, /Controle e massagem entram quando fazem sentido/);
  assert.match(html, /\/images\/controle-ativita-relax\.png/);
  assert.match(html, /tudo começa com algumas fotos\./);
  assert.match(html, /Você entende o serviço e o orçamento antes de decidir\./);
  assert.match(html, /o resultado aparece por fora\./);
  assert.match(html, /Veja uma reforma real realizada pela WL em Olinda\./);
  assert.doesNotMatch(
    html,
    /Antes e depois de uma reforma realizada pela WL em Olinda\./,
  );
  assert.match(html, /Recuperado sem uma troca desnecessária\./);
  assert.match(html, /Antes de decidir, você sabe exatamente o que esperar\./);
  assert.match(html, /O que falta saber antes de enviar as fotos\?/);
  assert.match(html, /Todo colchão magnético pode ser reformado\?/);
  assert.match(html, /Seu colchão pode voltar melhor que novo\./);
  assert.match(html, /Você não precisa autorizar nada antes de entender/);
  assert.doesNotMatch(
    html,
    /\bcura\b|tratamento magnético|melhora a circulação|alivia dores|trata dores/i,
  );

  const processMarkup = html.match(
    /<ol class="renovation-process__path"[^>]*>([\s\S]*?)<\/ol>/,
  )?.[1];
  assert.ok(processMarkup);
  assert.equal((processMarkup.match(/<li/g) ?? []).length, 3);
  for (const step of [
    "Mostre o que mudou",
    "Entenda a recomendação",
    "Aprove e receba",
  ]) {
    assert.match(processMarkup, new RegExp(step));
  }

  const guaranteeMarkup = html.match(
    /<section[^>]+class="section guarantee"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(guaranteeMarkup);
  assert.equal((guaranteeMarkup.match(/<dt/g) ?? []).length, 3);
  assert.match(
    guaranteeMarkup,
    /Antes de decidir, você sabe exatamente o que esperar\./,
  );
  assert.match(
    guaranteeMarkup,
    /Serviço indicado, orçamento, prazo e condições de garantia/,
  );
  assert.match(guaranteeMarkup, /6 meses de garantia/);
  assert.match(guaranteeMarkup, /Entrega em até 3 dias/);
  assert.match(guaranteeMarkup, /Atendimento regional/);

  assert.match(html, /Conte para a gente o que está acontecendo/);
  assert.match(html, /Tamanho do colchão/);
  assert.match(html, /Melhor horário/);
  assert.match(
    html,
    /<input[^>]+(?:id="contact-privacy-consent"[^>]+type="checkbox"|type="checkbox"[^>]+id="contact-privacy-consent")[^>]+required/i,
  );
  assert.match(
    html,
    /<a[^>]+href="\/politica-de-privacidade"[^>]+target="_blank"[^>]*>\s*Política de Privacidade\s*<\/a>/i,
  );
  assert.match(html, /Washington/);
  assert.match(html, /Guilherme/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("keeps all primary offer facts inside the magnetic hero", async () => {
  const response = await render();
  const html = await response.text();

  const heroMarkup = html.match(/<section[^>]+id="inicio"[\s\S]*?<\/section>/)?.[0];
  assert.ok(heroMarkup);
  for (const fact of [
    "Reforma magnética",
    "Entrega em até 3 dias",
    "6 meses de garantia",
  ]) {
    assert.match(heroMarkup, new RegExp(fact));
  }
});

test("places real WhatsApp testimonials after the transformation proof", async () => {
  const response = await render();
  const html = await response.text();

  const transformationIndex = html.indexOf('id="resultados"');
  const testimonialsIndex = html.indexOf('id="depoimentos"');
  const processIndex = html.indexOf('id="como-funciona"');
  assert.ok(transformationIndex >= 0);
  assert.ok(testimonialsIndex > transformationIndex);
  assert.ok(processIndex > testimonialsIndex);

  const testimonialsMarkup = html.match(
    /<section[^>]+class="section testimonials"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(testimonialsMarkup);
  assert.equal(
    (testimonialsMarkup.match(/<li class="testimonials__item/g) ?? []).length,
    4,
  );
  assert.match(testimonialsMarkup, /Depois da entrega, os clientes contam como ficou\./);
  assert.match(
    testimonialsMarkup,
    /Mensagens reais enviadas à WL depois da reforma\./,
  );
  assert.match(
    testimonialsMarkup,
    /<ul[^>]+class="testimonials__list"[^>]+tabindex="0"/i,
  );
  for (const client of ["Levinaldo", "Veronica", "Eduardo", "Maria"]) {
    assert.match(testimonialsMarkup, new RegExp(client));
  }
  for (const asset of [
    "avaliacao-levinaldo.webp",
    "avaliacao-veronica.webp",
    "avaliacao-eduardo.webp",
    "avaliacao-maria.png",
  ]) {
    assert.match(testimonialsMarkup, new RegExp(asset.replace(".", "\\.")));
  }
});

test("lets visitors control the moving testimonials rail", async () => {
  const response = await render();
  const html = await response.text();
  const testimonialsMarkup = html.match(
    /<section[^>]+class="section testimonials"[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(testimonialsMarkup);
  assert.match(testimonialsMarkup, /aria-label="Depoimento anterior"/);
  assert.match(testimonialsMarkup, /aria-label="Pausar depoimentos"/);
  assert.match(testimonialsMarkup, /aria-label="Próximo depoimento"/);
  assert.match(testimonialsMarkup, /aria-live="off"/);
});

test("keeps the landing concise and navigation focused on decisions", async () => {
  const response = await render();
  const html = await response.text();

  const mainMarkup = html.match(/<main[^>]*>[\s\S]*?<\/main>/)?.[0];
  assert.ok(mainMarkup);

  const desktopNavigation = html.match(
    /<nav class="desktop-nav"[\s\S]*?<\/nav>/,
  )?.[0];
  assert.ok(desktopNavigation);
  assert.equal((desktopNavigation.match(/<a\b/g) ?? []).length, 3);
  assert.match(desktopNavigation, />Como funciona</);
  assert.match(desktopNavigation, />Resultados</);
  assert.match(desktopNavigation, />Quem somos</);
  assert.doesNotMatch(desktopNavigation, />Problemas</);
  assert.doesNotMatch(desktopNavigation, />Sinais</);
  assert.match(html, /<a href="#resultados">Resultados<\/a>/);

  for (const removedSection of [
    "titulo-comparacao",
    "historia",
    "diferenciais",
  ]) {
    assert.doesNotMatch(mainMarkup, new RegExp(`id="${removedSection}"`));
  }

  const faqMarkup = html.match(
    /<section[^>]+class="section renovation-faq"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(faqMarkup);
  assert.equal((faqMarkup.match(/<details/g) ?? []).length, 4);
  assert.doesNotMatch(mainMarkup, /class="container-scroll"/);
});

test("guides the visitor from support to reform, proof and decision", async () => {
  const response = await render();
  const html = await response.text();
  const orderedMilestones = [
    'id="camadas-magneticas"',
    'id="resultados"',
    'id="depoimentos"',
    'id="como-funciona"',
    'id="garantia"',
    'id="duvidas"',
  ];

  let previousIndex = -1;
  for (const milestone of orderedMilestones) {
    const currentIndex = html.indexOf(milestone);
    assert.ok(currentIndex > previousIndex, `${milestone} is out of narrative order`);
    previousIndex = currentIndex;
  }
  assert.match(html, /Quando necessário/);
  assert.match(html, /A avaliação vem primeiro/);
  assert.match(html, /Você entende o serviço e o orçamento antes de decidir\./);
});

test("publishes a concise privacy policy for WL contact requests", async () => {
  const response = await render("/politica-de-privacidade");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Política de Privacidade \| WL Colchões<\/title>/i);
  assert.match(html, /Quais dados podemos receber/);
  assert.match(html, /Como usamos seus dados/);
  assert.match(html, /WhatsApp/);
  assert.match(html, /Seus direitos pela LGPD/);
  assert.match(html, /558187514699|81 8751-4699/);
  assert.doesNotMatch(html, /G4 Educação|análise de crédito|marketing direto/i);
});

test("preserves production, form, SEO and motion contracts", async () => {
  const [
    page,
    globals,
    designTokens,
    contactFlow,
    contactFlowLogic,
    interactions,
    scrollReveal,
    layout,
    seo,
    robots,
    sitemap,
    manifest,
    packageJson,
  ] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/design-tokens.css", import.meta.url), "utf8"),
    readFile(new URL("../components/ui/contact-flow.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/contact-flow-message.mjs", import.meta.url), "utf8"),
    readFile(new URL("../app/interactive-sections.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/ui/scroll-reveal-manager.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/seo.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/manifest.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  const styles = `${designTokens}\n${globals}`;
  const motionSections = await Promise.all([
    readFile(new URL("../components/sections/sleep-signals.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/magnetic-layers.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/testimonials.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/process.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/guarantee.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/faq.tsx", import.meta.url), "utf8"),
  ]);
  const [sleepSignals, magneticLayers, testimonials, process, guarantee, faq] =
    motionSections;

  assert.match(page, /aria-label="WL Colchões, início"/);
  assert.match(page, /LocalBusiness/);
  assert.match(page, /FAQPage/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /<ScrollRevealManager\s*\/>/);
  assert.doesNotMatch(page, /PainSignals|HistoryPillars|DifferentialsGrid/);
  assert.doesNotMatch(page, /ContainerScroll|SiteAnalyticsTracker/);
  assert.match(styles, /--blue:\s*#125fd6/i);
  assert.match(styles, /--blue-dark:\s*#10233f/i);
  assert.match(styles, /--blue-soft:\s*#eaf2ff/i);
  assert.match(styles, /--off-white:\s*#f7f8fa/i);
  assert.match(styles, /--ink:\s*#171a20/i);
  assert.match(styles, /--graphite:\s*#4d5562/i);
  assert.match(styles, /\.authority__layout\s*\{/);
  assert.match(styles, /\.sleep-signals__layout\s*\{/);
  assert.match(styles, /\.recovery-turn__shell\s*\{/);
  assert.match(styles, /\.testimonials__list\s*\{/);
  assert.match(
    styles,
    /\.guarantee\s*\{[^}]*background:\s*var\(--blue-dark\)[^}]*color:\s*var\(--white\)/,
  );
  assert.match(
    styles,
    /\.guarantee__facts\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/,
  );
  assert.match(
    styles,
    /\.testimonials__list:focus-visible\s*\{[^}]*outline:\s*[^;]*var\(--blue\)/,
  );
  assert.match(globals, /html\s*\{[^}]*overflow-x:\s*clip[\s\S]*body\s*\{[^}]*overflow-x:\s*clip[\s\S]*main\s*\{[^}]*overflow-x:\s*clip/);
  assert.doesNotMatch(styles, /\.support-comparison(?:__|\s|\{)/);
  assert.match(
    styles,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation-duration/,
  );
  assert.match(styles, /\.team-section\s*\{\s*overflow:\s*hidden/);
  assert.match(styles, /\.authority__team h3\s*\{[^}]*color:\s*var\(--white\)/);
  assert.match(styles, /\.authority__team p\s*\{[^}]*color:\s*var\(--blue-soft\)/);
  assert.match(layout, /Inter/);
  assert.match(layout, /Manrope/);

  assert.match(contactFlow, /name="name"[\s\S]*required/);
  assert.match(contactFlow, /name="size"[\s\S]*required/);
  assert.match(contactFlow, /name="problem"[\s\S]*required/);
  assert.match(contactFlow, /name="phone"[\s\S]{0,240}required/);
  assert.match(contactFlow, /id="contact-privacy-consent"[\s\S]{0,260}checked=\{privacyConsent\}/);
  assert.match(contactFlow, /buildMagneticWhatsappMessage/);
  assert.match(contactFlowLogic, /isValidBrazilianPhone/);
  assert.match(interactions, /export function SiteNavigation/);
  assert.match(interactions, /export function MobileNavigation/);
  assert.match(scrollReveal, /IntersectionObserver/);
  assert.match(scrollReveal, /prefers-reduced-motion/);
  assert.match(sleepSignals, /sleep-signals__list" data-reveal="right"/);
  assert.match(magneticLayers, /mattress-blueprint__content" data-reveal="right"/);
  assert.match(testimonials, /testimonials__list"[\s\S]*data-reveal="up"/);
  assert.match(process, /renovation-process__path" data-reveal="up"/);
  assert.match(guarantee, /guarantee__facts" data-reveal="right"/);
  assert.match(faq, /renovation-faq__list" data-reveal="right"/);
  for (const section of motionSections) {
    assert.doesNotMatch(section, /data-reveal-delay/);
    assert.doesNotMatch(section, /<li[^>]*data-reveal/);
    assert.doesNotMatch(section, /<details[^>]*data-reveal/);
  }
  assert.match(layout, /generateMetadata/);
  assert.match(seo, /NEXT_PUBLIC_SITE_URL/);
  assert.match(robots, /sitemap: absoluteUrl\("\/sitemap\.xml"\)/);
  assert.match(sitemap, /changeFrequency: "weekly"/);
  assert.match(manifest, /theme_color: "#10233f"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"framer-motion"/);

  for (const asset of [
    "../public/images/wl-logo.png",
    "../public/images/colchao-magnetico-camadas-v3.png",
    "../public/images/controle-ativita-relax.png",
    "../public/results/transformacao-antes-depois.webp",
    "../public/videos/transformacao-wl-olinda.mp4",
    "../public/videos/transformacao-wl-olinda.vtt",
    "../public/team/washington.webp",
    "../public/team/guilherme.webp",
  ]) {
    await access(new URL(asset, import.meta.url));
  }
  await assert.rejects(
    access(new URL("../public/images/comparativo-sustentacao-colchao.png", import.meta.url)),
  );
  await access(new URL("dist/server/index.js", projectRoot));
});

test("uses accessible primary action colors", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(
    styles,
    /\.magnetic-hero__cta\s*\{[^}]*background:\s*var\(--blue\)[^}]*color:\s*var\(--white\)/,
  );
  assert.match(
    styles,
    /\.contact-submit\s*\{[^}]*background:\s*var\(--blue\)[^}]*color:\s*var\(--white\)/,
  );
});

test("rejects legacy red and cream literals", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(styles, /#e34228|#e8e7e2|#f7f5ef/i);
  assert.doesNotMatch(styles, /#25d366|#9f2f2f/i);
  assert.doesNotMatch(
    styles,
    /var\(--tension-red\)|var\(--concrete\)|var\(--workshop-white\)/,
  );
});
