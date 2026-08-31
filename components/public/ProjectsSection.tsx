import Link from "next/link";
import { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  const featured = projects.filter((p) => p.is_featured);
  const rest = projects.filter((p) => !p.is_featured);

  return (
    <section id="works" className="py-16 sm:py-20 bg-white text-black">
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-6 border-b-2 border-black">
          <span className="text-mono text-[#a3a3a3] mt-1 text-xs sm:text-sm">[03]</span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl uppercase text-black">SELECTED WORKS</h2>
        </div>

        {/* Featured projects */}
        {featured.length > 0 && (
          <div className="mb-12">
            {featured.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={`group flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 border-b border-[#e5e5e5] p-4 sm:p-6 lg:p-8 bg-white hover:bg-black hover:border-black transition-colors duration-250 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black ${
                  i === 0 ? "border-t border-[#e5e5e5]" : ""
                }`}
              >
                {/* Project Number */}
                <div className="w-8 sm:w-12 shrink-0">
                  <span className="text-mono text-xs sm:text-sm font-bold text-[#333333] group-hover:text-white transition-colors duration-250">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Project Thumbnail */}
                {project.thumbnail_url && (
                  <div className="w-full lg:w-64 h-48 sm:h-56 lg:h-40 shrink-0 overflow-hidden border border-[#e5e5e5] group-hover:border-[#333333] transition-colors duration-250 bg-[#f5f5f5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.thumbnail_url}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Project Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        {project.category && (
                          <p className="text-mono text-[11px] tracking-wider text-[#737373] group-hover:text-[#a3a3a3] uppercase mb-1 transition-colors duration-250">
                            {project.category}
                          </p>
                        )}
                        <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-black group-hover:text-white transition-colors duration-250">
                          {project.name}
                        </h3>
                      </div>

                      {/* Arrow with micro interaction */}
                      <div className="text-black group-hover:text-white transition-colors duration-250 shrink-0 mt-1">
                        <svg
                          className="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform duration-200 ease-out"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                    {project.short_summary && (
                      <p className="text-sm text-[#737373] group-hover:text-[#d4d4d4] max-w-2xl leading-relaxed mt-2 transition-colors duration-250">
                        {project.short_summary}
                      </p>
                    )}
                  </div>

                  {/* Technologies tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech.id}
                          className="text-[10px] font-mono border border-[#e5e5e5] group-hover:border-[#333333] px-2.5 py-1 text-[#525252] group-hover:text-[#d4d4d4] transition-colors duration-250"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Other projects grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group border border-[#e5e5e5] p-6 bg-white hover:bg-black hover:border-black transition-colors duration-250 flex flex-col justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              >
                <div>
                  {project.thumbnail_url && (
                    <div className="aspect-video overflow-hidden mb-5 border border-[#e5e5e5] group-hover:border-[#333333] transition-colors duration-250 bg-[#f5f5f5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.thumbnail_url}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {project.category && (
                    <p className="text-mono text-[10px] tracking-wider text-[#737373] group-hover:text-[#a3a3a3] mb-1.5 uppercase transition-colors duration-250">
                      {project.category}
                    </p>
                  )}
                  <h3 className="font-bold text-lg uppercase tracking-wide text-black group-hover:text-white transition-colors duration-250 mb-2">
                    {project.name}
                  </h3>
                  {project.short_summary && (
                    <p className="text-xs text-[#737373] group-hover:text-[#d4d4d4] line-clamp-2 leading-relaxed transition-colors duration-250">
                      {project.short_summary}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-black group-hover:text-white mt-5 pt-4 border-t border-[#f0f0f0] group-hover:border-[#222222] transition-colors duration-250">
                  <span>View Project</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 ease-out">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
