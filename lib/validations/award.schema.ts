import { z } from "zod";

export const awardSchema = z.object({
  placement: z.string().min(1, "Placement wajib diisi").max(100),
  title: z.string().min(1, "Award title wajib diisi").max(300),
  award_month: z.string().regex(/^\d{4}-\d{2}$/, "Bulan dan tahun harus berformat YYYY-MM"),
  image_url: z.string().min(1, "Foto penghargaan wajib diisi"),
  is_published: z.boolean().optional(),
  sort_order: z.coerce.number().int().min(0).optional(),
});

export type AwardFormValues = z.infer<typeof awardSchema>;
