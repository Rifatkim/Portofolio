"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Project, ProjectImage, ProjectInput } from "@/types";

export async function getProjects(adminView = false) {
  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*, technologies:project_technologies(*), images:project_images(*)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (!adminView) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;
  if (error) return [];
  return data as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, technologies:project_technologies(*), images:project_images(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*, technologies:project_technologies(*), images:project_images(*)")
    .eq("id", id)
    .single();
  return data;
}

export async function createProject(values: ProjectInput) {
  const supabase = await createClient();
  const { technologies, ...projectData } = values;

  const { data, error } = await supabase
    .from("projects")
    .insert({ ...projectData })
    .select()
    .single();

  if (error) return { error: error.message };

  if (technologies && technologies.length > 0) {
    const techRows = technologies.map((name, i) => ({
      project_id: data.id,
      name,
      sort_order: i,
    }));
    await supabase.from("project_technologies").insert(techRows);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true, id: data.id };
}

export async function updateProject(id: string, values: ProjectInput) {
  const supabase = await createClient();
  const { technologies, ...projectData } = values;

  const { error } = await supabase
    .from("projects")
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  if (technologies !== undefined) {
    await supabase.from("project_technologies").delete().eq("project_id", id);
    if (technologies.length > 0) {
      const techRows = technologies.map((name, i) => ({
        project_id: id,
        name,
        sort_order: i,
      }));
      await supabase.from("project_technologies").insert(techRows);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath(`/projects/${values.slug || ""}`);
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateProjectStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function addProjectImage(projectId: string, image: Omit<ProjectImage, "id" | "project_id">) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_images").insert({ ...image, project_id: projectId });
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProjectImage(imageId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("project_images").delete().eq("id", imageId);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  return { success: true };
}
