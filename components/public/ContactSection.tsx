import { Contact } from "@/types";
import { CopyEmailButton } from "./CopyEmailButton";
import { Reveal } from "./Reveal";

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
    <section id="contact" className="w-full bg-white text-black py-16 sm:py-20 scroll-mt-14 sm:scroll-mt-16 border-t border-[#e5e5e5]">
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section header */}
        <Reveal>
          <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-[#e5e5e5]">
            <span className="text-mono text-[#737373] mt-1 text-xs sm:text-sm">[06]</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl uppercase text-black">CONTACT</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* CTA text */}
          <Reveal delayMs={100}>
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl uppercase text-black mb-3 sm:mb-4 leading-tight">
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
          </Reveal>

          {/* Contacts list */}
          <div className="space-y-0">
            {contacts.map((contact, i) => {
              const isEmail =
                contact.platform.toLowerCase() === "email" ||
                contact.platform.toLowerCase() === "mail";
              const emailAddress = contact.value || contact.display_label;
              const emailMailto = contact.url?.startsWith("mailto:")
                ? contact.url
                : `mailto:${emailAddress}`;

              return (
                <Reveal key={contact.id} delayMs={i * 60}>
                  <div
                    className={`flex items-center justify-between py-4 ${
                      i !== contacts.length - 1 ? "border-b border-[#e5e5e5]" : ""
                    } group`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-mono text-[#737373] w-4 text-center shrink-0">
                        {contact.icon || ICON_MAP[contact.platform.toLowerCase()] || "·"}
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-0.5">
                          {contact.platform}
                        </p>
                        <p className="text-sm font-medium text-black">{contact.display_label}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isEmail ? (
                        <>
                          <CopyEmailButton email={emailAddress} />
                          <a
                            href={emailMailto}
                            className="min-h-11 min-w-11 px-4 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-black hover:text-white border border-black hover:border-black active:scale-95 transition-all duration-150 rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                            aria-label={`Kirim email ke ${emailAddress}`}
                          >
                            Mail →
                          </a>
                        </>
                      ) : contact.url ? (
                        <a
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-11 min-w-11 px-4 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-black hover:text-white border border-black hover:border-black active:scale-95 transition-all duration-150 rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          aria-label={`Buka ${contact.platform} di tab baru`}
                        >
                          Open →
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-[#737373]">{contact.value}</span>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
