import { getProfile } from "@/lib/actions/profile.actions";
import { AboutForm } from "@/components/forms/AboutForm";
export const metadata = { title: "About" };
export default async function AdminAboutPage() {
  const profile = await getProfile();
  return <AboutForm profile={profile} />;
}
