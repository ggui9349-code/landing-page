---
name: "WL Colchões"
description: "Oficina clara e confiável para avaliar e reformar colchões."
colors:
  primary: "#125fd6"
  primary-hover: "#0f54c2"
  primary-dark: "#10233f"
  primary-soft: "#eaf2ff"
  neutral-bg: "#ffffff"
  neutral-subtle: "#f7f8fa"
  neutral-ink: "#171a20"
  neutral-graphite: "#4d5562"
  neutral-line: "#e4e7ec"
  neutral-material: "#aab4c2"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(3.2rem, 6.1vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.97
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(36px, 5vw, 64px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "25px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.035em"
rounded:
  xs: "8px"
  sm: "10px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  compact: "8px"
  control: "16px"
  content-gutter: "24px"
  content-gutter-mobile: "16px"
  section: "clamp(88px, 11vw, 152px)"
  section-mobile: "84px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.pill}"
    padding: "0 25px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.pill}"
    padding: "0 25px"
    height: "54px"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.72)"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.pill}"
    padding: "0 25px"
    height: "54px"
  input:
    backgroundColor: "rgba(255, 255, 255, 0.88)"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "52px"
  card:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.lg}"
    padding: "34px 28px"
  navigation-shell:
    backgroundColor: "rgba(255, 255, 255, 0.9)"
    textColor: "{colors.neutral-graphite}"
    rounded: "{rounded.pill}"
    padding: "8px 10px 8px 24px"
    height: "64px"
---

# Design System: WL Colchões

## Overview

**Creative North Star: "Oficina Clara"**

“Oficina Clara” traduz conhecimento de fabricação em uma interface que deixa estrutura, processo e decisão visíveis. A estética é técnica, próxima, robusta e transparente: tipografia pesada organiza a conversa, superfícies luminosas dão espaço à prova real e o azul WL conduz ações sem transformar a página em propaganda ruidosa.

O sistema funciona como uma bancada bem organizada. Branco e cinza muito claro dominam; linhas finas separam o que precisa ser comparado; azul-marinho concentra a única grande passagem de contraste; sombras aparecem apenas quando uma superfície realmente precisa se destacar ou responder ao uso. Componentes são confiantes e contidos, com controles em pílula e painéis de cantos suavemente estruturados.

**Key Characteristics:**

- Clareza técnica antes de persuasão.
- Hierarquia tipográfica forte, direta e legível.
- Azul reservado para ação, orientação e fatos-chave.
- Superfícies planas com elevação pontual e funcional.
- Provas, etapas e limitações apresentadas sem ornamento excessivo.

## Colors

A paleta combina o Azul WL com um azul-marinho estrutural e neutros frios de oficina, mantendo a página luminosa e objetiva.

### Primary

