"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import NotificationsMenu from "./NotificationsMenu";
import { getCurrentAgent } from "@/lib/auth";

export default function TopBar() {
  const router = useRouter();
  const agent = getCurrentAgent();

  return (
    <header className="sticky top-0 z-30 border-b border-voro-muted-border bg-white/90 backdrop-blur-sm px-5 md:px-8 h-16 flex items-center gap-4">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-voro-purple text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
      >
        Skip to content
      </a>
      <GlobalSearch />
      <div className="flex items-center gap-2 ml-auto">
        <button
          type="button"
          onClick={() => router.push("/transactions/new")}
          className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          aria-label="Submit a deal"
        >
          <Plus size={14} /> Submit Deal
        </button>
        <NotificationsMenu />
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center text-white text-sm font-black shadow-glow-sm"
          aria-label="View profile"
        >
          {agent.firstName[0]}
        </Link>
      </div>
    </header>
  );
}
