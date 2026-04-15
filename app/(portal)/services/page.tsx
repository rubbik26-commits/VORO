"use client";
import { useState } from "react";
import { services } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import {
  HeartHandshake,
  Building2,
  Shield,
  BarChart2,
  Users,
  BriefcaseBusiness,
  ArrowRight,
  X,
} from "lucide-react";

const ci: Record<string, React.ReactNode> = {
  Lending: <HeartHandshake size={22} className="text-voro-purple" />,
  Title: <Building2 size={22} className="text-voro-purple" />,
  Insurance: <Shield size={22} className="text-voro-purple" />,
  Research: <BarChart2 size={22} className="text-voro-purple" />,
  "Lead Gen": <Users size={22} className="text-voro-purple" />,
  Commercial: <BriefcaseBusiness size={22} className="text-voro-purple" />,
};

type ServiceShape = (typeof services)[number];

export default function ServicesPage() {
  const { toast } = useToast();
  const [active, setActive] = useState<ServiceShape | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!active) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast(`${active.title} request submitted. Expected: ${active.eta}.`, "success");
      setActive(null);
    }, 600);
  };

  return (
    <>
      <PageHeader
        title="Services"
        description="Request-based workflows designed to help you move deals faster."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map((s) => (
          <Card
            key={s.id}
            className="flex flex-col gap-4 hover:shadow-medium transition-all group hover:border-voro-purple"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0 group-hover:bg-purple-50 transition-colors">
                {ci[s.category]}
              </div>
              <div>
                <div className="text-base font-bold text-voro-jet">{s.title}</div>
                <div className="text-xs text-voro-text-faint uppercase tracking-wide font-semibold mt-0.5">
                  {s.category}
                </div>
              </div>
            </div>
            <p className="text-sm text-voro-text-muted leading-relaxed flex-1">{s.description}</p>
            <div className="text-xs font-semibold text-voro-text-faint uppercase tracking-wide">{s.eta}</div>
            <button
              onClick={() => setActive(s)}
              className="btn-primary text-sm flex items-center justify-center gap-2"
            >
              {s.cta}
              <ArrowRight size={14} />
            </button>
          </Card>
        ))}
      </div>
      <Card className="text-center py-8">
        <div className="text-lg font-bold text-voro-jet mb-2">Need something not listed?</div>
        <p className="text-sm text-voro-text-muted mb-5 max-w-md mx-auto">
          Our operations team handles custom requests.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="tel:877-943-8676" className="btn-primary text-sm">
            Call 877-943-8676
          </a>
          <a href="mailto:hello@voro.com" className="btn-secondary text-sm">
            Email hello@voro.com
          </a>
        </div>
      </Card>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-request-title"
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-voro-indigo/60 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-medium border border-voro-muted-border overflow-hidden">
            <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-voro-muted-border">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-voro-purple">
                  {active.category}
                </div>
                <h2 id="service-request-title" className="text-lg font-black text-voro-jet mt-0.5">
                  {active.title}
                </h2>
                <div className="text-xs text-voro-text-muted mt-0.5">{active.eta}</div>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="btn-ghost-icon"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
              <p className="text-sm text-voro-text-muted">{active.description}</p>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">Related deal / subject</label>
                <input
                  required
                  className="input"
                  placeholder="e.g., 142 W 72nd St — lender referral"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">Urgency</label>
                <select className="input" defaultValue="Standard">
                  <option>Standard</option>
                  <option>Rush (24hr)</option>
                  <option>Exploratory</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">Details</label>
                <textarea
                  required
                  rows={4}
                  className="input"
                  placeholder="Share context, timelines, and what you need."
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button type="button" className="btn-ghost text-sm" onClick={() => setActive(null)}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary text-sm disabled:opacity-60">
                  {submitting ? "Submitting…" : active.cta}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
