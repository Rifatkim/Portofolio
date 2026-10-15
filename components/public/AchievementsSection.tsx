import { Certificate, Award } from "@/types";
import { CertificateCarousel } from "./CertificateCarousel";
import { AwardsGallery } from "./AwardsGallery";
import { Reveal } from "./Reveal";

interface AchievementsSectionProps {
  certificates: Certificate[];
  awards: Award[];
}

export function AchievementsSection({
  certificates,
  awards,
}: AchievementsSectionProps) {
  const hasCertificates = certificates && certificates.length > 0;
  const hasAwards = awards && awards.length > 0;

  // If both are empty, do not render the section
  if (!hasCertificates && !hasAwards) return null;

  const showBoth = hasCertificates && hasAwards;

  return (
    <section
      id="achievements"
      className="w-full py-16 sm:py-20 bg-[#f7f7f5] overflow-hidden scroll-mt-14 sm:scroll-mt-16"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Main Section Header */}
        <Reveal>
          <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-6 border-b-2 border-foreground">
            <span className="text-mono text-[#737373] mt-1 text-xs sm:text-sm">
              [05]
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl uppercase">
              ACHIEVEMENTS
            </h2>
          </div>
        </Reveal>

        {/* 05.A // CERTIFICATIONS SUBSECTION */}
        {hasCertificates && (
          <div className="space-y-6 sm:space-y-8">
            <Reveal delayMs={100}>
              <div className="flex items-center gap-3 pb-2 border-b border-[#e5e5e5]">
                <span className="font-mono text-xs sm:text-sm text-[#737373] font-semibold">
                  {showBoth ? "05.A" : "//"}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl uppercase tracking-wider text-black">
                  CERTIFICATIONS
                </h3>
              </div>
            </Reveal>

            {/* Certificate Carousel */}
            <Reveal delayMs={150}>
              <CertificateCarousel certificates={certificates} />
            </Reveal>
          </div>
        )}

        {/* Visual Divider between Certifications and Awards */}
        {showBoth && (
          <div className="my-12 sm:my-16 border-t border-[#e5e5e5]" />
        )}

        {/* 05.B // AWARDS SUBSECTION */}
        {hasAwards && (
          <div className="space-y-6 sm:space-y-8">
            <Reveal delayMs={100}>
              <div className="flex items-center gap-3 pb-2 border-b border-[#e5e5e5]">
                <span className="font-mono text-xs sm:text-sm text-[#737373] font-semibold">
                  {showBoth ? "05.B" : "//"}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl uppercase tracking-wider text-black">
                  AWARDS
                </h3>
              </div>
            </Reveal>

            {/* Awards Cards Gallery */}
            <AwardsGallery awards={awards} />
          </div>
        )}
      </div>
    </section>
  );
}
