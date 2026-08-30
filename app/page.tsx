import { getProfile } from "@/lib/actions/profile.actions";
import { getSkillCategories, getSkills } from "@/lib/actions/skills.actions";
import { getProjects } from "@/lib/actions/projects.actions";
import { getExperiences } from "@/lib/actions/experiences.actions";
import { getCertificates } from "@/lib/actions/certificates.actions";
import { getContacts } from "@/lib/actions/contacts.actions";
import { getSiteSettings } from "@/lib/actions/settings.actions";
import { SiteNav } from "@/components/public/SiteNav";
import { HeroSection } from "@/components/public/HeroSection";
import { ProfileSection } from "@/components/public/ProfileSection";
import { SkillsSection } from "@/components/public/SkillsSection";
import { ProjectsSection } from "@/components/public/ProjectsSection";
import { ExperienceSection } from "@/components/public/ExperienceSection";
import { CertificatesSection } from "@/components/public/CertificatesSection";
import { ContactSection } from "@/components/public/ContactSection";
import { Footer } from "@/components/public/Footer";

export default async function HomePage() {
  const [
    profile,
    settings,
    categories,
    skills,
    projects,
    experiences,
    certificates,
    contacts,
  ] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getSkillCategories(),
    getSkills(),
    getProjects(),
    getExperiences(),
    getCertificates(),
    getContacts(),
  ]);

  if (settings.maintenance_mode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foreground text-background">
        <div className="text-center">
          <p className="text-mono text-[#555] mb-4">503</p>
          <h1 className="font-editorial text-4xl uppercase mb-2">Under Maintenance</h1>
          <p className="text-sm text-[#737373]">Website sedang dalam pemeliharaan. Segera kembali.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SiteNav siteTitle={profile?.full_name || settings.site_title} />

      <main>
        <HeroSection
          profile={profile}
          siteTitle={settings.site_title}
          showCvButton={settings.show_cv_button}
        />

        <ProfileSection profile={profile} />

        <SkillsSection categories={categories} skills={skills} />

        <ProjectsSection projects={projects} />

        <ExperienceSection experiences={experiences} />

        <CertificatesSection certificates={certificates} />

        <ContactSection
          contacts={contacts}
          profile={profile}
          enabled={settings.contact_section_enabled}
        />
      </main>

      <Footer
        siteTitle={profile?.full_name || settings.site_title}
        copyrightText={settings.copyright_text}
      />
    </>
  );
}
