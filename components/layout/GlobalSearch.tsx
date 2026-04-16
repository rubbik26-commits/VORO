"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { brandTokens } from "@/lib/brand-tokens";

type SearchItem = {
  label: string;
  href: string;
  category: "Page" | "Action";
};

const ACTIONS: SearchItem[] = [
  { label: "Submit a Deal", href: "/transactions/new", category: "Action" },
  { label: "Add a Lead", href: "/leads?new=1", category: "Action" },
  { label: "Upload a Document", href: "/documents?upload=1", category: "Action" },
  { label: "Open Support Ticket", href: "/support", category: "Action" },
];

const PAGES: SearchItem[] = brandTokens.nav.map((label) => ({
  label,
  href: `/${label.toLowerCase().replace(/\s+/g, "-")}`,
  category: "Page",
}));

const CATALOG: SearchItem[] = [...PAGES, ...ACTIONS];

export default function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG.slice(0, 6);
    return CATALOG.filter((c) => c.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  useEffect(() => setCursor(0), [query, open]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      go(results[cursor]);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex-1 max-w-xs"
    >
      <div className="flex items-center gap-2 border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2 focus-within:border-voro-purple focus-within:ring-2 focus-within:ring-voro-purple/10 transition-all">
        <Search size={15} className="text-voro-text-faint shrink-0" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search portal…  (⌘K)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="bg-transparent border-none outline-none text-sm text-voro-jet placeholder:text-voro-text-faint w-full"
          aria-label="Global search"
          aria-expanded={open}
          aria-controls="voro-global-search-results"
        />
      </div>
      {open && results.length > 0 && (
        <div
          id="voro-global-search-results"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white border border-voro-muted-border shadow-medium overflow-hidden z-50"
        >
          {results.map((r, i) => (
            <button
              key={`${r.category}-${r.href}`}
              role="option"
              aria-selected={i === cursor}
              onMouseEnter={() => setCursor(i)}
              onClick={() => go(r)}
              className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-colors ${
                i === cursor ? "bg-voro-ghost" : "hover:bg-voro-ghost"
              }`}
            >
              <span className="text-sm font-semibold text-voro-jet truncate">{r.label}</span>
              <span className="text-[10px] uppercase tracking-wide font-bold text-voro-text-faint">
                {r.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
