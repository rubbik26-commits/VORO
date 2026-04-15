"use client";
import { useMemo, useRef, useState } from "react";
import { documents } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { useToast } from "@/components/ui/Toast";
import { FileText, Upload, Search, Filter } from "lucide-react";

const categoryVariant: Record<string, "default" | "warning" | "success" | "danger" | "neutral"> = {
  "Brokerage Forms": "default",
  Compliance: "warning",
  Templates: "success",
  Uploads: "neutral",
  Disclosures: "danger",
};

export default function DocumentsPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = useMemo(() => Array.from(new Set(documents.map((d) => d.category))), []);
  const states = useMemo(
    () => ["All", ...Array.from(new Set(documents.map((d) => d.state)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      if (stateFilter !== "All" && d.state !== stateFilter) return false;
      if (categoryFilter !== "All" && d.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q)
      );
    });
  }, [query, stateFilter, categoryFilter]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    toast(`Uploaded ${files.length} file${files.length > 1 ? "s" : ""} (mock — wire to storage).`, "success");
    e.target.value = "";
  };

  const visibleCategories = categoryFilter === "All" ? categories : [categoryFilter];

  return (
    <>
      <PageHeader
        title="Documents"
        description="Forms, compliance docs, templates, and your uploads."
        action={
          <>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              aria-hidden="true"
            />
            <button
              onClick={handleUploadClick}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Upload size={15} />
              Upload Document
            </button>
          </>
        }
      />
      <Card padding={false}>
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-voro-muted-border">
          <div className="flex-1 flex items-center gap-2 min-w-40 rounded-xl border border-voro-muted-border bg-voro-ghost px-3 py-2">
            <Search size={14} className="text-voro-text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents..."
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-voro-text-faint"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-voro-text-faint" />
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="input !py-1.5">
              {states.map((s) => (
                <option key={s}>{s === "All" ? "All states" : s}</option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input !py-1.5"
            >
              <option value="All">All categories</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        {visibleCategories.map((cat) => {
          const docs = filtered.filter((d) => d.category === cat);
          if (docs.length === 0) return null;
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 px-5 py-3 bg-voro-ghost border-b border-voro-muted-border">
                <Badge variant={categoryVariant[cat] ?? "neutral"}>{cat}</Badge>
                <span className="text-xs text-voro-text-faint">{docs.length} docs</span>
              </div>
              {docs.map((d, i) => (
                <div
                  key={d.id}
                  className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-voro-ghost transition-colors ${
                    i < docs.length - 1 ? "border-b border-voro-muted-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-voro-purple" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-voro-jet">{d.name}</div>
                      <div className="text-xs text-voro-text-muted mt-0.5">
                        {d.state} · Updated {d.updatedAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-voro-text-faint">{d.format}</span>
                    <button
                      onClick={() => toast(`Previewing “${d.name}” (mock).`, "info")}
                      className="btn-ghost text-xs py-1.5 px-3"
                    >
                      View
                    </button>
                    <button
                      onClick={() => toast(`Downloading “${d.name}”…`, "success")}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center">
            <div className="text-sm font-semibold text-voro-text-muted">No documents match your filters.</div>
          </div>
        )}
      </Card>
    </>
  );
}
