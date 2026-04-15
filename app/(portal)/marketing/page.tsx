import { marketingAssets } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { Download, FileImage, Mail, FileText, Package, Video, Megaphone } from "lucide-react";

const categoryIcon: Record<string, React.ReactNode> = {
  Social:    <FileImage size={18} className="text-voro-purple" />,
  Flyer:     <FileText size={18} className="text-voro-purple" />,
  Postcard:  <Mail size={18} className="text-voro-purple" />,
  Email:     <Mail size={18} className="text-voro-purple" />,
  Kit:       <Package size={18} className="text-voro-purple" />,
  Video:     <Video size={18} className="text-voro-purple" />,
};

const quickRequests = [
  { label: "Listing Flyer",     description: "Custom flyer for your next listing." },
  { label: "Social Media Post", description: "Branded graphic for Instagram or Facebook." },
  { label: "Open House Promo",  description: "Digital + print materials for events." },
  { label: "Email Newsletter",  description: "Agent-branded drip campaign." },
];

export default function MarketingPage() {
  return (
    <>
      <PageHeader
        title="Marketing"
        description="Brand assets, templates, and custom marketing requests."
        action={<button className="btn-primary text-sm flex items-center gap-2"><Megaphone size={15}/>Request Custom Asset</button>}
      />
      <Card>
        <div className="section-title mb-4">Quick Requests</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {quickRequests.map(r => (
            <button key={r.label} className="text-left rounded-xl border border-voro-muted-border bg-voro-ghost p-4 hover:border-voro-purple hover:shadow-soft transition-all group">
              <div className="text-sm font-bold text-voro-jet group-hover:text-voro-purple transition-colors">{r.label}</div>
              <p className="text-xs text-voro-text-muted mt-1 leading-relaxed">{r.description}</p>
              <span className="text-xs font-semibold text-voro-purple mt-2 inline-block">Request →</span>
            </button>
          ))}
        </div>
      </Card>
      <Card padding={false}>
        <div className="flex items-center justify-between p-5 border-b border-voro-muted-border">
          <div><div className="section-title">Asset Library</div><div className="section-body mt-0.5">{marketingAssets.length} assets available.</div></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-voro-muted-border">
          {marketingAssets.map(asset => (
            <div key={asset.id} className="flex items-center justify-between gap-4 bg-white hover:bg-voro-ghost transition-colors px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0">
                  {categoryIcon[asset.category] ?? <FileText size={18} className="text-voro-purple" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-voro-jet">{asset.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="neutral">{asset.category}</Badge>
                    <span className="text-xs text-voro-text-faint">{asset.format}</span>
                  </div>
                </div>
              </div>
              <button className="w-9 h-9 rounded-xl bg-voro-soft-panel flex items-center justify-center text-voro-purple hover:bg-voro-purple hover:text-white transition-all shrink-0" aria-label="Download">
                <Download size={15} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
