"use client";

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DynamicListProps {
  label?: string;
  helperText?: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  required?: boolean;
}

export function DynamicList({
  label,
  helperText,
  items,
  onChange,
  placeholder = "Tambah item...",
  addLabel = "Add",
  required,
}: DynamicListProps) {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setInputValue("");
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {helperText && <p className="text-xs text-[#737373] -mt-1">{helperText}</p>}

      {/* Existing items */}
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 group">
            <GripVertical className="h-3.5 w-3.5 text-[#d4d4d4] shrink-0" />
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 border border-[#e5e5e5] px-2.5 py-1.5 text-sm focus:outline-none focus:border-foreground"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 hover:bg-[#f5f5f5] text-[#737373] hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Remove item"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>

      {/* Add new item */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); addItem(); }
          }}
          placeholder={placeholder}
          className="flex-1 border border-[#e5e5e5] px-2.5 py-1.5 text-sm focus:outline-none focus:border-foreground placeholder:text-[#a3a3a3]"
        />
        <button
          type="button"
          onClick={addItem}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-foreground uppercase tracking-wider",
            "hover:bg-foreground hover:text-background transition-colors"
          )}
        >
          <Plus className="h-3 w-3" />
          {addLabel}
        </button>
      </div>
    </div>
  );
}

interface TagInputProps {
  label?: string;
  helperText?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

export function TagInput({ label, helperText, tags, onChange, placeholder = "Type and press Enter...", required }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="border border-[#e5e5e5] p-2 focus-within:border-foreground transition-colors min-h-[42px]">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-foreground text-background px-2 py-0.5 text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:opacity-70 transition-opacity"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
            if (e.key === "Backspace" && !inputValue && tags.length > 0) {
              onChange(tags.slice(0, -1));
            }
          }}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="outline-none text-sm w-full placeholder:text-[#a3a3a3] bg-transparent"
        />
      </div>
      {helperText && <p className="text-xs text-[#737373]">{helperText}</p>}
    </div>
  );
}
