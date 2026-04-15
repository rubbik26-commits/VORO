import Link from "next/link";
import { Bell, Search, Plus } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-voro-muted-border bg-white/90 backdrop-blur-sm px-5 md:px-8 h-16 flex items-center gap-4">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-voro-purple text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Skip to content</a>
      <div className="flex-1 flex items-center gap-2 border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2 max-w-xs focus-within:border-voro-purple focus-within:ring-2 focus-within:ring-voro-purple/10 transition-all">
        <Search size={15} className="text-voro-text-faint shrink-0" />
        <input
          type="search"
          placeholder="Search…"
          className="bg-transparent border-none outline-none text-sm text-voro-jet placeholder:text-voro-text-faint w-full"
          aria-label="Global search"
        />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5" aria-label="Submit a deal">
          <Plus size={14} /> Submit Deal
        </button>
        <button
          className="relative w-9 h-9 rounded-xl border border-voro-muted-border bg-voro-ghost flex items-center justify-center text-voro-text-muted hover:border-voro-purple hover:text-voro-purple transition-all"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-voro-danger" aria-label="Unread notifications" />
        </button>
        <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center text-white text-sm font-black shadow-glow-sm" aria-label="View profile">
          J
        </Link>
      </div>
    </header>
  );
}
