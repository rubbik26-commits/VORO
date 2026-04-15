"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import VoroLogo from "@/components/ui/VoroLogo";
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
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all " +
          (active
            ? "bg-voro-purple text-white shadow-glow-sm"
            : "text-voro-text-muted hover:bg-voro-ghost hover:text-voro-jet")
        }
        aria-current={active ? "page" : undefined}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-5 px-3">
      <div className="flex items-center gap-3 px-2 mb-6">
        <VoroLogo size={38} />
        <div>
          <div className="text-sm font-black tracking-tight text-voro-jet">VORO</div>
          <div className="text-xs text-voro-text-muted">Agent Portal</div>
        </div>
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
      <div className="mt-4 mx-1 px-3 py-3 rounded-xl bg-voro-soft-panel">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-accent flex items-center justify-center text-white text-xs font-black shrink-0">
            J
          </div>
          <div>
            <div className="text-xs font-bold text-voro-jet">Jordan Mills</div>
            <div className="text-xs text-voro-text-muted">NY License</div>
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
      <button
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl bg-white border border-voro-muted-border shadow-soft flex items-center justify-center text-voro-indigo"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="relative z-50 w-64 h-full bg-white border-r border-voro-muted-border overflow-y-auto">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
