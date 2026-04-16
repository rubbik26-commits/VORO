"use client";
import { useState } from "react";
import { createServiceRequest } from "@/lib/api";
import type { Service } from "@/lib/types";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { track } from "@/lib/analytics";
import {
  HeartHandshake,
  Building2,
  Shield,
  BarChart2,
  Users,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";

const ci: Record<string, React.ReactNode> = {
  Lending:    <HeartHandshake   size={22} className="text-voro-purple" />,
  Title:      <Building2        size={22} className="text-voro-purple" />,
  Insurance:  <Shield           size={22} className="text-voro-purple" />,
  Research:   <BarChart2        size={22} className="text-voro-purple" />,
  "Lead Gen": <Users            size={22} className="text-voro-purple" />,
  Commercial: <BriefcaseBusiness size={22} className="text-voro-purple" />,
};

export default function ServicesClient({ services }: { services: Service[] }) {
  const { toast } = useToast();
  const [active, setActive] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!active) return;
    const formData = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await createServiceRequest({
        service: active.title,
        category: active.category,
        subject:  (formData.get("subject")  as string) || "",
        urgency:  (formData.get("urgency")  as string) || "Standard",
        details:  (formData.get("details")  as string) || "",
      });
      track("service_requested", { id: active.id, category: active.category });
      toast(`${active.title} request submitted. Expected: ${active.eta}.`, "success");
      setActive(null);
    } catch {
      toast("Could not submit request. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <Card
            key={s.id}
            variant="featured"
            className={`flex flex-col gap-4 group animate-fade-in stagger-${Math.min(i + 1, 8)}`}
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
              {s.cta} <ArrowRight size={14} />
            </button>
          </Card>
        ))}
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title ?? ""}
        description={`${active?.category ?? ""} · ${active?.eta ?? ""}`}
        footer={
          <>
            <button type="button" className="btn-ghost text-sm" onClick={() => setActive(null)}>
              Cancel
            </button>
            <button
              type="submit"
              form="service-request-form"
              disabled={submitting}
              className="btn-primary text-sm disabled:opacity-60"
            >
              {submitting ? "Submitting…" : (active?.cta ?? "Submit")}
            </button>
          </>
        }
      >
        <form id="service-request-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
          <p className="text-sm text-voro-text-muted">{active?.description}</p>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-voro-text-muted">Related deal / subject</label>
            <input
              name="subject"
              required
              className="input"
              placeholder="e.g., 142 W 72nd St — lender referral"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-voro-text-muted">Urgency</label>
            <select name="urgency" className="input" defaultValue="Standard">
              <option>Standard</option>
              <option>Rush (24hr)</option>
              <option>Exploratory</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-voro-text-muted">Details</label>
            <textarea
              name="details"
              required
              rows={4}
              className="input"
              placeholder="Share context, timelines, and what you need."
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
