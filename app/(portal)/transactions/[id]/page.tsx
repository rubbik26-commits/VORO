import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { getTransaction } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, Circle, AlertCircle, FileText } from "lucide-react";

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

type Params = { id: string };

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const transaction = await getTransaction(id);
  if (!transaction) notFound();

  const completedMilestones = transaction.milestones.filter((m) => m.completed).length;
  const progressPct = Math.round((completedMilestones / transaction.milestones.length) * 100);

  return (
    <>
      <PageHeader
        title={transaction.address}
        eyebrow={`${transaction.client} · ${transaction.side}`}
        description={`${transaction.city}, ${transaction.state} · Closing ${transaction.closingDate}`}
        action={
          <Link href="/transactions" className="btn-ghost text-sm flex items-center gap-1.5">
            <ArrowLeft size={14} /> All transactions
          </Link>
        }
      />
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="neutral">{transaction.side}</Badge>
              <Badge variant={sv[transaction.status] ?? "default"}>{transaction.status}</Badge>
              <Badge variant={rv[transaction.brokerReview] ?? "default"}>
                Broker: {transaction.brokerReview}
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-semibold text-voro-text-muted">File progress</span>
              <span className="font-black text-voro-jet">{progressPct}%</span>
            </div>
            <div className="h-2 rounded-full bg-voro-ghost overflow-hidden">
              <div
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`File ${progressPct}% complete`}
                className="h-full bg-gradient-accent"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mt-5">
              {[
                { label: "List Price", value: formatCurrency(transaction.listPrice) },
                { label: "Sale Price", value: transaction.salePrice > 0 ? formatCurrency(transaction.salePrice) : "—" },
                { label: "Commission", value: formatCurrency(transaction.commission) },
                { label: "Close Target", value: transaction.closingDate },
              ].map((s, i) => (
                <div key={s.label} className={`rounded-xl bg-gradient-to-br from-white to-voro-ghost border border-voro-muted-border p-3 animate-fade-in stagger-${i + 1}`}>
                  <div className="text-voro-text-muted">{s.label}</div>
                  <div className="text-lg font-black text-voro-jet tabular-nums">{s.value}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="section-title mb-4">Milestones</div>
            <ol className="flex flex-col gap-3">
              {transaction.milestones.map((m, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                    m.completed ? "bg-voro-ghost" : "border border-dashed border-voro-muted-border"
                  }`}
                >
                  {m.completed ? (
                    <CheckCircle2 size={18} className="text-voro-success shrink-0" />
                  ) : (
                    <Circle size={18} className="text-voro-text-faint shrink-0" />
                  )}
                  <span
                    className={`text-sm flex-1 ${
                      m.completed ? "font-semibold text-voro-jet" : "text-voro-text-muted"
                    }`}
                  >
                    {m.label}
                  </span>
                  {m.date && (
                    <span className="text-xs text-voro-text-faint shrink-0">{m.date}</span>
                  )}
                </li>
              ))}
            </ol>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <div className="section-title mb-1">Client</div>
            <div className="text-sm font-bold text-voro-jet mt-2">{transaction.client}</div>
            <div className="text-xs text-voro-text-muted mt-1">
              {transaction.side} · {transaction.city}, {transaction.state}
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="section-title">Documents</div>
              <Link href="/documents" className="text-xs font-semibold text-voro-purple">
                Open library
              </Link>
            </div>
            {transaction.missingDocs.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-voro-success">
                <CheckCircle2 size={16} />
                All required documents complete.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-voro-danger">
                  <AlertCircle size={14} />
                  Missing ({transaction.missingDocs.length})
                </div>
                {transaction.missingDocs.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center gap-2 rounded-lg border border-voro-muted-border px-3 py-2 text-sm"
                  >
                    <FileText size={14} className="text-voro-purple" />
                    <span className="text-voro-jet">{doc}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card>
            <div className="section-title mb-1">Need Help?</div>
            <p className="text-xs text-voro-text-muted mt-2">
              File a{" "}
              <Link href="/support" className="text-voro-purple font-semibold">
                support ticket
              </Link>{" "}
              for this transaction, or loop the{" "}
              <Link href="/commercial" className="text-voro-purple font-semibold">
                commercial desk
              </Link>{" "}
              in on complex deals.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
