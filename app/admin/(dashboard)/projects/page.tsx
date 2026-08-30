import { getProjects } from "@/lib/actions/projects.actions";
import { ProjectsList } from "@/components/admin/ProjectsList";

export const metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const projects = await getProjects(true);
  return <ProjectsList projects={projects} />;
}
