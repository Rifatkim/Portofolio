import { Certificate } from "@/types";
import { CertificateCarousel } from "./CertificateCarousel";
import { Reveal } from "./Reveal";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (certificates.length === 0) return null;

  return (
    <section id="certifications" className="w-full py-16 sm:py-20 bg-[#f7f7f5] overflow-hidden scroll-mt-14 sm:scroll-mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <Reveal>
          <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-6 border-b-2 border-foreground">
            <span className="text-mono text-[#737373] mt-1 text-xs sm:text-sm">[05]</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl uppercase">CERTIFICATIONS</h2>
          </div>
        </Reveal>

        {/* Center-Focused Certificate Carousel */}
        <Reveal delayMs={150}>
          <CertificateCarousel certificates={certificates} />
        </Reveal>
      </div>
    </section>
  );
}
