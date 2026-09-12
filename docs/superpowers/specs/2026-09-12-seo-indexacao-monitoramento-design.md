# WL Colchões — SEO, indexação e monitoramento

## Objetivo

Melhorar descoberta orgânica, aparência dos links compartilhados e medição de resultados do site `https://wl-colchoes-site.vercel.app`.

## Escopo

### SEO técnico

- Consolidar metadados em `app/layout.tsx`.
- Definir título, descrição, idioma `pt-BR`, URL canônica, favicon e metadados Open Graph/Twitter.
- Usar `public/og.png` como imagem de preview. Validar dimensões e legibilidade em formatos de compartilhamento.
- Revisar `app/robots.ts` para permitir rastreamento e informar sitemap.
- Revisar `app/sitemap.ts` para publicar URLs canônicas públicas.
- Manter páginas privadas, APIs e rotas internas fora do sitemap.

### Conteúdo e palavras-chave

Palavra-chave principal: **reforma de colchão**.

Grupos secundários:

- reformar colchão; restauração de colchão; conserto de colchão;
- troca de espuma de colchão; troca de tecido de colchão; colchão reformado;
- reforma de colchão magnético; colchão magnético; colchão terapêutico;
- colchão sob medida; fabricação de colchão sob medida;
- revitalização de colchão; reforma de colchão em domicílio; preço de reforma de colchão.

O conteúdo deve usar a palavra-chave principal em título, descrição, H1, introdução, CTA e textos alternativos relevantes, sem repetição artificial. Variações com cidade/região entram apenas após confirmar área de atendimento.

### Dados estruturados

Adicionar JSON-LD compatível com informações reais do negócio. Prioridade: `LocalBusiness` e `Service`; incluir endereço, telefone, horário e área de atendimento somente quando confirmados.

### Indexação e monitoramento

- Preparar site para Google Search Console.
- Enviar sitemap e solicitar indexação da página inicial após deploy.
- Preparar Google Analytics 4, caso exista Measurement ID; não inserir ID fictício.
- Medir cliques em WhatsApp, telefone, formulário e orçamento.
- Documentar verificação por DNS ou meta tag.

## Critérios de aceite

- Cada rota pública entrega title, description, canonical e preview social válidos.
- `/robots.txt` responde e aponta para `/sitemap.xml`.
- `/sitemap.xml` responde com URLs públicas e canônicas.
- Preview social usa imagem correta e texto legível.
- Dados estruturados passam validação sem campos inventados.
- Eventos de conversão não disparam em duplicidade.
- Build, lint e testes existentes passam.
- Search Console fica pronto para verificação; conclusão da verificação depende de acesso do proprietário à conta Google/DNS.

## Dependências e decisões pendentes

- Confirmar cidade/região de atendimento para SEO local.
- Confirmar Measurement ID do GA4, se já existir.
- Confirmar dados oficiais de contato, endereço e horários antes de publicar JSON-LD local.
- Considerar domínio próprio como canonical comercial, se disponível.

## Fora do escopo

- Garantia de posição ou prazo de indexação no Google.
- Criação de backlinks, anúncios pagos ou Perfil da Empresa no Google.
- Publicação de informações comerciais não fornecidas pelo proprietário.
