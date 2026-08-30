"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { SiteSettings } from "@/types";

const DEFAULT_SETTINGS: SiteSettings = {
  site_title: "Muhammad Rifat Hakim",
  site_description: "Personal Portfolio",
  seo_description: "",
  seo_image_url: "",
  favicon_url: "",
  copyright_text: `© ${new Date().getFullYear()} Muhammad Rifat Hakim`,
  show_cv_button: true,
  contact_section_enabled: true,
  maintenance_mode: false,
  social_preview_url: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");

  if (!data || data.length === 0) return DEFAULT_SETTINGS;

  const settings: Record<string, string> = {};
  data.forEach(({ key, value }) => {
    if (value !== null) settings[key] = value;
  });

  return {
    site_title: settings.site_title ?? DEFAULT_SETTINGS.site_title,
    site_description: settings.site_description ?? DEFAULT_SETTINGS.site_description,
    seo_description: settings.seo_description ?? DEFAULT_SETTINGS.seo_description,
    seo_image_url: settings.seo_image_url ?? DEFAULT_SETTINGS.seo_image_url,
    favicon_url: settings.favicon_url ?? DEFAULT_SETTINGS.favicon_url,
    copyright_text: settings.copyright_text ?? DEFAULT_SETTINGS.copyright_text,
    show_cv_button: settings.show_cv_button === "true",
    contact_section_enabled: settings.contact_section_enabled !== "false",
    maintenance_mode: settings.maintenance_mode === "true",
    social_preview_url: settings.social_preview_url ?? DEFAULT_SETTINGS.social_preview_url,
  };
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const rows = Object.entries(settings).map(([key, value]) => ({
      key,
      value: String(value),
      updated_at: new Date().toISOString(),
    }));

    for (const row of rows) {
      const { error } = await supabase
        .from("site_settings")
        .upsert(row, { onConflict: "key" });
      if (error) return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menyimpan settings";
    return { success: false, error: message };
  }
}

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: totalProjects },
    { count: publishedProjects },
    { count: draftProjects },
    { count: totalExperiences },
    { count: totalSkills },
    { count: totalCertificates },
    { count: totalMedia },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("experiences").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("media").select("*", { count: "exact", head: true }),
  ]);

  const { data: lastProject } = await supabase
    .from("projects")
    .select("updated_at")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  return {
    totalProjects: totalProjects ?? 0,
    publishedProjects: publishedProjects ?? 0,
    draftProjects: draftProjects ?? 0,
    totalExperiences: totalExperiences ?? 0,
    totalSkills: totalSkills ?? 0,
    totalCertificates: totalCertificates ?? 0,
    totalMedia: totalMedia ?? 0,
    lastUpdated: lastProject?.updated_at ?? null,
  };
}
