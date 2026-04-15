import { leads } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { Phone, Mail, MessageCircle } from "lucide-react";

const sv: Record<string,any> = {New:"default",Contacted:"warning",Active:"success",Nurturing:"default",Closed:"neutral",Lost:"danger"};
const tv: Record<string,string> = {Buyer:"bg-blue-50 text-blue-700",Seller:"bg-amber-50 text-amber-700",Investor:"bg-purple-50 text-purple-700",Renter:"bg-green-50 text-green-700",Referral:"bg-pink-50 text-pink-700",Recruit:"bg-indigo-50 text-indigo-700"};

export default function LeadsPage() {
  return (
    <>
      <PageHeader title="Leads" description="Your lead inbox, referrals, and recruiting pipeline." action={<button className="btn-primary text-sm">+ Add Lead</button>}/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{label:"Total Leads",value:leads.length.toString()},{label:"New This Week",value:leads.filter(l=>l.status==="New").length.toString()},{label:"Active",value:leads.filter(l=>l.status==="Active").length.toString()},{label:"Recruiting",value:leads.filter(l=>l.type==="Recruit").length.toString()}].map(k=>(
          <Card key={k.label} className="flex flex-col gap-2"><div className="text-xs font-semibold text-voro-text-muted">{k.label}</div><div className="text-3xl font-black text-voro-jet tabular-nums">{k.value}</div></Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {leads.map(l=>(
          <Card key={l.id} className="flex flex-col gap-3 hover:shadow-medium transition-shadow cursor-pointer">
            <div className="flex items-start justify-between gap-2">
              <div><div className="text-base font-bold text-voro-jet">{l.name}</div><div className="text-xs text-voro-text-muted mt-0.5">{l.market}</div></div>
              <div className="flex flex-col items-end gap-1.5"><span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tv[l.type]??""}`}>{l.type}</span><Badge variant={sv[l.status]}>{l.status}</Badge></div>
            </div>
            {l.notes&&<p className="text-xs text-voro-text-muted bg-voro-ghost rounded-xl px-3 py-2 leading-relaxed">{l.notes}</p>}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-voro-muted-border">
              <div className="text-xs text-voro-text-faint">Source: <span className="text-voro-text-muted font-semibold">{l.source}</span></div>
              <div className="flex items-center gap-1">
                <a href={`tel:${l.phone}`} className="w-8 h-8 rounded-lg bg-voro-soft-panel flex items-center justify-center text-voro-purple hover:bg-voro-purple hover:text-white transition-all" aria-label="Call"><Phone size={14}/></a>
                <a href={`mailto:${l.email}`} className="w-8 h-8 rounded-lg bg-voro-soft-panel flex items-center justify-center text-voro-purple hover:bg-voro-purple hover:text-white transition-all" aria-label="Email"><Mail size={14}/></a>
                <button className="w-8 h-8 rounded-lg bg-voro-soft-panel flex items-center justify-center text-voro-purple hover:bg-voro-purple hover:text-white transition-all" aria-label="Message"><MessageCircle size={14}/></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
