import { teamMembers } from "@/app/team-members";
import TeamShowcase from "@/components/ui/team-showcase";

export function Authority() {
  return (
    <section
      className="section authority"
      id="equipe"
      aria-labelledby="authority-title"
    >
      <div className="container authority__layout">
        <div className="authority__copy" data-reveal="up">
          <p className="eyebrow">Experiência de fábrica</p>
          <h2 id="authority-title">
            Mais de 20 anos conhecendo colchões por dentro.
          </h2>
          <p>
            Washington conduz a avaliação técnica. Guilherme acompanha você
            da primeira conversa até a entrega.
          </p>
        </div>
        <div className="authority__team" data-reveal="image" data-reveal-delay="100">
          <TeamShowcase members={teamMembers} />
        </div>
      </div>
    </section>
  );
}
