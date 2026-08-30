import { getSiteSettings } from "@/lib/actions/settings.actions";
import { SettingsForm } from "@/components/forms/SettingsForm";
export const metadata = { title: "Site Settings" };
export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <SettingsForm settings={settings} />;
}
