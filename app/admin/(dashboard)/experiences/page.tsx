import { getExperiences } from "@/lib/actions/experiences.actions";
import { ExperiencesList } from "@/components/admin/ExperiencesList";

export const metadata = { title: "Experiences" };

export default async function AdminExperiencesPage() {
  const experiences = await getExperiences(true);
  return <ExperiencesList experiences={experiences} />;
}
