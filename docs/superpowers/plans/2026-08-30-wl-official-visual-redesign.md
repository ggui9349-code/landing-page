# WL Colchões Official Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar a identidade oficial azul/branca da WL à landing page de reforma magnética e entregá-la responsiva, testada e pronta para publicação na Vercel.

**Architecture:** Manter a estrutura React e o fluxo de contato existentes, substituindo o sistema de fontes e tokens no layout e na folha global. Um teste de contrato renderizado protege os elementos visuais essenciais e os fatos comerciais enquanto a revisão por screenshots valida a composição real.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, Node test runner, Vinext/Vite, Vercel.

**Spec:** `docs/superpowers/specs/2026-08-30-wl-official-visual-redesign-design.md`

## Global Constraints

- Usar Inter 400–800 e Manrope 600–700 via `next/font/google`.
- Usar `#125fd6`, `#10233f`, `#eaf2ff`, `#f7f8fa`, `#171a20`, `#4d5562`, `#e4e7ec` e `#ffffff`.
- Remover vermelho e creme da identidade visual.
- Preservar conteúdo, imagens, navegação, diálogo e fluxo de WhatsApp.
- Não adicionar alegações médicas, preço fixo ou cidades não aprovadas.
- Não incluir `package.json` nem `tests/analytics-contract.test.mjs` nos commits do redesign.

---

### Task 1: Proteger o contrato visual oficial

**Files:**
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: HTML renderizado pela rota `/`.
- Produces: asserções para as variáveis Inter/Manrope, tokens oficiais e ausência do sistema antigo.

- [ ] Escrever asserções que esperam `--font-inter`, `--font-manrope`, `--blue: #125fd6`, `--blue-dark: #10233f` e que rejeitam `--tension-red` e `--font-archivo-black`.
- [ ] Rodar `node --test tests/rendered-html.test.mjs` e confirmar falha pelos tokens/fontes ainda ausentes.
- [ ] Manter esse teste como contrato para as Tasks 2 e 3.

### Task 2: Trocar fontes e tokens fundamentais

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/design-tokens.css`

**Interfaces:**
- Consumes: fontes Google carregadas pelo Next.
- Produces: `--font-inter`, `--font-manrope` e tokens oficiais consumidos por `globals.css`.

- [ ] Substituir Archivo Black, Atkinson Hyperlegible e IBM Plex Mono por Inter e Manrope nos pesos definidos pela especificação.
- [ ] Atualizar `themeColor` para `#10233f`.
- [ ] Definir todos os tokens da paleta oficial, fontes, largura de conteúdo e easing no `design-tokens.css`.
- [ ] Rodar o teste de contrato e confirmar que a parte de fontes/tokens passa.
- [ ] Commitar somente layout, tokens e teste com `git commit -m "style: adopt official WL visual tokens"`.

### Task 3: Reestilizar a landing page completa

**Files:**
- Modify: `app/globals.css`
- Modify only if markup is required: `app/page.tsx`
- Modify only if markup is required: `components/sections/*.tsx`
- Modify only if markup is required: `components/ui/contact-flow.tsx`

**Interfaces:**
- Consumes: tokens oficiais da Task 2 e classes já presentes nos componentes.
- Produces: hero, seções, formulário, navegação e rodapé na nova identidade sem alterar o fluxo.

- [ ] Substituir superfícies, tipografia, botões, divisores, sombras, estados de foco, seleção e scrollbar pelo sistema aprovado.
- [ ] Tornar o hero claro, forte e alinhado ao site oficial, com destaque azul e imagem do colchão preservada.
- [ ] Usar uma única passagem azul-marinho importante para a tecnologia/camadas e outra no fechamento, mantendo o restante claro.
- [ ] Remover sombras duras, bordas laterais grossas e estilos editoriais vermelhos.
- [ ] Ajustar breakpoints para 1440, 1273 e 390 px sem overflow.
- [ ] Rodar `node --test tests/rendered-html.test.mjs tests/contact-flow-message.test.mjs` e confirmar PASS.
- [ ] Rodar `npm run lint` e confirmar PASS.
- [ ] Commitar somente arquivos do redesign com `git commit -m "style: redesign magnetic landing in WL identity"`.

### Task 4: Verificação visual e acabamento

**Files:**
- Create: `.impeccable/review/desktop.png`
- Create: `.impeccable/review/user-1273.png`
- Create: `.impeccable/review/mobile.png`
- Create or replace: `DESIGN.md`

**Interfaces:**
- Consumes: servidor local e direção visual aprovada.
- Produces: evidência visual validada e documentação do sistema construído.

- [ ] Iniciar ou reutilizar o servidor local e capturar a página do topo em 1440 px, 1273 px e 390 px.
- [ ] Abrir cada captura e confirmar carregamento, conteúdo completo e ausência de overflow.
- [ ] Corrigir em um único lote todos os problemas materiais encontrados e recapturar uma vez.
- [ ] Rodar uma única vez `node C:\Users\Guilherme\.codex\skills\impeccable\scripts\detect.mjs --json app/layout.tsx app/design-tokens.css app/globals.css app/page.tsx components/sections components/ui/contact-flow.tsx` e corrigir achados mecânicos.
- [ ] Documentar o sistema final em `DESIGN.md`.

### Task 5: Build, publicação e smoke test

**Files:**
- Modify only if deployment requires: `.vercel/*` local metadata (não versionar segredos).

**Interfaces:**
- Consumes: build aprovado e credenciais Vercel já disponíveis na máquina.
- Produces: URL pública da landing page.

- [ ] Rodar os testes renderizados e de contato, `npm run lint` e o build de produção disponível no projeto.
- [ ] Publicar o diretório `wl-colchoes-site/src` na Vercel como produção.
- [ ] Abrir a URL pública e verificar status 200, CSS, logo, imagem das camadas e abertura do fluxo de contato.
- [ ] Entregar ao usuário o link público final.

