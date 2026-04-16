"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { getLeads, createLead } from "@/lib/api";
import { track } from "@/lib/analytics";
import { isValidEmail, isValidPhone } from "@/lib/utils";
import type { Lead } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import { Phone, Mail, MessageCircle, Search, UserX } from "lucide-react";

const sv: Record<string, "default" | "warning" | "success" | "danger" | "neutral"> = {
  New: "default",
  Contacted: "warning",
  Active: "success",
  Nurturing: "default",
  Closed: "neutral",
  Lost: "danger",
};
const statusAccent: Record<string, "success" | "warning" | "danger" | "purple"> = {
  New: "purple",
  Contacted: "warning",
  Active: "success",
  Nurturing: "purple",
  Closed: "purple",
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

type DraftLead = {
  name: string;
  type: Lead["type"];
  market: string;
  phone: string;
  email: string;
  source: string;
  notes: string;
};

const EMPTY_DRAFT: DraftLead = {
  name: "",
  type: "Buyer",
  market: "",
  phone: "",
  email: "",
  source: "",
  notes: "",
};

export default function LeadsPage() {
  return (
    <Suspense fallback={null}>
      <LeadsContent />
    </Suspense>
  );
}

function LeadsContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_OPTIONS)[number]>("All");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<DraftLead>(EMPTY_DRAFT);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getLeads()
      .then(setLeads)
      .catch(() => toast("Could not load leads. Try refreshing.", "error"));
  }, []);

  useEffect(() => {
    if (searchParams?.get("new") === "1") setModalOpen(true);
  }, [searchParams]);

  const updateDraft = <K extends keyof DraftLead>(key: K, value: DraftLead[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const handleAddLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.market.trim()) {
      toast("Name and market are required.", "error");
      return;
    }
    if (draft.email && !isValidEmail(draft.email)) {
      toast("Please enter a valid email address.", "error");
      return;
    }
    if (draft.phone && !isValidPhone(draft.phone)) {
      toast("Please enter a valid phone number.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const created = await createLead({
        name: draft.name.trim(),
        type: draft.type,
        market: draft.market.trim(),
        phone: draft.phone.trim(),
        email: draft.email.trim(),
        source: draft.source.trim() || "Direct",
        notes: draft.notes.trim(),
      });
      setLeads((prev) => [created, ...prev]);
      track("lead_created", { id: created.id, type: created.type });
      toast(`${created.name} added to leads.`, "success");
      setDraft(EMPTY_DRAFT);
      setModalOpen(false);
    } catch {
      toast("Could not add lead. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

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
  }, [query, typeFilter, statusFilter, leads]);

  return (
    <>
      <PageHeader
        title="Leads"
        description="Your lead inbox, referrals, and recruiting pipeline."
        action={
          <button
            onClick={() => setModalOpen(true)}
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
        ].map((k, i) => (
          <Card key={k.label} variant="stat" className={`flex flex-col gap-2 animate-fade-in stagger-${i + 1}`}>
            <div className="text-xs font-semibold text-voro-text-muted">{k.label}</div>
            <div className="text-3xl font-black text-voro-jet tabular-nums">{k.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 sm:min-w-[180px] flex items-center gap-2 rounded-xl border border-voro-muted-border bg-voro-ghost px-3 py-2">
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
              onChange={(e) => setTypeFilter(e.target.value as (typeof TYPE_OPTIONS)[number])}
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
              onChange={(e) => setStatusFilter(e.target.value as (typeof STATUS_OPTIONS)[number])}
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
          <Card className="md:col-span-2 xl:col-span-3">
            <EmptyState
              icon={UserX}
              title="No leads match your filters"
              description="Try adjusting your search, type, or status filters to find what you're looking for."
              action={
                <button
                  onClick={() => { setQuery(""); setTypeFilter("All"); setStatusFilter("All"); }}
                  className="btn-ghost text-xs"
                >
                  Clear all filters
                </button>
              }
            />
          </Card>
        )}
        {filtered.map((l, idx) => (
          <Card key={l.id} accent={statusAccent[l.status] ?? "purple"} className={`flex flex-col gap-3 animate-fade-in stagger-${Math.min(idx + 1, 8)}`}>
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
                  onClick={() => {
                    track("lead_message", { id: l.id, name: l.name });
                    toast(`Opening conversation with ${l.name}.`, "info");
                  }}
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Lead"
        description="Track a prospect through your pipeline."
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn-ghost text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-lead-form"
              disabled={submitting}
              className="btn-primary text-sm disabled:opacity-60"
            >
              {submitting ? "Adding…" : "Add Lead"}
            </button>
          </>
        }
      >
        <form id="add-lead-form" onSubmit={handleAddLead} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Name</label>
              <input
                value={draft.name}
                onChange={(e) => updateDraft("name", e.target.value)}
                className="input"
                placeholder="Full name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Type</label>
              <select
                value={draft.type}
                onChange={(e) => updateDraft("type", e.target.value as DraftLead["type"])}
                className="input"
              >
                {["Buyer", "Seller", "Investor", "Renter", "Recruit"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Market</label>
              <input
                value={draft.market}
                onChange={(e) => updateDraft("market", e.target.value)}
                className="input"
                placeholder="e.g. Brooklyn, NY"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Source</label>
              <input
                value={draft.source}
                onChange={(e) => updateDraft("source", e.target.value)}
                className="input"
                placeholder="Zillow, Referral, LinkedIn…"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Phone</label>
              <input
                value={draft.phone}
                onChange={(e) => updateDraft("phone", e.target.value)}
                className="input"
                placeholder="(917) 555-0100"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Email</label>
              <input
                type="email"
                value={draft.email}
                onChange={(e) => updateDraft("email", e.target.value)}
                className="input"
                placeholder="name@email.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-voro-text-muted">Notes</label>
            <textarea
              value={draft.notes}
              onChange={(e) => updateDraft("notes", e.target.value)}
              className="input min-h-[80px]"
              placeholder="Budget, timeline, preferences…"
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
