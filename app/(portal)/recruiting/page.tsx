import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { leads } from "@/data/mock-data";
import { UserPlus2, Mail, Phone } from "lucide-react";

export default function RecruitingPage() {
  const recruitingLeads = leads.filter((l) => l.type === "Recruit");
  return (
    <>
      <PageHeader
        title="Recruiting"
        eyebrow="Optional Module"
        description="Track recruiting conversations and bring aligned agents into VORO."
      />
      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.9fr] gap-6">
        <Card>
          <div className="section-title mb-1">Recruiting Pipeline</div>
          <div className="section-body mb-4">Agents you are currently in conversation with.</div>
          <div className="flex flex-col gap-3">
            {recruitingLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-voro-muted-border px-4 py-3 hover:border-voro-purple transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white text-sm font-bold">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-voro-jet">{lead.name}</div>
                    <div className="text-xs text-voro-text-muted">
                      {lead.market} · Source: {lead.source}
                    </div>
                    <div className="text-xs text-voro-text-muted mt-0.5 line-clamp-2">{lead.notes}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs">
                  <span className="inline-flex rounded-full px-2 py-0.5 bg-voro-ghost text-voro-text-muted font-semibold capitalize">
                    {lead.status}
                  </span>
                  <div className="flex gap-1.5">
                    <button className="btn-ghost-icon" aria-label="Call agent">
                      <Phone size={14} />
                    </button>
                    <button className="btn-ghost-icon" aria-label="Email agent">
                      <Mail size={14} />
                    </button>
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
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Name</label>
              <input className="input" placeholder="Agent full name" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Market</label>
              <input className="input" placeholder="e.g., Brooklyn, NY" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Source</label>
              <input className="input" placeholder="Referral, LinkedIn, Event, etc." />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Notes</label>
              <textarea
                className="input min-h-[100px]"
                placeholder="Experience, production, why they are a fit for VORO."
              />
            </div>
            <button type="submit" className="btn-primary text-sm flex items-center gap-1">
              <UserPlus2 size={14} />
              Add to recruiting pipeline
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}
