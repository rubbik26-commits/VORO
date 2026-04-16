"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import VoroLogo from "@/components/ui/VoroLogo";
import { getCurrentAgent } from "@/lib/auth";
import {
  LayoutDashboard,
  FileText,
  Users,
  GraduationCap,
  Wrench,
  Megaphone,
  FolderOpen,
  UserCircle,
  LifeBuoy,
  Settings,
  Landmark,
  UserPlus2,
  BadgeDollarSign,
  Users2,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard",     label: "Dashboard",     icon: LayoutDashboard },
  { href: "/transactions",  label: "Transactions",  icon: FileText },
  { href: "/leads",         label: "Leads",         icon: Users },
  { href: "/academy",       label: "Academy",       icon: GraduationCap },
  { href: "/services",      label: "Services",      icon: Wrench },
  { href: "/marketing",     label: "Marketing",     icon: Megaphone },
  { href: "/documents",     label: "Documents",     icon: FolderOpen },
  { href: "/profile",       label: "Profile",       icon: UserCircle },
  // Optional modules
  { href: "/commercial",    label: "Commercial",    icon: Landmark },
  { href: "/recruiting",    label: "Recruiting",    icon: UserPlus2 },
  { href: "/revenue-share", label: "Revenue Share", icon: BadgeDollarSign },
  { href: "/teams",         label: "Teams",         icon: Users2 },
];

const bottomItems = [
  { href: "/support",  label: "Support",  icon: LifeBuoy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const agent = getCurrentAgent();

  const NavLink = ({
    href,
    label,
    icon: Icon,
  }: {
    href: string;
    label: string;
    icon: React.ComponentType<{ size?: number }>;
  }) => {
    const active = pathname.startsWith(href);
    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={
          "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 " +
          (active
            ? "bg-voro-purple text-white shadow-glow-sm"
            : "text-voro-text-muted hover:bg-voro-ghost hover:text-voro-jet")
        }
        aria-current={active ? "page" : undefined}
      >
        {/* Sliding active indicator bar */}
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-voro-purple transition-all duration-300 ${
            active ? "h-5 opacity-100" : "h-0 opacity-0 group-hover:h-3 group-hover:opacity-40"
          }`}
        />
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  const SidebarContent = ({ showClose = false }: { showClose?: boolean }) => (
    <div className="flex flex-col h-full py-5 px-3 relative">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 80%, rgba(94,66,188,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(249,130,255,0.04) 0%, transparent 50%)",
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 px-2 mb-6">
          <div className="flex flex-col gap-1">
            <VoroLogo width={130} />
            <div className="text-[10px] font-bold uppercase tracking-widest text-voro-text-muted mt-0.5">
              Agent Portal
            </div>
          </div>
          {showClose && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg bg-voro-ghost flex items-center justify-center text-voro-text-muted hover:text-voro-jet hover:bg-voro-soft-panel transition-colors shrink-0 mt-0.5"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <nav aria-label="Main navigation" className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
        <div className="flex flex-col gap-1 pt-4 border-t border-voro-muted-border">
          {bottomItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
        <div className="mt-4 mx-1 px-3 py-3 rounded-xl bg-voro-soft-panel/80 backdrop-blur-sm border border-voro-muted-border/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-white text-xs font-black shrink-0 shadow-glow-sm ring-2 ring-white/80">
              {agent.firstName[0]}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-voro-jet truncate">
                {agent.firstName} {agent.lastName}
              </div>
              <div className="text-[10px] text-voro-text-muted">
                {agent.licenseState} License
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-[230px] xl:w-[250px] border-r border-voro-muted-border bg-white shrink-0 sticky top-0 h-screen overflow-y-auto">
        <SidebarContent />
      </aside>
      {/* Hamburger button — only visible when drawer is closed */}
      {!open && (
        <button
          type="button"
          className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl bg-white border border-voro-muted-border shadow-soft flex items-center justify-center text-voro-indigo"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-controls="sidebar-nav"
        >
          <Menu size={20} />
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside
            id="sidebar-nav"
            className="relative z-50 w-64 h-full bg-white border-r border-voro-muted-border overflow-y-auto animate-slide-in-left"
          >
            <SidebarContent showClose />
          </aside>
        </div>
      )}
    </>
  );
}
