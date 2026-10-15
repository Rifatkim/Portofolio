"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Award } from "@/types";
import { deleteAward, updateAwardStatus } from "@/lib/actions/awards.actions";
import { PageHeader, StatusBadge, EmptyState } from "@/components/ui/shared";
import { ConfirmDialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatAwardMonth } from "@/lib/utils";
import { Trophy, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface AwardsListProps {
  awards: Award[];
}

export function AwardsList({ awards }: AwardsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const result = await deleteAward(deleteId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Award berhasil dihapus");
        router.refresh();
      }
      setDeleteId(null);
    });
  };

  const handleToggle = (id: string, currentPublished: boolean) => {
    startTransition(async () => {
      const result = await updateAwardStatus(id, !currentPublished);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          `Award ${!currentPublished ? "dipublish" : "di-unpublish"}`
        );
        router.refresh();
      }
    });
  };

  return (
    <div>
      <PageHeader
        title="Awards"
        description="Kelola pencapaian dan penghargaan perlombaan Anda"
        breadcrumb={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Awards" },
        ]}
        actions={
          <Link href="/admin/awards/new">
            <Button size="sm">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Award
            </Button>
          </Link>
        }
      />

      {awards.length === 0 ? (
        <EmptyState
          icon={<Trophy className="h-8 w-8" />}
          title="Belum ada award"
          description="Tambahkan penghargaan atau prestasi kompetisi yang Anda raih"
          action={
            <Link href="/admin/awards/new">
              <Button size="sm">+ Add Award</Button>
            </Link>
          }
        />
      ) : (
        <div className="w-full overflow-x-auto border border-[#e5e5e5] bg-white">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <caption className="sr-only">
              Daftar penghargaan dan prestasi perlombaan
            </caption>
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373] w-16"
                >
                  Photo
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373]"
                >
                  Placement
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373]"
                >
                  Award Title
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373]"
                >
                  Month
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
              {awards.map((award) => (
                <tr
                  key={award.id}
                  className="hover:bg-[#fafafa] transition-colors"
                >
                  {/* Photo Thumbnail */}
                  <td className="px-4 py-3.5 align-middle">
                    <div className="relative w-12 h-9 bg-black/5 border border-[#e5e5e5] rounded-xs overflow-hidden shrink-0">
                      {award.image_url ? (
                        <Image
                          src={award.image_url}
                          alt={award.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-[#737373] font-mono">
                          N/A
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Placement */}
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider bg-black text-white rounded-xs">
                      {award.placement}
                    </span>
                  </td>

                  {/* Award Title */}
                  <th
                    scope="row"
                    className="px-4 py-3.5 text-sm font-semibold text-black text-left align-middle"
                  >
                    {award.title}
                  </th>

                  {/* Month */}
                  <td className="px-4 py-3.5 text-xs font-mono text-[#737373] whitespace-nowrap align-middle">
                    {formatAwardMonth(award.award_month, false)}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                    <StatusBadge
                      status={award.is_published ? "published" : "draft"}
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right align-middle whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                      <Link
                        href={`/admin/awards/${award.id}/edit`}
                        className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] p-2 hover:bg-[#f5f5f5] text-black transition-colors rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-black cursor-pointer"
                        aria-label={`Edit ${award.title}`}
                        title={`Edit ${award.title}`}
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Edit {award.title}</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleToggle(award.id, award.is_published)
                        }
                        disabled={isPending}
                        className="px-2.5 py-1.5 min-h-[36px] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#e5e5e5] hover:border-foreground transition-colors disabled:opacity-50 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                        aria-label={
                          award.is_published
                            ? `Unpublish ${award.title}`
                            : `Publish ${award.title}`
                        }
                      >
                        {award.is_published ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteId(award.id)}
                        className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] p-2 hover:bg-red-50 hover:text-red-600 text-[#737373] transition-colors rounded-xs cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"
                        aria-label={`Hapus ${award.title}`}
                        title={`Hapus ${award.title}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Hapus {award.title}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={isPending}
        title="Hapus Award"
        message="Apakah Anda yakin ingin menghapus data penghargaan ini?"
      />
    </div>
  );
}
