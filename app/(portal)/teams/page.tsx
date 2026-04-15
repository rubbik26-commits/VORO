import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { agent } from "@/data/mock-data";
import { Users2, UserCircle2 } from "lucide-react";

export default function TeamsPage() {
  return (
    <>
      <PageHeader
        title="Teams"
        eyebrow="Optional Module"
        description="Set up and manage teams, roles, and shared production."
      />
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.9fr] gap-6">
        <Card>
          <div className="section-title mb-1">Your Team</div>
          <div className="section-body mb-4">High-level overview of the team you lead or belong to.</div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white text-lg font-black">
              {agent.firstName[0]}
            </div>
            <div>
              <div className="text-sm font-bold text-voro-jet">{agent.firstName} {agent.lastName}</div>
              <div className="text-xs text-voro-text-muted">Team Lead · Greater NYC Metro</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Team members</div>
              <div className="text-2xl font-black text-voro-jet tabular-nums">5</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">YTD Team Volume</div>
              <div className="text-2xl font-black text-voro-jet tabular-nums">$18.4M</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Open deals</div>
              <div className="text-2xl font-black text-voro-jet tabular-nums">9</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Closings this month</div>
              <div className="text-2xl font-black text-voro-jet tabular-nums">3</div>
            </div>
          </div>
          <div className="rounded-xl border border-voro-muted-border p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-voro-soft-panel flex items-center justify-center text-voro-purple">
              <Users2 size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-voro-jet">Suggested split model</div>
              <p className="text-xs text-voro-text-muted mt-1">
                This is placeholder copy only. Work with brokerage leadership to define approved team split
                structures before using this view operationally.
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="section-title mb-1">Add Team Member</div>
          <div className="section-body mb-4">Track which agents are on your team and their roles.</div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Agent Name</label>
              <input className="input" placeholder="Agent full name" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Role</label>
              <select className="input">
                <option>Team Member</option>
                <option>Showing Agent</option>
                <option>Operations</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Notes</label>
              <textarea className="input min-h-[80px]" placeholder="How this agent fits into the team." />
            </div>
            <button type="submit" className="btn-primary text-sm flex items-center gap-1">
              <UserCircle2 size={14} />
              Add to team list
            </button>
          </form>
        </Card>
      </div>
      <Card>
        <div className="section-title mb-1">Important Note</div>
        <div className="section-body">
          All values on this page are mock data for UX and planning only. Work with brokerage leadership to define
          your official team policies, reporting, and compensation structures.
        </div>
      </Card>
    </>
  );
}
