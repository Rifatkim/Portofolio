"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { certificateSchema, CertificateFormValues } from "@/lib/validations/certificate.schema";
import { createCertificate, updateCertificate } from "@/lib/actions/certificates.actions";
import { uploadMedia } from "@/lib/actions/media.actions";
import { Input, Textarea } from "@/components/ui/input";
import { Select, Switch } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { TagInput } from "@/components/admin/DynamicList";
import { PageHeader, Card } from "@/components/ui/shared";
import { Certificate } from "@/types";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "hidden", label: "Hidden" },
  { value: "archived", label: "Archived" },
];

interface CertificateFormProps {
  certificate?: Certificate | null;
  isEdit?: boolean;
}

export function CertificateForm({ certificate, isEdit = false }: CertificateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [doesNotExpire, setDoesNotExpire] = useState(certificate?.does_not_expire ?? false);
  const [showCredentialId, setShowCredentialId] = useState(certificate?.show_credential_id ?? false);
  const [allowDownload, setAllowDownload] = useState(certificate?.allow_download ?? false);
  const [relatedSkills, setRelatedSkills] = useState<string[]>(certificate?.related_skills || []);
  const [thumbnailUrl, setThumbnailUrl] = useState(certificate?.thumbnail_url || null);
  const [imageUrl, setImageUrl] = useState(certificate?.image_url || null);
  const [pdfUrl, setPdfUrl] = useState(certificate?.pdf_url || null);

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      name: certificate?.name || "",
      issuer: certificate?.issuer || "",
      credential_id: certificate?.credential_id || "",
      show_credential_id: certificate?.show_credential_id ?? false,
      issue_date: certificate?.issue_date?.split("T")[0] || "",
      expiration_date: certificate?.expiration_date?.split("T")[0] || "",
      does_not_expire: certificate?.does_not_expire ?? false,
      description: certificate?.description || "",
      related_skills: [],
      credential_url: certificate?.credential_url || "",
      allow_download: certificate?.allow_download ?? false,
      status: certificate?.status || "draft",
      sort_order: certificate?.sort_order ?? 0,
    },
  });

  const onSubmit: SubmitHandler<CertificateFormValues> = (values) => {
    startTransition(async () => {
      const finalValues = {
        ...values,
        does_not_expire: doesNotExpire,
        show_credential_id: showCredentialId,
        allow_download: allowDownload,
        related_skills: relatedSkills,
        thumbnail_url: thumbnailUrl,
        image_url: imageUrl,
        pdf_url: pdfUrl,
        credential_url: values.credential_url || null,
        expiration_date: doesNotExpire ? null : values.expiration_date || null,
      };

      let result;
      if (isEdit && certificate) {
        result = await updateCertificate(certificate.id, finalValues);
      } else {
        result = await createCertificate(finalValues);
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEdit ? "Certificate diperbarui" : "Certificate dibuat");
        router.push("/admin/certificates");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <PageHeader
        title={isEdit ? "Edit Certificate" : "New Certificate"}
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Certificates", href: "/admin/certificates" },
          { label: isEdit ? "Edit" : "New" },
        ]}
      />

      {/* Basic */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Informasi Sertifikat</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Certificate Name" required placeholder="Nama sertifikat" {...form.register("name")} error={form.formState.errors.name?.message} />
            <Input label="Issuer" required placeholder="AWS, Google, Coursera..." {...form.register("issuer")} error={form.formState.errors.issuer?.message} />
          </div>
          <div className="space-y-2">
            <Input
              label="Credential ID"
              placeholder="ABC123XYZ"
              {...form.register("credential_id")}
            />
            <Switch label="Tampilkan Credential ID di portfolio" checked={showCredentialId} onChange={setShowCredentialId} />
          </div>
          <Input label="Credential URL" type="url" placeholder="https://verify.example.com/credential" {...form.register("credential_url")} />
          <Textarea label="Description" placeholder="Deskripsi sertifikat..." rows={3} {...form.register("description")} />
          <TagInput
            label="Related Skills"
            tags={relatedSkills}
            onChange={setRelatedSkills}
            placeholder="Tambah skill yang berkaitan..."
          />
        </div>
      </Card>

      {/* Dates */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Tanggal</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Issue Date" type="date" {...form.register("issue_date")} />
            <Input label="Expiration Date" type="date" disabled={doesNotExpire} {...form.register("expiration_date")} />
          </div>
          <Switch label="Tidak memiliki tanggal kedaluwarsa" checked={doesNotExpire} onChange={setDoesNotExpire} />
        </div>
      </Card>

      {/* Media */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Media</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MediaUploader label="Thumbnail" helperText="Gambar kecil untuk list" currentUrl={thumbnailUrl} uploadAction={uploadMedia} onUploadComplete={(url) => setThumbnailUrl(url)} onClear={() => setThumbnailUrl(null)} />
            <MediaUploader label="Certificate Image" helperText="Foto sertifikat" currentUrl={imageUrl} uploadAction={uploadMedia} onUploadComplete={(url) => setImageUrl(url)} onClear={() => setImageUrl(null)} />
          </div>
          <div className="space-y-2">
            <MediaUploader
              label="Certificate PDF"
              helperText="File PDF sertifikat"
              accept="application/pdf"
              currentUrl={pdfUrl}
              currentName={pdfUrl ? "certificate.pdf" : null}
              uploadAction={uploadMedia}
              onUploadComplete={(url) => setPdfUrl(url)}
              onClear={() => setPdfUrl(null)}
            />
            <Switch label="Izinkan pengunjung mengunduh PDF" checked={allowDownload} onChange={setAllowDownload} />
          </div>
        </div>
      </Card>

      {/* Publication */}
      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Publikasi</h2>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Status" options={STATUS_OPTIONS} {...form.register("status")} />
          <Input label="Sort Order" type="number" min={0} {...form.register("sort_order")} />
        </div>
      </Card>

      <div className="flex gap-3 pb-8">
        <Button type="submit" loading={isPending}>
          {isPending ? "Menyimpan..." : (isEdit ? "Update" : "Buat Certificate")}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/certificates")}>
          Batal
        </Button>
      </div>
    </form>
  );
}
