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
    <section id="home" className="min-h-[calc(100svh-3.5rem)] lg:min-h-screen flex flex-col justify-between lg:justify-end pb-8 sm:pb-12 lg:pb-16 pt-22 sm:pt-26 lg:pt-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-8 pb-3 sm:pb-4 border-b border-[#e5e5e5] flex-wrap">
          <span className="text-label text-[#737373]">[00] Portfolio</span>
          {availability && (
            <span className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black">
              <span className="w-2 h-2 rounded-full bg-black inline-block animate-pulse" />
              {availability === "available" ? "Available for opportunities" : availability === "open" ? "Open to offers" : availability}
            </span>
          )}
        </div>

        {/* Main Content Box with Network Background constrained inside */}
        <div className="relative overflow-hidden py-1 sm:py-4 mb-4 sm:mb-8">
          {/* Luxury Network Topology Background (contained strictly within this box) */}
          <HeroNetworkBackground />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 sm:gap-12 items-end">
            {/* Text content */}
            <div>
              {/* Main heading */}
              <h1 className="font-editorial text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95] tracking-tight mb-3 sm:mb-6 uppercase break-words">
                {name.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>

              {/* Headline */}
              {headline && (
                <p className="text-sm sm:text-base lg:text-lg font-medium text-[#525252] mb-3 sm:mb-6 max-w-lg leading-snug">
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
              <div className="hidden lg:block w-64 xl:w-80 shrink-0">
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
                  <span className="text-mono text-[#a3a3a3] text-[10px]">RIFAT.JPG</span>
                  <span className="text-mono text-[#a3a3a3] text-[10px]">2026</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meta grid */}
        {(university || major || (showGpa && gpa)) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-5 sm:mb-8 py-3 sm:py-4 border-t border-b border-[#e5e5e5]">
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

        {/* CTAs */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          <a href="#works" className="btn-primary text-xs sm:text-sm">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary text-xs sm:text-sm">
            Get in Touch
          </a>
          {showCvButton && cvUrl && (
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs sm:text-sm flex items-center gap-2">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download CV
            </a>
          )}
        </div>
      </div>

      {/* ── Mobile-Only Animated Scroll Down Indicator (Matching Image 2, Hidden on Desktop) ── */}
      <div className="lg:hidden flex flex-col items-center justify-center pt-6 pb-2">
        <a
          href="#profile"
          aria-label="Scroll ke bagian profil"
          className="group flex flex-col items-center gap-1 text-[#737373] hover:text-black transition-colors"
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
    </section>
  );
}
