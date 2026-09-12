export const faqItems = [
  {
    question: "Todo colchão magnético pode ser reformado?",
    answer:
      "Não. A WL avalia estrutura, tamanho, espumas e componentes antes de indicar a reforma.",
  },
  {
    question: "Como o orçamento é definido?",
    answer:
      "O valor depende do estado, tamanho, materiais e componentes necessários. Você recebe o orçamento antes de autorizar.",
  },
  {
    question: "Controle e massagem estão sempre incluídos?",
    answer:
      "Não. A WL revisa ou instala esses componentes somente quando necessário e depois da sua aprovação.",
  },
  {
    question: "Quais cidades são atendidas?",
    answer:
      "A WL atende Recife, Paulista, Olinda e outras localidades da Região Metropolitana.",
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
