import { notFound } from "next/navigation";
import { getExperienceById } from "@/lib/actions/experiences.actions";
import { ExperienceForm } from "@/components/forms/ExperienceForm";

export const metadata = { title: "Edit Experience" };

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await getExperienceById(id);
  if (!experience) notFound();
  return <ExperienceForm experience={experience} isEdit />;
}