- **Azul WL** (#125fd6): conduz CTAs, links ativos, marcadores, foco e trechos curtos de ênfase.
- **Azul Profundo de Oficina** (#10233f): cria o plano tecnológico de alto contraste, o fechamento da página e texto estrutural sobre superfícies claras.
- **Azul de Pressão** (#0f54c2): aparece somente no hover de ações primárias para confirmar interação.
- **Névoa Azul** (#eaf2ff): sustenta avisos honestos, faixas informativas e estados leves sem competir com a ação.

### Neutral

- **Branco de Bancada** (#ffffff): superfície principal, cartões, controles e respiro visual.
- **Branco Técnico** (#f7f8fa): alternância suave entre seções e fundos de apoio.
- **Tinta Estrutural** (#171a20): títulos e texto principal de máxima legibilidade.
- **Grafite de Instrução** (#4d5562): explicações, legendas e texto secundário.
- **Linha de Precisão** (#e4e7ec): divisores e bordas discretas.
- **Cinza de Material** (#aab4c2): contornos mais presentes e texto secundário sobre azul-marinho.

### Named Rules

**The Blue with Purpose Rule.** Azul é sinal de ação, orientação ou evidência; nunca é preenchimento decorativo indiscriminado.

**The Cool Workshop Rule.** Preserve a família fria de azul, branco e grafite; vermelho, creme amarelado, verde de marca externa e halos coloridos não pertencem a este sistema.

## Typography

**Display Font:** Inter (com Arial e sans-serif como fallback)

**Body Font:** Inter (com Arial e sans-serif como fallback)
**Label/Mono Font:** Manrope (com Arial e sans-serif como fallback)

**Character:** Inter traz a firmeza direta dos títulos e a clareza cotidiana do corpo. Manrope é uma voz auxiliar para fatos, números, localização e microtexto técnico; ela informa, mas não assume a hierarquia principal.

### Hierarchy

- **Display** (800, `clamp(3.2rem, 6.1vw, 5.25rem)`, 0.97): manchetes do primeiro viewport, curtas e de alto impacto.
- **Headline** (800, `clamp(36px, 5vw, 64px)`, 1.04): títulos de seção com largura de leitura controlada.
- **Title** (800, 25px, 1.2): títulos de cartões, casos e agrupamentos técnicos.
- **Body** (400/500, 16–20px, 1.55–1.7): explicações em blocos de até cerca de 68 caracteres por linha quando a composição permitir.
- **Label** (600/700, 10–13px, até 0.1em): fatos, números, localidade, metadados e microtexto; caixa alta fica restrita a rótulos técnicos curtos.
- **Button** (700/800, 13–16px, sentence case): ações diretas, sem tracking expansivo nem caixa alta promocional.

### Named Rules

**The Heavy, Not Loud Rule.** A autoridade vem do peso, da escala e da redação direta; não use gradiente em texto, contorno decorativo ou excesso de caixa alta para fabricar impacto.

**The Two-Voice Rule.** Inter conduz toda a conversa; Manrope aparece apenas onde o conteúdo se comporta como dado, legenda ou instrução curta.

## Layout

O conteúdo usa um contêiner central de até 1200px, com respiro lateral de 24px no desktop e 16px no mobile. Seções respiram amplamente (`clamp(88px, 11vw, 152px)`); em telas de até 680px, o ritmo se estabiliza em 84px. A composição alterna grades assimétricas para explicação e prova, listas divididas para comparações e grades regulares apenas quando os itens têm peso equivalente.

O hero usa proporção aproximada de 58/42 entre mensagem e diagrama no desktop. Em até 760px, o diagrama magnético é removido para preservar o primeiro viewport. Grades complexas colapsam entre 860px e 980px; listas sequenciais passam de cinco para duas e depois uma coluna. Em telas pequenas, provas em série podem virar trilhos horizontais com `scroll-snap`, enquanto CTAs críticos ocupam toda a largura útil.

**The Structural Order Rule.** Numeração é reservada a processos e camadas realmente ordenadas; coleções não sequenciais usam títulos, divisores e proximidade.

**The Mobile Evidence Rule.** No mobile, preserve mensagem, fatos, CTA e prova; retire apenas o elemento visual que não carrega informação necessária.

## Elevation & Depth

O sistema é plano por padrão e usa uma combinação contida de camadas tonais, bordas finas e sombras ambientais. A profundidade estrutural vem primeiro de branco, branco técnico, névoa azul e azul-marinho; sombras surgem em cabeçalho flutuante, botões de ação, mídia técnica, estados de hover e diálogo modal. Não existem sombras duras de bloco.

### Shadow Vocabulary

- **Cabeçalho suspenso** (`0 6px 8px rgba(20, 20, 20, 0.06)`): separação mínima para a navegação fixa sobre o conteúdo.
- **Ação azul** (`0 14px 32px rgba(18, 95, 214, 0.24)`): reforço de prioridade para CTAs primários.
- **Superfície elevada** (`0 8px 8px rgba(20, 20, 20, 0.12)`): mídia, painel móvel e cartões somente quando precisam se desprender do plano.
- **Diálogo modal** (`0 36px 110px rgba(20, 20, 20, 0.42)`): isolamento forte reservado ao fluxo de avaliação.

### Named Rules

**The Flat-by-Default Rule.** Superfícies repousam planas; borda, tom e espaçamento resolvem a hierarquia antes de qualquer sombra.

**The One Deep Passage Rule.** Azul-marinho cria uma única passagem tecnológica dominante e retorna no fechamento, evitando uma página fragmentada por blocos escuros repetidos.

## Shapes

Painéis e cartões usam cantos suavemente estruturados entre 12px e 16px. Campos usam raio de 10px; links de navegação compactos, 8px; controles de abrir, fechar e expandir podem ser circulares. Botões e chips são pílulas (`999px`) porque representam ações ou estados compactos, não contêineres de conteúdo.

Bordas são finas e frias. Fotos e vídeos respeitam o raio de 16px quando se comportam como objetos independentes; listas editoriais preservam arestas retas e divisores para manter o caráter técnico.

**The Container-versus-Control Rule.** Pílulas pertencem a controles; conteúdo, prova e explicação usam retângulos de 10–16px ou apenas divisores.

## Components

### Buttons

Botões parecem firmes, diretos e fáceis de acionar.

- **Shape:** pílula integral (`999px`) com altura de 54–60px e padding horizontal de 25–30px.
- **Primary:** Azul WL com texto branco e sombra azul ambiental; é a ação principal de avaliação.
- **Hover / Focus:** escurece para Azul de Pressão, sobe 2–3px e preserva foco visível de 3px em Azul WL com offset de 4px.
- **Secondary:** branco translúcido, texto Tinta Estrutural e borda Cinza de Material; no hover, a borda muda para Azul WL.
- **White:** fundo branco e texto escuro para ações sobre azul-marinho.

### Chips

Chips são informativos, não decorativos.

- **Style:** pílulas brancas compactas com texto Grafite de Instrução e padding de 9px por 14px.
- **State:** não recebem seleção chamativa; agrupamento, proximidade e conteúdo já comunicam a relação.

### Cards / Containers

Cartões se comportam como módulos de uma bancada organizada.

- **Corner Style:** raio de 16px em painéis; alguns cartões de evidência permanecem retos para valorizar o conteúdo documental.
- **Background:** Branco de Bancada sobre fundos brancos, técnicos ou azul suave.
- **Shadow Strategy:** planos em repouso; sombra curta apenas em hover ou quando o módulo flutua sobre imagem.
- **Border:** Linha de Precisão, com Cinza de Material quando a separação precisa ser mais firme.
- **Internal Padding:** 28–48px conforme a densidade e o tamanho do módulo.

### Inputs / Fields

Campos são utilitários, claros e sem decoração competitiva.

- **Style:** superfície branca quase opaca, borda fria de 1px, raio de 10px, altura mínima de 52px e padding horizontal de 16px.
- **Focus:** borda Azul WL e foco visível externo de 3px; o halo interno azul de 12% é usado apenas quando o outline global não está ativo.
- **Error / Disabled:** mensagens permanecem no eixo azul-marinho/grafite; ações desabilitadas reduzem opacidade e não se movem.

### Navigation

O cabeçalho fixo usa uma concha branca translúcida em pílula, borda fina, blur de fundo e sombra curta. Links têm 13px/600, ficam grafite em repouso e recebem texto escuro mais uma linha azul curta no estado ativo. Em até 980px, a navegação vira um gatilho circular e um painel branco compacto; Escape fecha o painel e devolve o foco.

### FAQ Disclosure

Cada pergunta é uma linha de pelo menos 88px, separada por divisores. O controle circular de 30px gira 45 graus quando aberto; a resposta mantém largura de leitura de até 68ch e recuo suficiente para não competir com o sinal de expansão.

### Contact Dialog

O diálogo é a superfície mais elevada do sistema: painel branco de 16px, backdrop escuro com blur e largura máxima de 640px. Ele preserva foco inicial, fechamento por Escape, retorno de foco e estados de envio; os campos se organizam em três colunas no desktop e uma coluna no mobile.

## Do's and Don'ts

### Do:

- Do use Azul WL only for action, focus, orientation and concise emphasis.
- Do let real photos, videos, customer captures and concrete service facts carry trust.
- Do use wide spacing, thin dividers and controlled line lengths to make technical information easy to scan.
- Do preserve visible keyboard focus and honor `prefers-reduced-motion` in every interactive pattern.
- Do keep service limitations and evaluation-dependent facts visually close to the claim they qualify.

### Don't:

- Don't introduce red, yellowed cream, external-brand green, text gradients or colored halos.
- Don't number unordered benefits, symptoms, testimonials or differentiators.
- Don't turn every section into a rounded card grid or every surface into a pill.
- Don't use hard block shadows, decorative motion or repeated dark sections to manufacture depth.
- Don't imply medical treatment, cure or guaranteed relief through copy, icons or visual hierarchy.
