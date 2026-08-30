import { getProfile } from "@/lib/actions/profile.actions";
import { HeroForm } from "@/components/forms/HeroForm";
export const metadata = { title: "Hero" };
export default async function AdminHeroPage() {
  const profile = await getProfile();
  return <HeroForm profile={profile} />;
}
