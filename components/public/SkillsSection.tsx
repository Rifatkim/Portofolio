import { Skill, SkillCategory } from "@/types";
import { SkillsInteractive } from "./SkillsInteractive";
import { TechnologyMarquee } from "./TechnologyMarquee";

interface SkillsSectionProps {
  categories: SkillCategory[];
  skills: Skill[];
}

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
    <section id="capabilities" className="bg-[#f7f7f5]">
      {/* ── Top Marquee (left → right) ───────────────────────────────── */}
      <TechnologyMarquee direction="left" durationMs={40000} />

      {/* ── CAPABILITIES Content ─────────────────────────────────────── */}
      <div className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-start gap-6 mb-12 pb-6 border-b-2 border-foreground">
          <span className="text-mono text-[#a3a3a3] mt-1">[02]</span>
          <h2 className="font-editorial text-4xl lg:text-5xl uppercase">CAPABILITIES</h2>
        </div>

        {/* Interactive skill rows */}
        <SkillsInteractive
          categories={displayCategories}
          grouped={grouped}
          uncategorized={uncategorized}
        />
      </div>

      {/* ── Bottom Marquee (right → left) ────────────────────────────── */}
      <TechnologyMarquee direction="right" durationMs={46000} />
    </section>
  );
}
