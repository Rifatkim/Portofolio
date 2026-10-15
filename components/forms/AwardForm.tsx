"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { awardSchema, AwardFormValues } from "@/lib/validations/award.schema";
import { createAward, updateAward } from "@/lib/actions/awards.actions";
import { uploadMedia } from "@/lib/actions/media.actions";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { PageHeader, Card } from "@/components/ui/shared";
import { Award } from "@/types";
import { toast } from "sonner";

interface AwardFormProps {
  award?: Award | null;
  isEdit?: boolean;
}

export function AwardForm({ award, isEdit = false }: AwardFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(
    award?.image_url || null
  );
  const [isPublished, setIsPublished] = useState<boolean>(
    award ? award.is_published : true
  );

  const form = useForm<AwardFormValues>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      placement: award?.placement || "",
      title: award?.title || "",
      award_month: award?.award_month || "",
      image_url: award?.image_url || "",
      is_published: award ? award.is_published : true,
      sort_order: award?.sort_order ?? 0,
    },
  });

  const onSubmit: SubmitHandler<AwardFormValues> = (values) => {
    if (!imageUrl) {
      toast.error("Foto penghargaan wajib diunggah");
      return;
    }

    startTransition(async () => {
      const finalData = {
        placement: values.placement.trim(),
        title: values.title.trim(),
        award_month: values.award_month,
        image_url: imageUrl,
        is_published: isPublished,
        sort_order: values.sort_order ?? 0,
      };

      if (isEdit && award) {
        const result = await updateAward(award.id, finalData);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Award berhasil diperbarui");
          router.push("/admin/awards");
          router.refresh();
        }
      } else {
        const result = await createAward(finalData);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Award berhasil ditambahkan");
          router.push("/admin/awards");
          router.refresh();
        }
      }
    });
  };

  return (
    <div className="max-w-3xl">
      <PageHeader
        title={isEdit ? "Edit Award" : "New Award"}
        description={
          isEdit
            ? `Edit pencapaian "${award?.title}"`
            : "Tambahkan penghargaan atau prestasi kompetisi baru"
        }
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Awards", href: "/admin/awards" },
          { label: isEdit ? "Edit" : "New" },
        ]}
      />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Award Information */}
        <Card>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">
            Award Information
          </h2>

          <div className="space-y-4">
            {/* 1. Placement */}
            <Input
              label="Placement"
              placeholder="e.g. 1st Place, 2nd Place, Finalist"
              required
              {...form.register("placement")}
              error={form.formState.errors.placement?.message}
            />

            {/* 2. Award Title */}
            <Input
              label="Award Title"
              placeholder="e.g. Startup Competition – Gunadarma Industrial Engineering Fair 2026"
              required
              {...form.register("title")}
              error={form.formState.errors.title?.message}
            />

            {/* 3. Month and Year */}
            <Input
              label="Month and Year"
              type="month"
              required
              {...form.register("award_month")}
              error={form.formState.errors.award_month?.message}
            />
          </div>
        </Card>

        {/* 4. Award Photo */}
        <Card>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">
            Award Photo
          </h2>

          <div className="space-y-2">
            <MediaUploader
              label="Award Photo"
              helperText="Foto piala, sertifikat juara, atau dokumentasi panggung (format JPG, PNG, WebP)"
              currentUrl={imageUrl}
              uploadAction={uploadMedia}
              onUploadComplete={(url) => {
                setImageUrl(url);
                form.setValue("image_url", url, { shouldValidate: true });
              }}
              onClear={() => {
                setImageUrl(null);
                form.setValue("image_url", "", { shouldValidate: true });
              }}
            />
            {form.formState.errors.image_url && (
              <p className="text-xs text-red-500 font-mono mt-1">
                {form.formState.errors.image_url.message}
              </p>
            )}
          </div>
        </Card>

        {/* Publication Control */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-black">
                Publikasikan ke Portofolio
              </p>
              <p className="text-xs text-[#737373] mt-0.5">
                Pencapaian akan langsung tampil di section Achievements halaman utama
              </p>
            </div>
            <Switch
              label=""
              checked={isPublished}
              onChange={setIsPublished}
            />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/awards")}
            disabled={isPending}
          >
            Batal
          </Button>
          <Button type="submit" size="sm" loading={isPending}>
            {isEdit ? "Simpan Perubahan" : "Simpan Award"}
          </Button>
        </div>
      </form>
    </div>
  );
}
