# SEO, Indexação e Monitoramento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Melhorar descoberta orgânica, previews sociais e medição de conversões do site WL Colchões.

**Architecture:** Usar APIs nativas do Next.js para metadata, robots e sitemap. Centralizar copy SEO e dados estruturados em `lib/seo.ts`; manter Analytics opcional, ativado somente quando `NEXT_PUBLIC_GA_MEASUREMENT_ID` existir. Validar respostas renderizadas e eventos sem publicar dados comerciais inventados.

**Tech Stack:** Next.js App Router, TypeScript, React, Vitest/Node tests existentes, Vercel.

**Spec:** `docs/superpowers/specs/2026-09-12-seo-indexacao-monitoramento-design.md`

## Global Constraints

- Palavra-chave principal: **reforma de colchão**.
- Não inserir endereço, telefone, horário ou Measurement ID fictícios.
- `/robots.txt` deve apontar para `/sitemap.xml`.
- Sitemap deve conter somente URLs públicas e canônicas.
- Eventos de conversão não podem disparar em duplicidade.
- Build, lint e testes existentes devem passar.

---

### Task 1: Metadados globais e dados estruturados

**Files:**
- Modify: `app/layout.tsx`
- Modify: `lib/seo.ts`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces metadata global, canonical `https://wl-colchoes-site.vercel.app/`, Open Graph/Twitter e JSON-LD seguro.

- [ ] **Step 1: Write failing assertions** para title, description, canonical, `og:image`, locale e JSON-LD no HTML renderizado.
- [ ] **Step 2: Run** `npm test -- --runInBand` e confirmar falha somente nas novas expectativas.
- [ ] **Step 3: Implement** copy SEO com foco em “reforma de colchão”, `metadataBase`, `alternates.canonical`, `openGraph`, `twitter`, favicon e JSON-LD sem campos não confirmados.
- [ ] **Step 4: Run** `npm test -- --runInBand` e confirmar PASS.
- [ ] **Step 5: Commit** `git add app/layout.tsx lib/seo.ts tests/rendered-html.test.mjs; git commit -m "feat: add seo metadata and structured data"`.

### Task 2: Robots, sitemap e preview social

**Files:**
- Modify: `app/robots.ts`
- Modify: `app/sitemap.ts`
- Verify: `public/og.png`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces `/robots.txt` e `/sitemap.xml` com host canônico e rotas públicas.

- [ ] **Step 1: Add tests** que verificam sitemap URL, robots sitemap directive, exclusão de API e resposta da imagem OG.
- [ ] **Step 2: Run** testes e confirmar falha antes da implementação.
- [ ] **Step 3: Implement** `MetadataRoute.Robots` e `MetadataRoute.Sitemap` usando host canônico e datas estáveis; manter `public/og.png` como preview.
- [ ] **Step 4: Run** testes, lint e build: `npm test -- --runInBand`; `npm run lint`; `npm run build`.
- [ ] **Step 5: Commit** `git add app/robots.ts app/sitemap.ts public/og.png tests/rendered-html.test.mjs; git commit -m "feat: configure crawl files and social preview"`.

### Task 3: Copy SEO de serviço

**Files:**
- Modify: `app/page.tsx`
- Modify: componentes de seção onde copy principal aparece, somente quando necessário.
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces H1, introdução, headings e alt text coerentes com “reforma de colchão” e serviços secundários.

- [ ] **Step 1: Add tests** para H1, menções naturais a reforma/restauração/troca de espuma e ausência de keyword stuffing.
- [ ] **Step 2: Run** testes para confirmar falha.
- [ ] **Step 3: Update** copy mantendo proposta visual e CTAs atuais; não inventar cidade, preço, prazo ou certificação.
- [ ] **Step 4: Run** testes, lint e build.
- [ ] **Step 5: Commit** `git add app/page.tsx components tests/rendered-html.test.mjs; git commit -m "feat: target mattress renovation search intent"`.

### Task 4: Analytics e eventos de conversão

**Files:**
- Modify: `components/ui/site-analytics.tsx`
- Modify: `app/layout.tsx`
- Modify: componentes que renderizam WhatsApp, telefone e formulário, somente para adicionar atributos/event handlers consistentes.
- Test: `tests/contact-flow-message.test.mjs`

**Interfaces:**
- Consumes `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Produces eventos `generate_lead`, `contact_whatsapp`, `click_to_call` e `form_start` sem duplicidade.

- [ ] **Step 1: Add tests** para ausência de script sem Measurement ID e nomes estáveis dos eventos.
- [ ] **Step 2: Run** testes e confirmar falha.
- [ ] **Step 3: Implement** carregamento condicional do GA4 e helper de evento com guard contra execução no servidor.
- [ ] **Step 4: Run** testes, lint e build.
- [ ] **Step 5: Commit** `git add app/layout.tsx components/ui/site-analytics.tsx components tests; git commit -m "feat: track seo conversion events"`.

### Task 5: Validação de deploy e Search Console

**Files:**
- Modify: `.env.example` if present; otherwise create `.env.example` with `NEXT_PUBLIC_GA_MEASUREMENT_ID=`.
- Create: `docs/seo-search-console.md`

- [ ] **Step 1: Document** verificação Search Console por DNS/meta tag, envio de `https://wl-colchoes-site.vercel.app/sitemap.xml` e solicitação de indexação.
- [ ] **Step 2: Document** configuração do GA4 e eventos.
- [ ] **Step 3: Run** `npm run lint`, `npm run build` e testes completos.
- [ ] **Step 4: Verify after deploy** `/robots.txt`, `/sitemap.xml`, metadata social e Rich Results Test.
- [ ] **Step 5: Commit** `git add .env.example docs/seo-search-console.md; git commit -m "docs: add search console setup"`.

## Self-review

- Spec coverage: metadata, preview, robots, sitemap, keywords, structured data, Search Console, Analytics, conversion events and acceptance checks covered by Tasks 1–5.
- Placeholder scan: no TODO/TBD steps; user-provided business details remain explicit dependencies.
- Type consistency: Next.js metadata route types and GA4 Measurement ID contract remain isolated in their owning files.
