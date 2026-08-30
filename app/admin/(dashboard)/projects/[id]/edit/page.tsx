import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/actions/projects.actions";
import { ProjectForm } from "@/components/forms/ProjectForm";

export const metadata = { title: "Edit Project" };

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return <ProjectForm project={project} isEdit />;
}
