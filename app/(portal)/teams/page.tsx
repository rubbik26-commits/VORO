"use client";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { getAgent } from "@/lib/api";
import { track } from "@/lib/analytics";
import type { Agent } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import { Users2, UserCircle2 } from "lucide-react";

type Member = { name: string; role: string; notes: string };

export default function TeamsPage() {
  const { toast } = useToast();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [members, setMembers] = useState<Member[]>([
    { name: "Priya Nair", role: "Showing Agent", notes: "Investor-focused, Queens specialist." },
    { name: "Kevin Thornton", role: "Team Member", notes: "Manhattan listings." },
  ]);
  const [form, setForm] = useState<Member>({ name: "", role: "Team Member", notes: "" });

  useEffect(() => {
    getAgent()
      .then(setAgent)
      .catch(() => toast("Could not load team data. Try refreshing.", "error"));
  }, []);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast("Agent name is required.", "error");
      return;
    }
    setMembers((prev) => [...prev, { ...form, name: form.name.trim(), notes: form.notes.trim() }]);
    track("team_member_added", { name: form.name });
    toast(`${form.name} added to your team list.`, "success");
    setForm({ name: "", role: "Team Member", notes: "" });
  };

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
          {agent && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white text-lg font-black">
                {agent.firstName[0]}
              </div>
              <div>
                <div className="text-sm font-bold text-voro-jet">
                  {agent.firstName} {agent.lastName}
                </div>
                <div className="text-xs text-voro-text-muted">Team Lead · Greater NYC Metro</div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Team members</div>
              <div className="text-2xl font-black text-voro-jet tabular-nums">{members.length}</div>
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
          <div className="flex flex-col gap-2 mb-4">
            {members.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 rounded-xl border border-voro-muted-border px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-voro-soft-panel flex items-center justify-center text-voro-purple text-xs font-bold">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-voro-jet">{m.name}</div>
                    <div className="text-xs text-voro-text-muted">{m.role}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMembers((prev) => prev.filter((_, idx) => idx !== i));
                    track("team_member_removed", { name: m.name });
                    toast(`${m.name} removed from team list.`, "info");
                  }}
                  className="text-xs font-semibold text-voro-danger hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-voro-muted-border p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-voro-soft-panel flex items-center justify-center text-voro-purple">
              <Users2 size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-voro-jet">Suggested split model</div>
              <p className="text-xs text-voro-text-muted mt-1">
                Team split structures are defined by your brokerage leadership. Contact your broker or visit
                Support to discuss approved team compensation models.
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="section-title mb-1">Add Team Member</div>
          <div className="section-body mb-4">Track which agents are on your team and their roles.</div>
          <form className="flex flex-col gap-3" onSubmit={handleAdd}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Agent Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="input"
                placeholder="Agent full name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="input"
              >
                <option>Team Member</option>
                <option>Showing Agent</option>
                <option>Operations</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="input min-h-[80px]"
                placeholder="How this agent fits into the team."
              />
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
          Team metrics and member lists shown here are for tracking purposes. Work with brokerage leadership to
          define your official team policies, reporting, and compensation structures.
        </div>
      </Card>
    </>
  );
}
