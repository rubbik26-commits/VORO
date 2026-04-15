import React, { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  FileText,
  FolderOpen,
  Home,
  LifeBuoy,
  Menu,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  UserCircle2,
  X,
} from "lucide-react";
import { brandTokens } from "./brand-tokens";
import {
  academy,
  agent,
  announcements,
  documents,
  kpis,
  services,
  transactions,
  type NavItem,
} from "./mock-data";

const navItems: { label: NavItem; icon: React.ReactNode }[] = [
  { label: "Dashboard", icon: <Home size={18} /> },
  { label: "Transactions", icon: <BriefcaseBusiness size={18} /> },
  { label: "Leads", icon: <TrendingUp size={18} /> },
  { label: "Academy", icon: <BookOpen size={18} /> },
  { label: "Services", icon: <Sparkles size={18} /> },
  { label: "Marketing", icon: <MessageSquare size={18} /> },
  { label: "Documents", icon: <FolderOpen size={18} /> },
  { label: "Profile", icon: <UserCircle2 size={18} /> },
  { label: "Support", icon: <LifeBuoy size={18} /> },
  { label: "Settings", icon: <Settings size={18} /> },
];

const ui = {
  shell: "min-h-screen w-full bg-[#F8F7FB] text-[#121216]",
  panel: "rounded-[24px] border border-[#E7E3F2] bg-white shadow-[0_10px_30px_rgba(39,28,79,0.08)]",
  panelSoft: "rounded-[24px] border border-[#E7E3F2] bg-[#F3EFFB]",
  chip: "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
  sectionTitle: "text-lg font-bold tracking-[-0.02em] text-[#121216]",
  body: "text-sm text-[#6F6887]",
};

function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#5E42BC_0%,#271C4F_100%)] text-white shadow-[0_14px_34px_rgba(94,66,188,0.28)]">
        <Building2 size={22} />
      </div>
      <div>
        <div className="text-lg font-extrabold tracking-[-0.04em] text-[#271C4F]">VORO</div>
        <div className="text-xs text-[#6F6887]">Agent Portal</div>
      </div>
    </div>
  );
}

