"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Certificate } from "@/types";
import { deleteCertificate, updateCertificateStatus } from "@/lib/actions/certificates.actions";
import { PageHeader, StatusBadge, EmptyState } from "@/components/ui/shared";
import { ConfirmDialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Award, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export function CertificatesList({ certificates }: { certificates: Certificate[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const result = await deleteCertificate(deleteId);
      if (result.error) toast.error(result.error);
      else { toast.success("Certificate dihapus"); router.refresh(); }
      setDeleteId(null);
    });
  };

  const handleToggle = (id: string, status: string) => {
    startTransition(async () => {
      const result = await updateCertificateStatus(id, status === "published" ? "draft" : "published");
      if (result.error) toast.error(result.error);
      else { toast.success("Status diubah"); router.refresh(); }
    });
  };

  return (
    <div>
      <PageHeader
        title="Certificates"
        description="Kelola sertifikat dan kredensial"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Certificates" }]}
        actions={<Link href="/admin/certificates/new"><Button size="sm"><Plus className="h-3.5 w-3.5" />Add Certificate</Button></Link>}
      />
      {certificates.length === 0 ? (
        <EmptyState icon={<Award className="h-8 w-8" />} title="Belum ada certificate" description="Tambahkan sertifikat yang Anda miliki" action={<Link href="/admin/certificates/new"><Button size="sm">+ Add Certificate</Button></Link>} />
      ) : (
        <div className="border border-[#e5e5e5] bg-white overflow-hidden">
          {certificates.map((cert, i) => (
            <div key={cert.id} className={`flex items-center gap-4 px-4 py-3 ${i !== certificates.length - 1 ? "border-b border-[#e5e5e5]" : ""}`}>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{cert.name}</p>
                <p className="text-xs text-[#737373]">{cert.issuer} · {cert.issue_date ? formatDate(cert.issue_date, { month: "short", year: "numeric" }) : "—"}</p>
              </div>
              <StatusBadge status={cert.status} />
              <div className="flex items-center gap-1.5">
                <Link href={`/admin/certificates/${cert.id}/edit`}><button className="p-1.5 hover:bg-[#f5f5f5]" title="Edit"><Pencil className="h-3.5 w-3.5" /></button></Link>
                <button onClick={() => handleToggle(cert.id, cert.status)} disabled={isPending} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-[#e5e5e5] hover:border-foreground transition-colors">
                  {cert.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => setDeleteId(cert.id)} className="p-1.5 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={isPending} title="Hapus Certificate" message="Apakah Anda yakin ingin menghapus sertifikat ini?" />
    </div>
  );
}
