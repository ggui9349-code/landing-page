import { ContactTrigger } from "@/components/ui/contact-flow";

export function RecoveryTurn() {
  return (
    <section
      className="section recovery-turn"
      id="possibilidade"
      aria-labelledby="recovery-turn-title"
    >
      <div className="container recovery-turn__shell">
        <p data-reveal="up">
          Virar o colchão, trocar travesseiros ou evitar um lado da cama pode
          aliviar por algum tempo. Mas não recupera a sustentação perdida.
        </p>
        <div data-reveal="up" data-reveal-delay="80">
          <h2 id="recovery-turn-title">
            Sentir essa diferença não significa que você precisa comprar outro.
          </h2>
          <ContactTrigger
            className="button button-light"
            source="recovery-turn"
            ariaLabel="Descobrir se meu colchão pode ser recuperado. Abre o formulário de avaliação"
          >
            Descobrir se o meu pode ser recuperado
          </ContactTrigger>
        </div>
      </div>
    </section>
  );
}
