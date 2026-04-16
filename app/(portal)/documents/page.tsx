"use client";
import { Suspense, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { getDocuments, uploadDocument } from "@/lib/api";
import { track } from "@/lib/analytics";
import type { DocumentItem } from "@/lib/types";
import { FileText, Upload, Search, Filter, CloudUpload, FileX2 } from "lucide-react";

const categoryVariant: Record<string, "default" | "warning" | "success" | "danger" | "neutral"> = {
  "Brokerage Forms": "default",
  Compliance: "warning",
  Templates: "success",
  Uploads: "neutral",
  Disclosures: "danger",
};

export default function DocumentsPage() {
  return (
    <Suspense fallback={null}>
      <DocumentsContent />
    </Suspense>
  );
}

function DocumentsContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getDocuments()
      .then(setDocuments)
      .catch(() => toast("Could not load documents. Try refreshing.", "error"));
  }, []);

  useEffect(() => {
    if (searchParams?.get("upload") === "1") setUploadOpen(true);
  }, [searchParams]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dropped = Array.from(e.dataTransfer.files);
      if (dropped.length) setUploadFiles((prev) => [...prev, ...dropped]);
    },
    [],
  );

  const handleUploadSubmit = async () => {
    if (uploadFiles.length === 0) {
      toast("Select at least one file.", "error");
      return;
    }
    setUploading(true);
    try {
      const results: DocumentItem[] = [];
      for (const f of uploadFiles) {
        const ext = f.name.split(".").pop()?.toUpperCase() ?? "PDF";
        const created = await uploadDocument({
          name: f.name,
          category: "Uploads",
          state: "NY",
          format: ext as DocumentItem["format"],
        });
        results.push(created);
      }
      setDocuments((prev) => [...results, ...prev]);
      track("document_uploaded", { count: results.length });
      toast(`${results.length} file${results.length > 1 ? "s" : ""} uploaded.`, "success");
      setUploadFiles([]);
      setUploadOpen(false);
    } catch {
      toast("Upload failed. Try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  const categories = useMemo(() => Array.from(new Set(documents.map((d) => d.category))), [documents]);
  const states = useMemo(
    () => ["All", ...Array.from(new Set(documents.map((d) => d.state)))],
    [documents],
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
  }, [query, stateFilter, categoryFilter, documents]);

  const handleUploadClick = () => setUploadOpen(true);

  const visibleCategories = categoryFilter === "All" ? categories : [categoryFilter];

  return (
    <>
      <PageHeader
        title="Documents"
        description="Forms, compliance docs, templates, and your uploads."
        action={
          <button
            type="button"
            onClick={handleUploadClick}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Upload size={15} />
            Upload Document
          </button>
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
                  className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-voro-ghost transition-all hover:pl-6 ${
                    i < docs.length - 1 ? "border-b border-voro-muted-border" : ""
                  } ${i % 2 === 1 ? "bg-voro-ghost/30" : ""}`}
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
                      type="button"
                      onClick={() => {
                        track("document_view", { id: d.id, name: d.name });
                        toast(`Opening "${d.name}" preview.`, "info");
                      }}
                      className="btn-ghost text-xs py-1.5 px-3"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        track("document_download", { id: d.id, format: d.format });
                        toast(`Downloading "${d.name}" (${d.format}). Check your downloads.`, "success");
                      }}
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
          <div className="px-5">
            <EmptyState
              icon={FileX2}
              title="No documents match your filters"
              description="Try adjusting your search, state, or category filters to find what you're looking for."
              action={
                <button
                  type="button"
                  onClick={() => { setQuery(""); setStateFilter("All"); setCategoryFilter("All"); }}
                  className="btn-ghost text-xs"
                >
                  Clear all filters
                </button>
              }
            />
          </div>
        )}
      </Card>

      <Modal
        open={uploadOpen}
        onClose={() => { setUploadOpen(false); setUploadFiles([]); }}
        title="Upload Documents"
        description="Drag files or browse to upload."
        footer={
          <>
            <button type="button" onClick={() => { setUploadOpen(false); setUploadFiles([]); }} className="btn-ghost text-sm">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUploadSubmit}
              disabled={uploading || uploadFiles.length === 0}
              className="btn-primary text-sm disabled:opacity-60 flex items-center gap-1.5"
            >
              <Upload size={14} />
              {uploading ? "Uploading…" : `Upload ${uploadFiles.length} file${uploadFiles.length !== 1 ? "s" : ""}`}
            </button>
          </>
        }
      >
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
            dragging
              ? "border-voro-purple bg-purple-50/40"
              : "border-voro-muted-border bg-voro-ghost"
          }`}
        >
          <CloudUpload size={32} className="mx-auto text-voro-purple mb-2" />
          <p className="text-sm font-semibold text-voro-jet">Drag & drop files here</p>
          <p className="text-xs text-voro-text-muted mt-1">or click below to browse</p>
          <label className="inline-block mt-3 btn-secondary text-xs cursor-pointer">
            Browse files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) setUploadFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
                e.target.value = "";
              }}
            />
          </label>
        </div>
        {uploadFiles.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            {uploadFiles.map((f, i) => (
              <div key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-xl border border-voro-muted-border px-3 py-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText size={14} className="text-voro-purple shrink-0" />
                  <span className="truncate text-voro-jet font-semibold">{f.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadFiles((prev) => prev.filter((_, idx) => idx !== i))}
                  className="text-voro-danger font-semibold hover:underline shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}
