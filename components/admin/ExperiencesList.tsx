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
        <div className="w-full overflow-x-auto border border-[#e5e5e5] bg-white">
          <table className="w-full min-w-[640px] text-left border-collapse">
            <caption className="sr-only">
              Daftar pengalaman kerja dan organisasi
            </caption>
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373]"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373]"
                >
                  Organization
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373]"
                >
                  Period
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373]"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373] text-right"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5]">
              {experiences.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-[#fafafa] transition-colors"
                >
                  <th
                    scope="row"
                    className="px-4 py-3.5 text-sm font-semibold text-black text-left align-middle"
                  >
                    {exp.position}
                  </th>
                  <td className="px-4 py-3.5 text-xs text-[#525252] align-middle">
                    {exp.organization}
                  </td>
                  <td className="px-4 py-3.5 text-xs font-mono text-[#737373] whitespace-nowrap align-middle">
                    {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                  </td>
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <StatusBadge status={exp.status} />
                  </td>
                  <td className="px-4 py-3.5 text-right align-middle whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                      <Link
                        href={`/admin/experiences/${exp.id}/edit`}
                        className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] p-2 hover:bg-[#f5f5f5] text-black transition-colors rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                        aria-label={`Edit ${exp.position}`}
                        title={`Edit ${exp.position}`}
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Edit {exp.position}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleToggle(exp.id, exp.status)}
                        disabled={isPending}
                        className="px-2.5 py-1.5 min-h-[36px] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#e5e5e5] hover:border-foreground transition-colors disabled:opacity-50 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                        aria-label={
                          exp.status === "published"
                            ? `Unpublish ${exp.position}`
                            : `Publish ${exp.position}`
                        }
                      >
                        {exp.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(exp.id)}
                        className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] p-2 hover:bg-red-50 hover:text-red-600 text-[#737373] transition-colors rounded-xs cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
                        aria-label={`Hapus ${exp.position}`}
                        title={`Hapus ${exp.position}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Hapus {exp.position}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
