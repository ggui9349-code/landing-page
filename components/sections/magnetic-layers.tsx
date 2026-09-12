import Image from "next/image";

const recoveryAreas = [
  {
    title: "Sustentação recuperada",
    text: "Base e espumas são revisadas para recuperar um apoio mais uniforme.",
  },
  {
    title: "Conforto renovado",
    text: "A camada de conforto é definida conforme o estado do seu colchão.",
  },
  {
    title: "Acabamento refeito",
    text: "Revestimento e fechamento são refeitos para proteger a estrutura.",
  },
  {
    title: "Tecnologia magnética",
    text: "Ímãs, controle e massagem entram quando a avaliação indicar.",
  },
] as const;

export function MagneticLayers() {
  return (
    <section
      className="section magnetic-layers"
      id="camadas-magneticas"
      aria-labelledby="magnetic-layers-title"
    >
      <div className="container">
        <div className="magnetic-layers__heading" data-reveal="up">
          <p className="eyebrow">O que a avaliação revela</p>
          <h2 id="magnetic-layers-title">
            Se a estrutura permite, a reforma recupera o colchão por camadas.
          </h2>
          <p>
            A WL identifica o que perdeu função e define somente o que precisa
            ser recuperado.
          </p>
        </div>

        <div className="mattress-blueprint">
          <figure className="mattress-blueprint__figure" data-reveal="image">
            <Image
              src="/images/colchao-magnetico-camadas-v3.png"
              alt="Ilustração de colchão magnético aberto com espuma perfilada, pastilhas, camadas de sustentação e componentes opcionais"
              width="1536"
              height="1024"
              loading="lazy"
              unoptimized
            />
            <figcaption>
              Composição ilustrativa. Materiais e componentes são confirmados
              na avaliação de cada colchão.
            </figcaption>
          </figure>

          <div className="mattress-blueprint__content" data-reveal="right">
            <dl
              className="mattress-blueprint__notes"
              aria-label="Camadas possíveis da reforma magnética"
            >
              {recoveryAreas.map((area) => (
                <div key={area.title}>
                  <dt>{area.title}</dt>
                  <dd>{area.text}</dd>
                </div>
              ))}
            </dl>

            <article className="magnetic-option">
              <Image
                src="/images/controle-ativita-relax.png"
                alt="Controle Ativita Relax, componente opcional da reforma magnética"
                width="316"
                height="1200"
                loading="lazy"
                unoptimized
              />
              <div>
                <p className="eyebrow">Quando necessário</p>
                <h3>Controle e massagem entram quando fazem sentido para o projeto.</h3>
                <p>
                  A WL verifica o sistema existente e explica a revisão ou a
                  instalação antes de você aprovar.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
