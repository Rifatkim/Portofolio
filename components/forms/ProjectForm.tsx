"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { projectSchema, ProjectFormValues } from "@/lib/validations/project.schema";
import { createProject, updateProject } from "@/lib/actions/projects.actions";
import { uploadMedia } from "@/lib/actions/media.actions";
import { Input, Textarea } from "@/components/ui/input";
import { Select, Switch } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { DynamicList, TagInput } from "@/components/admin/DynamicList";
import { PageHeader, Card } from "@/components/ui/shared";
import { Project, ProjectInput } from "@/types";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "hidden", label: "Hidden" },
  { value: "archived", label: "Archived" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "— Pilih kategori —" },
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App" },
  { value: "networking", label: "Networking" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full Stack" },
  { value: "other", label: "Other" },
];

const PROJECT_STATUS_OPTIONS = [
  { value: "", label: "— Status project —" },
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "Ongoing" },
  { value: "paused", label: "Paused" },
  { value: "cancelled", label: "Cancelled" },
];

interface ProjectFormProps {
  project?: Project | null;
  isEdit?: boolean;
}

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFeatured, setIsFeatured] = useState(project?.is_featured ?? false);
  const [technologies, setTechnologies] = useState<string[]>(
    project?.technologies?.map((t) => t.name) || []
  );
  const [keyFeatures, setKeyFeatures] = useState<string[]>(project?.key_features || []);
  const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnail_url || null);
  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      slug: project?.slug || "",
      short_summary: project?.short_summary || "",
      full_description: project?.full_description || "",
      background: project?.background || "",
      problem: project?.problem || "",
      solution: project?.solution || "",
      my_role: project?.my_role || "",
      category: project?.category || "",
      project_status: project?.project_status || "",
      start_date: project?.start_date ? project.start_date.split("T")[0] : "",
      end_date: project?.end_date ? project.end_date.split("T")[0] : "",
      key_features: project?.key_features || [],
      challenges: project?.challenges || "",
      outcome: project?.outcome || "",
      demo_url: project?.demo_url || "",
      repo_url: project?.repo_url || "",
      is_featured: project?.is_featured ?? false,
      status: project?.status || "draft",
      sort_order: project?.sort_order ?? 0,
      technologies: [],
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue("name", val);
    if (autoSlug) {
      form.setValue("slug", slugify(val));
    }
  };

  const handleSave = (values: ProjectFormValues, asDraft?: boolean) => {
    startTransition(async () => {
      const finalValues: ProjectInput = {
        ...values,
        status: asDraft ? "draft" : values.status,
        is_featured: isFeatured,
        technologies,
        key_features: keyFeatures,
        thumbnail_url: thumbnailUrl,
        demo_url: values.demo_url || null,
        repo_url: values.repo_url || null,
      };

      let result;
      if (isEdit && project) {
        result = await updateProject(project.id, finalValues);
      } else {
        result = await createProject(finalValues);
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEdit ? "Project berhasil diperbarui" : "Project berhasil dibuat");
        router.push("/admin/projects");
      }
    });
  };

  const onSubmit: SubmitHandler<ProjectFormValues> = (values) => {
    handleSave(values, false);
  };

  const onDraftClick = () => {
    form.handleSubmit((values) => handleSave(values, true))();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <PageHeader
        title={isEdit ? "Edit Project" : "New Project"}
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Projects", href: "/admin/projects" },
          { label: isEdit ? "Edit" : "New" },
        ]}
        actions={
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onDraftClick}
              loading={isPending}
            >
              Save Draft
            </Button>
            <Button type="submit" size="sm" loading={isPending}>
              Save Project
            </Button>
          </div>
        }
      />

      {/* Basic Info */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Informasi Dasar</h2>
        <div className="space-y-4">
          <Input
            label="Project Name"
            required
            placeholder="Nama project"
            {...form.register("name")}
            onChange={handleNameChange}
            error={form.formState.errors.name?.message}
          />
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                label="Slug"
                required
                placeholder="nama-project"
                helperText="URL: /projects/[slug]"
                {...form.register("slug")}
                onChange={(e) => { setAutoSlug(false); form.setValue("slug", e.target.value); }}
                error={form.formState.errors.slug?.message}
              />
            </div>
            {!isEdit && (
              <button
                type="button"
                onClick={() => { setAutoSlug(true); form.setValue("slug", slugify(form.getValues("name"))); }}
                className="text-xs text-[#737373] underline mb-6 whitespace-nowrap"
              >
                Auto-generate
              </button>
            )}
          </div>
          <Textarea
            label="Short Summary"
            placeholder="Deskripsi singkat (ditampilkan di card)"
            helperText="Maks. 500 karakter"
            rows={2}
            {...form.register("short_summary")}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              options={CATEGORY_OPTIONS}
              {...form.register("category")}
            />
            <Select
              label="Project Status"
              options={PROJECT_STATUS_OPTIONS}
              {...form.register("project_status")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" {...form.register("start_date")} />
            <Input label="End Date" type="date" helperText="Kosongkan jika masih ongoing" {...form.register("end_date")} />
          </div>
        </div>
      </Card>

      {/* Full Description */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Deskripsi Lengkap</h2>
        <div className="space-y-4">
          <Textarea label="Full Description" placeholder="Deskripsi lengkap project..." rows={5} {...form.register("full_description")} />
          <Textarea label="Background / Context" placeholder="Latar belakang project..." rows={3} {...form.register("background")} />
          <Textarea label="Problem" placeholder="Masalah yang diselesaikan..." rows={3} {...form.register("problem")} />
          <Textarea label="Solution" placeholder="Solusi yang diterapkan..." rows={3} {...form.register("solution")} />
          <Textarea label="My Role" placeholder="Peran Anda dalam project ini..." rows={2} {...form.register("my_role")} />
          <DynamicList
            label="Key Features"
            items={keyFeatures}
            onChange={setKeyFeatures}
            placeholder="Tambah fitur utama..."
            addLabel="Add Feature"
          />
          <Textarea label="Challenges" placeholder="Tantangan yang dihadapi..." rows={3} {...form.register("challenges")} />
          <Textarea label="Result / Outcome" placeholder="Hasil dan dampak project..." rows={3} {...form.register("outcome")} />
        </div>
      </Card>

      {/* Technologies */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Teknologi</h2>
        <TagInput
          label="Technologies Used"
          tags={technologies}
          onChange={setTechnologies}
          placeholder="Type technology and press Enter..."
          helperText="Contoh: React, TypeScript, Node.js, PostgreSQL"
        />
      </Card>

      {/* Links */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Demo URL" type="url" placeholder="https://demo.example.com" {...form.register("demo_url")} error={form.formState.errors.demo_url?.message} />
          <Input label="Repository URL" type="url" placeholder="https://github.com/username/repo" {...form.register("repo_url")} error={form.formState.errors.repo_url?.message} />
        </div>
      </Card>

      {/* Thumbnail */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Thumbnail</h2>
        <MediaUploader
          label="Project Thumbnail"
          helperText="Gambar utama project (ditampilkan di list)"
          currentUrl={thumbnailUrl}
          uploadAction={uploadMedia}
          onUploadComplete={(url) => setThumbnailUrl(url)}
          onClear={() => setThumbnailUrl(null)}
        />
      </Card>

      {/* Publication settings */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Pengaturan Publikasi</h2>
        <div className="space-y-4">
          <Select
            label="Publication Status"
            options={STATUS_OPTIONS}
            {...form.register("status")}
          />
          <Switch
            label="Featured Project"
            helperText="Tampilkan di bagian featured"
            checked={isFeatured}
            onChange={setIsFeatured}
          />
          <Input
            label="Sort Order"
            type="number"
            min={0}
            helperText="Urutan tampil (0 = pertama)"
            {...form.register("sort_order")}
          />
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 pb-8">
        <Button type="submit" loading={isPending}>
          {isPending ? "Menyimpan..." : (isEdit ? "Update Project" : "Buat Project")}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onDraftClick}
          loading={isPending}
        >
          Save as Draft
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/projects")}>
          Batal
        </Button>
      </div>
    </form>
  );
}
