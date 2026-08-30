import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(1, "Nama lengkap wajib diisi").max(150),
  headline: z.string().max(200).optional().nullable(),
  university: z.string().max(200).optional().nullable(),
  major: z.string().max(200).optional().nullable(),
  student_status: z.string().max(100).optional().nullable(),
  location: z.string().max(200).optional().nullable(),
  gpa: z.coerce.number().min(0).max(4).optional().nullable(),
  gpa_scale: z.coerce.number().min(0).max(4).optional().nullable(),
  show_gpa: z.boolean().optional(),
  short_bio: z.string().max(500).optional().nullable(),
  detailed_bio: z.string().max(5000).optional().nullable(),
  availability_status: z.string().max(100).optional().nullable(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
