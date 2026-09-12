import { TransformationVideo } from "@/app/interactive-sections";
import { ContactTrigger } from "@/components/ui/contact-flow";

export function TransformationProof() {
  return (
    <section
      className="section transformation-proof"
      id="resultados"
      aria-labelledby="transformation-proof-title"
    >
      <div className="container">
        <div className="transformation-proof__heading" data-reveal="up">
          <h2 id="transformation-proof-title">
            Quando o que perdeu função é recuperado, o resultado aparece por fora.
          </h2>
          <p>Veja uma reforma real realizada pela WL em Olinda.</p>
        </div>

        <div className="transformation-proof__layout">
          <div className="transformation-proof__media" data-reveal="image">
            <TransformationVideo />
          </div>

          <article
            className="transformation-proof__case"
            aria-labelledby="transformation-case-title"
            data-reveal="right"
            data-reveal-delay="100"
          >
            <p className="transformation-proof__location">Atendimento em Olinda</p>
            <h3 id="transformation-case-title">
              Recuperado sem uma troca desnecessária.
            </h3>
            <div className="transformation-proof__summary">
              <p>
                Um prego danificou a espuma e o revestimento antes da primeira
                noite de uso.
              </p>
              <p>
                A WL corrigiu o corte e refez o fechamento com costura.
              </p>
            </div>
            <p className="transformation-proof__note">
              O serviço muda de colchão para colchão. A avaliação vem primeiro.
            </p>
            <ContactTrigger
              className="button button-primary"
              source="transformation-proof"
              ariaLabel="Avaliar meu colchão pelo WhatsApp. Abre o formulário de avaliação"
            >
              Quero avaliar o meu
            </ContactTrigger>
          </article>
        </div>
      </div>
    </section>
  );
}
