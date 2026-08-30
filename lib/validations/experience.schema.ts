import { z } from "zod";

export const experienceSchema = z.object({
  position: z.string().min(1, "Posisi wajib diisi").max(200),
  organization: z.string().min(1, "Organisasi wajib diisi").max(200),
  type: z.enum(["work", "internship", "organization", "volunteer", "education", "freelance", "other"]),
  location: z.string().max(200).optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  is_current: z.boolean().optional(),
  short_description: z.string().max(1000).optional().nullable(),
  responsibilities: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  related_tech: z.array(z.string()).optional(),
  org_url: z.string().url("URL tidak valid").optional().nullable().or(z.literal("")),
  status: z.enum(["draft", "published", "hidden", "archived"]),
  sort_order: z.coerce.number().int().min(0).optional(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
