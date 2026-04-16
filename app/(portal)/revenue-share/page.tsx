import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { canAccess, isRoleGatingEnabled } from "@/lib/auth";
import { ArrowUpRight, ArrowDownRight, ShieldAlert, Lock } from "lucide-react";
import Link from "next/link";

export default function RevenueSharePage() {
  const gated = isRoleGatingEnabled() && !canAccess("revenue_share");

  return (
    <>
      <PageHeader
        title="Revenue Share"
        eyebrow="Optional Module"
        description="High-level view of your downline, production, and revenue share earnings."
      />
      {gated && (
        <Card className="flex items-start gap-3 border-voro-danger/30 bg-red-50/40">
          <Lock size={18} className="text-voro-danger mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-bold text-voro-jet">Access Restricted</div>
            <p className="text-xs text-voro-text-muted mt-1">
              Revenue share data is only available to team leads, brokers, and admins.
              Contact your broker or visit <Link href="/support" className="text-voro-purple font-semibold">Support</Link> for access.
            </p>
          </div>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-voro-text-muted">MTD Revenue Share</div>
          <div className="text-3xl font-black text-voro-jet tabular-nums">$4,200</div>
          <div className="text-xs font-semibold text-voro-success flex items-center gap-1">
            <ArrowUpRight size={12} /> +18% vs last month
          </div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-voro-text-muted">YTD Revenue Share</div>
          <div className="text-3xl font-black text-voro-jet tabular-nums">$28,600</div>
          <div className="text-xs font-semibold text-voro-purple">On track for $40K</div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-voro-text-muted">Direct Recruits</div>
          <div className="text-3xl font-black text-voro-jet tabular-nums">7</div>
          <div className="text-xs font-semibold text-voro-text-muted">3 producing, 2 ramping</div>
        </Card>
      </div>
      <Card>
        <div className="section-title mb-1">Downline Snapshot</div>
        <div className="section-body mb-4">For illustration only. Connect to your production system before using for payouts.</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-xs">
            <thead>
              <tr className="border-b border-voro-muted-border">
                {["Agent","Tier","Status","Last 12M GCI","Your Share"].map((h) => (
                  <th key={h} className="text-left px-4 py-2 font-semibold text-voro-text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-voro-muted-border">
                <td className="px-4 py-2">James Okonkwo</td>
                <td className="px-4 py-2">Tier 1</td>
                <td className="px-4 py-2 text-voro-success font-semibold">Producing</td>
                <td className="px-4 py-2 tabular-nums">$180,000</td>
                <td className="px-4 py-2 tabular-nums">$9,000</td>
              </tr>
              <tr className="border-b border-voro-muted-border">
                <td className="px-4 py-2">Sandra Birch</td>
                <td className="px-4 py-2">Tier 1</td>
                <td className="px-4 py-2 text-voro-success font-semibold">Producing</td>
                <td className="px-4 py-2 tabular-nums">$220,000</td>
                <td className="px-4 py-2 tabular-nums">$11,000</td>
              </tr>
              <tr className="border-b border-voro-muted-border">
                <td className="px-4 py-2">Marcus White</td>
                <td className="px-4 py-2">Tier 2</td>
                <td className="px-4 py-2 text-voro-warning font-semibold">Ramping</td>
                <td className="px-4 py-2 tabular-nums">$60,000</td>
                <td className="px-4 py-2 tabular-nums">$1,800</td>
              </tr>
              <tr>
                <td className="px-4 py-2">TBD Agent</td>
                <td className="px-4 py-2">Tier 3</td>
                <td className="px-4 py-2 text-voro-text-muted">Prospect</td>
                <td className="px-4 py-2 tabular-nums">—</td>
                <td className="px-4 py-2 tabular-nums">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <div className="section-title mb-1">Important Note</div>
        <div className="section-body">
          All values on this page are mock data for UX only. Connect to your actual brokerage and accounting
          system before using for compliance or payouts.
        </div>
      </Card>
    </>
  );
}
