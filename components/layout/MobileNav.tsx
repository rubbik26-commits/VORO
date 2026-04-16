"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderOpen,
  Plus,
} from "lucide-react";

const mobileNavItems = [
  { href: "/dashboard",    label: "Home",    icon: LayoutDashboard },
  { href: "/transactions", label: "Deals",   icon: FileText },
  { href: "/leads",        label: "Leads",   icon: Users },
  { href: "/documents",    label: "Docs",    icon: FolderOpen },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Bottom navigation bar - mobile only */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-voro-muted-border"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-around px-2 py-1.5">
          {mobileNavItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${
                  active
                    ? "text-voro-purple"
                    : "text-voro-text-faint hover:text-voro-text-muted"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <div className="relative">
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-voro-purple" />
                  )}
                </div>
                <span className={`text-[10px] leading-tight ${active ? "font-bold" : "font-medium"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button - Submit Deal */}
      <Link
        href="/transactions/new"
        className="fixed bottom-20 right-5 z-50 lg:hidden w-14 h-14 rounded-full flex items-center justify-center text-white shadow-glow active:scale-95 transition-transform"
        style={{ background: "linear-gradient(135deg, #5E42BC 0%, #271C4F 100%)" }}
        aria-label="Submit a Deal"
      >
        <Plus size={24} strokeWidth={2.5} />
      </Link>

      {/* Bottom spacer for mobile so content isn't hidden behind nav */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
