# WL Reforma Magnética Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt the recovered WL Colchões site into a high-conversion landing page for magnetic mattress renovation, using the approved concrete/carbon/red visual direction and a WhatsApp-first funnel.

**Architecture:** Keep the existing Next.js/Vinext application, SEO foundation, real proof assets, contact dialog, and Supabase REST analytics. Split only redesigned page sections into focused server components, centralize approved visual tokens, and keep client code limited to interaction, analytics, and the existing contact flow.

**Tech Stack:** Next.js 16.2.6, React 19.2.6, TypeScript 5.9.3, Vinext 0.0.50, CSS, React Icons 5.7.0, Supabase REST analytics, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-29-wl-reforma-magnetica-design.md`

## Global Constraints

- Keep brand name `WL Colchões` and WhatsApp number `558187514699`.
- Serve Recife, Paulista, Olinda, and Região Metropolitana only.
- State delivery as up to three days and warranty as six months.
- Do not publish a fixed price; every quote follows evaluation.
- Do not promise cure, medical treatment, circulation improvement, or guaranteed pain relief.
- Use approved palette: concrete `#E8E7E2`, carbon `#141414`, tension red `#E34228`, workshop white `#F7F5EF`, graphite `#3B3B38`, material gray `#B8B4AA`.
- Do not add an animation library.
- Do not store names, phone numbers, free-text notes, or WhatsApp message content in Supabase analytics.
- Respect Do Not Track, Global Privacy Control, reduced motion, keyboard navigation, and WCAG AA contrast.
- Preserve real images, videos, testimonials, team evidence, local SEO, and structured data.

---

## File Map

### Create

- `app/design-tokens.css`: approved colors, typography roles, spacing, radii, shadows, and motion tokens.
- `components/sections/hero-magnetic.tsx`: first viewport, offer facts, primary CTA, and structural magnetic illustration.
- `components/sections/pain-signals.tsx`: customer pain recognition and reform-or-replace honesty block.
- `components/sections/magnetic-layers.tsx`: verifiable mattress layers, magnets, and control explanation.
- `components/sections/transformation-proof.tsx`: existing video, before/after, and case context.
- `components/sections/process.tsx`: five-step evaluation and delivery sequence.
- `components/sections/guarantee.tsx`: six-month warranty, three-day delivery, service area, and limitations.
- `components/sections/testimonials.tsx`: accessible real WhatsApp proof presentation.
- `components/sections/faq.tsx`: service, price, magnetic option, back discomfort, warranty, delivery, and cities.
- `components/sections/final-cta.tsx`: closing WhatsApp conversion block.
- `tests/analytics-contract.test.mjs`: static privacy and event taxonomy checks.

### Modify

- `app/page.tsx`: compose new sections and update structured data.
- `app/globals.css`: retain base/reset and shared interaction styles; replace page-specific blue system with approved section styles.
- `app/layout.tsx`: load approved font roles and update viewport theme.
- `app/manifest.ts`: replace blue theme colors.
- `components/ui/contact-flow.tsx`: simplify required fields, update magnetic-reform message, preserve accessibility.
- `components/ui/site-analytics.tsx`: add approved event taxonomy without personal data.
- `app/interactive-sections.tsx`: retain navigation/video behavior and remove section code moved to focused components.
- `lib/seo.ts`: update title and descriptions for magnetic mattress renovation without medical claims.
- `tests/rendered-html.test.mjs`: replace incumbent copy assertions with the approved offer and structure.

### Preserve unchanged

- `public/proof/*`
- `public/results/*`
- `public/videos/*`
- `public/team/*`
- `app/robots.ts`
- `app/sitemap.ts`
- `components/ui/scroll-reveal-manager.tsx`

---

### Task 1: Establish Recovered Source Baseline

**Files:**
- Add existing: `app/**`, `components/**`, `lib/**`, `public/**`, `tests/**`, configuration files, lockfile
- Exclude: `dist/**`, `.vinext/**`, `.wrangler/**`, `.superpowers/**`, `.impeccable/**`, ZIP archives
- Modify: `.gitignore`

**Interfaces:**
- Consumes: recovered Vercel source tree
- Produces: reproducible Git baseline and runnable existing tests

- [ ] **Step 1: Add generated-path exclusions**

Add these exact entries to `.gitignore`:

```gitignore
dist/
.vinext/
.wrangler/
.superpowers/
.impeccable/
node_modules/
*.zip
```

- [ ] **Step 2: Install pinned dependencies**

Run:

