import { Skill, SkillCategory } from "@/types";
import { SkillsInteractive } from "./SkillsInteractive";
import { TechnologyMarquee } from "./TechnologyMarquee";
import { Reveal } from "./Reveal";

interface SkillsSectionProps {
  categories: SkillCategory[];
  skills: Skill[];
}

const LEVEL_GUIDE_ITEMS = [
  { code: "01", name: "Beginner" },
  { code: "02", name: "Elementary" },
  { code: "03", name: "Intermediate" },
  { code: "04", name: "Advanced" },
  { code: "05", name: "Expert" },
];

export function SkillsSection({ categories, skills }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  // Group published skills by category (server-side)
  const grouped: Record<string, Skill[]> = {};
  const uncategorized: Skill[] = [];

  skills.forEach((skill) => {
    if (skill.category_id) {
      if (!grouped[skill.category_id]) grouped[skill.category_id] = [];
      grouped[skill.category_id].push(skill);
    } else {
      uncategorized.push(skill);
    }
  });

  const displayCategories = [
    ...categories.filter((c) => grouped[c.id]?.length > 0),
    ...(uncategorized.length > 0 ? [{ id: "uncategorized", name: "Other" } as SkillCategory] : []),
  ];

  return (
    <section id="capabilities" className="w-full bg-[#f7f7f5] scroll-mt-14 sm:scroll-mt-16">
      {/* ── Top Marquee (left → right) ───────────────────────────────── */}
      <TechnologyMarquee direction="left" durationMs={40000} />

      {/* ── CAPABILITIES Content ─────────────────────────────────────── */}
      <div className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <Reveal>
          <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-6 border-b-2 border-foreground">
            <span className="text-mono text-[#737373] mt-1 text-xs sm:text-sm">[02]</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl uppercase">CAPABILITIES</h2>
          </div>
        </Reveal>

        {/* Centered Level Guide panel */}
        <Reveal delayMs={75}>
          <div className="w-full max-w-5xl mx-auto mb-8 sm:mb-10">
            <div className="bg-[#fafafa] border border-[#d4d4d4] p-4 sm:p-5">
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#525252] font-semibold mb-3">
                LEVEL GUIDE
              </p>

              {/* 5-column level grid */}
              <div className="grid grid-cols-2 min-[360px]:grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                {LEVEL_GUIDE_ITEMS.map((item) => (
                  <div key={item.code} className="flex flex-col">
                    <span className="font-mono text-xs sm:text-sm font-bold text-foreground">
                      {item.code}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#525252] font-medium leading-tight">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Separator + Interaction hint */}
              <div className="border-t border-[#e5e5e5] mt-3.5 pt-2.5 sm:mt-4 sm:pt-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-[#737373]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p className="text-xs text-[#525252] leading-normal">
                  Select a skill below to explore its proficiency level and details.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Interactive skill rows */}
        <Reveal delayMs={150}>
          <SkillsInteractive
            categories={displayCategories}
            grouped={grouped}
            uncategorized={uncategorized}
          />
        </Reveal>
      </div>

      {/* ── Bottom Marquee (right → left) ────────────────────────────── */}
      <TechnologyMarquee direction="right" durationMs={46000} />
    </section>
  );
}
