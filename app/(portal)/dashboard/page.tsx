import {
  getAgent,
  getKpis,
  getTransactions,
  getServices,
  getAcademySessions,
  getDocuments,
} from "@/lib/api";
import { fetchAnnouncements, fetchFeaturedService } from "@/lib/cms";
import { brandTokens } from "@/lib/brand-tokens";
import { formatCurrency } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import AnnouncementsPanel from "@/components/dashboard/AnnouncementsPanel";
import DeniedBanner from "@/components/dashboard/DeniedBanner";
import Link from "next/link";
import { ArrowRight, FileText, HeartHandshake, Phone, Mail } from "lucide-react";

const statusVariant: Record<string, "default" | "warning" | "danger" | "success" | "neutral"> = {
  "Attorney Review": "default",
  "Inspection Scheduled": "warning",
  "Documents Outstanding": "danger",
  "Clear to Close": "success",
};
const quickActions = [
  { label: "Submit a Deal", href: "/transactions/new" },
  { label: "Request Title Support", href: "/services" },
  { label: "Insurance Quote", href: "/services" },
  { label: "Upload Documents", href: "/documents" },
  { label: "Open Brand Kit", href: "/marketing" },
  { label: "Contact Support", href: "/support" },
];

export default async function DashboardPage() {
  const [agent, kpis, transactions, announcements, services, academy, documents, featuredService] =
    await Promise.all([
      getAgent(),
      getKpis(),
      getTransactions(),
      fetchAnnouncements(),
      getServices(),
      getAcademySessions(),
      getDocuments(),
      fetchFeaturedService(),
    ]);
  return (
    <>
      <DeniedBanner />
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-5">
        <div
          className="rounded-2xl p-5 md:p-7 text-white overflow-hidden relative"
          style={{ background: brandTokens.gradients.primary }}
        >
          <div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: brandTokens.gradients.glow }}
          />
          <span className="inline-flex border border-white/20 bg-white/10 rounded-full px-3 py-1 text-xs font-semibold tracking-widest text-white/80 uppercase">
            Real Estate Cloud Broker
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-4 leading-tight">
            Be a real estate entrepreneur.
            <br />
            Run your business from one place.
          </h1>
          <p className="text-sm text-white/80 mt-3 max-w-lg leading-relaxed">
            Operate your real estate business from anywhere, anytime — transactions, support, documents, marketing,
            training, and brokerage services — all in one workspace.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/transactions/new"
              className="bg-white text-voro-indigo font-bold px-6 py-2.5 rounded-full text-sm hover:bg-voro-ghost transition-colors active:scale-[0.98]"
            >
              Submit a Deal
            </Link>
            <Link
              href="/support"
              className="bg-white/10 text-white font-bold px-6 py-2.5 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors active:scale-[0.98]"
            >
              Request Support
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-voro-text-muted font-semibold">
                  Featured Service
                </div>
                <div className="text-lg font-bold text-voro-jet mt-1">
                  {featuredService?.title ?? "Lending Support"}
                </div>
                <p className="text-sm text-voro-text-muted mt-1">
                  {featuredService?.description ?? "Deal strategy, financing support, and investor scenarios."}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0">
                <HeartHandshake size={22} className="text-voro-purple" />
              </div>
            </div>
            <Link href="/services" className="btn-primary text-center text-sm mt-1">
              {featuredService?.cta ?? "Request Lending Help"}
            </Link>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-widest text-voro-text-muted font-semibold mb-2">
              Brokerage Contact
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-voro-indigo">
              <a
                href={`tel:${brandTokens.contact.phone}`}
                className="flex items-center gap-2 hover:text-voro-purple transition-colors"
              >
                <Phone size={12} className="text-voro-purple" />
                {brandTokens.contact.phone}
              </a>
              <a
                href={`mailto:${brandTokens.contact.email}`}
                className="flex items-center gap-2 hover:text-voro-purple transition-colors"
              >
                <Mail size={12} className="text-voro-purple" />
                {brandTokens.contact.email}
              </a>
              <div className="text-voro-text-muted mt-1">
                {brandTokens.contact.corporateOffice}
                <br />
                {brandTokens.contact.office}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.id} className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-voro-text-muted">{k.label}</div>
            <div className="text-3xl font-black tracking-tight text-voro-jet tabular-nums">{k.value}</div>
            <div
              className={`text-xs font-semibold ${
                k.trend === "up"
                  ? "text-voro-success"
                  : k.trend === "down"
                  ? "text-voro-danger"
                  : "text-voro-purple"
              }`}
            >
              {k.delta}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="section-title mb-1">What do you need to do today?</div>
        <div className="section-body mb-4">High-priority shortcuts to move business forward.</div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="border border-voro-muted-border rounded-full px-4 py-2 text-sm font-semibold text-voro-indigo hover:border-voro-purple hover:bg-voro-soft-panel transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6">
        <div className="flex flex-col gap-6">
          <Card padding={false}>
            <div className="flex items-center justify-between p-5 border-b border-voro-muted-border">
              <div>
                <div className="section-title">Active Transactions</div>
                <div className="section-body mt-0.5">Files that need attention.</div>
              </div>
              <Link
                href="/transactions"
                className="flex items-center gap-1 text-xs font-semibold text-voro-purple hover:text-voro-indigo transition-colors"
              >
                View All <ArrowRight size={13} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b border-voro-muted-border">
                    {["Property", "Client", "Type", "Status", "Close", "Commission"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-voro-text-muted px-5 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 4).map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-voro-muted-border last:border-0 hover:bg-voro-ghost transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-4">
                        <Link href={`/transactions/${t.id}`} className="block">
                          <div className="text-sm font-semibold text-voro-jet">{t.address}</div>
                          <div className="text-xs text-voro-text-muted">
                            {t.city}, {t.state}
                          </div>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-sm text-voro-text-muted">{t.client}</td>
                      <td className="px-5 py-4">
                        <Badge variant="neutral">{t.side}</Badge>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={statusVariant[t.status] ?? "default"}>{t.status}</Badge>
                      </td>
                      <td className="px-5 py-4 text-sm text-voro-text-muted whitespace-nowrap">
                        {t.closingDate}
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-voro-jet tabular-nums">
                        {formatCurrency(t.commission)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <div className="section-title mb-1">VORO Services</div>
            <div className="section-body mb-4">Request-based workflows to move faster.</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-voro-muted-border bg-voro-ghost p-4 hover:border-voro-purple hover:shadow-soft transition-all group"
                >
                  <div className="text-sm font-bold text-voro-jet group-hover:text-voro-purple transition-colors">
                    {s.title}
                  </div>
                  <p className="text-xs text-voro-text-muted mt-1 leading-relaxed">{s.description}</p>
                  <div className="text-xs font-semibold uppercase tracking-wide text-voro-text-faint mt-2">
                    {s.eta}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="section-title">Document Center</div>
                <div className="section-body mt-0.5">Forms, templates, compliance.</div>
              </div>
              <Link href="/documents" className="btn-secondary text-xs py-2">
                Upload
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {documents.slice(0, 5).map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-voro-muted-border px-4 py-3 hover:border-voro-purple transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-voro-purple" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-voro-jet">{d.name}</div>
                      <div className="text-xs text-voro-text-muted">
                        {d.state}  —  {d.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-voro-text-muted shrink-0">
                    Updated {d.updatedAt}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <div className="section-title mb-1">Announcements</div>
            <div className="section-body mb-4">Updates from operations, marketing, compliance.</div>
            <AnnouncementsPanel items={announcements} />
          </Card>
          <Card>
            <div className="section-title mb-1">Academy</div>
            <div className="section-body mb-4">Training, coaching, and live sessions.</div>
            <div className="flex flex-col gap-3">
              {academy.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-voro-muted-border px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-voro-jet">{a.title}</div>
                    <div className="text-xs text-voro-text-muted mt-0.5">
                      {a.date ? `${a.date} · ${a.time}` : a.duration}
                    </div>
                  </div>
                  <span className="bg-voro-indigo text-white text-xs font-semibold rounded-full px-2.5 py-0.5 whitespace-nowrap shrink-0">
                    {a.type}
                  </span>
                </div>
              ))}
              <Link
                href="/academy"
                className="text-xs font-semibold text-voro-purple flex items-center gap-1 mt-1"
              >
                View all courses <ArrowRight size={12} />
              </Link>
            </div>
          </Card>
          <Card>
            <div className="section-title mb-1">Support</div>
            <div className="section-body mb-4">Operations, marketing, documents, onboarding.</div>
            <div className="flex flex-col gap-2">
              <Link href="/support" className="btn-primary text-center text-sm">
                Open Support Ticket
              </Link>
              <Link href="/support" className="btn-secondary text-center text-sm">
                Start Live Chat
              </Link>
              <Link href="/support" className="btn-ghost text-center text-sm">
                Browse Help Center
              </Link>
            </div>
          </Card>
          <Card>
            <div className="section-title mb-1">Profile</div>
            <div className="section-body mb-4">Bio, specialties, markets, readiness.</div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center text-white text-xl font-black shrink-0 shadow-glow-sm">
                {agent.firstName[0]}
              </div>
              <div>
                <div className="text-base font-bold text-voro-jet">
                  {agent.firstName} {agent.lastName}
                </div>
                <div className="text-xs text-voro-text-muted">{agent.role}</div>
              </div>
            </div>
            <ProgressBar value={agent.profileCompleteness} label="Profile completeness" />
            <Link href="/profile" className="btn-secondary text-center text-sm mt-4 block">
              Complete Profile
            </Link>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <Card>
          <div className="section-title mb-1">VORO by the numbers</div>
          <div className="section-body mb-4">
            Company-wide performance that powers your business.
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Total sales volume</div>
              <div className="text-lg font-black text-voro-jet tabular-nums">$10B+</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Commissions paid</div>
              <div className="text-lg font-black text-voro-jet tabular-nums">$250M+</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Agents</div>
              <div className="text-lg font-black text-voro-jet tabular-nums">1,000+</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Transactions closed</div>
              <div className="text-lg font-black text-voro-jet tabular-nums">50,000+</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="section-title mb-1">Culture & community</div>
          <div className="section-body mb-4">
            Learn how other VORO agents across America are building their brands, growing their businesses, and using the
            portal day to day.
          </div>
          <a
            href="https://voro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-voro-purple hover:text-voro-indigo transition-colors"
          >
            Meet VORO agents at voro.com
            <ArrowRight size={14} />
          </a>
        </Card>
      </div>
    </>
  );
}
