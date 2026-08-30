"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Experience, ExperienceInput } from "@/types";

export async function getExperiences(adminView = false) {
  const supabase = await createClient();
  let query = supabase
    .from("experiences")
    .select("*, responsibilities:experience_responsibilities(*), images:experience_images(*)")
    .order("sort_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (!adminView) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;
  if (error) return [];
  return data as Experience[];
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*, responsibilities:experience_responsibilities(*), images:experience_images(*)")
    .eq("id", id)
    .single();
  return data;
}

export async function createExperience(values: ExperienceInput) {
  const supabase = await createClient();
  const { responsibilities, ...expData } = values;

  const { data, error } = await supabase
    .from("experiences")
    .insert({ ...expData })
    .select()
    .single();

  if (error) return { error: error.message };

  if (responsibilities && responsibilities.length > 0) {
    const respRows = responsibilities.map((text, i) => ({
      experience_id: data.id,
      text,
      sort_order: i,
    }));
    await supabase.from("experience_responsibilities").insert(respRows);
  }

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  return { success: true, id: data.id };
}

export async function updateExperience(id: string, values: ExperienceInput) {
  const supabase = await createClient();
  const { responsibilities, ...expData } = values;

  const { error } = await supabase
    .from("experiences")
    .update({ ...expData, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  if (responsibilities !== undefined) {
    await supabase.from("experience_responsibilities").delete().eq("experience_id", id);
    if (responsibilities.length > 0) {
      const respRows = responsibilities.map((text, i) => ({
        experience_id: id,
        text,
        sort_order: i,
      }));
      await supabase.from("experience_responsibilities").insert(respRows);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/experiences");
  return { success: true };
}

export async function updateExperienceStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("experiences")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/experiences");
  return { success: true };
}
