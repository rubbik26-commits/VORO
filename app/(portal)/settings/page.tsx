"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { getAgent, updateAgentProfile } from "@/lib/api";
import { getAuthorizationUrl } from "@/lib/skyslope";
import { track } from "@/lib/analytics";
import { isValidEmail } from "@/lib/utils";
import type { Agent } from "@/lib/types";
import { useToast } from "@/components/ui/Toast";
import { Bell, Shield, User, LogOut, Smartphone, Globe, DollarSign, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";

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
  const searchParams = useSearchParams();
  const [firstName, setFirstName]   = useState("");
  const [lastName,  setLastName]    = useState("");
  const [email,     setEmail]       = useState("");
  const [phone,     setPhone]       = useState("");
  const [skySlopeStatus, setSkySlopeStatus] = useState<"connected" | "disconnected" | "error" | "denied">("disconnected");

  // Read SkySlope OAuth result from query param after redirect
  useEffect(() => {
    const ss = searchParams.get("skyslope");
    if (ss === "connected") {
      setSkySlopeStatus("connected");
      toast("SkySlope connected successfully. Transactions and documents are now live.", "success");
    } else if (ss === "error") {
      setSkySlopeStatus("error");
      toast("SkySlope connection failed. Check your credentials and try again.", "error");
    } else if (ss === "denied") {
      setSkySlopeStatus("denied");
      toast("SkySlope authorization was denied.", "error");
    }
  }, [searchParams]);

  useEffect(() => {
    getAgent()
      .then((a) => {
        setFirstName(a.firstName);
        setLastName(a.lastName);
        setEmail(a.email);
        setPhone(a.phone);
      })
      .catch(() => toast("Could not load account info. Try refreshing.", "error"));
  }, []);

  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [showPwd,  setShowPwd]  = useState(false);
  const [integrations, setIntegrations] = useState([
    { name: "Google",   desc: "Sync calendar and contacts",  connected: true  },
    { name: "Outlook",  desc: "Email and scheduling",        connected: false },
    { name: "Zillow",   desc: "Listing syndication",         connected: false },
    { name: "DocuSign", desc: "E-signature workflow",        connected: true  },
  ]);

  const handleSaveAccount = async () => {
    if (email && !isValidEmail(email)) {
      toast("Please enter a valid email address.", "error");
      return;
    }
    try {
      await updateAgentProfile({ firstName, lastName, email, phone });
      track("settings_account_saved");
      toast(`Account info saved for ${firstName} ${lastName}.`, "success");
    } catch {
      toast("Could not save account info. Try again.", "error");
    }
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
    track("settings_password_updated");
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

  const handleConnectSkySlope = () => {
    track("skyslope_connect_initiated");
    // getAuthorizationUrl() builds the OAuth URL from env vars
    // This will redirect the browser to SkySlope login
    window.location.href = getAuthorizationUrl();
  };

  const handleSignOut = () => {
    track("sign_out");
    toast("Signing out of VORO Portal. You will be redirected.", "info");
  };

  return (
    <>
      <PageHeader title="Settings" description="Account, notifications, security, and preferences." />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ── SkySlope Integration ───────────────────────────────────────── */}
        <Card className="xl:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#1a6fb5,#0d4a82)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="section-title">SkySlope Integration</div>
            {skySlopeStatus === "connected" && (
              <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                <CheckCircle2 size={12} /> Connected
              </span>
            )}
            {skySlopeStatus === "error" && (
              <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                <AlertCircle size={12} /> Connection failed
              </span>
            )}
          </div>
          <p className="text-sm text-voro-text-muted mb-5 max-w-2xl">
            Connect your SkySlope account to sync your brokerage transactions and documents live into
            VORO. Once connected, the Transactions and Documents pages will pull real data directly
            from SkySlope instead of demo data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { title: "Transactions",  desc: "All active and closed files pull from SkySlope in real time" },
              { title: "Documents",     desc: "Checklists, signed docs, and compliance status sync automatically" },
              { title: "Milestones",    desc: "File progress tracked step-by-step from offer to closing" },
            ].map((f) => (
              <div key={f.title} className="rounded-xl bg-voro-ghost border border-voro-muted-border p-4">
                <div className="text-sm font-bold text-voro-jet mb-1">{f.title}</div>
                <div className="text-xs text-voro-text-muted">{f.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {skySlopeStatus === "connected" ? (
              <button
                onClick={() => {
                  setSkySlopeStatus("disconnected");
                  toast("SkySlope disconnected. Portal will use demo data.", "info");
                }}
                className="btn-ghost text-sm border border-voro-muted-border"
              >
                Disconnect SkySlope
              </button>
            ) : (
              <button
                onClick={handleConnectSkySlope}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <ExternalLink size={14} />
                Connect SkySlope Account
              </button>
            )}
            <a
              href="https://api.skyslope.com/api/docs/redoc/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-voro-text-muted hover:text-voro-purple transition-colors"
            >
              SkySlope API docs ↗
            </a>
          </div>
        </Card>

        {/* ── Account Information ────────────────────────────────────────── */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User size={16} className="text-voro-purple" />
            <div className="section-title">Account Information</div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: "First Name", value: firstName, onChange: setFirstName },
              { label: "Last Name",  value: lastName,  onChange: setLastName  },
              { label: "Email",      value: email,      onChange: setEmail     },
              { label: "Phone",      value: phone,      onChange: setPhone     },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">{f.label}</label>
                <input value={f.value} onChange={(e) => f.onChange(e.target.value)} className="input" />
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

        {/* ── Security ──────────────────────────────────────────────────── */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-voro-purple" />
            <div className="section-title">Security</div>
          </div>
          <div className="flex flex-col gap-3">
            {["Current Password", "New Password", "Confirm New Password"].map((lbl, i) => (
              <div key={lbl} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-voro-text-muted">{lbl}</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={[password.current, password.next, password.confirm][i]}
                    onChange={(e) => {
                      const key = ["current", "next", "confirm"][i] as keyof typeof password;
                      setPassword((p) => ({ ...p, [key]: e.target.value }));
                    }}
                    placeholder="••••••••"
                    className="input pr-16"
                  />
                  {i === 0 && (
                    <button
                      type="button"
                      onClick={() => setShowPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-voro-purple"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? "HIDE" : "SHOW"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <Toggle
              defaultChecked
              label="Two-factor authentication"
              onChange={(v) => toast(`Two-factor authentication ${v ? "enabled" : "disabled"}.`, "info")}
            />
            <button onClick={handleUpdatePassword} className="btn-primary text-sm self-start px-6">
              Update Password
            </button>
          </div>
        </Card>

        {/* ── Integrations ──────────────────────────────────────────────── */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <Globe size={16} className="text-voro-purple" />
            <div>
              <div className="section-title">Other Integrations</div>
              <p className="text-xs text-voro-text-muted mt-0.5">Connect accounts to sync data and simplify your workflow.</p>
            </div>
          </div>
          {integrations.map((a) => (
            <div key={a.name} className="flex items-center justify-between gap-4 py-2 border-b border-voro-muted-border last:border-0">
              <div>
                <div className="text-sm font-semibold text-voro-jet">{a.name}</div>
                <div className="text-xs text-voro-text-muted">{a.desc}</div>
              </div>
              <button
                onClick={() => toggleIntegration(a.name)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                  a.connected ? "bg-green-50 text-green-700 hover:bg-red-50 hover:text-red-700" : "btn-secondary"
                }`}
              >
                {a.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
          <div className="border-t border-voro-muted-border pt-4">
            <button onClick={handleSignOut} className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
              <LogOut size={15} />
              Sign Out of VORO Portal
            </button>
          </div>
        </Card>

        {/* ── Compensation ──────────────────────────────────────────────── */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={16} className="text-voro-purple" />
            <div className="section-title">Compensation &amp; Plan</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            {[
              { label: "Current Plan",    value: "VORO Pro" },
              { label: "Commission Split",value: "100%" },
              { label: "Transaction Fee", value: "$399" },
              { label: "Annual Cap",      value: "$6,000" },
            ].map((s, i) => (
              <div key={s.label} className={`rounded-xl bg-gradient-to-br from-white to-voro-ghost border border-voro-muted-border p-3 animate-fade-in stagger-${i + 1}`}>
                <div className="text-voro-text-muted">{s.label}</div>
                <div className="text-lg font-black text-voro-jet">{s.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            {[
              { label: "YTD Fees Paid",     value: "$3,192",       color: "text-voro-jet" },
              { label: "Remaining to Cap",  value: "$2,808",       color: "text-voro-success" },
              { label: "Cap Anniversary",   value: "Mar 15, 2027", color: "text-voro-jet" },
              { label: "E&O Coverage",      value: "Active",       color: "text-voro-success" },
            ].map((s, i) => (
              <div key={s.label} className={`rounded-xl bg-gradient-to-br from-white to-voro-ghost border border-voro-muted-border p-3 animate-fade-in stagger-${i + 5}`}>
                <div className="text-voro-text-muted">{s.label}</div>
                <div className={`text-lg font-black tabular-nums ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-voro-text-muted">
            Compensation details are for reference only. Contact{" "}
            <span className="font-semibold text-voro-purple">Accounting</span> for disputes.
          </p>
        </Card>

        <Card>
          <div className="section-title mb-1">Why VORO</div>
          <p className="section-body mb-3">
            VORO is a real estate cloud broker built for entrepreneurs: generous commission plans,
            low friction transaction support, modern technology, and the freedom to work from anywhere.
          </p>
          <a href="https://voro.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-voro-purple hover:text-voro-indigo transition-colors">
            Learn more at voro.com
          </a>
        </Card>

      </div>
    </>
  );
}
