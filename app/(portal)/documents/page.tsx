import { documents } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { FileText, Upload, Search, Filter } from "lucide-react";

const categoryVariant: Record<string, "default" | "warning" | "success" | "danger" | "neutral"> = {
  "Brokerage Forms": "default",
  Compliance:        "warning",
  Templates:         "success",
  Uploads:           "neutral",
  Disclosures:       "danger",
};

export default function DocumentsPage() {
  const categories = Array.from(new Set(documents.map(d => d.category)));
  return (
    <>
      <PageHeader
        title="Documents"
        description="Forms, compliance docs, templates, and your uploads."
        action={
          <button className="btn-primary text-sm flex items-center gap-2"><Upload size={15} />Upload Document</button>
        }
      />
      <Card padding={false}>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-voro-muted-border">
          <div className="flex-1 flex items-center gap-2 min-w-40 rounded-xl border border-voro-muted-border bg-voro-ghost px-3 py-2">
            <Search size={14} className="text-voro-text-faint" />
            <input placeholder="Search documents..." className="flex-1 text-sm bg-transparent outline-none placeholder:text-voro-text-faint" />
          </div>
          <button className="btn-ghost flex items-center gap-2 text-sm"><Filter size={14} />Filter</button>
        </div>
        {categories.map(cat => {
          const docs = documents.filter(d => d.category === cat);
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 px-5 py-3 bg-voro-ghost border-b border-voro-muted-border">
                <Badge variant={categoryVariant[cat] ?? "neutral"}>{cat}</Badge>
                <span className="text-xs text-voro-text-faint">{docs.length} docs</span>
              </div>
              {docs.map((d, i) => (
                <div key={d.id} className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-voro-ghost transition-colors ${i < docs.length - 1 ? "border-b border-voro-muted-border" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-voro-purple" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-voro-jet">{d.name}</div>
                      <div className="text-xs text-voro-text-muted mt-0.5">{d.state} · Updated {d.updatedAt}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-voro-text-faint">{d.format}</span>
                    <button className="btn-ghost text-xs py-1.5 px-3">View</button>
                    <button className="btn-secondary text-xs py-1.5 px-3">Download</button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </Card>
    </>
  );
}
