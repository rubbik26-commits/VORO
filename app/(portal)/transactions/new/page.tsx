"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { createTransaction } from "@/lib/api";
import { track } from "@/lib/analytics";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

type DraftState = {
  address: string;
  city: string;
  state: string;
  client: string;
  side: "Buyer" | "Seller";
  listPrice: string;
  salePrice: string;
  commission: string;
  closingDate: string;
  notes: string;
};

const EMPTY: DraftState = {
  address: "",
  city: "",
  state: "NY",
  client: "",
  side: "Buyer",
  listPrice: "",
  salePrice: "",
  commission: "",
  closingDate: "",
  notes: "",
};

export default function NewTransactionPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [draft, setDraft] = useState<DraftState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof DraftState>(key: K, value: DraftState[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.address.trim() || !draft.client.trim() || !draft.closingDate.trim()) {
      toast("Address, client, and closing date are required.", "error");
      return;
    }
    const listPriceNum = Number(draft.listPrice.replace(/[^0-9.]/g, "")) || 0;
    if (listPriceNum <= 0) {
      toast("Enter a valid list price.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const created = await createTransaction({
        address: draft.address.trim(),
        city: draft.city.trim() || "New York",
        state: draft.state.trim() || "NY",
        client: draft.client.trim(),
        side: draft.side,
        listPrice: listPriceNum,
        salePrice: Number(draft.salePrice.replace(/[^0-9.]/g, "")) || undefined,
        commission: Number(draft.commission.replace(/[^0-9.]/g, "")) || undefined,
        closingDate: draft.closingDate,
      });
      track("transaction_submitted", { id: created.id, side: created.side });
      setSubmitted(true);
      toast(`Deal submitted for ${created.address}.`, "success");
      setTimeout(() => router.push("/transactions"), 1200);
    } catch {
      toast("Could not submit deal. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Submit a Deal"
        eyebrow="New Transaction"
        description="Log a new deal for broker review. You can upload contracts and missing docs after submission."
        action={
          <Link href="/transactions" className="btn-ghost text-sm flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to transactions
          </Link>
        }
      />
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6">
        <Card>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="section-title mb-1">Property & Client</div>
              <div className="section-body">Everything we need to open the file.</div>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-voro-text-muted">Property Address</label>
              <input
                value={draft.address}
                onChange={(e) => set("address", e.target.value)}
                className="input"
                placeholder="e.g., 142 W 72nd St, Apt 8B"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">City</label>
              <input
                value={draft.city}
                onChange={(e) => set("city", e.target.value)}
                className="input"
                placeholder="New York"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">State</label>
              <select
                value={draft.state}
                onChange={(e) => set("state", e.target.value)}
                className="input"
              >
                {["NY", "NJ", "CT", "PA", "FL", "MA", "CA"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-voro-text-muted">Client Name</label>
              <input
                value={draft.client}
                onChange={(e) => set("client", e.target.value)}
                className="input"
                placeholder="Full legal name or entity"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Side</label>
              <select
                value={draft.side}
                onChange={(e) => set("side", e.target.value as DraftState["side"])}
                className="input"
              >
                <option>Buyer</option>
                <option>Seller</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Target Closing Date</label>
              <input
                type="date"
                value={draft.closingDate}
                onChange={(e) => set("closingDate", e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="md:col-span-2 border-t border-voro-muted-border my-1" />
            <div className="md:col-span-2">
              <div className="section-title mb-1">Pricing</div>
              <div className="section-body">Sale price and commission can be updated once offer is final.</div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">List Price (USD)</label>
              <input
                inputMode="decimal"
                value={draft.listPrice}
                onChange={(e) => set("listPrice", e.target.value)}
                className="input"
                placeholder="1,250,000"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Expected Sale Price</label>
              <input
                inputMode="decimal"
                value={draft.salePrice}
                onChange={(e) => set("salePrice", e.target.value)}
                className="input"
                placeholder="1,210,000"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Expected Commission</label>
              <input
                inputMode="decimal"
                value={draft.commission}
                onChange={(e) => set("commission", e.target.value)}
                className="input"
                placeholder="18,150"
              />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-voro-text-muted">Deal Notes</label>
              <textarea
                value={draft.notes}
                onChange={(e) => set("notes", e.target.value)}
                className="input min-h-[100px]"
                placeholder="Key context, dual agency, co-broker, etc."
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDraft(EMPTY)}
                className="btn-ghost text-sm"
                disabled={submitting}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={submitting || submitted}
                className="btn-primary text-sm disabled:opacity-60 flex items-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 size={14} />
                    Submitted
                  </>
                ) : submitting ? (
                  "Submitting…"
                ) : (
                  "Submit for Broker Review"
                )}
              </button>
            </div>
          </form>
        </Card>
        <div className="flex flex-col gap-4">
          <Card>
            <div className="section-title mb-1">What Happens Next</div>
            <ol className="text-sm text-voro-text-muted flex flex-col gap-2 mt-3 list-decimal list-inside">
              <li>Your file is queued for broker review within 1 business day.</li>
              <li>Transaction Coordinator reaches out to collect missing docs.</li>
              <li>File moves through milestones automatically as tasks complete.</li>
              <li>Commission is calculated once fully executed and approved.</li>
            </ol>
          </Card>
          <Card>
            <div className="section-title mb-1">Need Help?</div>
            <p className="text-xs text-voro-text-muted">
              Complex deal, commercial file, or unique scenario? Submit a
              <Link href="/support" className="text-voro-purple font-semibold"> support ticket </Link>
              or loop in the
              <Link href="/commercial" className="text-voro-purple font-semibold"> commercial desk</Link>.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
