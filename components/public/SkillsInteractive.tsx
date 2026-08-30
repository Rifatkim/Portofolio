"use client";

import { useState, useId } from "react";
import { Skill, SkillCategory } from "@/types";

interface SkillsCategoryRowProps {
  catIndex: number;
  category: SkillCategory | { id: string; name: string };
  skills: Skill[];
  globalActiveId: string | null;
  onSelect: (skillId: string | null, catId: string) => void;
}

const LEVEL_DISPLAY: Record<string, string> = {
  beginner: "Beginner",
  elementary: "Elementary",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const LEVEL_CODE: Record<string, string> = {
  beginner: "01",
  elementary: "02",
  intermediate: "03",
  advanced: "04",
  expert: "05",
};

// ── Back / Close Button ──────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close skill details"
      title="Back"
      onClick={onClick}
      className="
        group flex items-center justify-center shrink-0
        w-8 h-8
        border border-white/25 text-white
        transition-all duration-[180ms] ease-out
        hover:bg-white hover:border-white
        active:scale-95
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-white
      "
      style={{ borderRadius: "3px" }}
    >
      {/* ArrowLeft icon (inline SVG, no external import needed) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="
          transition-transform duration-200 ease-out
          group-hover:translate-x-[-2px]
          group-hover:text-black
        "
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

// ── Skill Detail Panel ───────────────────────────────────────────────────────

function SkillDetailPanel({
  skill,
  categoryName,
  onClose,
}: {
  skill: Skill;
  categoryName: string;
  onClose: () => void;
}) {
  return (
    <div className="w-full border border-[#3a3a3a] bg-[#1a1a1a] text-white">
      {/* Header row: [←]  / SKILL NAME          LEVEL */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#333]">
        {/* Left: Back + Skill name */}
        <div className="flex items-center gap-3 min-w-0">
          <BackButton onClick={onClose} />
          <span className="font-mono text-[11px] tracking-[0.15em] text-[#888] uppercase whitespace-nowrap">
            / {skill.name.toUpperCase()}
          </span>
        </div>

        {/* Right: Level */}
        {skill.level && (
          <span className="font-mono text-[11px] tracking-[0.12em] text-white uppercase whitespace-nowrap shrink-0">
            {LEVEL_DISPLAY[skill.level] || skill.level}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-5 space-y-4">
        {/* Category */}
        <p className="font-mono text-[10px] tracking-[0.18em] text-[#666] uppercase">
          {categoryName}
        </p>

        {/* Description */}
        {skill.description ? (
          <p className="text-sm text-[#bbb] leading-relaxed max-w-2xl">
            {skill.description}
          </p>
        ) : (
          <p className="text-sm text-[#555] italic">No description available.</p>
        )}

        {/* Bottom rule */}
        <div className="border-t border-[#333] pt-1" />
      </div>
    </div>
  );
}

// ── Expandable Panel with CSS height transition ──────────────────────────────

function ExpandablePanel({
  id,
  isOpen,
  activeSkill,
  categoryName,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  activeSkill: Skill | null;
  categoryName: string;
  onClose: () => void;
}) {
  const [lastSkill, setLastSkill] = useState<Skill | null>(activeSkill);

  if (activeSkill && activeSkill.id !== lastSkill?.id) {
    setLastSkill(activeSkill);
  }

  const displaySkill = activeSkill ?? lastSkill;

  return (
    <div
      id={id}
      role="region"
      aria-label={displaySkill ? `${displaySkill.name} detail` : "Skill detail"}
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 340ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="mt-3"
    >
      <div className="overflow-hidden">
        {displaySkill && (
          <SkillDetailPanel
            skill={displaySkill}
            categoryName={categoryName}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

// ── Category Row ─────────────────────────────────────────────────────────────

export function SkillsCategoryRow({
  catIndex,
  category,
  skills,
  globalActiveId,
  onSelect,
}: SkillsCategoryRowProps) {
  const panelId = useId();

  const activeSkill = globalActiveId
    ? skills.find((s) => s.id === globalActiveId) ?? null
    : null;

  const isPanelOpen = activeSkill !== null;

  const handleClick = (skill: Skill) => {
    if (globalActiveId === skill.id) {
      onSelect(null, category.id);
    } else {
      onSelect(skill.id, category.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, skill: Skill) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(skill);
    }
  };

  const handleClose = () => {
    onSelect(null, category.id);
  };

  const categoryName = "name" in category ? category.name : "Other";

  return (
    <div>
      {/* Category label + skill pills row */}
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
        <div className="pt-1">
          <p className="text-mono text-[#a3a3a3] mb-1">
            /{String(catIndex + 1).padStart(2, "0")}
          </p>
          <p className="text-sm font-bold uppercase tracking-wider">{categoryName}</p>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={`${categoryName} skills`}
        >
          {skills.map((skill) => {
            const isActive = globalActiveId === skill.id;
            return (
              <button
                key={skill.id}
                id={`skill-btn-${skill.id}`}
                type="button"
                aria-expanded={isActive}
                aria-controls={isActive ? panelId : undefined}
                onClick={() => handleClick(skill)}
                onKeyDown={(e) => handleKeyDown(e, skill)}
                className={[
                  "inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide border transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-white text-foreground border-[#e5e5e5] hover:border-foreground",
                ].join(" ")}
              >
                {skill.name}
                {skill.level && (
                  <span
                    className={`text-[10px] font-mono ${isActive ? "text-[#aaa]" : "text-[#a3a3a3]"}`}
                  >
                    {LEVEL_CODE[skill.level]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable detail panel — pushes content below downward */}
      <ExpandablePanel
        id={panelId}
        isOpen={isPanelOpen}
        activeSkill={activeSkill}
        categoryName={categoryName}
        onClose={handleClose}
      />
    </div>
  );
}

// ── Root interactive container ───────────────────────────────────────────────

interface SkillsInteractiveProps {
  categories: (SkillCategory | { id: string; name: string })[];
  grouped: Record<string, Skill[]>;
  uncategorized: Skill[];
}

export function SkillsInteractive({ categories, grouped, uncategorized }: SkillsInteractiveProps) {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [activeCatId, setActiveCatId] = useState<string | null>(null);

  const handleSelect = (skillId: string | null, catId: string) => {
    if (skillId === null) {
      setActiveSkillId(null);
      setActiveCatId(null);
    } else {
      setActiveSkillId(skillId);
      setActiveCatId(catId);
    }
  };

  return (
    <div className="space-y-12">
      {categories.map((cat, catIndex) => {
        const catSkills = cat.id === "uncategorized" ? uncategorized : grouped[cat.id] || [];
        const catActiveId = activeCatId === cat.id ? activeSkillId : null;

        return (
          <SkillsCategoryRow
            key={cat.id}
            catIndex={catIndex}
            category={cat}
            skills={catSkills}
            globalActiveId={catActiveId}
            onSelect={handleSelect}
          />
        );
      })}
    </div>
  );
}
