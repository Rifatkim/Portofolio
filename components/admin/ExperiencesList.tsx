"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Experience } from "@/types";
import { deleteExperience, updateExperienceStatus } from "@/lib/actions/experiences.actions";
import { PageHeader, StatusBadge, EmptyState } from "@/components/ui/shared";
import { ConfirmDialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/utils";
import { Briefcase, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export function ExperiencesList({ experiences }: { experiences: Experience[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const result = await deleteExperience(deleteId);
      if (result.error) toast.error(result.error);
      else { toast.success("Experience dihapus"); router.refresh(); }
      setDeleteId(null);
    });
  };

  const handleToggle = (id: string, status: string) => {
    startTransition(async () => {
      const newStatus = status === "published" ? "draft" : "published";
      const result = await updateExperienceStatus(id, newStatus);
      if (result.error) toast.error(result.error);
      else { toast.success(`Status diubah`); router.refresh(); }
    });
  };

  return (
    <div>
      <PageHeader
        title="Experiences"
        description="Kelola pengalaman kerja dan organisasi"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Experiences" }]}
        actions={<Link href="/admin/experiences/new"><Button size="sm"><Plus className="h-3.5 w-3.5" />Add Experience</Button></Link>}
      />

      {experiences.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-8 w-8" />}
          title="Belum ada experience"
          description="Tambahkan pengalaman kerja atau organisasi Anda"
          action={<Link href="/admin/experiences/new"><Button size="sm">+ Add Experience</Button></Link>}
        />
      ) : (
        <div className="border border-[#e5e5e5] bg-white overflow-hidden">
          {experiences.map((exp, i) => (
            <div key={exp.id} className={`flex items-center gap-4 px-4 py-3 ${i !== experiences.length - 1 ? "border-b border-[#e5e5e5]" : ""}`}>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{exp.position}</p>
                <p className="text-xs text-[#737373]">{exp.organization} · {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}</p>
              </div>
              <StatusBadge status={exp.status} />
              <div className="flex items-center gap-1.5">
                <Link href={`/admin/experiences/${exp.id}/edit`}>
                  <button className="p-1.5 hover:bg-[#f5f5f5]" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                </Link>
                <button onClick={() => handleToggle(exp.id, exp.status)} disabled={isPending} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-[#e5e5e5] hover:border-foreground transition-colors">
                  {exp.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => setDeleteId(exp.id)} className="p-1.5 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Hapus Experience"
        message="Apakah Anda yakin ingin menghapus experience ini?"
      />
    </div>
  );
}
