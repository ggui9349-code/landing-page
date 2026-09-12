import { ContactTrigger } from "@/components/ui/contact-flow";

const nightMoments = [
  {
    moment: "Ao deitar",
    title: "O corpo procura apoio",
    text: "A posição que antes era confortável demora mais para aparecer.",
  },
  {
    moment: "Durante a noite",
    title: "Você muda de posição",
    text: "Um lado mais baixo, a espuma ou as molas podem interromper o conforto.",
  },
  {
    moment: "Ao acordar",
    title: "O descanso parece incompleto",
    text: "A noite termina, mas fica a sensação de que o colchão já não ajuda como antes.",
  },
] as const;

export function PainSignals() {
  return (
    <section
      className="section pain-signals"
      id="sinais"
      aria-labelledby="pain-signals-title"
    >
      <div className="container pain-signals__layout">
        <div className="pain-signals__intro" data-reveal="up">
          <h2 id="pain-signals-title">Uma noite desconfortável deixa pistas.</h2>
          <p className="pain-signals__bridge">
            Você pode não ver o desgaste de imediato. Mas sente quando deita,
            durante a noite e ao levantar.
          </p>
        </div>

        <ol
          className="pain-signals__night"
          aria-label="Como o desconforto aparece ao longo da noite"
        >
          {nightMoments.map((item, index) => (
            <li
              key={item.moment}
              data-reveal="up"
              data-reveal-delay={index * 80}
            >
              <p className="pain-signals__moment">{item.moment}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="pain-signals__next" data-reveal="up">
          <div>
            <h3>Antes de pensar em trocar, vale descobrir o motivo.</h3>
            <p>
              A WL avalia as fotos e explica o que precisa ser verificado. Se a
              reforma não fizer sentido, você sabe antes de gastar.
            </p>
          </div>
          <ContactTrigger
            className="button button-primary"
            source="pain-signals"
            ariaLabel="Enviar fotos para avaliação. Abre o formulário de avaliação"
          >
            Avaliar os sinais do meu colchão
          </ContactTrigger>
        </div>
      </div>
    </section>
  );
}
