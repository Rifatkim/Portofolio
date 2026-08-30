"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/types";
import { deleteProject, updateProjectStatus } from "@/lib/actions/projects.actions";
import { PageHeader, StatusBadge, EmptyState } from "@/components/ui/shared";
import { ConfirmDialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { FolderKanban, Pencil, Trash2, Eye, Plus } from "lucide-react";
import { toast } from "sonner";

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const result = await deleteProject(deleteId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Project berhasil dihapus");
        router.refresh();
      }
      setDeleteId(null);
    });
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    startTransition(async () => {
      const result = await updateProjectStatus(id, newStatus);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Project ${newStatus === "published" ? "dipublish" : "di-draft"}`);
        router.refresh();
      }
    });
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Kelola semua project portfolio Anda"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Projects" }]}
        actions={
          <Link href="/admin/projects/new">
            <Button size="sm">
              <Plus className="h-3.5 w-3.5" />
              Add Project
            </Button>
          </Link>
        }
      />

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-foreground"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-8 w-8" />}
          title="Belum ada project"
          description="Buat project pertama Anda untuk ditampilkan di portfolio"
          action={
            <Link href="/admin/projects/new">
              <Button size="sm">+ Add Project</Button>
            </Link>
          }
        />
      ) : (
        <div className="border border-[#e5e5e5] bg-white overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-[#e5e5e5] bg-[#f7f7f5]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#737373]">Project</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#737373]">Status</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#737373]">Updated</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#737373]">Actions</span>
          </div>

          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 items-center ${i !== filtered.length - 1 ? "border-b border-[#e5e5e5]" : ""}`}
            >
              {/* Name + meta */}
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{project.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {project.category && (
                    <span className="text-[10px] font-mono text-[#737373] uppercase">{project.category}</span>
                  )}
                  {project.is_featured && (
                    <span className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">★ FEATURED</span>
                  )}
                </div>
              </div>

              {/* Status */}
              <StatusBadge status={project.status} />

              {/* Date */}
              <span className="text-xs text-[#737373] font-mono whitespace-nowrap">
                {formatDate(project.updated_at)}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {project.status === "published" ? (
                  <Link href={`/projects/${project.slug}`} target="_blank">
                    <button className="p-1.5 hover:bg-[#f5f5f5] transition-colors" title="Preview">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                ) : (
                  <button disabled className="p-1.5 opacity-30" title="Preview (publish first)">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                )}
                <Link href={`/admin/projects/${project.id}/edit`}>
                  <button className="p-1.5 hover:bg-[#f5f5f5] transition-colors" title="Edit">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </Link>
                <button
                  onClick={() => handleToggleStatus(project.id, project.status)}
                  disabled={isPending}
                  className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-[#e5e5e5] hover:border-foreground transition-colors"
                  title={project.status === "published" ? "Unpublish" : "Publish"}
                >
                  {project.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => setDeleteId(project.id)}
                  className="p-1.5 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
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
        title="Hapus Project"
        message="Apakah Anda yakin ingin menghapus project ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
