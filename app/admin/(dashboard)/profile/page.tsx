import { getProfile } from "@/lib/actions/profile.actions";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { PageHeader } from "@/components/ui/shared";

export const metadata = { title: "Profile" };

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Kelola informasi profil pribadi Anda"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Profile" }]}
      />
      <ProfileForm profile={profile} />
    </div>
  );
}
