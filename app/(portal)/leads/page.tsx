"use client";
import { useMemo, useState } from "react";
import { leads } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { Phone, Mail, MessageCircle, Search } from "lucide-react";

const sv: Record<string, "default" | "warning" | "success" | "danger" | "neutral"> = {
  New: "default",
  Contacted: "warning",
  Active: "success",
  Nurturing: "default",
  Closed: "neutral",
  Lost: "danger",
};
const tv: Record<string, string> = {
  Buyer: "bg-blue-50 text-blue-700",
  Seller: "bg-amber-50 text-amber-700",
  Investor: "bg-purple-50 text-purple-700",
  Renter: "bg-green-50 text-green-700",
  Referral: "bg-pink-50 text-pink-700",
  Recruit: "bg-indigo-50 text-indigo-700",
};

const TYPE_OPTIONS = ["All", "Buyer", "Seller", "Investor", "Renter", "Recruit"] as const;
const STATUS_OPTIONS = ["All", "New", "Contacted", "Active", "Nurturing", "Lost"] as const;

export default function LeadsPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_OPTIONS)[number]>("All");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (typeFilter !== "All" && l.type !== typeFilter) return false;
      if (statusFilter !== "All" && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.market.toLowerCase().includes(q) ||
        l.source.toLowerCase().includes(q) ||
        (l.notes ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, typeFilter, statusFilter]);

  return (
    <>
      <PageHeader
        title="Leads"
        description="Your lead inbox, referrals, and recruiting pipeline."
        action={
          <button
            onClick={() => toast("Lead intake form coming soon. Wire to CRM API.", "info")}
            className="btn-primary text-sm"
          >
            + Add Lead
          </button>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: leads.length.toString() },
          { label: "New This Week", value: leads.filter((l) => l.status === "New").length.toString() },
          { label: "Active", value: leads.filter((l) => l.status === "Active").length.toString() },
          { label: "Recruiting", value: leads.filter((l) => l.type === "Recruit").length.toString() },
        ].map((k) => (
          <Card key={k.label} className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-voro-text-muted">{k.label}</div>
            <div className="text-3xl font-black text-voro-jet tabular-nums">{k.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[180px] flex items-center gap-2 rounded-xl border border-voro-muted-border bg-voro-ghost px-3 py-2">
            <Search size={14} className="text-voro-text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, market, or source…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-voro-text-faint"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-voro-text-muted">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="input !py-1.5"
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-voro-text-muted">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="input !py-1.5"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="text-xs text-voro-text-muted ml-auto">
            Showing <span className="font-bold text-voro-jet">{filtered.length}</span> of {leads.length}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <Card className="md:col-span-2 xl:col-span-3 text-center py-10">
            <div className="text-sm font-semibold text-voro-text-muted">No leads match your filters.</div>
          </Card>
        )}
        {filtered.map((l) => (
          <Card key={l.id} className="flex flex-col gap-3 hover:shadow-medium transition-shadow">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-base font-bold text-voro-jet">{l.name}</div>
                <div className="text-xs text-voro-text-muted mt-0.5">{l.market}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    tv[l.type] ?? ""
                  }`}
                >
                  {l.type}
                </span>
                <Badge variant={sv[l.status]}>{l.status}</Badge>
              </div>
            </div>
            {l.notes && (
              <p className="text-xs text-voro-text-muted bg-voro-ghost rounded-xl px-3 py-2 leading-relaxed">
                {l.notes}
              </p>
            )}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-voro-muted-border">
              <div className="text-xs text-voro-text-faint">
                Source: <span className="text-voro-text-muted font-semibold">{l.source}</span>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={`tel:${l.phone}`}
                  className="btn-ghost-icon"
                  aria-label={`Call ${l.name}`}
                >
                  <Phone size={14} />
                </a>
                <a
                  href={`mailto:${l.email}`}
                  className="btn-ghost-icon"
                  aria-label={`Email ${l.name}`}
                >
                  <Mail size={14} />
                </a>
                <button
                  onClick={() => toast(`Messaging ${l.name} (mock — wire to SMS/chat).`, "info")}
                  className="btn-ghost-icon"
                  aria-label={`Message ${l.name}`}
                >
                  <MessageCircle size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
