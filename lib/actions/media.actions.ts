"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { Media } from "@/types";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function getMediaLibrary(search?: string, type?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("original_filename", `%${search}%`);
  }

  if (type === "image") {
    query = query.like("mime_type", "image/%");
  } else if (type === "pdf") {
    query = query.eq("mime_type", "application/pdf");
  }

  const { data, error } = await query;
  if (error) return [];
  return data as Media[];
}

export async function uploadMedia(formData: FormData) {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const file = formData.get("file") as File;
  const altText = formData.get("alt_text") as string || "";
  const caption = formData.get("caption") as string || "";

  if (!file) return { error: "No file provided" };

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "File type tidak didukung. Gunakan JPG, PNG, WebP, atau PDF." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: "Ukuran file terlalu besar. Maksimal 10MB." };
  }

  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
  const filename = `${timestamp}-${randomId}-${sanitizedName}`;
  const storagePath = `uploads/${filename}`;

  const { error: uploadError } = await adminClient.storage
    .from("portfolio-public")
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) return { error: uploadError.message };

  const { data: urlData } = adminClient.storage
    .from("portfolio-public")
    .getPublicUrl(storagePath);

  const { data, error: dbError } = await supabase.from("media").insert({
    filename,
    original_filename: file.name,
    storage_path: storagePath,
    public_url: urlData.publicUrl,
    mime_type: file.type,
    file_size: file.size,
    alt_text: altText || null,
    caption: caption || null,
  }).select().single();

  if (dbError) return { error: dbError.message };

  revalidatePath("/admin/media");
  return { success: true, media: data as Media };
}

export async function updateMedia(id: string, values: Partial<Media>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("media")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/media");
  return { success: true };
}

export async function deleteMedia(id: string) {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const { data: media } = await supabase.from("media").select("storage_path").eq("id", id).single();

  if (media?.storage_path) {
    await adminClient.storage.from("portfolio-public").remove([media.storage_path]);
  }

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/media");
  return { success: true };
}
