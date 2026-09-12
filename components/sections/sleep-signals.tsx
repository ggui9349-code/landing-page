const signals = [
  "Demora para encontrar uma posição confortável",
  "Acorda com sensação de pouco descanso",
  "Percebe afundamento ou diferença de firmeza",
] as const;

export function SleepSignals() {
  return (
    <section
      className="section sleep-signals"
      id="sinais"
      aria-labelledby="sleep-signals-title"
    >
      <div className="container sleep-signals__layout">
        <div data-reveal="up">
          <p className="eyebrow">O que muda primeiro</p>
          <h2 id="sleep-signals-title">
            O desconforto aparece antes de o desgaste ficar visível.
          </h2>
        </div>
        <ol className="sleep-signals__list" data-reveal="right">
          {signals.map((signal, index) => (
            <li key={signal}>
              <span aria-hidden="true">0{index + 1}</span>
              <p>{signal}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
