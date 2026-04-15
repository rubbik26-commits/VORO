import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { agent } from "@/data/mock-data";
import { Bell, Shield, User, LogOut, Smartphone, Globe } from "lucide-react";

const Toggle = ({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) => (
  <label className="flex items-center justify-between gap-4 cursor-pointer py-1" aria-label={label}>
    <span className="text-sm text-voro-jet">{label}</span>
    <div className="relative">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <div className="w-11 h-6 bg-voro-muted-border rounded-full peer peer-checked:bg-voro-purple transition-colors" />
      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5" />
    </div>
  </label>
);

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Account, notifications, security, and preferences." />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User size={16} className="text-voro-purple" />
            <div className="section-title">Account Information</div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: "First Name", value: agent.firstName },
              { label: "Last Name", value: agent.lastName },
              { label: "Email", value: agent.email },
              { label: "Phone", value: agent.phone },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">{f.label}</label>
                <input
                  defaultValue={f.value}
                  className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 text-sm focus:outline-none focus:border-voro-purple transition-colors"
                />
              </div>
            ))}
            <button className="btn-primary text-sm self-start px-6">Save Changes</button>
          </div>
        </Card>
        <div className="flex flex-col gap-4">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Bell size={16} className="text-voro-purple" />
              <div className="section-title">Notifications</div>
            </div>
            <div className="flex flex-col gap-3">
              <Toggle defaultChecked label="New lead assigned" />
              <Toggle defaultChecked label="Document upload confirmation" />
              <Toggle defaultChecked label="Transaction status update" />
              <Toggle defaultChecked label="Academy session reminder (24hr)" />
              <Toggle label="Weekly performance digest" />
              <Toggle label="Marketing asset published" />
              <Toggle defaultChecked label="Support ticket reply" />
              <Toggle label="Brokerage announcement" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Smartphone size={16} className="text-voro-purple" />
              <div className="section-title">Preferences</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">Timezone</label>
                <select className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 text-sm focus:outline-none focus:border-voro-purple transition-colors">
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Pacific Time (PT)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">Language</label>
                <select className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 text-sm focus:outline-none focus:border-voro-purple transition-colors">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Portuguese</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-voro-purple" />
            <div className="section-title">Security</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Current Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-voro-purple transition-colors"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-voro-text-faint"
                  aria-label="Toggle visibility"
                >
                  {/* Icon would be wired once real password visibility logic is added */}
                  <span className="text-[10px] font-semibold">SHOW</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 text-sm focus:outline-none focus:border-voro-purple transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 text-sm focus:outline-none focus:border-voro-purple transition-colors"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <Toggle defaultChecked label="Two-factor authentication" />
            </div>
            <button className="btn-primary text-sm self-start px-6">Update Password</button>
          </div>
        </Card>
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <Globe size={16} className="text-voro-purple" />
            <div>
              <div className="section-title">Integrations & Linked Accounts</div>
              <p className="text-xs text-voro-text-muted mt-0.5">
                Integrated with the tools you love. Connect accounts to sync data and simplify your workflow.
              </p>
            </div>
          </div>
          {[
            { name: "Google", desc: "Sync calendar and contacts", connected: true },
            { name: "Outlook", desc: "Email and scheduling", connected: false },
            { name: "Zillow", desc: "Listing syndication", connected: false },
            { name: "DocuSign", desc: "E-signature workflow", connected: true },
          ].map((a) => (
            <div
              key={a.name}
              className="flex items-center justify-between gap-4 py-2 border-b border-voro-muted-border last:border-0"
            >
              <div>
                <div className="text-sm font-semibold text-voro-jet">{a.name}</div>
                <div className="text-xs text-voro-text-muted">{a.desc}</div>
              </div>
              <button
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                  a.connected
                    ? "bg-green-50 text-green-700 hover:bg-red-50 hover:text-red-700"
                    : "btn-secondary"
                }`}
              >
                {a.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
          <div className="border-t border-voro-muted-border pt-4">
            <button className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
              <LogOut size={15} />
              Sign Out of VORO Portal
            </button>
          </div>
        </Card>
        <Card>
          <div className="section-title mb-1">Why VORO</div>
          <p className="section-body mb-3">
            VORO is a real estate cloud broker built for entrepreneurs: generous commission plans, low friction
            transaction support, modern technology, and the freedom to work from anywhere.
          </p>
          <p className="text-xs text-voro-text-muted mb-4">
            The same promises you see on voro.comcloud broker model, agent support, and digital-first toolsare
            delivered here in the portal as your operating system.
          </p>
          <a
            href="https://voro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-voro-purple hover:text-voro-indigo transition-colors"
          >
            Learn more at voro.com
          </a>
        </Card>
      </div>
    </>
  );
}