function Sidebar({
  current,
  setCurrent,
  mobileOpen,
  setMobileOpen,
}: {
  current: NavItem;
  setCurrent: (value: NavItem) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}) {
  const content = (
    <aside className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-center justify-between lg:justify-start">
        <AppLogo />
        <button
          onClick={() => setMobileOpen(false)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-[#E7E3F2] text-[#271C4F] lg:hidden"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="rounded-[24px] bg-[linear-gradient(135deg,#5E42BC_0%,#271C4F_100%)] p-4 text-white">
        <div className="text-xs uppercase tracking-[0.18em] text-white/70">Welcome back</div>
        <div className="mt-2 text-xl font-bold tracking-[-0.03em]">{agent.firstName}</div>
        <p className="mt-2 text-sm text-white/80">
          Run your business from one place. Transactions, services, support, and growth tools are all here.
        </p>
      </div>

      <nav className="grid gap-2">
        {navItems.map((item) => {
          const active = current === item.label;
          return (
            <button
              key={item.label}
              onClick={() => {
                setCurrent(item.label);
                setMobileOpen(false);
              }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                active
                  ? "bg-[#271C4F] text-white shadow-[0_14px_34px_rgba(39,28,79,0.2)]"
                  : "text-[#271C4F] hover:bg-white"
              }`}
            >
              <span className={active ? "text-white" : "text-[#5E42BC]"}>{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[24px] border border-[#E7E3F2] bg-white p-4">
        <div className="text-sm font-bold text-[#271C4F]">Need support?</div>
        <p className="mt-2 text-sm text-[#6F6887]">Contact VORO support for operations, marketing, documents, or service requests.</p>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-[#271C4F]">
            <Phone size={15} />
            <span>{brandTokens.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-[#271C4F]">
            <MessageSquare size={15} />
            <span>{brandTokens.contact.email}</span>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block lg:w-[290px] lg:flex-shrink-0">
        <div className="sticky top-0 h-screen border-r border-[#E7E3F2] bg-[#F3EFFB]">{content}</div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 lg:hidden">
          <div className="h-full w-[88%] max-w-[340px] bg-[#F3EFFB]">{content}</div>
        </div>
      )}
    </>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E7E3F2] bg-[#F8F7FB]/90 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-[#E7E3F2] bg-white text-[#271C4F] lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="text-xl font-extrabold tracking-[-0.04em] text-[#121216]">VORO Agent Portal</h1>
          <p className="text-sm text-[#6F6887]">Premium workspace for agents, teams, and brokerage operations.</p>
        </div>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-2 rounded-2xl border border-[#E7E3F2] bg-white px-3 py-2">
          <Search size={16} className="text-[#6F6887]" />
          <input
            placeholder="Search transactions, documents, announcements..."
            className="w-[280px] border-0 bg-transparent text-sm outline-none placeholder:text-[#9A93B1]"
          />
        </div>
        <button className="relative grid h-11 w-11 place-items-center rounded-2xl border border-[#E7E3F2] bg-white text-[#271C4F]">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#F982FF]" />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.35fr_.9fr]">
      <div className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#5E42BC_0%,#271C4F_100%)] p-6 text-white md:p-8">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-white/80">
            ENTREPRENEUR-FIRST BROKERAGE
          </div>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.05em] md:text-5xl">
            Run your real estate business from one place.
          </h2>
          <p className="mt-4 max-w-[620px] text-sm text-white/80 md:text-base">
            Access transactions, support, documents, marketing tools, training, and brokerage services from a single premium workspace.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#271C4F] shadow-[0_14px_34px_rgba(255,255,255,0.18)]">
              Submit a Deal
            </button>
            <button className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white">
              Request Support
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className={`${ui.panel} p-5`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6F6887]">Featured service</div>
              <div className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#121216]">Lending support</div>
              <p className="mt-2 text-sm text-[#6F6887]">
                Need deal strategy, client financing support, or investor scenarios? Send the file and get quick guidance.
              </p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F3EFFB] text-[#5E42BC]">
              <Sparkles size={22} />
            </div>
          </div>
          <button className="mt-5 rounded-full bg-[#271C4F] px-4 py-2.5 text-sm font-bold text-white">
            Request Lending Help
          </button>
        </div>

        <div className={`${ui.panelSoft} p-5`}>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6F6887]">Public contact anchors</div>
          <div className="mt-3 space-y-2 text-sm text-[#271C4F]">
            <div>{brandTokens.contact.phone}</div>
            <div>{brandTokens.contact.email}</div>
            <div>{brandTokens.contact.corporateOffice}</div>
            <div>{brandTokens.contact.office}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((item) => (
        <div key={item.label} className={`${ui.panel} p-5`}>
          <div className="text-sm font-semibold text-[#6F6887]">{item.label}</div>
          <div className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#121216]">{item.value}</div>
          {item.delta ? <div className="mt-2 text-sm text-[#5E42BC]">{item.delta}</div> : null}
        </div>
      ))}
    </section>
  );
}

function QuickActions() {
  const actions = [
    "Submit a Deal",
    "Request Title Support",
    "Request Insurance Quote",
    "Upload Documents",
    "Open Brand Kit",
    "Contact Support",
  ];

  return (
    <section className={`${ui.panel} p-5`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className={ui.sectionTitle}>What do you need to do today?</h3>
          <p className={ui.body}>High-priority shortcuts to move business forward quickly.</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {actions.map((action) => (
          <button
            key={action}
            className="rounded-full border border-[#E7E3F2] bg-[#F8F7FB] px-4 py-2.5 text-sm font-semibold text-[#271C4F] transition hover:border-[#5E42BC] hover:bg-white"
          >
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}

function TransactionsTable() {
  return (
    <section className={`${ui.panel} p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={ui.sectionTitle}>Active transactions</h3>
          <p className={ui.body}>A snapshot of files that need attention or are nearing the finish line.</p>
        </div>
        <button className="rounded-full border border-[#E7E3F2] px-4 py-2 text-sm font-semibold text-[#271C4F]">
          View All
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-[#6F6887]">
            <tr>
              <th className="pb-3 font-semibold">Property</th>
              <th className="pb-3 font-semibold">Client</th>
              <th className="pb-3 font-semibold">Type</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Close</th>
              <th className="pb-3 font-semibold">Commission</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((row) => (
              <tr key={row.id} className="border-t border-[#F0ECFA]">
                <td className="py-4 font-semibold text-[#271C4F]">{row.address}</td>
                <td className="py-4 text-[#121216]">{row.client}</td>
                <td className="py-4 text-[#121216]">{row.side}</td>
                <td className="py-4">
                  <span className="rounded-full bg-[#F3EFFB] px-3 py-1 text-xs font-semibold text-[#5E42BC]">
                    {row.status}
                  </span>
                </td>
                <td className="py-4 text-[#121216]">{row.closingDate}</td>
                <td className="py-4 font-semibold text-[#121216]">{row.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Announcements() {
  return (
    <section className={`${ui.panel} p-5`}>
      <div>
        <h3 className={ui.sectionTitle}>Announcements</h3>
        <p className={ui.body}>These should be CMS-driven in production, not hard-coded.</p>
      </div>
      <div className="mt-5 space-y-4">
        {announcements.map((item) => (
          <div key={item.id} className="rounded-[20px] border border-[#E7E3F2] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className={`${ui.chip} bg-[#F3EFFB] text-[#5E42BC]`}>{item.category}</span>
              <button className="text-sm font-semibold text-[#271C4F]">{item.ctaLabel ?? "Open"}</button>
            </div>
            <div className="mt-3 text-base font-bold text-[#121216]">{item.title}</div>
            <p className="mt-2 text-sm text-[#6F6887]">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className={`${ui.panel} p-5`}>
      <div>
        <h3 className={ui.sectionTitle}>Tap into VORO services</h3>
        <p className={ui.body}>Request-based workflows designed to help agents move faster.</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {services.map((item) => (
          <div key={item.title} className="rounded-[22px] border border-[#E7E3F2] bg-[#F8F7FB] p-4">
            <div className="text-lg font-bold tracking-[-0.02em] text-[#271C4F]">{item.title}</div>
            <p className="mt-2 text-sm text-[#6F6887]">{item.description}</p>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9A93B1]">{item.eta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AcademyList() {
  return (
    <section className={`${ui.panel} p-5`}>
      <div>
        <h3 className={ui.sectionTitle}>Academy</h3>
        <p className={ui.body}>Training, coaching, and live sessions for growth-minded agents.</p>
      </div>
      <div className="mt-5 space-y-3">
        {academy.map((item) => (
          <div key={item.title} className="flex items-center justify-between gap-4 rounded-[20px] border border-[#E7E3F2] p-4">
            <div>
              <div className="font-semibold text-[#121216]">{item.title}</div>
              <div className="mt-1 text-sm text-[#6F6887]">{item.time}</div>
            </div>
            <span className="rounded-full bg-[#271C4F] px-3 py-1 text-xs font-semibold text-white">{item.format}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function DocumentsList() {
  return (
    <section className={`${ui.panel} p-5`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className={ui.sectionTitle}>Document center</h3>
          <p className={ui.body}>State forms, brokerage docs, templates, compliance materials, and uploads.</p>
        </div>
        <button className="rounded-full border border-[#E7E3F2] px-4 py-2 text-sm font-semibold text-[#271C4F]">
          Upload
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {documents.map((doc) => (
          <div key={doc.name} className="flex flex-col gap-3 rounded-[20px] border border-[#E7E3F2] p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F3EFFB] text-[#5E42BC]">
                <FileText size={18} />
              </div>
              <div>
                <div className="font-semibold text-[#121216]">{doc.name}</div>
                <div className="mt-1 text-sm text-[#6F6887]">
                  {doc.state} • {doc.category}
                </div>
              </div>
            </div>
            <div className="text-sm text-[#6F6887]">Updated {doc.updated}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SupportCard() {
  return (
    <section className={`${ui.panel} p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={ui.sectionTitle}>Support</h3>
          <p className={ui.body}>Help for operations, marketing, documents, onboarding, or service requests.</p>
        </div>
        <CircleHelp className="text-[#5E42BC]" size={22} />
      </div>

      <div className="mt-5 grid gap-3">
        <button className="rounded-[18px] bg-[#271C4F] px-4 py-3 text-left text-sm font-semibold text-white">
          Open support ticket
        </button>
        <button className="rounded-[18px] border border-[#E7E3F2] px-4 py-3 text-left text-sm font-semibold text-[#271C4F]">
          Start live chat
        </button>
        <button className="rounded-[18px] border border-[#E7E3F2] px-4 py-3 text-left text-sm font-semibold text-[#271C4F]">
          Browse help center
        </button>
      </div>

      <div className="mt-5 rounded-[20px] bg-[#F8F7FB] p-4 text-sm text-[#271C4F]">
        <div className="font-semibold">Brokerage contact</div>
        <div className="mt-2">{brandTokens.contact.phone}</div>
        <div>{brandTokens.contact.email}</div>
      </div>
    </section>
  );
}

function ProfileCard() {
  return (
    <section className={`${ui.panel} p-5`}>
      <div>
        <h3 className={ui.sectionTitle}>Profile</h3>
        <p className={ui.body}>Public bio, specialties, markets, and profile readiness.</p>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(135deg,#5E42BC_0%,#F982FF_100%)] text-white">
          <UserCircle2 size={30} />
        </div>
        <div>
          <div className="text-lg font-bold tracking-[-0.03em] text-[#121216]">
            {agent.firstName} {agent.lastName}
          </div>
          <div className="text-sm text-[#6F6887]">
            {agent.role} • {agent.market}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-[#271C4F]">Profile completeness</span>
          <span className="text-[#6F6887]">{agent.profileCompleteness}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#EDE8F8]">
          <div className="h-full rounded-full bg-[linear-gradient(90deg,#5E42BC_0%,#F982FF_100%)]" style={{ width: `${agent.profileCompleteness}%` }} />
        </div>
      </div>
    </section>
  );
}

function DashboardPage() {
  return (
    <div className="space-y-6">
      <Hero />
      <KpiGrid />
      <QuickActions />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_.9fr]">
        <div className="space-y-6">
          <TransactionsTable />
          <ServicesGrid />
          <DocumentsList />
        </div>
        <div className="space-y-6">
          <Announcements />
          <AcademyList />
          <SupportCard />
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className={`${ui.panel} p-8`}>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-black tracking-[-0.05em] text-[#121216]">{title}</h2>
        <p className="mt-3 text-base text-[#6F6887]">{description}</p>
        <div className="mt-6 rounded-[24px] border border-dashed border-[#D9D2EC] bg-[#F8F7FB] p-6 text-sm text-[#6F6887]">
          This section is intentionally scaffolded for Claude Code or Perplexity Computer to expand into a production module with routing, API integration, filters, empty states, and role-aware workflows.
        </div>
      </div>
    </div>
  );
}

function Content({ current }: { current: NavItem }) {
  const page = useMemo(() => {
    switch (current) {
      case "Dashboard":
        return <DashboardPage />;
      case "Transactions":
        return <PlaceholderPage title="Transactions" description="Build a full transaction center with milestones, broker review, missing docs alerts, and commission pipeline." />;
      case "Leads":
        return <PlaceholderPage title="Leads" description="Build lead inbox, referral flows, recruiting handoff, and source tracking." />;
      case "Academy":
        return <PlaceholderPage title="Academy" description="Build course library, live sessions, onboarding, and coaching tracks." />;
      case "Services":
        return <PlaceholderPage title="Services" description="Build request workflows for lending, title, insurance, analytics, lead generation, and optional commercial desk." />;
      case "Marketing":
        return <PlaceholderPage title="Marketing" description="Build social requests, listing promotion, brand kit downloads, content intake, and profile tools." />;
      case "Documents":
        return <PlaceholderPage title="Documents" description="Build searchable forms library, uploads, filters by state and category, and compliance updates." />;
      case "Profile":
        return <PlaceholderPage title="Profile" description="Build editable public profile, bio, headshot, specialties, links, and contact preferences." />;
      case "Support":
        return <PlaceholderPage title="Support" description="Build tickets, knowledge base, live chat entry point, and department routing." />;
      case "Settings":
        return <PlaceholderPage title="Settings" description="Build notification controls, integrations, privacy options, and personal workspace preferences." />;
      default:
        return <DashboardPage />;
    }
  }, [current]);

  return <main className="px-4 py-6 md:px-6">{page}</main>;
}

export default function VoroAgentPortalPrototype() {
  const [current, setCurrent] = useState<NavItem>("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className={ui.shell}
      style={{
        fontFamily: brandTokens.typography.heading,
        backgroundColor: brandTokens.colors.ghostWhite,
      }}
    >
      <div className="flex">
        <Sidebar current={current} setCurrent={setCurrent} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="min-w-0 flex-1">
          <Topbar onMenu={() => setMobileOpen(true)} />
          <Content current={current} />
        </div>
      </div>
    </div>
  );
}
