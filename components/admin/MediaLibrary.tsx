"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Media } from "@/types";
import { deleteMedia, uploadMedia } from "@/lib/actions/media.actions";
import { PageHeader, EmptyState } from "@/components/ui/shared";
import { ConfirmDialog } from "@/components/ui/dialog";
import { formatFileSize } from "@/lib/utils";
import { ImageIcon, Trash2, Copy, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

const ALLOWED = "image/jpeg,image/jpg,image/png,image/webp,application/pdf";

interface MediaLibraryProps {
  media: Media[];
}

export function MediaLibrary({ media }: MediaLibraryProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "image" | "pdf">("all");
  const [isUploading, setIsUploading] = useState(false);

  const filtered = media.filter((m) => {
    const matchSearch = m.original_filename.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "image" && m.mime_type.startsWith("image/")) || (filter === "pdf" && m.mime_type === "application/pdf");
    return matchSearch && matchFilter;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadMedia(formData);
      if (result.error) {
        toast.error(`${file.name}: ${result.error}`);
      } else {
        toast.success(`${file.name} uploaded`);
      }
    }
    setIsUploading(false);
    router.refresh();
    e.target.value = "";
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const result = await deleteMedia(deleteId);
      if (result.error) toast.error(result.error);
      else { toast.success("File dihapus"); router.refresh(); }
      setDeleteId(null);
    });
  };

  return (
    <div>
      <PageHeader
        title="Media Library"
        description="Kelola foto dan file yang digunakan di portfolio"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Media Library" }]}
        actions={
          <label className="cursor-pointer">
            <input type="file" multiple accept={ALLOWED} onChange={handleUpload} className="hidden" />
            <span className="inline-flex items-center justify-center gap-2 font-semibold tracking-wide bg-foreground text-background border border-foreground hover:opacity-85 px-3 py-1.5 text-xs transition-opacity">
              <Upload className="h-3.5 w-3.5" />
              {isUploading ? "Uploading..." : "Upload Files"}
            </span>
          </label>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Cari file..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-foreground w-full max-w-xs"
        />
        <div className="flex gap-1">
          {(["all", "image", "pdf"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${filter === f ? "bg-foreground text-background" : "border border-[#e5e5e5] hover:border-foreground"}`}
            >
              {f === "all" ? "All" : f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <p className="text-xs text-[#737373] font-mono mb-4">{filtered.length} of {media.length} files</p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="h-8 w-8" />}
          title={media.length === 0 ? "Media library kosong" : "Tidak ada file yang cocok"}
          description={media.length === 0 ? "Upload foto atau PDF untuk mulai menggunakannya di portfolio" : "Coba ubah filter atau kata kunci pencarian"}
          action={media.length === 0 ? (
            <label className="cursor-pointer">
              <input type="file" multiple accept={ALLOWED} onChange={handleUpload} className="hidden" />
              <span className="inline-flex items-center justify-center gap-2 font-semibold tracking-wide bg-foreground text-background border border-foreground hover:opacity-85 px-3 py-1.5 text-xs transition-opacity">
                Upload Files
              </span>
            </label>
          ) : undefined}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((item) => {
            const isImage = item.mime_type.startsWith("image/");
            return (
              <div key={item.id} className="group border border-[#e5e5e5] bg-white overflow-hidden">
                {/* Preview */}
                <div className="aspect-square bg-[#f7f7f5] overflow-hidden relative">
                  {isImage && item.public_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.public_url}
                      alt={item.alt_text || item.original_filename}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-1">
                      <FileText className="h-6 w-6 text-[#a3a3a3]" />
                      <span className="text-[10px] font-mono text-[#a3a3a3] uppercase">PDF</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    {item.public_url && (
                      <button onClick={() => handleCopyUrl(item.public_url!)} className="p-1.5 bg-white hover:bg-[#f5f5f5] transition-colors" title="Copy URL">
                        <Copy className="h-3 w-3" />
                      </button>
                    )}
                    <button onClick={() => setDeleteId(item.id)} className="p-1.5 bg-white hover:bg-red-50 hover:text-red-600 transition-colors" title="Hapus">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                {/* Meta */}
                <div className="p-2">
                  <p className="text-[11px] font-medium truncate" title={item.original_filename}>{item.original_filename}</p>
                  <p className="text-[10px] font-mono text-[#a3a3a3]">{formatFileSize(item.file_size)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={isPending} title="Hapus File" message="Apakah Anda yakin ingin menghapus file ini? File yang digunakan di konten lain akan menampilkan broken image." />
    </div>
  );
}
