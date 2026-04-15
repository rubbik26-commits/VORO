"use client";
import { useMemo, useState } from "react";
import { marketingAssets } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { Download, Eye, FileImage, Mail, FileText, Package, Video, Megaphone, Search } from "lucide-react";

const categoryIcon: Record<string, React.ReactNode> = {
  Social: <FileImage size={18} className="text-voro-purple" />,
  Flyer: <FileText size={18} className="text-voro-purple" />,
  Postcard: <Mail size={18} className="text-voro-purple" />,
  Email: <Mail size={18} className="text-voro-purple" />,
  Kit: <Package size={18} className="text-voro-purple" />,
  Video: <Video size={18} className="text-voro-purple" />,
};

const quickRequests = [
  { label: "Listing Flyer", description: "Custom flyer for your next listing." },
  { label: "Social Media Post", description: "Branded graphic for Instagram or Facebook." },
  { label: "Open House Promo", description: "Digital + print materials for events." },
  { label: "Email Newsletter", description: "Agent-branded drip campaign." },
];

export default function MarketingPage() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(marketingAssets.map((a) => a.category)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return marketingAssets.filter((a) => {
      if (activeCategory !== "All" && a.category !== activeCategory) return false;
      if (!q) return true;
      return a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    });
  }, [activeCategory, query]);

  const handleDownload = (name: string, format: string) => {
    toast(`Downloading “${name}” (${format})…`, "success");
  };
  const handlePreview = (name: string) => {
    toast(`Previewing “${name}” (mock — wire to asset CDN).`, "info");
  };

  return (
    <>
      <PageHeader
        title="Marketing"
        description="Brand assets, templates, and custom marketing requests."
        action={
          <button
            onClick={() => toast("Custom asset request form queued.", "success")}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Megaphone size={15} />
            Request Custom Asset
          </button>
        }
      />
      <Card>
        <div className="section-title mb-4">Quick Requests</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {quickRequests.map((r) => (
            <button
              key={r.label}
              onClick={() => toast(`Requested: ${r.label}. Marketing will follow up.`, "success")}
              className="text-left rounded-xl border border-voro-muted-border bg-voro-ghost p-4 hover:border-voro-purple hover:shadow-soft transition-all group"
            >
              <div className="text-sm font-bold text-voro-jet group-hover:text-voro-purple transition-colors">
                {r.label}
              </div>
              <p className="text-xs text-voro-text-muted mt-1 leading-relaxed">{r.description}</p>
              <span className="text-xs font-semibold text-voro-purple mt-2 inline-block">Request →</span>
            </button>
          ))}
        </div>
      </Card>
      <Card padding={false}>
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-voro-muted-border">
          <div>
            <div className="section-title">Asset Library</div>
            <div className="section-body mt-0.5">
              Showing {filtered.length} of {marketingAssets.length} assets.
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-voro-muted-border bg-voro-ghost px-3 py-2">
            <Search size={14} className="text-voro-text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search assets…"
              className="bg-transparent text-sm outline-none placeholder:text-voro-text-faint"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-voro-muted-border">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                activeCategory === c
                  ? "bg-voro-purple text-white"
                  : "bg-voro-soft-panel text-voro-purple hover:bg-voro-purple hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-voro-muted-border">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between gap-4 bg-white hover:bg-voro-ghost transition-colors px-5 py-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0">
                  {categoryIcon[asset.category] ?? <FileText size={18} className="text-voro-purple" />}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-voro-jet truncate">{asset.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="neutral">{asset.category}</Badge>
                    <span className="text-xs text-voro-text-faint">{asset.format}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handlePreview(asset.name)}
                  className="btn-ghost-icon"
                  aria-label={`Preview ${asset.name}`}
                >
                  <Eye size={15} />
                </button>
                <button
                  onClick={() => handleDownload(asset.name, asset.format)}
                  className="btn-ghost-icon"
                  aria-label={`Download ${asset.name}`}
                >
                  <Download size={15} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full bg-white text-center py-10">
              <div className="text-sm font-semibold text-voro-text-muted">No assets match your filters.</div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
