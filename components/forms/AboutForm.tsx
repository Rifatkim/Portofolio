"use client";

import { useState, useTransition } from "react";
import { upsertProfile, updateProfilePhoto } from "@/lib/actions/profile.actions";
import { uploadMedia } from "@/lib/actions/media.actions";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { PageHeader, Card } from "@/components/ui/shared";
import { Profile } from "@/types";
import { toast } from "sonner";

interface AboutFormProps {
  profile: Profile | null;
}

export function AboutForm({ profile }: AboutFormProps) {
  const [isPending, startTransition] = useTransition();
  const [detailedBio, setDetailedBio] = useState(profile?.detailed_bio || "");
  const [photoUrl, setPhotoUrl] = useState(profile?.profile_photo_url || null);

  const onSave = () => {
    startTransition(async () => {
      const result = await upsertProfile({ detailed_bio: detailedBio });
      if (result?.error) toast.error(result.error);
      else toast.success("About berhasil disimpan");
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="About"
        description="Kelola konten section About"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "About" }]}
      />

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">About / Bio</h2>
        <Textarea
          label="Detailed Bio"
          value={detailedBio}
          onChange={(e) => setDetailedBio(e.target.value)}
          rows={10}
          placeholder="Tuliskan deskripsi lengkap tentang diri Anda, latar belakang, minat, dan tujuan..."
          helperText="Teks ini ditampilkan di section Profile/About di halaman publik. Maks. 5000 karakter."
        />
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">About Photo</h2>
        <MediaUploader
          label="Profile / About Photo"
          helperText="Foto Anda untuk section About"
          currentUrl={photoUrl}
          uploadAction={uploadMedia}
          onUploadComplete={async (url) => {
            setPhotoUrl(url);
            await updateProfilePhoto("profile_photo_url", url);
          }}
          onClear={async () => {
            setPhotoUrl(null);
            await updateProfilePhoto("profile_photo_url", "");
          }}
        />
      </Card>

      <div className="flex gap-3">
        <Button onClick={onSave} loading={isPending}>
          {isPending ? "Menyimpan..." : "Simpan About"}
        </Button>
      </div>
    </div>
  );
}
