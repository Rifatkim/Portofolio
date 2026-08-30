"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";

interface ProjectDetailHeaderProps {
  projectTitle: string;
  demoUrl?: string | null;
  repoUrl?: string | null;
}

export function ProjectDetailHeader({
  projectTitle,
  demoUrl,
  repoUrl,
}: ProjectDetailHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-colors duration-200 ${
        isScrolled ? "border-b border-black" : "border-b border-[#e5e5e5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-4">
        {/* Left: Back Link & Optional Scrolled Project Name */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/#works"
            className="group inline-flex items-center gap-2 border border-black px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-black hover:text-white transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black shrink-0"
            aria-label="Back to projects"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span>Back</span>
          </Link>

          {/* Project title appears subtly when scrolled past hero */}
          {isScrolled && (
            <span className="hidden sm:inline-block font-mono text-[11px] tracking-widest text-[#737373] uppercase truncate animate-fadeIn">
              / {projectTitle}
            </span>
          )}
        </div>

        {/* Right: Demo & Code Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-black px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-black hover:text-white transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Open live project demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </a>
          )}

          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-black px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-black hover:text-white transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Open project source code"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
