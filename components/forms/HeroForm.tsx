"use client";

import { useState, useTransition } from "react";
import { upsertProfile } from "@/lib/actions/profile.actions";
import { uploadMedia } from "@/lib/actions/media.actions";
import { updateProfilePhoto } from "@/lib/actions/profile.actions";
import { Input, Textarea } from "@/components/ui/input";
import { Select, Switch } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { PageHeader, Card } from "@/components/ui/shared";
import { Profile } from "@/types";
import { toast } from "sonner";

const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available for opportunities" },
  { value: "open", label: "Open to offers" },
  { value: "busy", label: "Currently busy" },
  { value: "not_available", label: "Not available" },
];

interface HeroFormProps {
  profile: Profile | null;
}

export function HeroForm({ profile }: HeroFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showGpa, setShowGpa] = useState(profile?.show_gpa ?? false);
  const [showDownloadCv, setShowDownloadCv] = useState(true);
  const [heroPhotoUrl, setHeroPhotoUrl] = useState(profile?.hero_photo_url || null);

  const [formValues, setFormValues] = useState({
    full_name: profile?.full_name || "",
    headline: profile?.headline || "",
    short_bio: profile?.short_bio || "",
    university: profile?.university || "",
    major: profile?.major || "",
    gpa: profile?.gpa || "",
    availability_status: profile?.availability_status || "available",
  });

  const onSave = () => {
    startTransition(async () => {
      const result = await upsertProfile({
        ...formValues,
        gpa: formValues.gpa ? Number(formValues.gpa) : null,
        show_gpa: showGpa,
        hero_photo_url: heroPhotoUrl,
      });
      if (result?.error) toast.error(result.error);
      else toast.success("Hero berhasil disimpan");
    });
  };

  const setValue = (key: string, val: string) => setFormValues((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hero"
        description="Atur tampilan hero section halaman utama"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Hero" }]}
      />

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Teks Hero</h2>
        <div className="space-y-4">
          <Input label="Full Name" value={formValues.full_name} onChange={(e) => setValue("full_name", e.target.value)} placeholder="Muhammad Rifat Hakim" helperText="Nama besar yang tampil di hero" />
          <Input label="Headline / Tagline" value={formValues.headline} onChange={(e) => setValue("headline", e.target.value)} placeholder="Networking & Web Development" />
          <Textarea label="Short Introduction" value={formValues.short_bio} onChange={(e) => setValue("short_bio", e.target.value)} rows={3} placeholder="Deskripsi singkat tentang diri Anda..." helperText="Ditampilkan di bawah headline" />
        </div>
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Informasi Akademik</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="University" value={formValues.university} onChange={(e) => setValue("university", e.target.value)} placeholder="Universitas Gunadarma" />
          <Input label="Major" value={formValues.major} onChange={(e) => setValue("major", e.target.value)} placeholder="Informatika" />
        </div>
        <div className="mt-4 space-y-3">
          <Switch label="Tampilkan GPA di hero" checked={showGpa} onChange={setShowGpa} />
          {showGpa && (
            <Input label="GPA" type="number" step="0.01" max={4} value={String(formValues.gpa)} onChange={(e) => setValue("gpa", e.target.value)} placeholder="3.85" />
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Pengaturan</h2>
        <div className="space-y-4">
          <Select label="Availability Status" options={AVAILABILITY_OPTIONS} value={formValues.availability_status} onChange={(e) => setValue("availability_status", e.target.value)} />
          <Switch label="Tampilkan tombol Download CV" checked={showDownloadCv} onChange={setShowDownloadCv} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Hero Photo</h2>
        <MediaUploader
          label="Foto Hero"
          helperText="Foto Anda yang tampil di hero section"
          currentUrl={heroPhotoUrl}
          uploadAction={uploadMedia}
          onUploadComplete={async (url) => {
            setHeroPhotoUrl(url);
            await updateProfilePhoto("hero_photo_url", url);
          }}
          onClear={async () => {
            setHeroPhotoUrl(null);
            await updateProfilePhoto("hero_photo_url", "");
          }}
        />
      </Card>

      <div className="flex gap-3">
        <Button onClick={onSave} loading={isPending}>
          {isPending ? "Menyimpan..." : "Simpan Hero"}
        </Button>
      </div>
    </div>
  );
}
