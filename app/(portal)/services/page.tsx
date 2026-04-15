import { services } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { HeartHandshake, Building2, Shield, BarChart2, Users, BriefcaseBusiness, ArrowRight } from "lucide-react";

const ci: Record<string,React.ReactNode> = {Lending:<HeartHandshake size={22} className="text-voro-purple"/>,Title:<Building2 size={22} className="text-voro-purple"/>,Insurance:<Shield size={22} className="text-voro-purple"/>,Research:<BarChart2 size={22} className="text-voro-purple"/>,"Lead Gen":<Users size={22} className="text-voro-purple"/>,Commercial:<BriefcaseBusiness size={22} className="text-voro-purple"/>};

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Services" description="Request-based workflows designed to help you move deals faster."/>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map(s=>(
          <Card key={s.id} className="flex flex-col gap-4 hover:shadow-medium transition-all group cursor-pointer hover:border-voro-purple">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0 group-hover:bg-purple-50 transition-colors">{ci[s.category]}</div>
              <div><div className="text-base font-bold text-voro-jet">{s.title}</div><div className="text-xs text-voro-text-faint uppercase tracking-wide font-semibold mt-0.5">{s.category}</div></div>
            </div>
            <p className="text-sm text-voro-text-muted leading-relaxed flex-1">{s.description}</p>
            <div className="text-xs font-semibold text-voro-text-faint uppercase tracking-wide">{s.eta}</div>
            <button className="btn-primary text-sm flex items-center justify-center gap-2">{s.cta}<ArrowRight size={14}/></button>
          </Card>
        ))}
      </div>
      <Card className="text-center py-8">
        <div className="text-lg font-bold text-voro-jet mb-2">Need something not listed?</div>
        <p className="text-sm text-voro-text-muted mb-5 max-w-md mx-auto">Our operations team handles custom requests.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="tel:877-943-8676" className="btn-primary text-sm">Call 877-943-8676</a>
          <a href="mailto:hello@voro.com" className="btn-secondary text-sm">Email hello@voro.com</a>
        </div>
      </Card>
    </>
  );
}
