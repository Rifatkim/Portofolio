import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/settings.actions";
import { PageHeader, Card } from "@/components/ui/shared";
import { FolderKanban, Briefcase, Code2, Award, ImageIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Total Projects", value: stats.totalProjects, sub: null, icon: FolderKanban },
    { label: "Published Projects", value: stats.publishedProjects, sub: "active", icon: FolderKanban },
    { label: "Draft Projects", value: stats.draftProjects, sub: "unpublished", icon: FolderKanban },
    { label: "Total Experiences", value: stats.totalExperiences, sub: null, icon: Briefcase },
    { label: "Total Skills", value: stats.totalSkills, sub: null, icon: Code2 },
    { label: "Total Certificates", value: stats.totalCertificates, sub: null, icon: Award },
    { label: "Total Media", value: stats.totalMedia, sub: "files", icon: ImageIcon },
  ];

  const quickActions = [
    { label: "+ Add Project", href: "/admin/projects/new" },
    { label: "+ Add Experience", href: "/admin/experiences/new" },
    { label: "+ Add Certificate", href: "/admin/certificates/new" },
    { label: "+ Add Skill", href: "/admin/skills" },
    { label: "Upload Media", href: "/admin/media" },
    { label: "View Portfolio", href: "/", external: true },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview konten portfolio Anda"
        breadcrumb={[{ label: "Admin" }, { label: "Dashboard" }]}
      />

      {/* Last updated */}
      {stats.lastUpdated && (
        <p className="text-xs text-[#737373] font-mono mb-6">
          Last updated: {formatDate(stats.lastUpdated)}
        </p>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-4 w-4 text-[#737373]" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-[#737373] uppercase tracking-wider">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-[#737373]">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Getting started */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4">Cara Mengisi Portfolio</h2>
        <ol className="space-y-2 text-sm text-[#525252]">
          {[
            ["Profile", "/admin/profile", "Isi nama lengkap, bio, IPK, dan upload foto"],
            ["Hero", "/admin/hero", "Atur tampilan halaman utama dan CTA"],
            ["About", "/admin/about", "Tambahkan deskripsi tentang diri Anda"],
            ["Skills", "/admin/skills", "Tambahkan kategori dan skill Anda"],
            ["Projects", "/admin/projects", "Buat dan publish project Anda"],
            ["Experiences", "/admin/experiences", "Tambahkan pengalaman kerja/organisasi"],
            ["Certificates", "/admin/certificates", "Upload sertifikat yang Anda miliki"],
            ["Contact", "/admin/contacts", "Tambahkan info kontak dan sosial media"],
          ].map(([label, href, desc], i) => (
            <li key={href} className="flex items-start gap-3">
              <span className="font-mono text-xs text-[#a3a3a3] shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                <Link href={href} className="font-semibold text-foreground hover:underline">{label}</Link>
                <span className="text-[#737373]"> — {desc}</span>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
