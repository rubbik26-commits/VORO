import { transactions } from "@/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

const sv: Record<string,any> = {"Attorney Review":"default","Inspection Scheduled":"warning","Documents Outstanding":"danger","Clear to Close":"success","Accepted Offer":"default","Inspection Complete":"default","Closed":"success","Broker Review":"warning"};
const rv: Record<string,any> = {"Approved":"success","Pending":"warning","Needs Revision":"danger"};

export default function TransactionsPage() {
  const pipeline = transactions.reduce((s,t)=>s+t.commission,0);
  return (
    <>
      <PageHeader title="Transactions" description="Active deals, milestones, document status, and commission pipeline." action={<button className="btn-primary text-sm">+ Submit New Deal</button>}/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{label:"Active Files",value:transactions.filter(t=>t.status!=="Closed").length.toString()},{label:"Commission Pipeline",value:formatCurrency(pipeline)},{label:"Docs Outstanding",value:transactions.filter(t=>t.missingDocs.length>0).length.toString()},{label:"Needs Broker Review",value:transactions.filter(t=>t.brokerReview!=="Approved").length.toString()}].map(k=>(
          <Card key={k.label} className="flex flex-col gap-2"><div className="text-xs font-semibold text-voro-text-muted">{k.label}</div><div className="text-3xl font-black tracking-tight text-voro-jet tabular-nums">{k.value}</div></Card>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        {transactions.map(t=>(
          <Card key={t.id} padding={false}>
            <div className="flex flex-wrap items-start justify-between gap-4 p-5 border-b border-voro-muted-border">
              <div>
                <div className="text-lg font-bold text-voro-jet">{t.address}, {t.city}, {t.state}</div>
                <div className="flex flex-wrap gap-2 mt-2"><Badge variant="neutral">{t.side}</Badge><Badge variant={sv[t.status]??"default"}>{t.status}</Badge><Badge variant={rv[t.brokerReview]}>Broker: {t.brokerReview}</Badge></div>
              </div>
              <div className="text-right"><div className="text-xs text-voro-text-muted">Commission</div><div className="text-xl font-black text-voro-jet tabular-nums mt-0.5">{formatCurrency(t.commission)}</div><div className="text-xs text-voro-text-muted mt-1">Closing: {t.closingDate}</div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-voro-text-muted mb-3">Milestones</div>
                <div className="flex flex-col gap-2">
                  {t.milestones.map((m,i)=>(
                    <div key={i} className="flex items-center gap-3">
                      {m.completed?<CheckCircle2 size={16} className="text-voro-success shrink-0"/>:<Circle size={16} className="text-voro-text-faint shrink-0"/>}
                      <span className={`text-sm ${m.completed?"text-voro-jet font-semibold":"text-voro-text-muted"}`}>{m.label}</span>
                      {m.date&&<span className="text-xs text-voro-text-faint ml-auto">{m.date}</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {t.missingDocs.length>0&&(
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-voro-danger mb-2"><AlertCircle size={14}/>Missing Documents</div>
                    {t.missingDocs.map((doc,i)=><div key={i} className="flex items-center gap-2 text-sm text-voro-text-muted"><span className="w-1.5 h-1.5 rounded-full bg-voro-danger shrink-0"/>{doc}</div>)}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-voro-text-muted mb-2">Deal Details</div>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between"><span className="text-voro-text-muted">Client</span><span className="font-semibold text-voro-jet">{t.client}</span></div>
                    {t.listPrice>0&&<div className="flex justify-between"><span className="text-voro-text-muted">List Price</span><span className="font-semibold tabular-nums">{formatCurrency(t.listPrice)}</span></div>}
                    {t.salePrice>0&&<div className="flex justify-between"><span className="text-voro-text-muted">Sale Price</span><span className="font-semibold tabular-nums">{formatCurrency(t.salePrice)}</span></div>}
                  </div>
                </div>
                <button className="btn-primary text-sm mt-auto">Upload Missing Docs</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
