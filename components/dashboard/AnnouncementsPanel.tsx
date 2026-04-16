"use client";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { markAnnouncementRead } from "@/lib/api";
import type { Announcement } from "@/lib/types";
import { track } from "@/lib/analytics";

type Props = { items: Announcement[] };

export default function AnnouncementsPanel({ items }: Props) {
  const { toast } = useToast();
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const handleClick = async (a: Announcement) => {
    if (readIds.has(a.id)) return;
    try {
      await markAnnouncementRead(a.id);
      setReadIds((prev) => new Set(prev).add(a.id));
      track("announcement_read", { id: a.id, category: a.category });
      toast(`Marked "${a.title}" as read.`, "success");
    } catch {
      toast("Couldn't mark as read. Try again.", "error");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((a) => {
        const isRead = readIds.has(a.id);
        return (
          <div
            key={a.id}
            className={`rounded-xl border p-4 transition-all ${
              isRead
                ? "border-voro-muted-border bg-voro-ghost/60 opacity-70"
                : "border-voro-muted-border hover:border-voro-purple"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <Badge variant="purple">{a.category}</Badge>
              <button
                type="button"
                onClick={() => handleClick(a)}
                className="text-xs font-semibold text-voro-purple hover:text-voro-indigo"
                disabled={isRead}
              >
                {isRead ? "Read" : a.cta}
              </button>
            </div>
            <div className="text-sm font-bold text-voro-jet">{a.title}</div>
            <p className="text-xs text-voro-text-muted mt-1 leading-relaxed">{a.body}</p>
          </div>
        );
      })}
    </div>
  );
}
