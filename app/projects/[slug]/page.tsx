import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/actions/projects.actions";
import { formatDate } from "@/lib/utils";
import { ExternalLink, Code2 } from "lucide-react";
import { ProjectDetailHeader } from "@/components/public/ProjectDetailHeader";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.name,
    description: project.short_summary || project.full_description?.slice(0, 160),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Sticky Project Navigation Header */}
      <ProjectDetailHeader
        projectTitle={project.name}
        demoUrl={project.demo_url}
        repoUrl={project.repo_url}
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12 pb-8 border-b-2 border-foreground">
          {project.category && (
            <p className="text-mono text-[#a3a3a3] mb-3 uppercase">{project.category}</p>
          )}
          <h1 className="font-editorial text-4xl lg:text-6xl uppercase tracking-tight mb-4">{project.name}</h1>
          {project.short_summary && (
            <p className="text-base text-[#525252] max-w-2xl leading-relaxed">{project.short_summary}</p>
          )}

          {/* Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#e5e5e5]">
            {project.project_status && (
              <div>
                <p className="text-label text-[#737373] mb-1">Status</p>
                <p className="text-xs font-semibold capitalize">{project.project_status}</p>
              </div>
            )}
            {project.start_date && (
              <div>
                <p className="text-label text-[#737373] mb-1">Period</p>
                <p className="text-xs font-mono">
                  {formatDate(project.start_date, { month: "short", year: "numeric" })}
                  {project.end_date ? ` – ${formatDate(project.end_date, { month: "short", year: "numeric" })}` : " – Now"}
                </p>
              </div>
            )}
            {project.my_role && (
              <div>
                <p className="text-label text-[#737373] mb-1">Role</p>
                <p className="text-xs font-semibold">{project.my_role}</p>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        {project.thumbnail_url && (
          <div className="mb-12 aspect-video overflow-hidden border border-[#e5e5e5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.thumbnail_url} alt={project.name} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-10">
            <p className="text-label text-[#737373] mb-3">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech.id} className="text-xs font-mono border border-[#e5e5e5] px-2.5 py-1.5 hover:border-foreground transition-colors">
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content sections */}
        <div className="space-y-10">
          {project.full_description && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-[#e5e5e5]">Overview</h2>
              <p className="text-sm leading-relaxed text-[#525252] whitespace-pre-wrap">{project.full_description}</p>
            </div>
          )}
          {project.background && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-[#e5e5e5]">Background</h2>
              <p className="text-sm leading-relaxed text-[#525252] whitespace-pre-wrap">{project.background}</p>
            </div>
          )}
          {project.problem && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-[#e5e5e5]">Problem</h2>
              <p className="text-sm leading-relaxed text-[#525252] whitespace-pre-wrap">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-[#e5e5e5]">Solution</h2>
              <p className="text-sm leading-relaxed text-[#525252] whitespace-pre-wrap">{project.solution}</p>
            </div>
          )}

          {project.key_features && project.key_features.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-[#e5e5e5]">Key Features</h2>
              <ul className="space-y-2">
                {project.key_features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#525252]">
                    <span className="text-mono text-[#a3a3a3] shrink-0">→</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.challenges && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-[#e5e5e5]">Challenges</h2>
              <p className="text-sm leading-relaxed text-[#525252] whitespace-pre-wrap">{project.challenges}</p>
            </div>
          )}
          {project.outcome && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2 border-b border-[#e5e5e5]">Result / Outcome</h2>
              <p className="text-sm leading-relaxed text-[#525252] whitespace-pre-wrap">{project.outcome}</p>
            </div>
          )}
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b border-[#e5e5e5]">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img) => (
                <div key={img.id} className="border border-[#e5e5e5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.image_url} alt={img.alt_text || project.name} className="w-full object-cover" />
                  {img.caption && (
                    <p className="px-3 py-2 text-xs text-[#737373]">{img.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.demo_url || project.repo_url) && (
          <div className="mt-12 pt-8 border-t border-[#e5e5e5] flex flex-wrap gap-3">
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.repo_url && (
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                View Code
              </a>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
