"use client";
import { useState } from "react";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { agent } from "@/data/mock-data";
import { useToast } from "@/components/ui/Toast";
import { Bell, Shield, User, LogOut, Smartphone, Globe, DollarSign } from "lucide-react";

type ToggleProps = {
  defaultChecked?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
};

function Toggle({ defaultChecked = false, label, onChange }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer py-1" aria-label={label}>
      <span className="text-sm text-voro-jet">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            onChange?.(e.target.checked);
          }}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-voro-muted-border rounded-full peer peer-checked:bg-voro-purple transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5" />
      </div>
    </label>
  );
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState(agent.firstName);
  const [lastName, setLastName] = useState(agent.lastName);
  const [email, setEmail] = useState(agent.email);
  const [phone, setPhone] = useState(agent.phone);
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [integrations, setIntegrations] = useState([
    { name: "Google", desc: "Sync calendar and contacts", connected: true },
    { name: "Outlook", desc: "Email and scheduling", connected: false },
    { name: "Zillow", desc: "Listing syndication", connected: false },
    { name: "DocuSign", desc: "E-signature workflow", connected: true },
  ]);

  const handleSaveAccount = () => {
    toast(`Account info saved for ${firstName} ${lastName}.`, "success");
  };

  const handleUpdatePassword = () => {
    if (!password.current || !password.next || !password.confirm) {
      toast("All password fields are required.", "error");
      return;
    }
    if (password.next !== password.confirm) {
      toast("New password and confirmation do not match.", "error");
      return;
    }
    if (password.next.length < 8) {
      toast("New password must be at least 8 characters.", "error");
      return;
    }
    setPassword({ current: "", next: "", confirm: "" });
    toast("Password updated successfully.", "success");
  };

  const toggleIntegration = (name: string) => {
    setIntegrations((prev) =>
      prev.map((a) => {
        if (a.name !== name) return a;
        const next = !a.connected;
        toast(`${a.name} ${next ? "connected" : "disconnected"}.`, next ? "success" : "info");
        return { ...a, connected: next };
      }),
    );
  };

  const handleSignOut = () => {
    toast("Sign out requested (mock — wire to auth provider).", "info");
  };

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
              { label: "First Name", value: firstName, onChange: setFirstName },
              { label: "Last Name", value: lastName, onChange: setLastName },
              { label: "Email", value: email, onChange: setEmail },
              { label: "Phone", value: phone, onChange: setPhone },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">{f.label}</label>
                <input
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="input"
                />
              </div>
            ))}
            <button onClick={handleSaveAccount} className="btn-primary text-sm self-start px-6">
              Save Changes
            </button>
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
                <select className="input" defaultValue="Eastern Time (ET)">
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Pacific Time (PT)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">Language</label>
                <select className="input" defaultValue="English">
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
                  type={showPwd ? "text" : "password"}
                  value={password.current}
                  onChange={(e) => setPassword((p) => ({ ...p, current: e.target.value }))}
                  placeholder="••••••••"
                  className="input pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-voro-purple"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">New Password</label>
              <input
                type={showPwd ? "text" : "password"}
                value={password.next}
                onChange={(e) => setPassword((p) => ({ ...p, next: e.target.value }))}
                placeholder="••••••••"
                className="input"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-voro-text-muted">Confirm New Password</label>
              <input
                type={showPwd ? "text" : "password"}
                value={password.confirm}
                onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))}
                placeholder="••••••••"
                className="input"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <Toggle
                defaultChecked
                label="Two-factor authentication"
                onChange={(v) => toast(`Two-factor authentication ${v ? "enabled" : "disabled"}.`, "info")}
              />
            </div>
            <button onClick={handleUpdatePassword} className="btn-primary text-sm self-start px-6">
              Update Password
            </button>
          </div>
        </Card>
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <Globe size={16} className="text-voro-purple" />
            <div>
              <div className="section-title">Integrations &amp; Linked Accounts</div>
              <p className="text-xs text-voro-text-muted mt-0.5">
                Integrated with the tools you love. Connect accounts to sync data and simplify your workflow.
              </p>
            </div>
          </div>
          {integrations.map((a) => (
            <div
              key={a.name}
              className="flex items-center justify-between gap-4 py-2 border-b border-voro-muted-border last:border-0"
            >
              <div>
                <div className="text-sm font-semibold text-voro-jet">{a.name}</div>
                <div className="text-xs text-voro-text-muted">{a.desc}</div>
              </div>
              <button
                onClick={() => toggleIntegration(a.name)}
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
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut size={15} />
              Sign Out of VORO Portal
            </button>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={16} className="text-voro-purple" />
            <div className="section-title">Compensation &amp; Plan</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Current Plan</div>
              <div className="text-lg font-black text-voro-jet">VORO Pro</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Commission Split</div>
              <div className="text-lg font-black text-voro-jet">100%</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Transaction Fee</div>
              <div className="text-lg font-black text-voro-jet">$399</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Annual Cap</div>
              <div className="text-lg font-black text-voro-jet">$6,000</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">YTD Fees Paid</div>
              <div className="text-lg font-black text-voro-jet tabular-nums">$3,192</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Remaining to Cap</div>
              <div className="text-lg font-black text-voro-success tabular-nums">$2,808</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">Cap Anniversary</div>
              <div className="text-lg font-black text-voro-jet">Mar 15, 2027</div>
            </div>
            <div className="rounded-xl bg-voro-ghost p-3">
              <div className="text-voro-text-muted">E&amp;O Coverage</div>
              <div className="text-lg font-black text-voro-success">Active</div>
            </div>
          </div>
          <p className="text-xs text-voro-text-muted">
            Compensation details are for reference only. Actual commission plans and caps are governed by your
            Independent Contractor Agreement. Contact <span className="font-semibold text-voro-purple">Accounting</span> for disputes.
          </p>
        </Card>
        <Card>
          <div className="section-title mb-1">Why VORO</div>
          <p className="section-body mb-3">
            VORO is a real estate cloud broker built for entrepreneurs: generous commission plans, low friction
            transaction support, modern technology, and the freedom to work from anywhere.
          </p>
          <p className="text-xs text-voro-text-muted mb-4">
            The same promises you see on voro.com &mdash; cloud broker model, agent support, and digital-first tools
            &mdash; are delivered here in the portal as your operating system.
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
