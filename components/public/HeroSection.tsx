import { Profile } from "@/types";
import { HeroNetworkBackground } from "./HeroNetworkBackground";

interface HeroSectionProps {
  profile: Profile | null;
  siteTitle: string;
  showCvButton: boolean;
}

export function HeroSection({ profile, siteTitle, showCvButton }: HeroSectionProps) {
  const name = profile?.full_name || siteTitle;
  const headline = profile?.headline || "";
  const shortBio = profile?.short_bio || "";
  const availability = profile?.availability_status;
  const heroPhoto = profile?.hero_photo_url;
  const cvUrl = profile?.cv_url;
  const gpa = profile?.gpa;
  const gpaScale = profile?.gpa_scale || 4;
  const showGpa = profile?.show_gpa;
  const university = profile?.university;
  const major = profile?.major;

  return (
    <section
      id="home"
      className="w-full min-h-[100svh] lg:h-screen lg:max-h-[960px] lg:min-h-[640px] flex flex-col pt-14 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-14 sm:scroll-mt-16"
    >
      {/* 
        Main Hero vertical flex wrapper:
        - Mobile (< lg): fills remaining viewport (min-h-[calc(100svh-3.5rem)]) and distributes
          the 5 groups evenly with justify-between so SCROLL indicator sits at the bottom edge.
        - Desktop (lg+): fits within 100vh with justify-between so University, Major, and CTAs are
          all visible in the first screen without scrolling.
      */}
      <div className="w-full flex-1 min-h-[calc(100svh-3.5rem)] lg:min-h-0 flex flex-col justify-between pt-5 sm:pt-6 lg:pt-2 pb-3 sm:pb-8 lg:pb-5">
        {/* ── Group A: Hero Top ── */}
        <div className="flex items-center justify-between gap-3 pb-2 sm:pb-3 lg:pb-2 border-b border-[#e5e5e5] flex-wrap">
          <span className="text-label text-[#737373]">[00] Portfolio</span>
          {availability && (
            <span className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black">
              <span className="w-2 h-2 rounded-full bg-black inline-block animate-pulse" />
              {availability === "available" ? "Available for opportunities" : availability === "open" ? "Open to offers" : availability}
            </span>
          )}
        </div>

        {/* ── Group B: Hero Identity (Name, Headline, Bio, Photo) ── */}
        <div className="relative overflow-hidden py-1 sm:py-3 lg:py-2 lg:mb-2 xl:mb-3">
          {/* Luxury Network Topology Background (contained strictly within this box) */}
          <HeroNetworkBackground />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 sm:gap-12 items-end">
            {/* Text content */}
            <div>
              {/* Main heading */}
              <h1 className="font-editorial text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[3.25rem] xl:text-[4rem] 2xl:text-[4.75rem] leading-[0.95] tracking-tight mb-2.5 sm:mb-4 lg:mb-2.5 uppercase break-words">
                {name.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>

              {/* Headline with clear 14px-24px separation from name */}
              {headline && (
                <p className="text-sm sm:text-base lg:text-base font-medium text-[#525252] mb-1.5 sm:mb-3 lg:mb-2 max-w-lg leading-snug">
                  {headline}
                </p>
              )}

              {/* Bio */}
              {shortBio && (
                <p className="text-xs sm:text-sm text-[#737373] max-w-md leading-relaxed">{shortBio}</p>
              )}
            </div>

            {/* Photo */}
            {heroPhoto && (
              <div className="hidden lg:block w-44 xl:w-52 2xl:w-60 shrink-0">
                <div className="aspect-[3/4] overflow-hidden border border-[#e5e5e5] bg-[#f9f9f9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroPhoto}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Caption */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-mono text-[#737373] text-[10px]">RIFAT.JPG</span>
                  <span className="text-mono text-[#737373] text-[10px]">2026</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Group C: Hero Information (Meta Grid) ── */}
        {(university || major || (showGpa && gpa)) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-6 py-2.5 sm:py-3 lg:py-2.5 lg:mb-2 xl:mb-3 border-t border-b border-[#e5e5e5]">
            {university && (
              <div>
                <p className="text-label text-[#737373] mb-0.5 sm:mb-1">University</p>
                <p className="text-xs sm:text-sm font-semibold">{university}</p>
              </div>
            )}
            {major && (
              <div>
                <p className="text-label text-[#737373] mb-0.5 sm:mb-1">Major</p>
                <p className="text-xs sm:text-sm font-semibold">{major}</p>
              </div>
            )}
            {showGpa && gpa && (
              <div>
                <p className="text-label text-[#737373] mb-0.5 sm:mb-1">GPA</p>
                <p className="text-xs sm:text-sm font-bold font-mono">{gpa} / {gpaScale}</p>
              </div>
            )}
          </div>
        )}

        {/* ── Group D: Hero Actions (CTA Buttons) ── */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full sm:w-auto sm:flex sm:flex-wrap sm:items-center">
          <a
            href="#works"
            className="btn-primary text-xs sm:text-sm text-center justify-center min-h-10 sm:min-h-11 h-10 sm:h-11 px-3 sm:px-5"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-secondary text-xs sm:text-sm text-center justify-center min-h-10 sm:min-h-11 h-10 sm:h-11 px-3 sm:px-5"
          >
            Get in Touch
          </a>
          {showCvButton && cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 min-h-10 sm:min-h-11 h-10 sm:h-11 px-3 sm:px-5"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              <span>Download CV</span>
            </a>
          )}
        </div>

        {/* ── Group E: Hero Scroll (Pinned to bottom of the single mobile screen) ── */}
        <div className="lg:hidden flex flex-col items-center justify-center pt-3 pb-1">
          <a
            href="#profile"
            aria-label="Scroll ke bagian profil"
            className="group min-h-11 min-w-11 px-3 flex flex-col items-center justify-center gap-1 text-[#737373] hover:text-black transition-colors"
          >
            <span className="text-[10px] sm:text-[11px] font-normal tracking-[0.28em] text-[#737373] group-hover:text-black uppercase transition-colors">
              SCROLL
            </span>
            <svg
              className="w-4 h-4 text-[#737373] group-hover:text-black transition-colors animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
