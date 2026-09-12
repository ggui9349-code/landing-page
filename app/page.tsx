/* eslint-disable @next/next/no-img-element */

import {
  ContactFlowProvider,
  ContactTrigger,
} from "@/components/ui/contact-flow";
import { SiteAnalyticsTracker } from "@/components/ui/site-analytics";
import { ScrollRevealManager } from "@/components/ui/scroll-reveal-manager";
import TeamShowcase from "@/components/ui/team-showcase";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import {
  LuCloud,
  LuScanLine,
  LuShieldCheck,
  LuWaves,
} from "react-icons/lu";
import {
  DifferentialsGrid,
  HistoryPillars,
  MobileNavigation,
  ResultCarousel,
  SiteNavigation,
  TransformationVideo,
  type Differential,
} from "./interactive-sections";
import { teamMembers } from "./team-members";

const milestones = [
  {
    kicker: "Sustentação",
    title: "Colchão afundando",
    text: "Uma parte ficou mais baixa ou já não sustenta o corpo como antes.",
  },
  {
    kicker: "Conforto",
    title: "Perda de firmeza",
    text: "O colchão está mais mole, irregular ou diferente de quando foi comprado.",
  },
  {
    kicker: "Superfície",
    title: "Espuma deformada",
    text: "A superfície apresenta marcas, ondulações ou desníveis que não voltam ao normal.",
  },
  {
    kicker: "Estrutura",
    title: "Molas desconfortáveis",
    text: "Você sente pressão, escuta ruídos ou percebe irregularidades ao se deitar.",
  },
  {
    kicker: "Acabamento",
    title: "Tecido desgastado",
    text: "O revestimento está rasgado, manchado ou com o acabamento comprometido.",
  },
];

const pillars = [
  {
    number: "20+",
    title: "Conhecimento construído na fabricação",
    text: "Washington trabalhou por mais de duas décadas fabricando colchões e conhecendo de perto estruturas, espumas, molas e acabamentos.",
  },
  {
    number: "2020",
    title: "Nasce a WL",
    text: "Toda essa experiência ganhou um novo propósito: ajudar famílias a recuperar colchões que ainda podem oferecer conforto.",
  },
  {
    number: "Hoje",
    title: "Conhecimento técnico perto de você",
    text: "A WL atende Paulista, Olinda, Recife e Região Metropolitana, analisando cada colchão conforme seu estado e a necessidade de quem vai usá-lo.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Olhar técnico",
    text: "Entendemos onde está o desgaste e o que pode ser recuperado.",
  },
  {
    number: "02",
    title: "Conforto que faz sentido",
    text: "Avaliamos estrutura, espuma, molas e firmeza conforme a necessidade de cada colchão.",
  },
  {
    number: "03",
    title: "Acabamento bem-feito",
    text: "Cuidamos do revestimento, das costuras e dos detalhes necessários para completar a renovação.",
  },
];

const technicalLayers = [
  {
    id: "cover",
    icon: <LuScanLine />,
    title: "Revestimento",
    text: "Contribui para o conforto e protege as camadas internas.",
  },
  {
    id: "foam",
    icon: <LuCloud />,
    title: "Espuma",
    text: "Participa do conforto e da sustentação do colchão.",
  },
  {
    id: "protection",
    icon: <LuShieldCheck />,
    title: "Camada de proteção",
    text: "Distribui o peso e protege a estrutura interna.",
  },
  {
    id: "springs",
    icon: <LuWaves />,
    title: "Molas e estrutura",
    text: "Dão suporte e estabilidade ao colchão.",
  },
] as const;

const proofImages = [
  {
    src: "/proof/avaliacao-levinaldo.webp",
    alt: "Cliente avalia a reforma do colchão com cinco estrelas no WhatsApp",
    label: "Levinaldo",
    result: "5 estrelas",
    width: 510,
    height: 290,
  },
  {
    src: "/proof/avaliacao-veronica.webp",
    alt: "Cliente responde com cinco estrelas sobre o resultado da reforma",
    label: "Veronica",
    result: "5 estrelas",
    width: 510,
    height: 258,
  },
  {
    src: "/proof/avaliacao-eduardo.webp",
    alt: "Cliente dá nota cinco ao serviço de reforma de colchão",
    label: "Eduardo",
    result: "Nota 5",
    width: 510,
    height: 276,
  },
  {
    src: "/proof/avaliacao-maria.png",
    alt: "Maria relata que dormiu muito bem e avalia o colchão como nota dez",
    label: "Maria",
    result: "Nota dez",
    width: 1163,
    height: 204,
    variant: "chat-snippets" as const,
  },
];

