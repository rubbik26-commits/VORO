"use client";
import { useState } from "react";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { leads } from "@/data/mock-data";
import { useToast } from "@/components/ui/Toast";
import { UserPlus2, Mail, Phone } from "lucide-react";

export default function RecruitingPage() {
  const { toast } = useToast();
  const recruitingLeads = leads.filter((l) => l.type === "Recruit");
  const [form, setForm] = useState({ name: "", market: "", source: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.market.trim()) {
      toast("Name and market are required.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast(`${form.name} added to recruiting pipeline.`, "success");
      setForm({ name: "", market: "", source: "", notes: "" });
    }, 500);
  };

  return (
    <>
      <PageHeader
        title="Recruiting"
        eyebrow="Optional Module"
        description="Track recruiting conversations and bring aligned agents into VORO."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Recruits", value: recruitingLeads.length.toString() },
          {
            label: "New This Month",
            value: recruitingLeads.filter((l) => l.status === "New").length.toString(),
          },
          {
            label: "In Conversation",
            value: recruitingLeads.filter((l) => l.status !== "New" && l.status !== "Lost").length.toString(),
          },
          { label: "Onboarded", value: "0" },
        ].map((k) => (
          <Card key={k.label} className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-voro-text-muted">{k.label}</div>
            <div className="text-3xl font-black text-voro-jet tabular-nums">{k.value}</div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.9fr] gap-6">
        <Card>
          <div className="section-title mb-1">Recruiting Pipeline</div>
          <div className="section-body mb-4">Agents you are currently in conversation with.</div>
          <div className="flex flex-col gap-3">
            {recruitingLeads.length === 0 && (
              <div className="rounded-xl border border-dashed border-voro-muted-border p-6 text-center text-sm text-voro-text-muted">
                No recruiting prospects yet. Add one on the right to start tracking.
              </div>
            )}
            {recruitingLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-voro-muted-border px-4 py-3 hover:border-voro-purple transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-voro-jet truncate">{lead.name}</div>
                    <div className="text-xs text-voro-text-muted truncate">
                      {lead.market} · Source: {lead.source}
                    </div>
                    <div className="text-xs text-voro-text-muted mt-0.5 line-clamp-2">{lead.notes}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs shrink-0">
                  <span className="inline-flex rounded-full px-2 py-0.5 bg-voro-ghost text-voro-text-muted font-semibold capitalize">
                    {lead.status}
                  </span>
                  <div className="flex gap-1.5">
                    <a href={`tel:${lead.phone}`} className="btn-ghost-icon" aria-label={`Call ${lead.name}`}>
                      <Phone size={14} />
                    </a>
                    <a
                      href={`mailto:${lead.email}`}
                      className="btn-ghost-icon"
                      aria-label={`Email ${lead.name}`}
                    >
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="section-title mb-1">Add Recruiting Prospect</div>
          <div className="section-body mb-4">
            Log a new recruiting conversation you want to track through the funnel.
          </div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="input"
                placeholder="Agent full name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Market</label>
              <input
                value={form.market}
                onChange={(e) => setForm((f) => ({ ...f, market: e.target.value }))}
                className="input"
                placeholder="e.g., Brooklyn, NY"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Source</label>
              <input
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                className="input"
                placeholder="Referral, LinkedIn, Event, etc."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="input min-h-[100px]"
                placeholder="Experience, production, why they are a fit for VORO."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-sm flex items-center gap-1 disabled:opacity-60"
            >
              <UserPlus2 size={14} />
              {submitting ? "Adding…" : "Add to recruiting pipeline"}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}
