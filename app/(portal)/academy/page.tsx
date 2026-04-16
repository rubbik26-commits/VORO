"use client";
import { useEffect, useMemo, useState } from "react";
import { getAcademySessions } from "@/lib/api";
import type { AcademySession } from "@/lib/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { track } from "@/lib/analytics";
import { Clock, Radio, Layers, UserCheck, Video, BookOpen, Search, GraduationCap } from "lucide-react";

const ti: Record<string, React.ReactNode> = {
  "Live Session": <Radio size={16} className="text-voro-danger" />,
  Workshop: <Layers size={16} className="text-voro-warning" />,
  "Self-Paced": <UserCheck size={16} className="text-voro-success" />,
  Video: <Video size={16} className="text-voro-purple" />,
  Coaching: <BookOpen size={16} className="text-voro-purple" />,
};
const tv: Record<string, "danger" | "warning" | "success" | "default"> = {
  "Live Session": "danger",
  Workshop: "warning",
  "Self-Paced": "success",
  Video: "default",
  Coaching: "default",
};

const TYPE_OPTIONS = ["All", "Live Session", "Workshop", "Self-Paced", "Video", "Coaching"] as const;

export default function AcademyPage() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<AcademySession[]>([]);
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_OPTIONS)[number]>("All");

  useEffect(() => {
    getAcademySessions().then((data) => {
      setSessions(data);
      setEnrolledIds(new Set(data.filter((a) => a.enrolled).map((a) => a.id)));
    });
  }, []);

  const toggleEnroll = (id: string, title: string) => {
    setEnrolledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast(`Unenrolled from "${title}".`, "info");
        track("academy_unenroll", { id });
      } else {
        next.add(id);
        toast(`Enrolled in "${title}". Calendar invite queued.`, "success");
        track("academy_enroll", { id });
      }
      return next;
    });
  };

  const upcoming = useMemo(() => sessions.filter((a) => a.date && !a.completed), [sessions]);
  const enrolledCount = enrolledIds.size;
  const completedCount = useMemo(() => sessions.filter((a) => a.completed).length, [sessions]);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((a) => {
      if (typeFilter !== "All" && a.type !== typeFilter) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.instructor.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    });
  }, [query, typeFilter, sessions]);

  return (
    <>
      <PageHeader title="Academy" description="Videos, live sessions, coaching, and onboarding tracks." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Courses", value: sessions.length.toString() },
          { label: "Upcoming Live", value: upcoming.length.toString() },
          { label: "Completed", value: completedCount.toString() },
          { label: "Enrolled", value: enrolledCount.toString() },
        ].map((k) => (
          <Card key={k.label} className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-voro-text-muted">{k.label}</div>
            <div className="text-3xl font-black text-voro-jet tabular-nums">{k.value}</div>
          </Card>
        ))}
      </div>
      {upcoming.length > 0 && (
        <Card>
          <div className="section-title mb-4">Upcoming Live Sessions</div>
          <div className="flex flex-col gap-3">
            {upcoming.map((a) => {
              const enrolled = enrolledIds.has(a.id);
              return (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-voro-muted-border bg-voro-ghost px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0">
                      {ti[a.type]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-voro-jet">{a.title}</div>
                      <div className="text-xs text-voro-text-muted mt-0.5">
                        {a.date} · {a.time} · {a.instructor}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={tv[a.type]}>{a.type}</Badge>
                    <button
                      onClick={() => toggleEnroll(a.id, a.title)}
                      className={enrolled ? "btn-secondary text-xs py-1.5 px-4" : "btn-primary text-xs py-1.5 px-4"}
                    >
                      {enrolled ? "Unenroll" : "Enroll"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
      <Card>
        <div className="flex flex-wrap items-end gap-3 mb-4">
          <div className="flex-1">
            <div className="section-title">Course Library</div>
            <div className="text-xs text-voro-text-muted mt-0.5">
              Showing {filteredCourses.length} of {sessions.length} courses
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-voro-muted-border bg-voro-ghost px-3 py-2">
            <Search size={14} className="text-voro-text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="bg-transparent text-sm outline-none placeholder:text-voro-text-faint w-36"
              aria-label="Search courses"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as (typeof TYPE_OPTIONS)[number])}
            className="input !py-1.5 !w-auto"
          >
            {TYPE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCourses.length === 0 && (
            <div className="md:col-span-2">
              <EmptyState
                icon={GraduationCap}
                title="No courses match your filters"
                description="Try adjusting your search or type filter to find what you're looking for."
                action={
                  <button
                    onClick={() => { setQuery(""); setTypeFilter("All"); }}
                    className="btn-ghost text-xs"
                  >
                    Clear all filters
                  </button>
                }
              />
            </div>
          )}
          {filteredCourses.map((a) => {
            const enrolled = enrolledIds.has(a.id);
            return (
              <div
                key={a.id}
                className={`rounded-xl border p-4 transition-all hover:shadow-soft ${
                  a.completed
                    ? "border-green-100 bg-green-50/50"
                    : "border-voro-muted-border bg-white hover:border-voro-purple"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {ti[a.type]}
                    <Badge variant={tv[a.type]}>{a.type}</Badge>
                  </div>
                  {a.completed && <Badge variant="success">Completed</Badge>}
                  {enrolled && !a.completed && <Badge variant="default">Enrolled</Badge>}
                </div>
                <div className="text-base font-bold text-voro-jet">{a.title}</div>
                <p className="text-xs text-voro-text-muted mt-1 leading-relaxed">{a.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-voro-text-faint">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {a.duration}
                  </span>
                  <span>{a.instructor}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {a.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-voro-soft-panel text-voro-purple text-xs px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {!a.completed && (
                  <button
                    onClick={() => toggleEnroll(a.id, a.title)}
                    className={`mt-3 w-full text-xs ${
                      enrolled ? "btn-secondary py-1.5" : "btn-primary py-1.5"
                    }`}
                  >
                    {enrolled ? "Unenroll" : "Enroll"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
