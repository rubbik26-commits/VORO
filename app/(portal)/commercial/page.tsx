"use client";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { getServices } from "@/lib/api";
import { track } from "@/lib/analytics";
import type { Service } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import { Building2, Landmark, BriefcaseBusiness } from "lucide-react";

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
    getServices().then(setAllServices);
  }, []);

  const commercialServices = useMemo(() => allServices.filter((s) => s.category === "Commercial"), [allServices]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.opportunity.trim() || !form.details.trim()) {
      toast("Opportunity and details are required.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      track("commercial_request_submitted", { opportunity: form.opportunity, role: form.role });
      toast("Commercial desk request submitted.", "success");
      setForm({ opportunity: "", role: "Buyer rep", details: "" });
    }, 600);
  };

  return (
    <>
      <PageHeader
        title="Commercial Desk"
        eyebrow="Optional Module"
        description="Office, retail, industrial, and mixed-use deal support with dedicated commercial advisors."
      />
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6">
        <Card>
          <div className="section-title mb-1">Active &amp; Upcoming Commercial Files</div>
          <div className="section-body mb-4">
            High-level pipeline view for commercial opportunities you are touching.
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
              <div>
                <div className="font-semibold text-voro-jet">Stage</div>
                <div>Clear to Close</div>
              </div>
              <div>
                <div className="font-semibold text-voro-jet">Est. Commission</div>
                <div>$61,000</div>
              </div>
              <div>
                <div className="font-semibold text-voro-jet">Close Target</div>
                <div>Apr 21, 2026</div>
              </div>
              <div>
                <div className="font-semibold text-voro-jet">Point Person</div>
                <div>You + Commercial Desk</div>
              </div>
            </div>
          </div>
          {commercialServices.length > 0 && (
            <div className="mt-4 rounded-xl border border-dashed border-voro-muted-border p-4 text-xs text-voro-text-muted flex items-start gap-2">
              <Landmark size={14} className="text-voro-purple mt-0.5" />
              <span>
                Partnered with {commercialServices[0].title} &mdash; response {commercialServices[0].eta.toLowerCase()}.
              </span>
            </div>
          )}
        </Card>
        <Card>
          <div className="section-title mb-1">How Commercial Desk Helps</div>
          <div className="section-body mb-4">
            Use this desk for any non-residential opportunity &mdash; office, retail, mixed-use, industrial, development.
          </div>
          <ul className="text-sm text-voro-text-muted flex flex-col gap-2">
            <li>• Deal strategy, underwriting, and pricing guidance.</li>
            <li>• Offering memorandum review and creation support.</li>
            <li>• Cap rate and NOI analysis plus investor scenarios.</li>
            <li>• Help identifying qualified buyers, tenants, and capital.</li>
            <li>• Coordination with attorneys, lenders, and title.</li>
          </ul>
        </Card>
      </div>
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
      <Card>
        <div className="section-title mb-1">Pipeline Snapshot</div>
        <div className="section-body mb-4">Quick view of commercial activity across your book of business.</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="rounded-xl bg-voro-ghost p-4 flex flex-col gap-1">
            <div className="text-voro-text-muted">Active commercial files</div>
            <div className="text-2xl font-black text-voro-jet tabular-nums">4</div>
          </div>
          <div className="rounded-xl bg-voro-ghost p-4 flex flex-col gap-1">
            <div className="text-voro-text-muted">Total potential commission</div>
            <div className="text-2xl font-black text-voro-jet tabular-nums">$186,000</div>
          </div>
          <div className="rounded-xl bg-voro-ghost p-4 flex flex-col gap-1">
            <div className="text-voro-text-muted">Under LOI</div>
            <div className="text-2xl font-black text-voro-jet tabular-nums">2</div>
          </div>
          <div className="rounded-xl bg-voro-ghost p-4 flex flex-col gap-1">
            <div className="text-voro-text-muted">Closed last 12 months</div>
            <div className="text-2xl font-black text-voro-jet tabular-nums">3</div>
          </div>
        </div>
      </Card>
    </>
  );
}
