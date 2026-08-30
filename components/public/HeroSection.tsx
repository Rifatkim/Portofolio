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
    <section id="home" className="min-h-screen flex items-end pb-16 pt-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e5e5e5]">
          <span className="text-label text-[#737373]">[00] Portfolio</span>
          {availability && (
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              {availability === "available" ? "Available for opportunities" : availability === "open" ? "Open to offers" : availability}
            </span>
          )}
        </div>

        {/* Main Content Box with Network Background constrained inside */}
        <div className="relative overflow-hidden py-4 mb-8">
          {/* Luxury Network Topology Background (contained strictly within this box) */}
          <HeroNetworkBackground />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
            {/* Text content */}
            <div>
              {/* Main heading */}
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] leading-none tracking-tight mb-6 uppercase break-words">
                {name.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>

              {/* Headline */}
              {headline && (
                <p className="text-base lg:text-lg font-medium text-[#525252] mb-6 max-w-lg">{headline}</p>
              )}

              {/* Bio */}
              {shortBio && (
                <p className="text-sm text-[#737373] max-w-md leading-relaxed">{shortBio}</p>
              )}
            </div>

            {/* Photo */}
            {heroPhoto && (
              <div className="hidden lg:block w-64 xl:w-80 shrink-0">
                <div className="aspect-[3/4] overflow-hidden border border-[#e5e5e5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroPhoto}
                    alt={name}
                    className="w-full h-full object-cover img-grayscale"
                  />
                </div>
                {/* Caption */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-mono text-[#a3a3a3]">RIFAT.JPG</span>
                  <span className="text-mono text-[#a3a3a3]">2026</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meta grid */}
        {(university || major || (showGpa && gpa)) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 py-4 border-t border-b border-[#e5e5e5]">
            {university && (
              <div>
                <p className="text-label text-[#737373] mb-1">University</p>
                <p className="text-xs font-semibold">{university}</p>
              </div>
            )}
            {major && (
              <div>
                <p className="text-label text-[#737373] mb-1">Major</p>
                <p className="text-xs font-semibold">{major}</p>
              </div>
            )}
            {showGpa && gpa && (
              <div>
                <p className="text-label text-[#737373] mb-1">GPA</p>
                <p className="text-xs font-bold font-mono">{gpa} / {gpaScale}</p>
              </div>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a href="#works" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Get in Touch
          </a>
          {showCvButton && cvUrl && (
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
