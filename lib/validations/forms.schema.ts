import { z } from "zod";

export const contactSchema = z.object({
  platform: z.string().min(1, "Platform wajib diisi").max(100),
  display_label: z.string().min(1, "Label wajib diisi").max(100),
  value: z.string().min(1, "Nilai wajib diisi").max(500),
  url: z.string().url("URL tidak valid").optional().nullable().or(z.literal("")),
  icon: z.string().max(50).optional().nullable(),
  is_visible: z.boolean().optional(),
  sort_order: z.coerce.number().int().min(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const skillCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi").max(100),
  description: z.string().max(500).optional().nullable(),
  sort_order: z.coerce.number().int().min(0).optional(),
  is_visible: z.boolean().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Nama skill wajib diisi").max(100),
  category_id: z.string().optional().nullable(),
  icon: z.string().max(100).optional().nullable(),
  description: z.string().max(500).optional().nullable(),
  level: z.enum(["beginner", "elementary", "intermediate", "advanced", "expert"]).optional().nullable(),
  sort_order: z.coerce.number().int().min(0).optional(),
  status: z.enum(["draft", "published", "hidden", "archived"]),
});

export type SkillCategoryFormValues = z.infer<typeof skillCategorySchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
