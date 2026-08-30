"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Menu } from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f7f5]">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile header bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-[#e5e5e5]">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 hover:bg-[#f5f5f5] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-widest">Admin CMS</span>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
