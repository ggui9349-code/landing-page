import { ContactTrigger } from "@/components/ui/contact-flow";

export function HeroMagnetic() {
  return (
    <section className="magnetic-hero" id="inicio" aria-labelledby="hero-title">
      <div className="magnetic-hero__copy">
        <h1 id="hero-title">
          Seu colchão magnético perdeu o conforto?{" "}
          <span>A WL reforma para você voltar a dormir bem.</span>
        </h1>
        <p>
          Recuperamos sustentação, espuma, revestimento, ímãs e controle.
          Seu colchão pode voltar melhor que novo.
        </p>
        <ul className="magnetic-hero__facts" aria-label="Informações principais">
          <li>Reforma magnética</li>
          <li>6 meses de garantia</li>
          <li>Entrega em até 3 dias</li>
        </ul>
        <ContactTrigger
          className="magnetic-hero__cta"
          source="hero-magnetic"
          ariaLabel="Enviar fotos para avaliação. Abre o formulário de avaliação"
        >
          Enviar fotos para avaliação
        </ContactTrigger>
        <p className="magnetic-hero__service-area">
          Recife · Paulista · Olinda · Região Metropolitana
        </p>
      </div>
      <div className="magnetic-mattress-stage" aria-hidden="true">
        {/* Static asset avoids Vinext's unavailable development image binding. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="magnetic-mattress"
          src="/images/magnetic-mattress-hero.png"
          alt=""
          width={1280}
          height={1280}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
