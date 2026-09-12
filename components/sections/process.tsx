import { ContactTrigger } from "@/components/ui/contact-flow";

const steps = [
  {
    number: "01",
    title: "Mostre o que mudou",
    text: "Mostre o colchão e conte o que mudou no conforto.",
  },
  {
    number: "02",
    title: "Entenda a recomendação",
    text: "A WL explica o serviço indicado e apresenta o orçamento.",
  },
  {
    number: "03",
    title: "Aprove e receba",
    text: "Com a sua aprovação, a reforma é feita e entregue em até 3 dias.",
  },
] as const;

export function Process() {
  return (
    <section
      className="section renovation-process"
      id="como-funciona"
      aria-labelledby="renovation-process-title"
    >
      <div className="container">
        <div className="renovation-process__heading" data-reveal="up">
          <h2 id="renovation-process-title">
            Para chegar nesse resultado, tudo começa com algumas fotos.
          </h2>
          <p>Você entende o serviço e o orçamento antes de decidir.</p>
        </div>

        <ol className="renovation-process__path" data-reveal="up">
          {steps.map((step) => (
            <li
              key={step.number}
            >
              <span className="renovation-process__marker" aria-hidden="true">
                <span>{step.number}</span>
              </span>
              <div className="renovation-process__step-copy">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <ContactTrigger
          className="button button-primary renovation-process__cta"
          source="process"
          ariaLabel="Começar pela avaliação. Abre o formulário de avaliação"
        >
          Enviar fotos para avaliação
        </ContactTrigger>
      </div>
    </section>
  );
}
