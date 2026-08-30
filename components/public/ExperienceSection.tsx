import { Experience } from "@/types";
import { formatDateRange } from "@/lib/utils";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const TYPE_LABELS: Record<string, string> = {
  work: "Work",
  internship: "Internship",
  organization: "Organization",
  volunteer: "Volunteer",
  education: "Education",
  freelance: "Freelance",
  other: "Other",
};

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex items-start gap-6 mb-12 pb-6 border-b-2 border-foreground">
        <span className="text-mono text-[#a3a3a3] mt-1">[04]</span>
        <h2 className="font-editorial text-4xl lg:text-5xl uppercase">EXPERIENCE</h2>
      </div>

      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <div
            key={exp.id}
            className={`grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 py-8 ${i !== experiences.length - 1 ? "border-b border-[#e5e5e5]" : ""}`}
          >
            {/* Left: Date + type */}
            <div className="shrink-0">
              <p className="text-mono text-[#a3a3a3] mb-1 uppercase">{TYPE_LABELS[exp.type] || exp.type}</p>
              <p className="text-xs font-medium text-[#525252]">
                {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
              </p>
              {exp.location && (
                <p className="text-xs text-[#737373] mt-1">{exp.location}</p>
              )}
            </div>

            {/* Right: Details */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                {/* Logo */}
                {exp.logo_url && (
                  <div className="w-10 h-10 border border-[#e5e5e5] shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={exp.logo_url} alt={exp.organization} className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-base uppercase tracking-wide">{exp.position}</h3>
                  <p className="text-sm text-[#525252]">
                    {exp.org_url ? (
                      <a href={exp.org_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {exp.organization}
                      </a>
                    ) : exp.organization}
                  </p>
                </div>
              </div>

              {exp.short_description && (
                <p className="text-sm text-[#737373] leading-relaxed mb-4 max-w-xl">{exp.short_description}</p>
              )}

              {/* Responsibilities */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="space-y-1 mb-4">
                  {exp.responsibilities.map((resp) => (
                    <li key={resp.id} className="flex items-start gap-2 text-sm text-[#525252]">
                      <span className="text-mono text-[#a3a3a3] shrink-0 mt-0.5">—</span>
                      {resp.text}
                    </li>
                  ))}
                </ul>
              )}

              {/* Technologies */}
              {exp.related_tech && exp.related_tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {exp.related_tech.map((tech) => (
                    <span key={tech} className="text-[10px] font-mono border border-[#e5e5e5] px-2 py-0.5 text-[#737373]">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
