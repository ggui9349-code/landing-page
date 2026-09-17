export const faqItems = [
  {
    question: "Todo colchão pode ser reformado?",
    answer:
      "Nem sempre. A WL avalia a estrutura, as espumas, as molas, o revestimento e o estado geral antes de indicar se a reforma é segura e faz sentido.",
  },
  {
    question: "Quanto custa reformar um colchão?",
    answer:
      "O valor depende do tamanho, do desgaste e dos materiais necessários. A WL apresenta o orçamento depois da avaliação e antes de qualquer serviço.",
  },
  {
    question: "Vale a pena reformar ou comprar outro?",
    answer:
      "Depende do estado real do colchão. Quando a estrutura permite recuperação, reformar pode fazer sentido; quando o desgaste é extenso, a troca pode ser mais indicada.",
  },
  {
    question: "É possível avaliar pelas fotos?",
    answer:
      "As fotos permitem uma avaliação inicial da condição visível. Se forem necessários mais detalhes, a WL explica quais informações faltam antes de recomendar o serviço.",
  },
  {
    question: "Reforma de colchão é apenas um remendo?",
    answer:
      "Não. A reforma pode envolver espuma, sustentação, molas, revestimento, tecido e acabamento. O serviço é definido conforme o que realmente precisa de intervenção.",
  },
  {
    question: "Vocês atendem Recife, Olinda e Paulista?",
    answer:
      "Sim. A WL atende Recife, Olinda, Paulista e outras cidades da Região Metropolitana do Recife, conforme disponibilidade para o endereço.",
  },
  {
    question: "Como o orçamento é definido?",
    answer:
      "O orçamento considera o tamanho, a condição do colchão, os materiais e os recursos necessários. Você recebe a explicação e o valor antes de aprovar.",
  },
  {
    question: "Vocês reformam colchão com espuma deformada?",
    answer:
      "A espuma deformada é um dos pontos avaliados. A WL verifica a extensão do desgaste e explica se é possível recuperar, substituir apenas uma camada ou se a troca é mais adequada.",
  },
] as const;

export function Faq() {
  return (
    <section
      className="section renovation-faq"
      id="duvidas"
      aria-labelledby="renovation-faq-title"
    >
      <div className="container renovation-faq__layout">
        <div className="renovation-faq__heading" data-reveal="left">
          <h2 id="renovation-faq-title">
            O que falta saber antes de enviar as fotos?
          </h2>
          <p>As respostas mais importantes antes da avaliação.</p>
        </div>

        <div className="renovation-faq__list" data-reveal="right">
          {faqItems.map((item) => (
            <details
              key={item.question}
            >
              <summary>
                <span>{item.question}</span>
                <span className="renovation-faq__plus" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
