"use client";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

const stats = [
  { label: "Total sales volume",    value: "$10B+" },
  { label: "Commissions paid",      value: "$250M+" },
  { label: "Agents",                value: "1,000+" },
  { label: "Transactions closed",   value: "50,000+" },
];

export default function VoroStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`rounded-xl bg-voro-ghost p-3 animate-fade-in stagger-${i + 1}`}
        >
          <div className="text-voro-text-muted">{s.label}</div>
          <div className="text-lg font-black text-voro-jet tabular-nums">
            <AnimatedNumber value={s.value} duration={1200} />
          </div>
        </div>
      ))}
    </div>
  );
}
