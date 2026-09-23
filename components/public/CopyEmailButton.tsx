"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!email) {
      toast.error("Alamat email tidak tersedia");
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for browsers or contexts without clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (!successful) {
          throw new Error("Fallback copy failed");
        }
      }

      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin email. Silakan salin manual.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Salin alamat email ${email}`}
      title="Salin email"
      className={`min-w-11 min-h-11 w-11 h-11 flex items-center justify-center border border-black bg-white text-black hover:bg-black hover:text-white hover:border-black active:scale-95 transition-all duration-150 rounded-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
        className || ""
      }`}
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
      ) : (
        <Copy className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