```powershell
npm ci
```

Expected: dependencies install from `package-lock.json` without changing the lockfile.

- [ ] **Step 3: Run recovered baseline tests**

Run:

```powershell
npm test
npm run lint
```

Expected: existing build, rendered HTML tests, and lint pass before redesign.

- [ ] **Step 4: Commit recovered baseline**

```powershell
git add -- .gitignore wl-colchoes-site/src
git diff --cached --check
git commit -m "chore: restore WL landing page source"
```

Exclude `docs/superpowers/**` already committed and all generated paths listed above.

---

### Task 2: Lock Visual Tokens, Fonts, and Hero Contract

**Files:**
- Create: `app/design-tokens.css`
- Create: `components/sections/hero-magnetic.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `app/manifest.ts`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `ContactTrigger` from `components/ui/contact-flow.tsx`
- Produces: `HeroMagnetic(): JSX.Element`; CSS custom properties `--concrete`, `--carbon`, `--tension-red`, `--workshop-white`, `--graphite`, `--material-gray`, `--font-display`, `--font-body`, `--font-data`

- [ ] **Step 1: Write failing hero and palette assertions**

Add to the server-render test:

```js
assert.match(html, /Recupere sustentação\. Recupere descanso\./);
assert.match(html, /Reforma magnética/);
assert.match(html, /6 meses de garantia/);
assert.match(html, /Entrega em até 3 dias/);
assert.match(html, /Enviar fotos para avaliação/);
```

Add file-content assertions:

```js
assert.match(styles, /--concrete:\s*#e8e7e2/i);
assert.match(styles, /--carbon:\s*#141414/i);
assert.match(styles, /--tension-red:\s*#e34228/i);
assert.doesNotMatch(styles, /--blue:/);
```

- [ ] **Step 2: Run test and confirm failure**

Run:

```powershell
npm test
```

Expected: FAIL because new hero copy and tokens do not exist.

- [ ] **Step 3: Create exact token contract**

Create `app/design-tokens.css` with:

```css
:root {
  --concrete: #e8e7e2;
  --carbon: #141414;
  --tension-red: #e34228;
  --workshop-white: #f7f5ef;
  --graphite: #3b3b38;
  --material-gray: #b8b4aa;
  --font-display: var(--font-archivo-black), sans-serif;
  --font-body: var(--font-atkinson), sans-serif;
  --font-data: var(--font-ibm-plex-mono), monospace;
  --content-width: 1180px;
  --section-space: clamp(5rem, 9vw, 9rem);
  --ease-structural: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- [ ] **Step 4: Replace font setup**

In `app/layout.tsx`, replace Inter and Manrope with `Archivo_Black`, `Atkinson_Hyperlegible`, and `IBM_Plex_Mono` from `next/font/google`. Set variables exactly to `--font-archivo-black`, `--font-atkinson`, and `--font-ibm-plex-mono`. Set viewport `themeColor` to `#141414`.

- [ ] **Step 5: Implement first viewport**

Create `HeroMagnetic` as a server component. Required structure:

```tsx
export function HeroMagnetic() {
  return (
    <section className="magnetic-hero" id="inicio" aria-labelledby="hero-title">
      <div className="magnetic-hero__copy">
        <p className="data-kicker">Reforma magnética · 6 meses de garantia</p>
        <h1 id="hero-title">Recupere sustentação. Recupere descanso.</h1>
        <p>Seu colchão reformado com estrutura revisada, conforto renovado, ímãs e controle. Entrega em até 3 dias.</p>
        <ContactTrigger ctaSource="hero-magnetic">Enviar fotos para avaliação</ContactTrigger>
        <p className="magnetic-hero__service-area">Recife · Paulista · Olinda · Região Metropolitana</p>
      </div>
      <div className="magnetic-structure" aria-hidden="true">
        <span className="magnetic-structure__rod magnetic-structure__rod--left" />
        <span className="magnetic-structure__rod magnetic-structure__rod--right" />
        <span className="magnetic-structure__cord magnetic-structure__cord--top" />
        <span className="magnetic-structure__cord magnetic-structure__cord--middle" />
        <span className="magnetic-structure__cord magnetic-structure__cord--bottom" />
        <span className="magnetic-structure__field" />
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Add responsive and reduced-motion styles**

Use CSS only. Desktop: 56/44 split. Mobile: copy remains first; illustration becomes a low-opacity background below the H1. Animate only the cords once. Under `prefers-reduced-motion: reduce`, remove animation and transitions.

- [ ] **Step 7: Update manifest colors and run checks**

Set `background_color` to `#E8E7E2` and `theme_color` to `#141414` in `app/manifest.ts`.

Run:

```powershell
npm test
npm run lint
```

Expected: hero and token assertions pass; no lint errors.

- [ ] **Step 8: Commit**

```powershell
git add app/design-tokens.css app/layout.tsx app/globals.css app/manifest.ts components/sections/hero-magnetic.tsx tests/rendered-html.test.mjs
git commit -m "feat: introduce magnetic structural hero"
```

---

### Task 3: Build Pain Recognition and Magnetic Layer Explanation

**Files:**
- Create: `components/sections/pain-signals.tsx`
- Create: `components/sections/magnetic-layers.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `PainSignals(): JSX.Element`; `MagneticLayers(): JSX.Element`
- Consumes: global visual tokens and `ContactTrigger`

- [ ] **Step 1: Write failing content assertions**

```js
assert.match(html, /Seu colchão está pedindo reforma\?/);
assert.match(html, /Quando o corpo não encontra apoio, o descanso também sente/);
assert.match(html, /Nem todo colchão deve ser reformado/);
assert.match(html, /Camada magnética/);
assert.match(html, /Controle incluído/);
assert.doesNotMatch(html, /cura|tratamento magnético|melhora a circulação/i);
```

- [ ] **Step 2: Verify failure**

Run `npm test`.

Expected: FAIL on new copy.

- [ ] **Step 3: Implement `PainSignals`**

Render five semantic list items: afundamento, perda de firmeza, espuma deformada, molas desconfortáveis, tecido desgastado. Follow with an honesty panel containing:

```tsx
<h3>Nem todo colchão deve ser reformado.</h3>
<p>A avaliação vem antes da venda. Se a estrutura não permitir uma reforma segura, a WL explica isso com clareza.</p>
```

- [ ] **Step 4: Implement `MagneticLayers`**

Use an ordered definition list with six verified layers: revestimento, espuma, proteção, molas/estrutura, camada magnética, controle. The magnetic copy must be:

```tsx
<dd>Ímãs incorporados à solução de reforma conforme a avaliação do colchão.</dd>
```

Control copy must be:

```tsx
<dd>Incluído na opção magnética. A equipe explica o uso durante a entrega.</dd>
```

- [ ] **Step 5: Compose both sections in `app/page.tsx`**

Place `PainSignals` immediately after the hero. Place `MagneticLayers` after the reform-or-replace message and before transformation proof.

- [ ] **Step 6: Run tests and commit**

Run:

```powershell
npm test
npm run lint
```

Commit:

```powershell
git add components/sections/pain-signals.tsx components/sections/magnetic-layers.tsx app/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: explain mattress pain signals and magnetic layers"
```

---

### Task 4: Rebuild Proof, Process, Warranty, Testimonials, and FAQ

**Files:**
- Create: `components/sections/transformation-proof.tsx`
- Create: `components/sections/process.tsx`
- Create: `components/sections/guarantee.tsx`
- Create: `components/sections/testimonials.tsx`
- Create: `components/sections/faq.tsx`
- Create: `components/sections/final-cta.tsx`
- Modify: `app/page.tsx`
- Modify: `app/interactive-sections.tsx`
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `TransformationVideo`, `ContactTrigger`, real files under `public/`
- Produces: six focused server components and final page narrative

- [ ] **Step 1: Write failing narrative assertions**

```js
assert.match(html, /Transformação real, explicada por dentro/);
assert.match(html, /Entregue em até 3 dias/);
assert.match(html, /6 meses de garantia/);
assert.match(html, /Consulte as condições da garantia na avaliação/);
assert.match(html, /Como funciona a reforma magnética\?/);
assert.match(html, /A reforma substitui orientação médica\?/);
assert.match(html, /Antes de comprar outro, descubra o que seu colchão ainda pode oferecer/);
```

- [ ] **Step 2: Verify failure**

Run `npm test`.

- [ ] **Step 3: Implement transformation proof**

Reuse `TransformationVideo`, `/results/transformacao-antes-depois.webp`, and existing Olinda case facts. Show one case at full scale with problem, work performed, deadline, and visible result. Do not create a new testimonial.

- [ ] **Step 4: Implement five-step process**

Use `<ol>` with exact steps: send photos, evaluation, recommendation/quote, approval, reform/delivery. Render numbers with the data font because sequence is meaningful.

- [ ] **Step 5: Implement warranty block**

Render three facts: `6 meses de garantia`, `Entrega em até 3 dias`, `Atendimento regional`. Include exact limitation: `Consulte as condições da garantia na avaliação.`

- [ ] **Step 6: Implement testimonials without auto-scroll dependency**

Use real assets for Levinaldo, Veronica, Eduardo, and Maria. Present a CSS horizontal snap list on small screens and a two-column grid on desktop. Each screenshot keeps its real alt text. No automatic movement.

- [ ] **Step 7: Implement FAQ and final CTA**

FAQ answers must state variable pricing, individual evaluation, non-medical positioning, six-month warranty, three-day delivery, and cities. Final CTA opens the existing contact dialog.

- [ ] **Step 8: Remove obsolete section implementations**

Delete only code moved from `app/page.tsx` or `app/interactive-sections.tsx`. Keep navigation, video controller, reduced-motion behavior, and any API still imported.

- [ ] **Step 9: Test and commit**

```powershell
npm test
npm run lint
git add components/sections app/page.tsx app/interactive-sections.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: rebuild magnetic renovation proof funnel"
```

---

### Task 5: Simplify WhatsApp Contact Funnel

**Files:**
- Modify: `components/ui/contact-flow.tsx`
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `emitSiteAnalytics(detail)`
- Produces: WhatsApp message containing name, mattress size, main problem, optional phone/city/time/details; emits no raw form values to analytics

- [ ] **Step 1: Write failing form assertions**

```js
assert.match(contactFlow, /Reforma magnética/);
assert.match(contactFlow, /Enviar fotos para avaliação/);
assert.match(contactFlow, /name="name"[\s\S]*required/);
assert.match(contactFlow, /name="size"[\s\S]*required/);
assert.match(contactFlow, /name="problem"[\s\S]*required/);
assert.doesNotMatch(contactFlow, /name="phone"[\s\S]{0,200}required/);
assert.doesNotMatch(contactFlow, /metadata:\s*\{[^}]*phone|metadata:\s*\{[^}]*name/);
```

- [ ] **Step 2: Verify failure**

Run `npm test`.

- [ ] **Step 3: Make only three fields required**

Require name, size, and problem. Keep phone, city, time, and details under the optional disclosure. If optional phone is filled, validate it before continuing.

- [ ] **Step 4: Update WhatsApp message**

Start with:

```ts
const lines = [
  "Olá, vim pelo site da WL e quero avaliar uma reforma magnética.",
  `Nome: ${name}`,
  `Tamanho: ${size}`,
  `Problema principal: ${problem}`,
];
```

Append optional values only when present. End with `Vou enviar as fotos do colchão nesta conversa.`

- [ ] **Step 5: Preserve dialog behavior**

Verify focus on open, Escape close, focus return, blocked-popup recovery, copy-message fallback, `aria-live`, and retry link.

- [ ] **Step 6: Test and commit**

```powershell
npm test
npm run lint
git add components/ui/contact-flow.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: simplify magnetic renovation WhatsApp funnel"
```

---

### Task 6: Harden Supabase Analytics Contract

**Files:**
- Create: `tests/analytics-contract.test.mjs`
- Modify: `components/ui/site-analytics.tsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: browser custom events shaped as `AnalyticsEventDetail`
- Produces: anonymous session/event REST rows only; event names from approved taxonomy

- [ ] **Step 1: Write privacy contract test**

Create `tests/analytics-contract.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../components/ui/site-analytics.tsx", import.meta.url), "utf8");

test("analytics remains anonymous and respects privacy signals", () => {
  assert.match(source, /navigator\.doNotTrack/);
  assert.match(source, /globalPrivacyControl/);
  assert.doesNotMatch(source, /phone_number|contact_name|free_text|message_content/);
  assert.doesNotMatch(source, /service_role/);
});

test("analytics exposes the approved conversion taxonomy", () => {
  for (const eventName of [
    "page_view",
    "section_view",
    "pain_signal_view",
    "magnetic_solution_view",
    "transformation_play",
    "proof_view",
    "guarantee_view",
    "cta_click",
    "contact_form_open",
    "contact_form_submit",
    "whatsapp_open",
    "whatsapp_retry",
  ]) {
    assert.match(source, new RegExp(eventName));
  }
});
```

- [ ] **Step 2: Add test script**

Change package test command to:

```json
"test": "npm run build && node --test tests/*.test.mjs"
```

- [ ] **Step 3: Run and verify failure**

Run `npm test`.

Expected: FAIL for taxonomy not yet present.

- [ ] **Step 4: Add event emission points**

Keep the existing generic custom-event interface. Add explicit event strings and emit them from section visibility or existing interactive actions. Metadata may contain only category, source, section, depth, timing, and boolean state.

- [ ] **Step 5: Verify live Supabase policy before schema work**

No schema migration is planned. Before changing any table or policy in a later task, fetch current Supabase changelog/docs, inspect RLS for `site_sessions_wl` and `site_events_wl`, and run Supabase advisors. If access is unavailable, leave schema unchanged and report the verification gap.

- [ ] **Step 6: Test and commit**

```powershell
npm test
npm run lint
git add tests/analytics-contract.test.mjs components/ui/site-analytics.tsx package.json
git commit -m "test: harden anonymous landing analytics"
```

---

### Task 7: Update SEO, Metadata, and Structured Data

**Files:**
- Modify: `lib/seo.ts`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `siteConfig`, confirmed service facts, existing `absoluteUrl()`
- Produces: local metadata and JSON-LD for magnetic mattress renovation without medical claims

- [ ] **Step 1: Write failing SEO assertions**

```js
assert.match(html, /<title>Reforma de Colchão Magnético em Recife \| WL Colchões<\/title>/i);
assert.match(html, /Reforma magnética de colchões/);
assert.match(html, /"warranty"|6 meses de garantia/);
assert.doesNotMatch(html, /cura|terapia magnética|tratamento de dor/i);
```

- [ ] **Step 2: Verify failure**

Run `npm test`.

- [ ] **Step 3: Update `siteConfig`**

Use:

```ts
title: "Reforma de Colchão Magnético em Recife | WL Colchões",
shortTitle: "Reforma Magnética | WL Colchões",
description: "Reforma magnética de colchões em Recife, Paulista, Olinda e Região Metropolitana, com avaliação pelo WhatsApp, entrega em até 3 dias e 6 meses de garantia.",
```

- [ ] **Step 4: Update JSON-LD**

Keep `LocalBusiness`, `HomeAndConstructionBusiness`, `Service`, `FAQPage`, and `BreadcrumbList`. Change service name/type/description to magnetic renovation, add delivery time and warranty as plain `additionalProperty` values, and keep existing provider/service area references.

- [ ] **Step 5: Test and commit**

```powershell
npm test
npm run lint
git add lib/seo.ts app/page.tsx app/layout.tsx tests/rendered-html.test.mjs
git commit -m "feat: update local SEO for magnetic mattress renovation"
```

---

### Task 8: Full Verification and Impeccable Finish Gate

**Files:**
- Modify only files required by verified failures
- Create generated review evidence under `.impeccable/review/` but do not commit it

**Interfaces:**
- Consumes: completed landing page, design spec, implementation plan
- Produces: passing build/tests/lint, desktop/mobile evidence, detector output, final review verdict

- [ ] **Step 1: Run automated checks**

```powershell
npm test
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 2: Start local server and test interactions**

Run `npm run dev`. Verify navigation, modal, validation, WhatsApp URL/message, video, testimonial scrolling, keyboard navigation, Escape behavior, and focus return.

- [ ] **Step 3: Capture required viewports**

Capture full-page screenshots at 1440 px and 390 px into:

```text
.impeccable/review/desktop.png
.impeccable/review/mobile.png
```

Settle entrance motion before capture and inspect both files for blank, clipped, or unloaded regions.

- [ ] **Step 4: Run Impeccable detector once**

```powershell
node C:\Users\Guilherme\.codex\skills\impeccable\scripts\detect.mjs --json app/page.tsx app/globals.css components/sections components/ui/contact-flow.tsx
```

Fix mechanical findings in one batch. Do not run detector a second time.

- [ ] **Step 5: Run final design review**

Review against:

- `PRODUCT.md`
- `docs/superpowers/specs/2026-08-29-wl-reforma-magnetica-design.md`
- approved visual: concrete/carbon/red “Estrutura magnética”
- `.impeccable/review/desktop.png`
- `.impeccable/review/mobile.png`

Required disposition: `ship` or one bounded `fix` batch followed by recapture and verdict.

- [ ] **Step 6: Final regression and commit**

```powershell
npm test
npm run lint
git add wl-colchoes-site/src
git diff --cached --check
git commit -m "feat: complete WL magnetic renovation landing page"
```

Do not add `.impeccable/review/`, `.superpowers/`, `dist/`, or other generated files.
