import { z } from "zod";

export const certificateSchema = z.object({
  name: z.string().min(1, "Nama sertifikat wajib diisi").max(200),
  issuer: z.string().min(1, "Penerbit wajib diisi").max(200),
  credential_id: z.string().max(200).optional().nullable(),
  show_credential_id: z.boolean().optional(),
  issue_date: z.string().optional().nullable(),
  expiration_date: z.string().optional().nullable(),
  does_not_expire: z.boolean().optional(),
  description: z.string().max(3000).optional().nullable(),
  related_skills: z.array(z.string()).optional(),
  credential_url: z.string().url("URL tidak valid").optional().nullable().or(z.literal("")),
  allow_download: z.boolean().optional(),
  status: z.enum(["draft", "published", "hidden", "archived"]),
  sort_order: z.coerce.number().int().min(0).optional(),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;
