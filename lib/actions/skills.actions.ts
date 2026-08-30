"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { SkillCategory, Skill } from "@/types";

export async function getSkillCategories(adminView = false) {
  const supabase = await createClient();
  let query = supabase
    .from("skill_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!adminView) {
    query = query.eq("is_visible", true);
  }

  const { data, error } = await query;
  if (error) return [];
  return data as SkillCategory[];
}

export async function getSkills(adminView = false) {
  const supabase = await createClient();
  let query = supabase
    .from("skills")
    .select("*, category:skill_categories(*)")
    .order("sort_order", { ascending: true });

  if (!adminView) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;
  if (error) return [];
  return data as Skill[];
}

export async function createSkillCategory(values: Partial<SkillCategory>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("skill_categories").insert({ ...values }).select().single();
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true, id: data.id };
}

export async function updateSkillCategory(id: string, values: Partial<SkillCategory>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("skill_categories")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkillCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("skill_categories").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function createSkill(values: Partial<Skill>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("skills").insert({ ...values }).select().single();
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true, id: data.id };
}

export async function updateSkill(id: string, values: Partial<Skill>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("skills")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}
