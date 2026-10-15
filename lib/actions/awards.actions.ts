"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Award, AwardInput } from "@/types";

export async function getAwards(adminView = false): Promise<Award[]> {
  const supabase = await createClient();
  let query = supabase
    .from("awards")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("award_month", { ascending: false });

  if (!adminView) {
    query = query.eq("is_published", true).neq("image_url", "");
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching awards:", error.message);
    return [];
  }
  return data as Award[];
}

export async function getAwardById(id: string): Promise<Award | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("awards")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Award;
}

export async function createAward(values: AwardInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("awards")
    .insert({ ...values })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/awards");
  revalidatePath("/admin/dashboard");
  return { success: true, id: data.id };
}

export async function updateAward(id: string, values: Partial<AwardInput>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("awards")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/awards");
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function deleteAward(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("awards").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/awards");
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function updateAwardStatus(id: string, is_published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("awards")
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/awards");
  revalidatePath("/admin/dashboard");
  return { success: true };
}
