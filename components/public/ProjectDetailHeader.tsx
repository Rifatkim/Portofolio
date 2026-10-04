"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";

interface ProjectDetailHeaderProps {
  projectTitle: string;
  demoUrl?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  repositoryUrl?: string | null;
}

export function ProjectDetailHeader({
  projectTitle,
  demoUrl,
  repoUrl,
  liveUrl,
  repositoryUrl,
}: ProjectDetailHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const effectiveDemoUrl = demoUrl ?? liveUrl;
  const effectiveRepoUrl = repoUrl ?? repositoryUrl;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[100] w-full border-b bg-white transition-shadow duration-200 ${
        isScrolled
          ? "border-[#d4d4d4] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          : "border-[#e5e5e5]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-12">
        {/* Left: Back Link & Optional Scrolled Project Name */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link
            href="/#works"
            className="group inline-flex items-center justify-center gap-2 border border-black px-3.5 py-2 min-h-11 min-w-[44px] text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-black hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black shrink-0 cursor-pointer"
            aria-label="Back to projects"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            <span>Back</span>
          </Link>

          {/* Project title appears subtly when scrolled past hero (hidden on mobile to preserve compact header) */}
          {isScrolled && (
            <span className="hidden md:inline-block font-mono text-[11px] tracking-widest text-[#737373] uppercase truncate">
              / {projectTitle}
            </span>
          )}
        </div>

        {/* Right: Demo & Code Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {effectiveDemoUrl && (
            <a
              href={effectiveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 border border-black px-3.5 py-2 min-h-11 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-black hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black shrink-0 cursor-pointer"
              aria-label="Open live project demo in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Demo</span>
            </a>
          )}

          {effectiveRepoUrl && (
            <a
              href={effectiveRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 border border-black px-3.5 py-2 min-h-11 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-black hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black shrink-0 cursor-pointer"
              aria-label="Open project source code in new tab"
            >
              <Code2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
