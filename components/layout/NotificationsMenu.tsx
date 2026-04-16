"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  href?: string;
};

const SEED: Notification[] = [
  {
    id: "n1",
    title: "Clear to close — 2211 Grand Concourse",
    body: "UrbanCore Capital file is ready. Closing Apr 21.",
    time: "2h ago",
    unread: true,
    href: "/transactions",
  },
  {
    id: "n2",
    title: "New lead assigned",
    body: "Kevin Thornton wants a CMA on an UES 2BR.",
    time: "5h ago",
    unread: true,
    href: "/leads",
  },
  {
    id: "n3",
    title: "Academy: Co-op Deals",
    body: "Your session starts Apr 22 at 2:00 PM ET.",
    time: "Yesterday",
    unread: false,
    href: "/academy",
  },
  {
    id: "n4",
    title: "Marketing refresh live",
    body: "Q2 brand kit uploaded to the asset library.",
    time: "2d ago",
    unread: false,
    href: "/marketing",
  },
];

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(SEED);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = items.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        className="relative w-9 h-9 rounded-xl border border-voro-muted-border bg-voro-ghost flex items-center justify-center text-voro-text-muted hover:border-voro-purple hover:text-voro-purple transition-all"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-voro-danger text-white text-[10px] font-black flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div
          role="region"
          aria-label="Notifications"
          className="absolute right-0 mt-2 w-80 max-w-[92vw] rounded-2xl bg-white border border-voro-muted-border shadow-medium overflow-hidden z-50"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-voro-muted-border">
            <div className="text-sm font-black text-voro-jet">Notifications</div>
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs font-semibold text-voro-purple hover:text-voro-indigo flex items-center gap-1"
            >
              <CheckCheck size={12} />
              Mark all read
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-voro-text-muted">
                You&apos;re all caught up.
              </div>
            ) : (
              items.map((n) => {
                const content = (
                  <>
                    <div className="flex items-start gap-2">
                      {n.unread && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 mt-1.5 rounded-full bg-voro-purple shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-voro-jet truncate">{n.title}</div>
                        <div className="text-xs text-voro-text-muted line-clamp-2">{n.body}</div>
                        <div className="text-[10px] text-voro-text-faint mt-0.5">{n.time}</div>
                      </div>
                    </div>
                  </>
                );
                return n.href ? (
                  <Link
                    key={n.id}
                    href={n.href}
                    onClick={() => {
                      setItems((prev) =>
                        prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)),
                      );
                      setOpen(false);
                    }}
                    className="block px-4 py-3 hover:bg-voro-ghost transition-colors border-b border-voro-muted-border last:border-0"
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    key={n.id}
                    className="block px-4 py-3 border-b border-voro-muted-border last:border-0"
                  >
                    {content}
                  </div>
                );
              })
            )}
          </div>
          <Link
            href="/support"
            className="block px-4 py-3 text-center text-xs font-semibold text-voro-purple hover:bg-voro-ghost transition-colors border-t border-voro-muted-border"
          >
            View all in Support
          </Link>
        </div>
      )}
    </div>
  );
}
