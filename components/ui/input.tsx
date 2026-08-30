"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, required, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-foreground">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-[#a3a3a3]",
            "focus:outline-none focus:border-foreground transition-colors duration-150",
            error && "border-red-500 focus:border-red-500",
            props.disabled && "opacity-50 bg-[#f7f7f7] cursor-not-allowed",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-[#737373]">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, required, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-foreground">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-[#a3a3a3]",
            "focus:outline-none focus:border-foreground transition-colors duration-150 resize-y min-h-[100px]",
            error && "border-red-500 focus:border-red-500",
            props.disabled && "opacity-50 bg-[#f7f7f7] cursor-not-allowed",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-[#737373]">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
