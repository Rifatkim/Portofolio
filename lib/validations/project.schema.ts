import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Nama project wajib diisi").max(200),
  slug: z.string().min(1, "Slug wajib diisi").max(200).regex(/^[a-z0-9-]+$/, "Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung"),
  short_summary: z.string().max(500).optional().nullable(),
  full_description: z.string().max(10000).optional().nullable(),
  background: z.string().max(5000).optional().nullable(),
  problem: z.string().max(5000).optional().nullable(),
  solution: z.string().max(5000).optional().nullable(),
  my_role: z.string().max(2000).optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  project_status: z.string().max(100).optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  key_features: z.array(z.string()).optional(),
  challenges: z.string().max(5000).optional().nullable(),
  outcome: z.string().max(5000).optional().nullable(),
  demo_url: z.string().url("URL tidak valid").optional().nullable().or(z.literal("")),
  repo_url: z.string().url("URL tidak valid").optional().nullable().or(z.literal("")),
  is_featured: z.boolean().optional(),
  status: z.enum(["draft", "published", "hidden", "archived"]),
  sort_order: z.coerce.number().min(0).optional(),
  technologies: z.array(z.string()).optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
