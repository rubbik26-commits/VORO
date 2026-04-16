"use client";
import { useEffect, useState } from "react";
import { getAgent } from "@/lib/api";
import type { Agent } from "@/lib/types";
import { formatDate, isValidEmail, isValidPhone } from "@/lib/utils";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { updateAgentProfile } from "@/lib/api";
import { track } from "@/lib/analytics";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  Facebook,
  Star,
  CheckCircle2,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ProfilePage() {
  const { toast } = useToast();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [bio, setBio] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [websiteVal, setWebsiteVal] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLang, setNewLang] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [profilePublic, setProfilePublic] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAgent().then((a) => {
      setAgent(a);
      setBio(a.bio);
      setPhoneVal(a.phone);
      setEmailVal(a.email);
      setWebsiteVal(a.website);
      setLanguages([...a.languages]);
      setSpecialties([...a.specialties]);
    })
    .catch(() => toast("Could not load profile. Try refreshing.", "error"));
  }, []);

  if (!agent) return null;

  const incomplete = 100 - agent.profileCompleteness;

  const handleSave = async () => {
    if (emailVal && !isValidEmail(emailVal)) {
      toast("Please enter a valid email address.", "error");
      return;
    }
    if (phoneVal && !isValidPhone(phoneVal)) {
      toast("Please enter a valid phone number.", "error");
      return;
    }
    setSaving(true);
    try {
      await updateAgentProfile({
        bio,
        phone: phoneVal,
        email: emailVal,
        website: websiteVal,
        specialties,
        languages,
      });
      track("profile_saved");
      toast("Profile changes saved.", "success");
    } catch {
      toast("Could not save profile. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const addLanguage = () => {
    const v = newLang.trim();
    if (!v) return;
    if (languages.includes(v)) { toast("Language already added.", "info"); return; }
    setLanguages((prev) => [...prev, v]);
    setNewLang("");
  };

  const addSpecialty = () => {
    const v = newSpecialty.trim();
    if (!v) return;
    if (specialties.includes(v)) {
      toast("Specialty already added.", "info");
      return;
    }
    setSpecialties((prev) => [...prev, v]);
    setNewSpecialty("");
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        description="Public agent profile, specialties, service areas, and bio."
        action={
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm disabled:opacity-60">
            {saving ? "Saving…" : "Save Changes"}
          </button>
        }
      />
      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.4fr] gap-6">
        <div className="flex flex-col gap-4">
          <Card className="items-center text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-gradient-accent flex items-center justify-center text-white text-4xl font-black shadow-glow mx-auto mb-4 ring-4 ring-white">
              {agent.firstName[0]}
            </div>
            <div className="text-xl font-black text-voro-jet">
              {agent.firstName} {agent.lastName}
            </div>
            <div className="text-sm text-voro-text-muted">{agent.role}</div>
            <div className="flex items-center gap-1 text-xs text-voro-text-muted mt-1 justify-center">
              <MapPin size={11} className="text-voro-purple" />
              {agent.marketArea}
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-voro-jet">{agent.rating}</span>
              <span className="text-xs text-voro-text-faint">({agent.reviews} reviews)</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-voro-text-muted mt-1">
              <Calendar size={11} className="text-voro-purple" />
              <span>Member since {formatDate(agent.joinDate)}</span>
            </div>
            <div className="flex flex-col gap-2 mt-4 w-full text-xs">
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-voro-purple shrink-0" />
                <input
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  className="input !py-1 text-xs flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-voro-purple shrink-0" />
                <input
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  className="input !py-1 text-xs flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-voro-purple shrink-0" />
                <input
                  value={websiteVal}
                  onChange={(e) => setWebsiteVal(e.target.value)}
                  className="input !py-1 text-xs flex-1"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setProfilePublic((p) => !p);
                toast(profilePublic ? "Profile hidden from public view." : "Profile visible to public.", "info");
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-voro-purple mt-3 hover:text-voro-indigo transition-colors"
            >
              {profilePublic ? <Eye size={13} /> : <EyeOff size={13} />}
              {profilePublic ? "Public profile" : "Team-only"}
            </button>
            <div className="flex items-center justify-center gap-3 mt-4">
              {agent.social.instagram && (
                <a
                  href={agent.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-voro-text-faint hover:text-voro-purple transition-colors"
                >
                  <Instagram size={18} />
                </a>
              )}
              {agent.social.linkedin && (
                <a
                  href={agent.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-voro-text-faint hover:text-voro-purple transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {agent.social.facebook && (
                <a
                  href={agent.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-voro-text-faint hover:text-voro-purple transition-colors"
                >
                  <Facebook size={18} />
                </a>
              )}
            </div>
          </Card>
          <Card>
            <div className="section-title mb-3">Profile Completeness</div>
            <ProgressBar value={agent.profileCompleteness} label={`${agent.profileCompleteness}% complete`} />
            {incomplete > 0 && (
              <p className="text-xs text-voro-text-muted mt-3">
                Add {incomplete}% more info to boost your visibility on VORO.
              </p>
            )}
            <div className="flex flex-col gap-2 mt-4">
              {agent.completionItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs">
                  {item.done ? (
                    <CheckCircle2 size={14} className="text-voro-success" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-voro-muted-border" />
                  )}
                  <span className={item.done ? "text-voro-text-muted line-through" : "text-voro-jet font-semibold"}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <div className="section-title mb-3">Bio</div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              className="w-full text-sm text-voro-jet rounded-xl border border-voro-muted-border bg-voro-ghost px-4 py-3 resize-none focus:outline-none focus:border-voro-purple transition-colors"
            />
            <div className="text-xs text-voro-text-faint mt-1">{bio.length} characters</div>
          </Card>
          <Card>
            <div className="section-title mb-3">Specialties</div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpecialties((prev) => prev.filter((x) => x !== s))}
                  className="bg-voro-soft-panel text-voro-purple text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-voro-purple hover:text-white transition-colors"
                  aria-label={`Remove ${s}`}
                  title="Click to remove"
                >
                  {s} ×
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSpecialty();
                  }
                }}
                placeholder="Add a specialty…"
                className="input flex-1"
              />
              <button onClick={addSpecialty} className="btn-secondary text-xs">
                Add
              </button>
            </div>
          </Card>
          <Card>
            <div className="section-title mb-3">Service Areas</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {agent.serviceAreas.map((area) => {
                const activityVariant =
                  area.activity === "High" ? "success" : area.activity === "Medium" ? "warning" : "neutral";
                return (
                  <div
                    key={area.name}
                    className="flex items-center justify-between rounded-xl border border-voro-muted-border px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-voro-purple" />
                      <span className="text-sm font-semibold text-voro-jet">{area.name}</span>
                    </div>
                    <Badge variant={activityVariant}>{area.activity}</Badge>
                  </div>
                );
              })}
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card variant="stat" className="flex flex-col gap-2 text-center animate-fade-in stagger-1">
              <div className="text-xs uppercase tracking-widest text-voro-text-muted font-semibold">
                Closed Transactions
              </div>
              <div className="text-3xl font-black text-voro-jet tabular-nums">{agent.closedTransactions}</div>
            </Card>
            <Card variant="stat" className="flex flex-col gap-2 text-center animate-fade-in stagger-2">
              <div className="text-xs uppercase tracking-widest text-voro-text-muted font-semibold">YTD Volume</div>
              <div className="text-3xl font-black text-voro-jet tabular-nums">{agent.ytdVolume}</div>
            </Card>
          </div>
          <Card>
            <div className="section-title mb-3">Languages</div>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguages((prev) => prev.filter((x) => x !== l))}
                  className="bg-voro-ghost text-voro-jet text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-voro-danger hover:text-white transition-colors"
                  aria-label={`Remove ${l}`}
                  title="Click to remove"
                >
                  {l} &times;
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLanguage(); } }}
                placeholder="Add a language…"
                className="input flex-1"
              />
              <button onClick={addLanguage} className="btn-secondary text-xs">
                Add
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