const journey = [
  [
    "01",
    "Envie as fotos e conte o problema",
    "Mostre o colchão inteiro, as laterais e o ponto que está incomodando.",
  ],
  [
    "02",
    "A gente avalia",
    "Analisamos as informações e explicamos o que pode estar acontecendo.",
  ],
  [
    "03",
    "Você conhece a recomendação",
    "Você entende o serviço indicado, os materiais necessários e o investimento antes de confirmar.",
  ],
  [
    "04",
    "A reforma é realizada",
    "Depois da sua aprovação, fazemos o serviço de acordo com tudo o que foi combinado.",
  ],
];

const differentials: Differential[] = [
  {
    icon: "layers",
    title: "Materiais para cada caso",
    text: "Espumas, tecidos e outros materiais são definidos conforme a necessidade do colchão.",
  },
  {
    icon: "messages",
    title: "Contato direto",
    text: "Você conversa com a equipe pelo WhatsApp desde a avaliação inicial.",
  },
  {
    icon: "shield",
    title: "Sua aprovação vem primeiro",
    text: "Nada começa antes que o serviço e o orçamento sejam explicados e aprovados por você.",
  },
];

const directWhatsappHref = `https://wa.me/${siteConfig.whatsappDigits}?text=${encodeURIComponent(
  "Olá, vim pelo site da WL. Gostaria de enviar fotos do meu colchão para receber uma avaliação inicial.",
)}`;

const faqs = [
  {
    question: "Todo colchão pode ser reformado?",
    answer:
      "Não. Primeiro precisamos analisar o estado da estrutura e dos materiais. Em alguns casos, a reforma faz sentido; em outros, trocar pode ser a melhor escolha.",
  },
  {
    question: "Reformar colchão é só um remendo?",
    answer:
      "Não. Primeiro avaliamos a causa do problema, o estado da estrutura e o que realmente vale a pena fazer. Quando a reforma não é indicada, isso também é explicado com clareza.",
  },
  {
    question: "É possível avaliar apenas pelas fotos?",
    answer:
      "As fotos ajudam bastante na avaliação inicial. Dependendo do problema, pode ser necessária uma análise mais detalhada.",
  },
  {
    question: "Quanto custa reformar um colchão?",
    answer:
      "O investimento depende do tamanho, do estado da estrutura, dos materiais necessários e do acabamento. Por isso, o orçamento é informado depois da avaliação.",
  },
  {
    question: "Quais cidades vocês atendem?",
    answer:
      "Atendemos Paulista, Olinda, Recife e outras localidades da Região Metropolitana. Consulte a disponibilidade para o seu endereço.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": absoluteUrl("/#negocio"),
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/images/wl-logo.png"),
      image: [
        absoluteUrl(siteConfig.ogImage.path),
        absoluteUrl("/images/colchao-camadas-v2.webp"),
        absoluteUrl("/results/transformacao-antes-depois.webp"),
      ],
      telephone: siteConfig.whatsappPhone,
      priceRange: "Sob avaliação",
      description: siteConfig.description,
      areaServed: siteConfig.areaServed.map((name) => ({
        "@type": name.includes("Região") ? "AdministrativeArea" : "City",
        name,
      })),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.whatsappPhone,
        contactType: "Atendimento pelo WhatsApp",
        availableLanguage: "pt-BR",
      },
    },
    {
      "@type": "Service",
      "@id": absoluteUrl("/#servico-reforma-colchoes"),
      name: "Reforma profissional de colchões",
      serviceType: "Reforma e renovação interna de colchões",
      url: absoluteUrl("/"),
      description:
        "Avaliação inicial por fotos, orientação técnica e reforma de colchões conforme o estado da estrutura, espumas, molas e acabamento.",
      provider: {
        "@id": absoluteUrl("/#negocio"),
      },
      areaServed: siteConfig.areaServed.map((name) => ({
        "@type": name.includes("Região") ? "AdministrativeArea" : "City",
        name,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": absoluteUrl("/#faq"),
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": absoluteUrl("/#breadcrumb"),
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: absoluteUrl("/"),
        },
      ],
    },
  ],
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ContactButton({
  children,
  className = "button button-primary",
  source,
}: {
  children: React.ReactNode;
  className?: string;
  source: string;
}) {
  return (
    <ContactTrigger
      className={className}
      source={source}
      ariaLabel={`${children}. Abre o formulário de avaliação`}
    >
      {children}
    </ContactTrigger>
  );
}

