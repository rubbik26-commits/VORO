"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { transactions } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { CheckCircle2, Circle, AlertCircle, Search } from "lucide-react";

const sv: Record<string, "default" | "warning" | "danger" | "success" | "neutral"> = {
  "Attorney Review": "default",
  "Inspection Scheduled": "warning",
  "Documents Outstanding": "danger",
  "Clear to Close": "success",
  "Accepted Offer": "default",
  "Inspection Complete": "default",
  Closed: "success",
  "Broker Review": "warning",
};
const rv: Record<string, "success" | "warning" | "danger"> = {
  Approved: "success",
  Pending: "warning",
  "Needs Revision": "danger",
};

type SortKey = "closing" | "commission" | "status";
type SideFilter = "All" | "Buyer" | "Seller";
type StatusFilter = "All" | string;

function parseCloseDate(s: string) {
  const d = new Date(s);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

export default function TransactionsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [side, setSide] = useState<SideFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [sortBy, setSortBy] = useState<SortKey>("closing");

  const uniqueStatuses = useMemo(
    () => ["All", ...Array.from(new Set(transactions.map((t) => t.status)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = transactions.filter((t) => {
      if (side !== "All" && t.side !== side) return false;
      if (status !== "All" && t.status !== status) return false;
      if (!q) return true;
      return (
        t.address.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.client.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
      );
    });
    const sorted = [...base];
    if (sortBy === "closing") {
      sorted.sort((a, b) => parseCloseDate(a.closingDate) - parseCloseDate(b.closingDate));
    } else if (sortBy === "commission") {
      sorted.sort((a, b) => b.commission - a.commission);
    } else if (sortBy === "status") {
      sorted.sort((a, b) => a.status.localeCompare(b.status));
    }
    return sorted;
  }, [query, side, status, sortBy]);

  const pipeline = transactions.reduce((s, t) => s + t.commission, 0);

  return (
    <>
      <PageHeader
        title="Transactions"
        description="Active deals, milestones, document status, and commission pipeline."
        action={
          <Link href="/transactions/new" className="btn-primary text-sm">
            + Submit New Deal
          </Link>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Files", value: transactions.filter((t) => t.status !== "Closed").length.toString() },
          { label: "Commission Pipeline", value: formatCurrency(pipeline) },
          { label: "Docs Outstanding", value: transactions.filter((t) => t.missingDocs.length > 0).length.toString() },
          {
            label: "Needs Broker Review",
            value: transactions.filter((t) => t.brokerReview !== "Approved").length.toString(),
          },
        ].map((k) => (
          <Card key={k.label} className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-voro-text-muted">{k.label}</div>
            <div className="text-3xl font-black tracking-tight text-voro-jet tabular-nums">{k.value}</div>
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
              placeholder="Search by address, client, status…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-voro-text-faint"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-voro-text-muted">Side</label>
            <select
              value={side}
              onChange={(e) => setSide(e.target.value as SideFilter)}
              className="input !py-1.5"
            >
              <option>All</option>
              <option>Buyer</option>
              <option>Seller</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-voro-text-muted">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input !py-1.5"
            >
              {uniqueStatuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-voro-text-muted">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="input !py-1.5"
            >
              <option value="closing">Closing date</option>
              <option value="commission">Commission</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="text-xs text-voro-text-muted ml-auto">
            Showing <span className="font-bold text-voro-jet">{filtered.length}</span> of {transactions.length}
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-5">
        {filtered.length === 0 && (
          <Card className="text-center py-10">
            <div className="text-sm font-semibold text-voro-text-muted">No transactions match your filters.</div>
            <button
              onClick={() => {
                setQuery("");
                setSide("All");
                setStatus("All");
              }}
              className="btn-ghost text-xs mt-3"
            >
              Clear filters
            </button>
          </Card>
        )}
        {filtered.map((t) => (
          <Card key={t.id} padding={false}>
            <div className="flex flex-wrap items-start justify-between gap-4 p-5 border-b border-voro-muted-border">
              <div>
                <div className="text-lg font-bold text-voro-jet">
                  {t.address}, {t.city}, {t.state}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="neutral">{t.side}</Badge>
                  <Badge variant={sv[t.status] ?? "default"}>{t.status}</Badge>
                  <Badge variant={rv[t.brokerReview] ?? "default"}>Broker: {t.brokerReview}</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-voro-text-muted">Commission</div>
                <div className="text-xl font-black text-voro-jet tabular-nums mt-0.5">
                  {formatCurrency(t.commission)}
                </div>
                <div className="text-xs text-voro-text-muted mt-1">Closing: {t.closingDate}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-voro-text-muted mb-3">
                  Milestones
                </div>
                <div className="flex flex-col gap-2">
                  {t.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {m.completed ? (
                        <CheckCircle2 size={16} className="text-voro-success shrink-0" />
                      ) : (
                        <Circle size={16} className="text-voro-text-faint shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          m.completed ? "text-voro-jet font-semibold" : "text-voro-text-muted"
                        }`}
                      >
                        {m.label}
                      </span>
                      {m.date && <span className="text-xs text-voro-text-faint ml-auto">{m.date}</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {t.missingDocs.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-voro-danger mb-2">
                      <AlertCircle size={14} />
                      Missing Documents
                    </div>
                    {t.missingDocs.map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-voro-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-voro-danger shrink-0" />
                        {doc}
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-voro-text-muted mb-2">
                    Deal Details
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-voro-text-muted">Client</span>
                      <span className="font-semibold text-voro-jet">{t.client}</span>
                    </div>
                    {t.listPrice > 0 && (
                      <div className="flex justify-between">
                        <span className="text-voro-text-muted">List Price</span>
                        <span className="font-semibold tabular-nums">{formatCurrency(t.listPrice)}</span>
                      </div>
                    )}
                    {t.salePrice > 0 && (
                      <div className="flex justify-between">
                        <span className="text-voro-text-muted">Sale Price</span>
                        <span className="font-semibold tabular-nums">{formatCurrency(t.salePrice)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => router.push(`/transactions/${t.id}`)}
                    className="btn-ghost text-sm flex-1"
                  >
                    View File
                  </button>
                  <button
                    onClick={() =>
                      toast(
                        t.missingDocs.length > 0
                          ? `Upload flow opened for ${t.missingDocs.length} missing document(s).`
                          : "All documents complete for this file.",
                        t.missingDocs.length > 0 ? "info" : "success",
                      )
                    }
                    className="btn-primary text-sm flex-1"
                  >
                    {t.missingDocs.length > 0 ? "Upload Missing Docs" : "All Docs Complete"}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
