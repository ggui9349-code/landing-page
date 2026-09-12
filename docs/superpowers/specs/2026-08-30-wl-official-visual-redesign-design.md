# WL Colchões — Redesign Visual Oficial Adaptado

## Objetivo

Substituir a identidade editorial preta, vermelha e creme da landing page de reforma magnética por uma identidade coerente com o site oficial da WL Colchões. A mudança é visual: a narrativa, as provas, o fluxo de avaliação pelo WhatsApp e as informações comerciais já aprovadas permanecem.

## Decisão aprovada

Direção escolhida: **WL oficial adaptada**.

- A página continua focada em reforma de colchão magnético.
- A linguagem visual passa a usar a família visual do site oficial, sem copiar literalmente a composição de cada seção.
- O vermelho deixa de fazer parte da interface.
- Branco e cinza muito claro dominam a página; azul WL marca ações e frases-chave; azul-marinho aparece em uma passagem estratégica e no fechamento.
- A tipografia fica mais pesada e direta, especialmente nos títulos.

## Contrato de direção (code-led)

- **Seed key:** `0923e4ca`.
- **FORM:** interface editorial limpa e técnica, com hierarquia pesada em Inter, superfícies claras e planas, divisores finos, controles em pílula e uma única passagem azul-marinho de maior contraste.
- **Hero desktop:** título de alto impacto com a segunda frase em azul, CTA azul, fatos comerciais e cobertura geográfica visíveis no primeiro viewport, acompanhados por um diagrama abstrato de tensão magnética.
- **Hero mobile:** mantém mensagem, fatos, CTA e cobertura; o diagrama é omitido para preservar leitura e espaço útil.
- **Material:** branco, cinza-claro, azul WL, azul-marinho e neutros aprovados; sem vermelho, verde de marca externa ou creme amarelado.
- **Sequência:** listas não ordenadas usam divisores e títulos, sem numeração decorativa. Numeração fica restrita a processos realmente sequenciais e camadas técnicas ordenadas.

## Verdades do produto que não podem mudar

- Marca: WL Colchões.
- Serviço: reforma de colchão magnético, com ímãs e controle quando indicados após avaliação.
- Benefício comunicado: recuperar sustentação e conforto; nunca prometer cura, tratamento médico ou melhora garantida de dor nas costas.
- Preço: não há preço fixo; depende da avaliação do colchão.
- Prazo: entrega em até 3 dias após a reforma.
- Garantia: 6 meses, com condições explicadas durante a avaliação.
- Atendimento: Recife, Paulista, Olinda e Região Metropolitana.
- Contato: WhatsApp 55 81 8751-4699.
- Frase de confiança permitida: “pode ter certeza que o colchão volta melhor que novo”, apresentada como posicionamento comercial, sem transformar isso em promessa médica.

## Sistema visual

### Paleta

- `--blue: #125fd6` — CTAs, links ativos e trechos de destaque.
- `--blue-dark: #10233f` — seção tecnológica, rodapé e texto em superfícies claras quando necessário.
- `--blue-soft: #eaf2ff` — superfícies informativas e estados leves.
- `--off-white: #f7f8fa` — alternância de seções.
- `--ink: #171a20` — títulos e texto principal.
- `--graphite: #4d5562` — texto secundário.
- `--line: #e4e7ec` — divisores e bordas.
- `--white: #ffffff` — superfície principal.

Não usar vermelho, creme amarelado, sombras duras, gradiente em texto ou halos coloridos.

### Tipografia

- Fonte principal: **Inter**, pesos 400, 500, 600, 700 e 800.
- Fonte auxiliar: **Manrope**, pesos 600 e 700, restrita a labels, pequenos dados e microtexto quando ajudar a hierarquia.
- Títulos: Inter 800/700, entre `-0.035em` e `-0.02em` de tracking, largura máxima de leitura controlada.
- Corpo: Inter 400/500, entre 16 e 20 px conforme contexto, linha de 1.55–1.7.
- Botões: Inter 700, sentence case.

### Forma e profundidade

- Cards e painéis com raio entre 12 e 16 px.
- Botões podem ser pílulas porque são controles compactos.
- Divisores cinza claros substituem contornos pesados.
- Sombras, quando necessárias, têm deslocamento e blur suaves; nenhuma sombra de bloco.
- O azul é reservado para ação e ênfase, evitando colorir todos os elementos.

## Composição

### Primeiro viewport

O hero deve comunicar em poucos segundos:

1. o problema reconhecível — colchão afundado, deformado ou desconfortável;
2. a alternativa — avaliar se ainda pode ser reformado;
3. a ação — enviar fotos pelo WhatsApp;
4. a cobertura — Recife, Paulista, Olinda e Região Metropolitana.

O título usa Inter ExtraBold com uma frase-chave em azul. A imagem das camadas do colchão permanece como prova visual do serviço, integrada em uma composição branca, clara e robusta. O CTA primário é azul WL; o secundário é branco com contorno discreto.

### Ritmo da página

- Hero branco e luminoso.
- Sinais do problema em branco/cinza-claro, com listas e divisores em vez de cartões repetitivos.
- Avaliação e orçamento em superfície azul-claro.
- Camadas magnéticas em azul-marinho para criar o único grande contraste da página.
- História, equipe, caso real, processo, garantia, avaliações e FAQ alternam branco e cinza-claro.
- CTA final e rodapé usam azul-marinho com ação azul/whatsapp claramente visível.

## Componentes e comportamento

- O cabeçalho fixo, a navegação desktop/mobile e o botão de avaliação permanecem funcionais.
- Todos os gatilhos continuam abrindo o formulário de avaliação já existente.
- O diálogo mantém validação, foco, fechamento por Escape, retorno de foco e fallback de cópia/WhatsApp.
- O botão flutuante continua disponível, mas adota a nova paleta.
- Os recursos visuais existentes (`wl-logo.png`, `colchao-camadas-v2.webp`, provas, equipe e vídeos) permanecem.
- Animação: um sistema discreto de revelação já existente, respeitando `prefers-reduced-motion`; sem animações decorativas espalhadas.

## Responsividade e acessibilidade

- Validar larguras de 1440 px, 1273 px e 390 px.
- Nenhum texto, botão ou imagem pode causar overflow horizontal.
- Texto normal deve manter contraste mínimo de 4.5:1 e texto grande 3:1.
- Foco visível usa azul WL com offset claro.
- Campos, placeholders, mensagens de erro, seleção de texto e scrollbar recebem o novo sistema visual.
- O conteúdo principal continua acessível por skip link e landmarks semânticos.

## Verificação

- Teste de contrato do HTML deve confirmar Inter/Manrope, os novos tokens e a ausência dos tokens vermelhos/creme antigos.
- Testes do fluxo de contato continuam verdes.
- Lint e build devem passar, desconsiderando apenas o teste de analytics já adiado e não relacionado a este redesign.
- Capturas desktop, mobile e da largura vista pelo usuário devem ser revisadas antes do deploy.
- Após a revisão, publicar na Vercel e verificar a URL pública.

## Fora de escopo

- Supabase, banco de dados e exportação de analytics.
- Mudança do número de WhatsApp.
- Alteração de preço, prazo, cidades ou garantia.
- Inclusão de alegações médicas.
