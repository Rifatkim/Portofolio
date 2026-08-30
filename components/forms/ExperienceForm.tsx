"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { experienceSchema, ExperienceFormValues } from "@/lib/validations/experience.schema";
import { createExperience, updateExperience } from "@/lib/actions/experiences.actions";
import { uploadMedia } from "@/lib/actions/media.actions";
import { Input, Textarea } from "@/components/ui/input";
import { Select, Switch } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { DynamicList, TagInput } from "@/components/admin/DynamicList";
import { PageHeader, Card } from "@/components/ui/shared";
import { Experience, ExperienceInput } from "@/types";
import { toast } from "sonner";

const TYPE_OPTIONS = [
  { value: "work", label: "Work / Full-time" },
  { value: "internship", label: "Internship" },
  { value: "organization", label: "Organization" },
  { value: "volunteer", label: "Volunteer" },
  { value: "education", label: "Education" },
  { value: "freelance", label: "Freelance" },
  { value: "other", label: "Other" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "hidden", label: "Hidden" },
  { value: "archived", label: "Archived" },
];

interface ExperienceFormProps {
  experience?: Experience | null;
  isEdit?: boolean;
}

export function ExperienceForm({ experience, isEdit = false }: ExperienceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCurrent, setIsCurrent] = useState(experience?.is_current ?? false);
  const [responsibilities, setResponsibilities] = useState<string[]>(
    experience?.responsibilities?.map((r) => r.text) || []
  );
  const [achievements, setAchievements] = useState<string[]>(experience?.achievements || []);
  const [relatedTech, setRelatedTech] = useState<string[]>(experience?.related_tech || []);
  const [logoUrl, setLogoUrl] = useState(experience?.logo_url || null);
  const [mainPhotoUrl, setMainPhotoUrl] = useState(experience?.main_photo_url || null);

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      position: experience?.position || "",
      organization: experience?.organization || "",
      type: experience?.type || "work",
      location: experience?.location || "",
      start_date: experience?.start_date ? experience.start_date.split("T")[0] : "",
      end_date: experience?.end_date ? experience.end_date.split("T")[0] : "",
      is_current: experience?.is_current ?? false,
      short_description: experience?.short_description || "",
      responsibilities: [],
      achievements: [],
      related_tech: [],
      org_url: experience?.org_url || "",
      status: experience?.status || "draft",
      sort_order: experience?.sort_order ?? 0,
    },
  });

  const onSubmit: SubmitHandler<ExperienceFormValues> = (values) => {
    startTransition(async () => {
      const finalValues: ExperienceInput = {
        ...values,
        is_current: isCurrent,
        responsibilities,
        achievements,
        related_tech: relatedTech,
        logo_url: logoUrl,
        main_photo_url: mainPhotoUrl,
        org_url: values.org_url || null,
        end_date: isCurrent ? null : values.end_date || null,
      };

      let result;
      if (isEdit && experience) {
        result = await updateExperience(experience.id, finalValues);
      } else {
        result = await createExperience(finalValues);
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEdit ? "Experience berhasil diperbarui" : "Experience berhasil dibuat");
        router.push("/admin/experiences");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <PageHeader
        title={isEdit ? "Edit Experience" : "New Experience"}
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Experiences", href: "/admin/experiences" },
          { label: isEdit ? "Edit" : "New" },
        ]}
      />

      {/* Basic Info */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Informasi Dasar</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Position / Role" required placeholder="Software Engineer" {...form.register("position")} error={form.formState.errors.position?.message} />
            <Input label="Organization" required placeholder="PT. Contoh Indonesia" {...form.register("organization")} error={form.formState.errors.organization?.message} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Type" options={TYPE_OPTIONS} {...form.register("type")} />
            <Input label="Location" placeholder="Jakarta, Indonesia" {...form.register("location")} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <Input label="Start Date" type="date" {...form.register("start_date")} />
            <Input label="End Date" type="date" disabled={isCurrent} {...form.register("end_date")} />
            <Switch label="Currently working here" checked={isCurrent} onChange={setIsCurrent} />
          </div>
          <Input label="Organization URL" type="url" placeholder="https://company.com" {...form.register("org_url")} />
          <Textarea label="Short Description" placeholder="Deskripsi singkat posisi..." rows={3} {...form.register("short_description")} />
        </div>
      </Card>

      {/* Details */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Detail</h2>
        <div className="space-y-5">
          <DynamicList
            label="Responsibilities"
            helperText="Deskripsi tanggung jawab Anda"
            items={responsibilities}
            onChange={setResponsibilities}
            placeholder="Tambah tanggung jawab..."
            addLabel="Add"
          />
          <DynamicList
            label="Achievements"
            helperText="Pencapaian selama di posisi ini"
            items={achievements}
            onChange={setAchievements}
            placeholder="Tambah pencapaian..."
            addLabel="Add"
          />
          <TagInput
            label="Related Technologies / Equipment"
            tags={relatedTech}
            onChange={setRelatedTech}
            placeholder="Type and press Enter..."
            helperText="Teknologi atau peralatan yang digunakan"
          />
        </div>
      </Card>

      {/* Media */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaUploader
            label="Organization Logo"
            currentUrl={logoUrl}
            uploadAction={uploadMedia}
            onUploadComplete={(url) => setLogoUrl(url)}
            onClear={() => setLogoUrl(null)}
          />
          <MediaUploader
            label="Main Photo"
            currentUrl={mainPhotoUrl}
            uploadAction={uploadMedia}
            onUploadComplete={(url) => setMainPhotoUrl(url)}
            onClear={() => setMainPhotoUrl(null)}
          />
        </div>
      </Card>

      {/* Publication */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Publikasi</h2>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Status" options={STATUS_OPTIONS} {...form.register("status")} />
          <Input label="Sort Order" type="number" min={0} helperText="0 = pertama" {...form.register("sort_order")} />
        </div>
      </Card>

      <div className="flex gap-3 pb-8">
        <Button type="submit" loading={isPending}>
          {isPending ? "Menyimpan..." : (isEdit ? "Update" : "Buat Experience")}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/experiences")}>
          Batal
        </Button>
      </div>
    </form>
  );
}
