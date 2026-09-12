/* eslint-disable @next/next/no-img-element */

import { Authority } from "@/components/sections/authority";
import { Faq, faqItems } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Guarantee } from "@/components/sections/guarantee";
import { HeroMagnetic } from "@/components/sections/hero-magnetic";
import { MagneticLayers } from "@/components/sections/magnetic-layers";
import { Process } from "@/components/sections/process";
import { RecoveryTurn } from "@/components/sections/recovery-turn";
import { SleepSignals } from "@/components/sections/sleep-signals";
import { Testimonials } from "@/components/sections/testimonials";
import { TransformationProof } from "@/components/sections/transformation-proof";
import {
  ContactFlowProvider,
  ContactTrigger,
} from "@/components/ui/contact-flow";
import { ScrollRevealManager } from "@/components/ui/scroll-reveal-manager";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { MobileNavigation, SiteNavigation } from "./interactive-sections";

const directWhatsappHref = `https://wa.me/${siteConfig.whatsappDigits}?text=${encodeURIComponent(
  "Olá, vim pelo site da WL. Gostaria de enviar fotos do meu colchão para receber uma avaliação inicial.",
)}`;

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
        absoluteUrl("/images/colchao-magnetico-camadas-v3.png"),
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
        "Avaliação inicial por fotos, orientação técnica e reforma de colchões conforme o estado da estrutura, espumas, suporte e acabamento.",
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
      mainEntity: faqItems.map((faq) => ({
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
      <ScrollRevealManager />
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
        <HeroMagnetic />

        <Authority />

        <SleepSignals />

        <RecoveryTurn />

        <MagneticLayers />

        <TransformationProof />

        <Testimonials />

        <Process />

        <Guarantee />

        <Faq />

        <FinalCta />
      </main>

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
            <a href="#como-funciona">Como funciona</a>
            <a href="#resultados">Resultados</a>
            <a href="#equipe">Quem somos</a>
            <a href="#garantia">Garantia</a>
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
