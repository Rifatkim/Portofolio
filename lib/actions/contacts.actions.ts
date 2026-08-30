"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Contact } from "@/types";

export async function getContacts(adminView = false) {
  const supabase = await createClient();
  let query = supabase
    .from("contacts")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!adminView) {
    query = query.eq("is_visible", true);
  }

  const { data, error } = await query;
  if (error) return [];
  return data as Contact[];
}

export async function createContact(values: Partial<Contact>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("contacts").insert({ ...values }).select().single();
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/contacts");
  return { success: true, id: data.id };
}

export async function updateContact(id: string, values: Partial<Contact>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contacts")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/contacts");
  return { success: true };
}

export async function deleteContact(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/contacts");
  return { success: true };
}
