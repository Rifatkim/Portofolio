"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, required, options, placeholder, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-foreground">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            "w-full border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-foreground",
            "focus:outline-none focus:border-foreground transition-colors duration-150 appearance-none",
            "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")] bg-no-repeat bg-[right_12px_center]",
            error && "border-red-500",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {helperText && !error && <p className="text-xs text-[#737373]">{helperText}</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

interface SwitchProps {
  label?: string;
  helperText?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
}

function Switch({ label, helperText, checked = false, onChange, id }: SwitchProps) {
  const switchId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={switchId}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center border-2 border-transparent transition-colors duration-200",
          checked ? "bg-foreground" : "bg-[#d4d4d4]"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 bg-white shadow-sm transform transition-transform duration-200",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
      {(label || helperText) && (
        <div>
          {label && (
            <label htmlFor={switchId} className="text-sm font-medium text-foreground cursor-pointer">
              {label}
            </label>
          )}
          {helperText && <p className="text-xs text-[#737373]">{helperText}</p>}
        </div>
      )}
    </div>
  );
}

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
}

function Checkbox({ label, helperText, id, className, ...props }: CheckboxProps) {
  const cbId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        id={cbId}
        className={cn("mt-0.5 h-4 w-4 border border-foreground bg-white accent-foreground cursor-pointer", className)}
        {...props}
      />
      {(label || helperText) && (
        <div>
          {label && (
            <label htmlFor={cbId} className="text-sm font-medium text-foreground cursor-pointer">{label}</label>
          )}
          {helperText && <p className="text-xs text-[#737373]">{helperText}</p>}
        </div>
      )}
    </div>
  );
}

export { Select, Switch, Checkbox };
