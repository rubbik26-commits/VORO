import { academy } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import { Clock, Radio, Layers, UserCheck, Video, BookOpen } from "lucide-react";

const ti: Record<string,React.ReactNode> = {"Live Session":<Radio size={16} className="text-voro-danger"/>,"Workshop":<Layers size={16} className="text-voro-warning"/>,"Self-Paced":<UserCheck size={16} className="text-voro-success"/>,"Video":<Video size={16} className="text-voro-purple"/>,"Coaching":<BookOpen size={16} className="text-voro-purple"/>};
const tv: Record<string,any> = {"Live Session":"danger","Workshop":"warning","Self-Paced":"success","Video":"default","Coaching":"default"};

export default function AcademyPage() {
  const upcoming = academy.filter(a=>a.date&&!a.completed);
  return (
    <>
      <PageHeader title="Academy" description="Videos, live sessions, coaching, and onboarding tracks."/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{label:"Total Courses",value:academy.length.toString()},{label:"Upcoming Live",value:upcoming.length.toString()},{label:"Completed",value:academy.filter(a=>a.completed).length.toString()},{label:"Enrolled",value:academy.filter(a=>a.enrolled).length.toString()}].map(k=>(
          <Card key={k.label} className="flex flex-col gap-2"><div className="text-xs font-semibold text-voro-text-muted">{k.label}</div><div className="text-3xl font-black text-voro-jet tabular-nums">{k.value}</div></Card>
        ))}
      </div>
      {upcoming.length>0&&(
        <Card>
          <div className="section-title mb-4">Upcoming Live Sessions</div>
          <div className="flex flex-col gap-3">
            {upcoming.map(a=>(
              <div key={a.id} className="flex items-center justify-between gap-4 rounded-xl border border-voro-muted-border bg-voro-ghost px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-voro-soft-panel flex items-center justify-center shrink-0">{ti[a.type]}</div>
                  <div><div className="text-sm font-bold text-voro-jet">{a.title}</div><div className="text-xs text-voro-text-muted mt-0.5">{a.date} · {a.time} · {a.instructor}</div></div>
                </div>
                <div className="flex items-center gap-2 shrink-0"><Badge variant={tv[a.type]}>{a.type}</Badge><button className="btn-primary text-xs py-1.5 px-4">{a.enrolled?"View Details":"Enroll"}</button></div>
              </div>
            ))}
          </div>
        </Card>
      )}
      <Card>
        <div className="section-title mb-4">Course Library</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academy.map(a=>(
            <div key={a.id} className={`rounded-xl border p-4 transition-all hover:shadow-soft cursor-pointer ${a.completed?"border-green-100 bg-green-50/50":"border-voro-muted-border bg-white hover:border-voro-purple"}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">{ti[a.type]}<Badge variant={tv[a.type]}>{a.type}</Badge></div>
                {a.completed&&<Badge variant="success">Completed</Badge>}
                {a.enrolled&&!a.completed&&<Badge variant="default">Enrolled</Badge>}
              </div>
              <div className="text-base font-bold text-voro-jet">{a.title}</div>
              <p className="text-xs text-voro-text-muted mt-1 leading-relaxed">{a.description}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-voro-text-faint">
                <span className="flex items-center gap-1"><Clock size={12}/>{a.duration}</span><span>{a.instructor}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">{a.tags.map((tag: string)=><span key={tag} className="bg-voro-soft-panel text-voro-purple text-xs px-2 py-0.5 rounded-full">{tag}</span>)}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
