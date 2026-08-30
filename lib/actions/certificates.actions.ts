"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Certificate } from "@/types";

export async function getCertificates(adminView = false) {
  const supabase = await createClient();
  let query = supabase
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("issue_date", { ascending: false });

  if (!adminView) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;
  if (error) return [];
  return data as Certificate[];
}

export async function getCertificateById(id: string): Promise<Certificate | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("certificates").select("*").eq("id", id).single();
  return data;
}

export async function createCertificate(values: Partial<Certificate>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("certificates").insert({ ...values }).select().single();
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true, id: data.id };
}

export async function updateCertificate(id: string, values: Partial<Certificate>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("certificates")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true };
}

export async function deleteCertificate(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("certificates").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true };
}

export async function updateCertificateStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("certificates")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true };
}
