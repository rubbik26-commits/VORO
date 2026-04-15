import { supportTickets } from "@/data/mock-data";
import { brandTokens } from "@/lib/brand-tokens";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { Phone, Mail, Clock, MessageCircle, HelpCircle, ChevronRight } from "lucide-react";

const sv: Record<string,any> = {Open:"default","In Progress":"warning",Resolved:"success",Waiting:"neutral"};
const pv: Record<string,any> = {High:"danger",Medium:"warning",Low:"neutral"};

const departments = [
  {name:"Operations",description:"Transaction support, deal processing, coordination."},
  {name:"Marketing",description:"Brand assets, listing promotion, custom requests."},
  {name:"Compliance",description:"Licensing, forms, legal documents, audits."},
  {name:"Onboarding",description:"New agent setup, portal access, system training."},
  {name:"Technology",description:"Portal bugs, access issues, integrations."},
  {name:"Accounting",description:"Commission questions, split disputes, payments."},
];

export default function SupportPage() {
  return (
    <>
      <PageHeader title="Support" description="Open a ticket, chat live, or browse the knowledge base."/>
      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.9fr] gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="section-title mb-4">Open a Support Ticket</div>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-voro-text-muted">Department</label>
                  <select className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 text-sm focus:outline-none focus:border-voro-purple transition-colors">
                    {departments.map(d=><option key={d.name}>{d.name}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-voro-text-muted">Priority</label>
                  <select className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 text-sm focus:outline-none focus:border-voro-purple transition-colors">
                    {["Low","Medium","High"].map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-voro-text-muted">Subject</label>
                <input placeholder="Briefly describe your issue" className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-2.5 text-sm focus:outline-none focus:border-voro-purple transition-colors"/>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-voro-text-muted">Description</label>
                <textarea rows={4} placeholder="Provide full details..." className="border border-voro-muted-border rounded-xl bg-voro-ghost px-3 py-3 text-sm focus:outline-none focus:border-voro-purple transition-colors resize-none"/>
              </div>
              <button type="submit" className="btn-primary text-sm self-start px-8">Submit Ticket</button>
            </form>
          </Card>
          <Card padding={false}>
            <div className="flex items-center justify-between p-5 border-b border-voro-muted-border">
              <div className="section-title">Your Tickets</div>
              <Badge variant="neutral">{supportTickets.length} total</Badge>
            </div>
            {supportTickets.map((t,i)=>(
              <div key={t.id} className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-voro-ghost transition-colors cursor-pointer ${i<supportTickets.length-1?"border-b border-voro-muted-border":""}`}>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold text-voro-jet">{t.subject}</div>
                  <div className="flex items-center gap-2 text-xs text-voro-text-faint"><span>{t.department}</span><span>·</span><span>Opened {t.created}</span></div>
                  <div className="flex items-center gap-2 mt-1"><Badge variant={sv[t.status]}>{t.status}</Badge><Badge variant={pv[t.priority]}>{t.priority}</Badge></div>
                </div>
                <ChevronRight size={16} className="text-voro-text-faint shrink-0"/>
              </div>
            ))}
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <div className="section-title mb-4">Contact VORO</div>
            <div className="flex flex-col gap-3">
              <a href={`tel:${brandTokens.contact.phone}`} className="flex items-center gap-3 rounded-xl border border-voro-muted-border bg-voro-ghost px-4 py-3 hover:border-voro-purple transition-all group">
                <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0 group-hover:bg-purple-50"><Phone size={16} className="text-voro-purple"/></div>
                <div><div className="text-sm font-bold text-voro-jet">{brandTokens.contact.phone}</div><div className="text-xs text-voro-text-muted">Call us directly</div></div>
              </a>
              <a href={`mailto:${brandTokens.contact.email}`} className="flex items-center gap-3 rounded-xl border border-voro-muted-border bg-voro-ghost px-4 py-3 hover:border-voro-purple transition-all group">
                <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0 group-hover:bg-purple-50"><Mail size={16} className="text-voro-purple"/></div>
                <div><div className="text-sm font-bold text-voro-jet">{brandTokens.contact.email}</div><div className="text-xs text-voro-text-muted">Email operations</div></div>
              </a>
              <button className="flex items-center gap-3 rounded-xl border border-voro-muted-border bg-voro-ghost px-4 py-3 hover:border-voro-purple transition-all group w-full text-left">
                <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0 group-hover:bg-purple-50"><MessageCircle size={16} className="text-voro-purple"/></div>
                <div><div className="text-sm font-bold text-voro-jet">Start Live Chat</div><div className="text-xs text-voro-text-muted">Typically replies in minutes</div></div>
              </button>
            </div>
          </Card>
          <Card>
            <div className="section-title mb-3">Hours & SLA</div>
            <div className="flex flex-col gap-2 text-xs">
              {[{day:"Mon–Fri",hours:"9am–6pm ET"},{day:"Saturday",hours:"10am–2pm ET"},{day:"Sunday",hours:"Closed"}].map(h=>(
                <div key={h.day} className="flex items-center justify-between gap-2"><div className="flex items-center gap-2"><Clock size={11} className="text-voro-purple"/><span className="text-voro-text-muted">{h.day}</span></div><span className="font-semibold text-voro-jet">{h.hours}</span></div>
              ))}
              <div className="border-t border-voro-muted-border pt-2 mt-2 text-voro-text-muted">Tickets resolved within <span className="font-bold text-voro-jet">24–48 hrs</span>.</div>
            </div>
          </Card>
          <Card>
            <div className="section-title mb-3">Departments</div>
            <div className="flex flex-col gap-2">
              {departments.map(d=>(
                <div key={d.name} className="flex items-start gap-3 py-2 border-b border-voro-muted-border last:border-0">
                  <HelpCircle size={14} className="text-voro-purple mt-0.5 shrink-0"/>
                  <div><div className="text-xs font-bold text-voro-jet">{d.name}</div><div className="text-xs text-voro-text-muted">{d.description}</div></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
