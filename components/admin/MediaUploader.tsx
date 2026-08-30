"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MediaUploaderProps {
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  helperText?: string;
  currentUrl?: string | null;
  currentName?: string | null;
  onUploadComplete?: (url: string, filename: string) => void;
  onClear?: () => void;
  bucket?: string;
  folder?: string;
  uploadAction: (formData: FormData) => Promise<{ success?: boolean; error?: string; media?: { public_url: string | null; original_filename: string } }>;
}

export function MediaUploader({
  accept = "image/jpeg,image/jpg,image/png,image/webp",
  maxSize = 10,
  label,
  helperText,
  currentUrl,
  currentName,
  onUploadComplete,
  onClear,
  uploadAction,
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [filename, setFilename] = useState<string | null>(currentName || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File terlalu besar. Maksimal ${maxSize}MB.`);
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    setFilename(file.name);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadAction(formData);
      if (result.error) {
        toast.error(result.error);
        setPreview(currentUrl || null);
        setFilename(currentName || null);
      } else if (result.media && result.media.public_url) {
        onUploadComplete?.(result.media.public_url, result.media.original_filename);
        toast.success("Upload berhasil");
      }
    } catch {
      toast.error("Upload gagal");
    } finally {
      setIsUploading(false);
    }
  }, [maxSize, uploadAction, onUploadComplete, currentUrl, currentName]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleClear = () => {
    setPreview(null);
    setFilename(null);
    if (inputRef.current) inputRef.current.value = "";
    onClear?.();
  };

  const isPDF = filename?.toLowerCase().endsWith(".pdf");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground">{label}</label>
      )}

      {/* Preview area */}
      {(preview || filename) && (
        <div className="relative border border-[#e5e5e5] p-3 flex items-center gap-3">
          {preview && !isPDF ? (
            <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-[#f5f5f5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#f5f5f5]">
              <FileText className="h-5 w-5 text-[#737373]" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{filename}</p>
            {preview && <p className="text-xs text-[#737373] mt-0.5">Uploaded</p>}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 p-1 hover:bg-[#f5f5f5] transition-colors"
            aria-label="Remove file"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        className={cn(
          "border-2 border-dashed p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-foreground bg-[#f7f7f7]" : "border-[#e5e5e5] hover:border-[#a3a3a3]",
          isUploading && "opacity-50 pointer-events-none"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-[#737373]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-xs text-[#737373]">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 text-[#737373]" />
              <div>
                <p className="text-xs font-medium">Drag & drop atau klik untuk upload</p>
                <p className="text-xs text-[#737373] mt-0.5">Maks. {maxSize}MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      {helperText && <p className="text-xs text-[#737373]">{helperText}</p>}
    </div>
  );
}
