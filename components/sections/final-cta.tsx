import { ContactTrigger } from "@/components/ui/contact-flow";

export function FinalCta() {
  return (
    <section
      className="section final-cta"
      aria-labelledby="final-cta-title"
    >
      <div className="container final-cta__shell" data-reveal="image">
        <h2 id="final-cta-title">
          Seu colchão pode voltar melhor que novo. A avaliação mostra se vale a
          pena reformar.
        </h2>
        <p>
          Comece pelas fotos. Você não precisa autorizar nada antes de entender
          o serviço e o orçamento.
        </p>
        <ContactTrigger
          className="button button-white button-large"
          source="final-cta"
          ariaLabel="Solicitar avaliação pelo WhatsApp. Abre o formulário de avaliação"
        >
          Enviar fotos e pedir avaliação
        </ContactTrigger>
        <small>Recife · Paulista · Olinda · Região Metropolitana</small>
      </div>
    </section>
  );
}
