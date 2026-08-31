import { Certificate } from "@/types";
import { CertificateCarousel } from "./CertificateCarousel";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (certificates.length === 0) return null;

  return (
    <section id="certifications" className="py-16 sm:py-20 bg-[#f7f7f5] overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-6 border-b-2 border-foreground">
          <span className="text-mono text-[#a3a3a3] mt-1 text-xs sm:text-sm">[05]</span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl uppercase">CERTIFICATIONS</h2>
        </div>

        {/* Center-Focused Certificate Carousel */}
        <CertificateCarousel certificates={certificates} />
      </div>
    </section>
  );
}
