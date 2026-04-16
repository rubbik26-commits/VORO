"use client";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import VoroCommercialLogo from "@/components/ui/VoroCommercialLogo";
import { getServices, createCommercialRequest } from "@/lib/api";
import { track } from "@/lib/analytics";
import type { Service } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import { Building2, Landmark, BriefcaseBusiness, TrendingUp, FileBarChart2, Handshake, Factory } from "lucide-react";

const DEAL_TYPES = [
  { icon: Building2,     label: "Office" },
  { icon: Factory,       label: "Industrial" },
  { icon: Handshake,     label: "Mixed-Use" },
  { icon: FileBarChart2, label: "Investment" },
];

export default function CommercialPage() {
  const { toast } = useToast();
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [form, setForm] = useState({
    opportunity: "",
    role: "Buyer rep",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getServices()
      .then(setAllServices)
      .catch(() => toast("Could not load services. Try refreshing.", "error"));
  }, []);

  const commercialServices = useMemo(
    () => allServices.filter((s) => s.category === "Commercial"),
    [allServices]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.opportunity.trim() || !form.details.trim()) {
      toast("Opportunity and details are required.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await createCommercialRequest({
        opportunity: form.opportunity.trim(),
        role: form.role,
        details: form.details.trim(),
      });
      track("commercial_request_submitted", { opportunity: form.opportunity, role: form.role });
      toast("Commercial desk request submitted.", "success");
      setForm({ opportunity: "", role: "Buyer rep", details: "" });
    } catch {
      toast("Could not submit request. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden mb-6 p-6 md:p-10 flex flex-col md:flex-row items-center gap-6"
        style={{
          background: "linear-gradient(135deg, #0e0c14 0%, #1a1228 50%, #0e0c14 100%)",
          boxShadow: "0 24px 60px rgba(14,12,20,0.5)",
        }}
      >
        {/* Gold radial glow */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(197,160,60,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Purple radial glow */}
        <div
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(94,66,188,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center md:items-start gap-4">
          <VoroCommercialLogo width={300} />
          <p className="text-sm text-white/70 max-w-md leading-relaxed text-center md:text-left">
            Office, retail, industrial, and mixed-use deal support with dedicated
            commercial advisors — cap rate analysis, OM review, investor scenarios,
            and full transaction coordination.
          </p>
          <div className="flex flex-wrap gap-3 mt-1">
            {DEAL_TYPES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(197,160,60,0.25)",
                  color: "#f5e27a",
                }}
              >
                <Icon size={12} />
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex flex-col gap-3 text-center md:text-right ml-auto shrink-0">
          <div
            className="rounded-2xl px-6 py-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(197,160,60,0.2)" }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#c9a84c" }}>
              Pipeline
            </div>
            <div className="text-3xl font-black text-white tabular-nums mt-1">$186K</div>
            <div className="text-xs text-white/50 mt-0.5">potential commission</div>
          </div>
          <div
            className="rounded-2xl px-6 py-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(94,66,188,0.25)" }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-voro-purple mt-0">
              Active Files
            </div>
            <div className="text-3xl font-black text-white tabular-nums mt-1">4</div>
            <div className="text-xs text-white/50 mt-0.5">in progress</div>
          </div>
        </div>
      </div>

      {/* ── Pipeline + How It Helps ───────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6">
        <Card>
          <div className="section-title mb-1">Active &amp; Upcoming Commercial Files</div>
          <div className="section-body mb-4">
            High-level pipeline view for commercial opportunities in your book.
          </div>
          <div className="rounded-xl border border-voro-muted-border p-4 flex flex-col gap-3 bg-voro-ghost">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center text-voro-purple">
                <Building2 size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-voro-jet">
                  UrbanCore Capital Group &mdash; Bronx Medical Office
                </div>
                <div className="text-xs text-voro-text-muted">
                  Buyer · 2211 Grand Concourse, Suite 410 · Bronx, NY
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-voro-text-muted mt-1">
              {[
                { label: "Stage",           value: "Clear to Close" },
                { label: "Est. Commission",  value: "$61,000" },
                { label: "Close Target",     value: "Apr 21, 2026" },
                { label: "Point Person",     value: "You + Commercial Desk" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-semibold text-voro-jet">{s.label}</div>
                  <div>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
          {commercialServices.length > 0 && (
            <div className="mt-4 rounded-xl border border-dashed border-voro-muted-border p-4 text-xs text-voro-text-muted flex items-start gap-2">
              <Landmark size={14} className="text-voro-purple mt-0.5" />
              <span>
                Partnered with {commercialServices[0].title} — response{" "}
                {commercialServices[0].eta.toLowerCase()}.
              </span>
            </div>
          )}
        </Card>

        <Card>
          <div className="section-title mb-1">How Commercial Desk Helps</div>
          <div className="section-body mb-4">
            Use this desk for any non-residential opportunity — office, retail,
            mixed-use, industrial, development.
          </div>
          <ul className="text-sm text-voro-text-muted flex flex-col gap-2.5">
            {[
              "Deal strategy, underwriting, and pricing guidance.",
              "Offering memorandum review and creation support.",
              "Cap rate and NOI analysis plus investor scenarios.",
              "Help identifying qualified buyers, tenants, and capital.",
              "Coordination with attorneys, lenders, and title.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <TrendingUp size={13} className="text-voro-purple mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ── Request Form ─────────────────────────────────────────── */}
      <Card>
        <div className="section-title mb-1">Request Commercial Support</div>
        <div className="section-body mb-4">
          Submit a file and a commercial advisor will respond with next steps.
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-voro-text-muted">Property / Opportunity</label>
            <input
              value={form.opportunity}
              onChange={(e) => setForm((f) => ({ ...f, opportunity: e.target.value }))}
              className="input"
              placeholder="Address or brief description"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-voro-text-muted">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="input"
            >
              <option>Buyer rep</option>
              <option>Seller rep</option>
              <option>Landlord rep</option>
              <option>Tenant rep</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-semibold text-voro-text-muted">What do you need?</label>
            <textarea
              value={form.details}
              onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
              className="input min-h-[120px]"
              placeholder="Share context, timing, and what help you need from the commercial desk."
            />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-semibold text-voro-text-muted">
              Upload supporting documents (optional)
            </label>
            <label className="rounded-xl border border-dashed border-voro-muted-border px-4 py-3 text-xs text-voro-text-muted bg-voro-ghost cursor-pointer hover:border-voro-purple transition-colors">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length)
                    toast(`${e.target.files.length} file(s) attached.`, "success");
                  e.target.value = "";
                }}
              />
              Drag and drop files here or click to browse.
            </label>
          </div>
          <div className="md:col-span-2 flex justify-end gap-2">
            <button
              type="button"
              className="btn-ghost text-sm"
              onClick={() => setForm({ opportunity: "", role: "Buyer rep", details: "" })}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-sm flex items-center gap-1 disabled:opacity-60"
            >
              <BriefcaseBusiness size={14} />
              {submitting ? "Submitting…" : "Submit to Commercial Desk"}
            </button>
          </div>
        </form>
      </Card>

      {/* ── Pipeline Snapshot ────────────────────────────────────── */}
      <Card>
        <div className="section-title mb-1">Pipeline Snapshot</div>
        <div className="section-body mb-4">
          Quick view of commercial activity across your book of business.
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {[
            { label: "Active commercial files",   value: "4" },
            { label: "Total potential commission", value: "$186,000" },
            { label: "Under LOI",                  value: "2" },
            { label: "Closed last 12 months",      value: "3" },
          ].map((s, i) => (
            <Card key={s.label} variant="stat" className={`flex flex-col gap-1 animate-fade-in stagger-${i + 1}`}>
              <div className="text-voro-text-muted">{s.label}</div>
              <div className="text-2xl font-black text-voro-jet tabular-nums">
                <AnimatedNumber value={s.value} />
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </>
  );
}
