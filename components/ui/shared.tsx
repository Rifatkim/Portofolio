"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const STATUS_STYLES: Record<string, string> = {
  published: "bg-black text-white",
  draft: "bg-[#f5f5f5] text-[#737373] border border-[#e5e5e5]",
  hidden: "bg-[#e5e5e5] text-[#525252]",
  archived: "bg-[#f5f5f5] text-[#a3a3a3] border border-[#e5e5e5]",
};

const STATUS_LABELS: Record<string, string> = {
  published: "PUBLISHED",
  draft: "DRAFT",
  hidden: "HIDDEN",
  archived: "ARCHIVED",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest",
      STATUS_STYLES[status] || "bg-[#f5f5f5] text-[#737373]",
      className
    )}>
      {STATUS_LABELS[status] || status.toUpperCase()}
    </span>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="text-[#d4d4d4] mb-4">{icon}</div>}
      <p className="text-sm font-bold uppercase tracking-widest text-foreground mb-1">{title}</p>
      {description && <p className="text-sm text-[#737373] mb-6 max-w-xs">{description}</p>}
      {action}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageHeader({ title, description, actions, breadcrumb }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="flex items-center gap-2 mb-3 text-xs text-[#737373]">
          {breadcrumb.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>/</span>}
              {item.href ? (
                <a href={item.href} className="hover:text-foreground transition-colors">{item.label}</a>
              ) : (
                <span className={i === breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wide">{title}</h1>
          {description && <p className="text-sm text-[#737373] mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      <div className="mt-4 border-t-2 border-foreground" />
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div className={cn(
      "bg-white border border-[#e5e5e5]",
      padding && "p-5",
      className
    )}>
      {children}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-[#f0f0f0]", className)} />;
}
