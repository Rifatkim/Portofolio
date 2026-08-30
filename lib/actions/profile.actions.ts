"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Profile } from "@/types";

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profile")
    .select("*")
    .single();
  return data;
}

export async function upsertProfile(values: Partial<Profile>) {
  const supabase = await createClient();

  const { data: existing } = await supabase.from("profile").select("id").single();

  let result;
  if (existing) {
    result = await supabase
      .from("profile")
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    result = await supabase.from("profile").insert({ ...values });
  }

  if (result.error) return { error: result.error.message };

  revalidatePath("/");
  revalidatePath("/admin/profile");
  return { success: true };
}

export async function updateProfilePhoto(field: "profile_photo_url" | "hero_photo_url" | "cv_url", url: string) {
  const supabase = await createClient();
  const { data: existing } = await supabase.from("profile").select("id").single();

  if (!existing) {
    // Create profile first
    await supabase.from("profile").insert({ [field]: url } as Partial<Profile>);
  } else {
    await supabase.from("profile").update({ [field]: url, updated_at: new Date().toISOString() }).eq("id", existing.id);
  }

  revalidatePath("/");
  revalidatePath("/admin/profile");
  return { success: true };
}
