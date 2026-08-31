import { Contact } from "@/types";

interface ContactSectionProps {
  contacts: Contact[];
  profile: { full_name?: string | null } | null;
  enabled: boolean;
}

const ICON_MAP: Record<string, string> = {
  email: "✉",
  whatsapp: "💬",
  github: "⌨",
  linkedin: "in",
  instagram: "◻",
  twitter: "✕",
  youtube: "▶",
  telegram: "✈",
};

export function ContactSection({ contacts, profile, enabled }: ContactSectionProps) {
  if (!enabled || contacts.length === 0) return null;

  return (
    <section id="contact" className="bg-foreground text-background py-16 sm:py-20">
      <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-[#333]">
          <span className="text-mono text-[#555] mt-1 text-xs sm:text-sm">[06]</span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl uppercase text-background">CONTACT</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* CTA text */}
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl uppercase text-background mb-3 sm:mb-4 leading-tight">
              Let&apos;s work<br />together.
            </h3>
            {profile?.full_name && (
              <p className="text-sm text-[#737373] mb-6">
                — {profile.full_name}
              </p>
            )}
            <p className="text-sm text-[#737373] max-w-sm leading-relaxed">
              Tersedia untuk project freelance, magang, kolaborasi, atau sekadar ngobrol soal teknologi.
            </p>
          </div>

          {/* Contacts list */}
          <div className="space-y-0">
            {contacts.map((contact, i) => (
              <div
                key={contact.id}
                className={`flex items-center justify-between py-4 ${i !== contacts.length - 1 ? "border-b border-[#222]" : ""} group`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-mono text-[#555] w-4 text-center">
                    {contact.icon || ICON_MAP[contact.platform.toLowerCase()] || "·"}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#555] mb-0.5">
                      {contact.platform}
                    </p>
                    <p className="text-sm font-medium text-background">{contact.display_label}</p>
                  </div>
                </div>
                {contact.url ? (
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-widest text-[#555] group-hover:text-background transition-colors"
                  >
                    Open →
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#555]">{contact.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
