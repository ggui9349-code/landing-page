const facts = [
  {
    number: "06",
    unit: "meses",
    title: "6 meses de garantia",
    text: "Condições apresentadas na avaliação.",
  },
  {
    number: "03",
    unit: "dias",
    title: "Entrega em até 3 dias",
    text: "Após a reforma, conforme combinado.",
  },
  {
    number: "RMR",
    unit: "local",
    title: "Atendimento regional",
    text: "Recife, Paulista, Olinda e Região Metropolitana.",
  },
] as const;

export function Guarantee() {
  return (
    <section
      className="section guarantee"
      id="garantia"
      aria-labelledby="guarantee-title"
    >
      <div className="container guarantee__shell">
        <div className="guarantee__heading" data-reveal="up">
          <h2 id="guarantee-title">
            Antes de decidir, você sabe exatamente o que esperar.
          </h2>
          <p>
            Serviço indicado, orçamento, prazo e condições de garantia são
            explicados antes da sua aprovação.
          </p>
        </div>

        <dl className="guarantee__facts" data-reveal="right">
          {facts.map((fact) => (
            <div
              key={fact.title}
            >
              <dt>
                <span>{fact.number}</span>
                <small>{fact.unit}</small>
              </dt>
              <dd>
                <strong>{fact.title}</strong>
                <span>{fact.text}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
