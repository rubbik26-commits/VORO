import { agent } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { MapPin, Phone, Mail, Globe, Instagram, Linkedin, Facebook, Star, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const incomplete = 100 - agent.profileCompleteness;
  return (
    <>
      <PageHeader title="My Profile" description="Public agent profile, specialties, service areas, and bio." action={<button className="btn-primary text-sm">Save Changes</button>}/>
      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.4fr] gap-6">
        <div className="flex flex-col gap-4">
          <Card className="items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-accent flex items-center justify-center text-white text-4xl font-black shadow-glow-sm mx-auto mb-4">{agent.firstName[0]}</div>
            <div className="text-xl font-black text-voro-jet">{agent.firstName} {agent.lastName}</div>
            <div className="text-sm text-voro-text-muted">{agent.role}</div>
            <div className="flex items-center gap-1 text-xs text-voro-text-muted mt-1 justify-center"><MapPin size={11} className="text-voro-purple"/>{agent.marketArea}</div>
            <div className="flex items-center justify-center gap-1 mt-2"><Star size={12} className="fill-amber-400 text-amber-400"/><span className="text-sm font-bold text-voro-jet">{agent.rating}</span><span className="text-xs text-voro-text-faint">({agent.reviews} reviews)</span></div>
            <div className="flex flex-col gap-1.5 mt-4 w-full text-xs">
              <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-voro-text-muted hover:text-voro-purple transition-colors"><Phone size={12} className="text-voro-purple"/>{agent.phone}</a>
              <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-voro-text-muted hover:text-voro-purple transition-colors"><Mail size={12} className="text-voro-purple"/>{agent.email}</a>
              {agent.website&&<a href={agent.website} className="flex items-center gap-2 text-voro-text-muted hover:text-voro-purple transition-colors"><Globe size={12} className="text-voro-purple"/>{agent.website}</a>}
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              {agent.social.instagram&&<a href={agent.social.instagram} aria-label="Instagram" className="text-voro-text-faint hover:text-voro-purple transition-colors"><Instagram size={18}/></a>}
              {agent.social.linkedin&&<a href={agent.social.linkedin} aria-label="LinkedIn" className="text-voro-text-faint hover:text-voro-purple transition-colors"><Linkedin size={18}/></a>}
              {agent.social.facebook&&<a href={agent.social.facebook} aria-label="Facebook" className="text-voro-text-faint hover:text-voro-purple transition-colors"><Facebook size={18}/></a>}
            </div>
          </Card>
          <Card>
            <div className="section-title mb-3">Profile Completeness</div>
            <ProgressBar value={agent.profileCompleteness} label={`${agent.profileCompleteness}% complete`}/>
            {incomplete>0&&<p className="text-xs text-voro-text-muted mt-3">Add {incomplete}% more info to boost your visibility on VORO.</p>}
            <div className="flex flex-col gap-2 mt-4">
              {agent.completionItems.map((item: any)=>(
                <div key={item.label} className="flex items-center gap-2 text-xs">
                  {item.done?<CheckCircle2 size={14} className="text-voro-success"/>:<div className="w-3.5 h-3.5 rounded-full border-2 border-voro-muted-border"/>}
                  <span className={item.done?"text-voro-text-muted line-through":"text-voro-jet font-semibold"}>{item.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <div className="section-title mb-3">Bio</div>
            <textarea defaultValue={agent.bio} rows={5} className="w-full text-sm text-voro-text-muted rounded-xl border border-voro-muted-border bg-voro-ghost px-4 py-3 resize-none focus:outline-none focus:border-voro-purple transition-colors"/>
          </Card>
          <Card>
            <div className="section-title mb-3">Specialties</div>
            <div className="flex flex-wrap gap-2">
              {agent.specialties.map((s: string)=>(
                <span key={s} className="bg-voro-soft-panel text-voro-purple text-xs font-semibold px-3 py-1.5 rounded-full">{s}</span>
              ))}
              <button className="border border-dashed border-voro-purple text-voro-purple text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-voro-soft-panel transition-colors">+ Add</button>
            </div>
          </Card>
          <Card>
            <div className="section-title mb-3">Service Areas</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {agent.serviceAreas.map((area: any)=>(
                <div key={area.name} className="flex items-center justify-between rounded-xl border border-voro-muted-border px-3 py-2.5">
                  <div className="flex items-center gap-2"><MapPin size={13} className="text-voro-purple"/><span className="text-sm font-semibold text-voro-jet">{area.name}</span></div>
                  <Badge variant="neutral">{area.activity}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card className="flex flex-col gap-2 text-center">
              <div className="text-xs uppercase tracking-widest text-voro-text-muted font-semibold">Closed Transactions</div>
              <div className="text-3xl font-black text-voro-jet tabular-nums">{agent.closedTransactions}</div>
            </Card>
            <Card className="flex flex-col gap-2 text-center">
              <div className="text-xs uppercase tracking-widest text-voro-text-muted font-semibold">YTD Volume</div>
              <div className="text-3xl font-black text-voro-jet tabular-nums">{agent.ytdVolume}</div>
            </Card>
          </div>
          <Card>
            <div className="section-title mb-3">Languages</div>
            <div className="flex flex-wrap gap-2">{agent.languages.map((l: string)=><Badge key={l} variant="neutral">{l}</Badge>)}</div>
          </Card>
        </div>
      </div>
    </>
  );
}