export default function Home() {
  return (
    <ContactFlowProvider whatsappPhone="558187514699">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <div className="header-shell">
          <a className="brand" href="#inicio" aria-label="WL Colchões, início">
            <span className="brand-logo">
              <img
                src="/images/wl-logo.png"
                alt=""
                width="121"
                height="74"
              />
            </span>
          </a>

          <div className="header-navigation">
            <nav className="desktop-nav" aria-label="Navegação principal">
              <SiteNavigation />
            </nav>
            <MobileNavigation />
          </div>

          <ContactButton className="header-button" source="cabecalho">
            Avaliar meu colchão
          </ContactButton>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero section-atmosphere" id="inicio">
          <div className="container hero-inner">
            <h1>
              <span className="hero-title-full">
                Seu colchão afundou, deformou ou começou a incomodar?{" "}
                <strong>Descubra se ele ainda tem solução.</strong>
              </span>
              <span className="hero-title-mobile">
                Seu colchão incomoda?{" "}
                <strong>Descubra se ainda tem solução.</strong>
              </span>
            </h1>
            <p className="hero-lede">
              Antes de comprar outro, envie algumas fotos pelo WhatsApp. A WL
              analisa o problema e explica, com clareza, o que pode ser
              recuperado.
            </p>
            <div className="hero-actions">
              <ContactButton
                className="button button-primary button-hero"
                source="hero"
              >
                Enviar fotos para avaliação
              </ContactButton>
              <a
                className="button button-secondary button-hero"
                href="#resultados"
                data-cta-source="hero-resultados"
              >
                <span>Ver resultados</span>
                <Arrow />
              </a>
            </div>
            <p className="hero-note">
              <strong>
                Avaliação inicial pelo WhatsApp. Você entende as possibilidades
                antes de decidir.
              </strong>
              <span>
                Atendimento em Paulista, Olinda, Recife e Região Metropolitana.
              </span>
            </p>
          </div>
        </section>

        <section className="trust-strip" aria-label="Compromissos da WL">
          <ul className="container trust-strip-list">
            <li data-reveal="up">
              <strong>Avaliação antes da decisão</strong>
              <span>Você entende o seu caso primeiro.</span>
            </li>
            <li data-reveal="up" data-reveal-delay="60">
              <strong>Washington: 20+ anos de fábrica</strong>
              <span>
                Conhecimento construído por dentro da fabricação de colchões.
              </span>
            </li>
            <li data-reveal="up" data-reveal-delay="120">
              <strong>Atendimento perto de você</strong>
              <span>Paulista, Olinda, Recife e Região Metropolitana.</span>
            </li>
          </ul>
        </section>

        <section className="section intro-section" id="sinais">
          <div className="container narrow">
            <div className="center-heading" data-reveal="up">
              <h2>Quando o colchão muda, o corpo costuma perceber primeiro.</h2>
              <p>
                Talvez ele esteja mais baixo de um lado, tenha perdido a firmeza
                ou simplesmente não ofereça mais o mesmo conforto. Isso não
                significa, necessariamente, que você precise trocar tudo.
              </p>
            </div>

            <ul className="symptoms-list">
              {milestones.map((item, index) => (
                <li
                  key={item.title}
                  data-reveal="up"
                  data-reveal-delay={index * 55}
                >
                  <div className="symptom-meta">
                    <span aria-hidden="true" />
                    <p>{item.kicker}</p>
                  </div>
                  <div className="symptom-copy">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="section-cta" data-reveal="up">
              <h3>Reconheceu algum desses sinais?</h3>
              <p>
                Conte o que está incomodando e envie algumas fotos para uma
                avaliação inicial.
              </p>
              <ContactButton source="problemas-avaliados">
                Avaliar meu colchão pelo WhatsApp
              </ContactButton>
            </div>
          </div>
        </section>

        <section className="section pillars-section" id="historia">
          <div className="container">
            <div
              className="center-heading compact-heading"
              data-reveal="up"
            >
              <p className="eyebrow">Nossa história</p>
              <h2>Washington conhece colchões por dentro, literalmente.</h2>
              <p>
                Mais de 20 anos de experiência na fabricação deram origem a um
                serviço próximo, cuidadoso e transparente.
              </p>
            </div>

            <HistoryPillars items={pillars} />

            <p className="section-statement" data-reveal="up">
              Aqui, a reforma não começa pela venda. Começa pela escuta e pela
              avaliação.
            </p>
          </div>
        </section>

        <section className="method-section" id="metodo">
          <div className="container">
            <div className="method-heading" data-reveal="up">
              <p className="method-kicker">
                <span aria-hidden="true" />
                Método WL
              </p>
              <h2>Três cuidados fazem toda a diferença.</h2>
            </div>

            <ol className="method-grid">
              {processSteps.map((step, index) => (
                <li
                  key={step.number}
                  data-reveal="up"
                  data-reveal-delay={index * 45}
                >
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>

          </div>
        </section>

        <section
          className="section story-section"
          id="avaliacao-tecnica"
          aria-labelledby="titulo-avaliacao-interna"
        >
          <div className="container">
            <div className="technical-layout">
              <div className="technical-copy" data-reveal="left">
                <p className="eyebrow">Avaliação técnica</p>
                <h2 id="titulo-avaliacao-interna">
                  É por dentro que a gente encontra a causa.
                </h2>
                <p>
                  Revestimento, espuma, camada de proteção, molas e estrutura
                  mostram de onde vem o desconforto. A WL avalia cada camada e
                  explica o que realmente precisa ser feito.
                </p>
                <ContactButton source="avaliacao-tecnica">
                  Enviar fotos para avaliação
                </ContactButton>
                <span className="technical-note">
                  Você recebe uma orientação antes de decidir.
                </span>
              </div>
              <div
                className="technical-visual"
                data-reveal="right"
                data-reveal-delay="100"
              >
                <img
                  className="technical-image"
                  src="/images/colchao-camadas-v2.webp"
                  alt="Estrutura interna de colchão com revestimento, espuma, proteção e molas"
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
                <ul className="technical-layer-list" aria-label="Camadas avaliadas">
                  {technicalLayers.map((layer) => (
                    <li className={`technical-layer layer-${layer.id}`} key={layer.id}>
                      <span className="technical-layer-icon" aria-hidden="true">
                        {layer.icon}
                      </span>
                      <span>
                        <strong>{layer.title}</strong>
                        <small>{layer.text}</small>
                      </span>
                      <i className="technical-layer-line" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section journey-section" id="como-funciona">
          <div className="container">
            <div
              className="center-heading compact-heading"
              data-reveal="up"
            >
              <p className="eyebrow">Como funciona</p>
              <h2>Da primeira mensagem à reforma. Sem complicação.</h2>
            </div>

            <ol className="journey-list">
              {journey.map(([number, title, text], index) => (
                <li
                  key={number}
                  data-reveal="up"
                  data-reveal-delay={index * 45}
                >
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>

          </div>
        </section>

        <section className="section team-section" id="equipe">
          <div className="container">
            <div className="team-heading" data-reveal="up">
              <h2>As pessoas por trás de cada atendimento.</h2>
              <p>
                Washington cuida da parte técnica. Guilherme acompanha cada
                cliente desde a primeira conversa até a conclusão do serviço.
              </p>
            </div>

            <div data-reveal="image" data-reveal-delay="100">
              <TeamShowcase members={teamMembers} />
            </div>
          </div>
        </section>

        <section
          className="section transformation-section"
          id="resultados"
          aria-labelledby="titulo-transformacao"
        >
          <div className="container">
            <div
              className="center-heading transformation-heading"
              data-reveal="up"
            >
              <p className="eyebrow">Resultado real</p>
              <h2 id="titulo-transformacao">Veja a transformação de perto.</h2>
              <p>
                Do problema inicial ao acabamento final, acompanhe um caso real
                de reforma realizado pela WL.
              </p>
            </div>

            <div className="transformation-layout">
              <div data-reveal="image">
                <TransformationVideo />
              </div>

              <article
                className="transformation-story"
                data-reveal="right"
                data-reveal-delay="100"
              >
                <p className="transformation-case">
                  Reforma de colchão <span>Atendimento WL em Olinda</span>
                </p>

                <dl>
                  <div>
                    <dt>O problema</dt>
                    <dd>
                      Um prego danificou o colchão recém-comprado, antes mesmo
                      da primeira noite de uso.
                    </dd>
                  </div>
                  <div>
                    <dt>O que foi feito</dt>
                    <dd>
                      Corrigimos o corte desigual da espuma, alinhamos as
                      camadas e refizemos o fechamento com costura.
                    </dd>
                  </div>
                  <div>
                    <dt>O resultado</dt>
                    <dd>
                      O colchão foi recuperado sem troca desnecessária, com o
                      acabamento restabelecido.
                    </dd>
                  </div>
                </dl>

                <blockquote>
                  Cada colchão apresenta condições diferentes. Por isso, o
                  serviço começa com uma avaliação individual.
                </blockquote>

                <ContactButton source="video-resultado">
                  Avaliar meu colchão pelo WhatsApp
                </ContactButton>
              </article>
            </div>
          </div>
        </section>

        <section className="section proof-section" id="depoimentos">
          <div className="container">
            <div className="split-heading" data-reveal="up">
              <div>
                <h2>Quem já reformou conta como foi.</h2>
              </div>
              <p>
                Avaliações reais recebidas depois do serviço, apresentadas como
                chegaram pelo WhatsApp.
              </p>
            </div>

            <ResultCarousel items={proofImages} />
          </div>
        </section>

        <section
          className="section value-section"
          aria-labelledby="titulo-comparacao"
        >
          <div className="container">
            <div className="center-heading compact-heading" data-reveal="up">
              <h2 id="titulo-comparacao">
                Trocar ou reformar? Primeiro, entenda o seu caso.
              </h2>
              <p>
                O orçamento depende do que precisa ser recuperado em cada
                colchão, não de uma tabela genérica.
              </p>
            </div>

            <div className="value-observation" data-reveal="up">
              <h3>O que determina o orçamento</h3>
              <ul>
                <li>Tamanho do colchão</li>
                <li>Estado da estrutura</li>
                <li>Condições das molas e espumas</li>
                <li>Materiais necessários</li>
                <li>Tipo de acabamento</li>
              </ul>
              <ContactButton source="comparacao">
                Avaliar meu caso
              </ContactButton>
            </div>
          </div>
        </section>

        <section
          className="section service-area-section"
          id="area-atendimento"
        >
          <div className="container area-card" data-reveal="image">
            <div>
              <p className="eyebrow eyebrow-light">Atendimento local</p>
              <h2>Experiência técnica perto de você.</h2>
              <p>
                Reforma de colchões em Paulista, Olinda, Recife e outras cidades
                da Região Metropolitana. Consulte a disponibilidade para o seu
                endereço.
              </p>
              <ContactButton
                className="button button-white"
                source="area-atendimento"
              >
                Consultar minha região
              </ContactButton>
            </div>
            <div className="area-orbit" aria-hidden="true">
              <span className="area-orbit-ring" />
              <span className="area-center">
                <span className="area-center-logo">
                  <img
                    src="/images/wl-logo.png"
                    alt=""
                    width="121"
                    height="74"
                  />
                </span>
              </span>
              <span className="city city-one">Paulista</span>
              <span className="city city-two">Olinda</span>
              <span className="city city-three">Recife</span>
              <span className="city city-four">Região Metropolitana</span>
            </div>
          </div>
        </section>

        <section className="section differentials-section" id="diferenciais">
          <div className="container">
            <div
              className="center-heading compact-heading"
              data-reveal="up"
            >
              <h2>Clareza em cada etapa do serviço.</h2>
              <p>
                Experiência de fábrica, materiais definidos para cada caso e
                contato direto com a equipe.
              </p>
            </div>

            <DifferentialsGrid items={differentials} />
          </div>
        </section>

        <section className="section faq-section" id="duvidas">
          <div className="container faq-layout">
            <div className="faq-heading" data-reveal="left">
              <p className="eyebrow">Perguntas frequentes</p>
              <h2>Ainda ficou com alguma dúvida?</h2>
              <p>
                Veja as respostas mais comuns ou fale diretamente com a equipe.
              </p>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  data-reveal="up"
                  data-reveal-delay={index * 45}
                >
                  <summary>
                    <span>{faq.question}</span>
                    <span className="faq-plus" aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-section">
          <div className="container final-card" data-reveal="image">
            <p className="eyebrow eyebrow-light">Avaliação personalizada</p>
            <h2>
              Antes de comprar outro colchão, descubra se o seu{" "}
              <span>ainda pode ser recuperado.</span>
            </h2>
            <p>
              Envie algumas fotos, conte o que está incomodando e receba uma
              orientação inicial pelo WhatsApp.
            </p>
            <div className="final-actions">
              <ContactButton
                className="button button-neon button-large"
                source="cta-final"
              >
                Avaliar meu colchão pelo WhatsApp
              </ContactButton>
              <a
                className="button button-outline-light"
                href="#resultados"
                data-cta-source="cta-final-resultados"
              >
                <span>Ver resultados</span>
                <Arrow />
              </a>
            </div>
            <p className="final-area">
              Atendimento em Paulista, Olinda, Recife e Região Metropolitana.
            </p>
          </div>
        </section>
      </main>

      <ScrollRevealManager />
      <SiteAnalyticsTracker />

      <footer className="site-footer">
        <div className="container footer-top">
          <a
            className="brand brand-footer"
            href="#inicio"
            aria-label="WL Colchões, voltar ao início"
          >
            <span className="brand-logo">
              <img
                src="/images/wl-logo.png"
                alt=""
                width="121"
                height="74"
              />
            </span>
          </a>
          <p>
            Reforma de colchões com experiência técnica, atendimento próximo e
            orientação transparente.
          </p>
          <nav aria-label="Links do rodapé">
            <a href={directWhatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href="#historia">Nossa história</a>
            <a href="#metodo">Método WL</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#resultados">Resultados</a>
            <a href="#area-atendimento">Área de atendimento</a>
            <a href="#duvidas">Dúvidas</a>
            <a href="/politica-de-privacidade">Política de Privacidade</a>
          </nav>
        </div>
        <div className="container footer-bottom">
          <span>Conforto recuperado com experiência.</span>
          <span>© 2026 WL Colchões</span>
        </div>
      </footer>

      <ContactTrigger
        className="floating-whatsapp"
        source="flutuante"
        ariaLabel="Iniciar avaliação do colchão"
        showArrow={false}
      >
        <svg aria-hidden="true" viewBox="0 0 32 32">
          <path
            fill="currentColor"
            d="M16 3a12.5 12.5 0 0 0-10.8 18.8L3.6 28.5l6.9-1.8A12.5 12.5 0 1 0 16 3Zm0 2.5a10 10 0 0 1 8.6 15.1A10 10 0 0 1 11 24.1l-.5-.3-3.4.9.9-3.3-.3-.5A10 10 0 0 1 16 5.5Zm-3.1 4.8c-.3 0-.6.1-.8.4-.3.3-1.1 1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.6 2.7 1 3.2.8 3.8.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.4-.3-.7-.4l-2.2-1c-.3-.1-.6-.2-.8.2l-1 1.3c-.2.2-.4.3-.7.1-1-.4-1.8-1-2.6-1.7-.7-.6-1.3-1.4-1.8-2.2-.2-.3 0-.5.1-.7l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.8-.5h-.4Z"
          />
        </svg>
        <span className="floating-whatsapp-label">Avaliar meu colchão</span>
      </ContactTrigger>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </ContactFlowProvider>
  );
}
