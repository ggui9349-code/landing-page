import Image from "next/image";

import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface TeamShowcaseProps {
  members: TeamMember[];
  className?: string;
}

export default function TeamShowcase({
  members,
  className,
}: TeamShowcaseProps) {
  if (members.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-[760px] grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 sm:gap-x-7 md:gap-x-10",
        className,
      )}
      aria-label="Integrantes da equipe WL"
    >
      {members.map((member) => (
        <article className="min-w-0 text-center" key={member.id}>
            <div className="team-portrait relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#c8cbd0]">
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                fill
                unoptimized
                sizes="(max-width: 640px) calc(100vw - 48px), 360px"
                className="team-portrait-image object-cover object-[center_20%]"
              />
              <span className="team-portrait-wash" aria-hidden="true" />
            </div>

            <h3 className="mt-4 text-[17px] leading-tight font-semibold tracking-[-0.025em] text-[#10233f] sm:text-[19px]">
              {member.name}
            </h3>
            <p className="mx-auto mt-1 max-w-[28ch] text-[11px] leading-snug font-medium text-[#596474] sm:text-[13px]">
              {member.role}
            </p>
            <p className="mx-auto mt-3 max-w-[34ch] text-[12px] leading-relaxed text-[#4d5562] sm:text-[14px]">
              {member.description}
            </p>
        </article>
      ))}
    </div>
  );
}
