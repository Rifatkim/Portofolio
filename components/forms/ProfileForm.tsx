"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "@/lib/validations/profile.schema";
import { upsertProfile, updateProfilePhoto } from "@/lib/actions/profile.actions";
import { uploadMedia } from "@/lib/actions/media.actions";
import { Input, Textarea } from "@/components/ui/input";
import { Select, Switch } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Card } from "@/components/ui/shared";
import { Profile } from "@/types";
import { toast } from "sonner";

const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available for opportunities" },
  { value: "open", label: "Open to offers" },
  { value: "busy", label: "Currently busy" },
  { value: "not_available", label: "Not available" },
];

const STUDENT_STATUS_OPTIONS = [
  { value: "active", label: "Active Student" },
  { value: "graduate", label: "Graduate" },
];

interface ProfileFormProps {
  profile: Profile | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showGpa, setShowGpa] = useState(profile?.show_gpa ?? false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(profile?.profile_photo_url || null);
  const [heroPhotoUrl, setHeroPhotoUrl] = useState(profile?.hero_photo_url || null);
  const [cvUrl, setCvUrl] = useState(profile?.cv_url || null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      headline: profile?.headline || "",
      university: profile?.university || "",
      major: profile?.major || "",
      student_status: profile?.student_status || "active",
      location: profile?.location || "",
      gpa: profile?.gpa ?? undefined,
      gpa_scale: profile?.gpa_scale ?? 4,
      show_gpa: profile?.show_gpa ?? false,
      short_bio: profile?.short_bio || "",
      detailed_bio: profile?.detailed_bio || "",
      availability_status: profile?.availability_status || "available",
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (values) => {
    startTransition(async () => {
      const result = await upsertProfile({ ...values, show_gpa: showGpa });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Profile berhasil disimpan");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Informasi Pribadi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            required
            placeholder="Muhammad Rifat Hakim"
            {...form.register("full_name")}
            error={form.formState.errors.full_name?.message}
          />
          <Input
            label="Headline"
            placeholder="Networking & Web Development"
            helperText="Ditampilkan di bawah nama"
            {...form.register("headline")}
          />
          <Input
            label="University"
            placeholder="Universitas Gunadarma"
            {...form.register("university")}
          />
          <Input
            label="Major"
            placeholder="Informatika"
            {...form.register("major")}
          />
          <Select
            label="Student Status"
            options={STUDENT_STATUS_OPTIONS}
            {...form.register("student_status")}
          />
          <Input
            label="Location"
            placeholder="Depok, Jawa Barat"
            {...form.register("location")}
          />
        </div>
      </Card>

      {/* GPA */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">IPK / GPA</h2>
        <div className="space-y-4">
          <Switch
            label="Tampilkan IPK di portfolio"
            checked={showGpa}
            onChange={setShowGpa}
          />
          {showGpa && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="GPA"
                type="number"
                step="0.01"
                min={0}
                max={4}
                placeholder="3.85"
                helperText="Nilai IPK Anda"
                {...form.register("gpa")}
              />
              <Input
                label="GPA Scale"
                type="number"
                step="0.01"
                min={0}
                max={4}
                placeholder="4.00"
                helperText="Skala maksimal"
                {...form.register("gpa_scale")}
              />
            </div>
          )}
        </div>
      </Card>

      {/* Bio */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Bio</h2>
        <div className="space-y-4">
          <Textarea
            label="Short Bio"
            placeholder="Bio singkat untuk hero section..."
            helperText="Maks. 500 karakter"
            rows={3}
            {...form.register("short_bio")}
          />
          <Textarea
            label="Detailed Bio"
            placeholder="Deskripsi lengkap tentang diri Anda untuk section About..."
            helperText="Maks. 5000 karakter"
            rows={6}
            {...form.register("detailed_bio")}
          />
          <Select
            label="Availability Status"
            options={AVAILABILITY_OPTIONS}
            {...form.register("availability_status")}
          />
        </div>
      </Card>

      {/* Photos */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Foto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaUploader
            label="Profile / About Photo"
            helperText="Foto untuk section Profile & About"
            currentUrl={profilePhotoUrl}
            uploadAction={uploadMedia}
            onUploadComplete={async (url) => {
              setProfilePhotoUrl(url);
              await updateProfilePhoto("profile_photo_url", url);
            }}
            onClear={async () => {
              setProfilePhotoUrl(null);
              await updateProfilePhoto("profile_photo_url", "");
            }}
          />
          <MediaUploader
            label="Hero Photo"
            helperText="Foto utama untuk hero section"
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
        </div>
      </Card>

      {/* CV */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">CV / Resume</h2>
        <MediaUploader
          label="CV File (PDF)"
          helperText="File CV dalam format PDF"
          accept="application/pdf"
          currentUrl={cvUrl}
          currentName={cvUrl ? "cv.pdf" : null}
          uploadAction={uploadMedia}
          onUploadComplete={async (url) => {
            setCvUrl(url);
            await updateProfilePhoto("cv_url", url);
          }}
          onClear={async () => {
            setCvUrl(null);
            await updateProfilePhoto("cv_url", "");
          }}
        />
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" loading={isPending}>
          {isPending ? "Menyimpan..." : "Simpan Profile"}
        </Button>
      </div>
    </form>
  );
}
