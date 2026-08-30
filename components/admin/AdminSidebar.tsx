"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/actions/auth.actions";
import {
  LayoutDashboard,
  User,
  Zap,
  Info,
  Code2,
  FolderKanban,
  Briefcase,
  Award,
  Mail,
  ImageIcon,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/hero", label: "Hero", icon: Zap },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experiences", label: "Experiences", icon: Briefcase },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/contacts", label: "Contact", icon: Mail },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/account", label: "Account", icon: User },
];

interface SidebarContentProps {
  pathname: string;
  onMobileClose?: () => void;
}

function SidebarContent({ pathname, onMobileClose }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo / Identity */}
      <div className="px-4 py-5 border-b border-[#e5e5e5]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#737373]">Admin CMS</p>
            <p className="text-xs font-bold uppercase tracking-wider mt-0.5">RIFAT HAKIM</p>
          </div>
          {onMobileClose && (
            <button onClick={onMobileClose} className="p-1 hover:bg-[#f5f5f5] lg:hidden" aria-label="Close sidebar">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-150",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-[#525252] hover:bg-[#f5f5f5] hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-[#e5e5e5] space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#525252] hover:bg-[#f5f5f5] hover:text-foreground transition-colors"
        >
          View Portfolio ↗
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#525252] hover:bg-[#f5f5f5] hover:text-foreground transition-colors"
          >
            <LogOut className="h-3.5 w-3.5 shrink-0" />
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex admin-sidebar flex-col shrink-0">
        <SidebarContent pathname={pathname} onMobileClose={onMobileClose} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onMobileClose} />
          <aside className="relative admin-sidebar flex flex-col h-full bg-white shadow-xl">
            <SidebarContent pathname={pathname} onMobileClose={onMobileClose} />
          </aside>
        </div>
      )}
    </>
  );
}
