"use client";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import Sparkline from "@/components/ui/Sparkline";
import type { Kpi } from "@/lib/types";

// Simulated sparkline data based on trend direction
const sparkData: Record<string, number[]> = {
  up:   [3, 4, 3, 5, 4, 6, 7, 8],
  down: [8, 7, 6, 7, 5, 4, 3, 3],
  flat: [4, 5, 4, 5, 5, 4, 5, 4],
};

const accentColors: Record<string, string> = {
  up:   "border-l-voro-success",
  down: "border-l-voro-danger",
  flat: "border-l-voro-purple",
};

export default function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  return (
    <div
      className={`bg-white border border-voro-muted-border rounded-2xl shadow-soft hover:shadow-lift transition-all duration-300 p-5 flex flex-col gap-2 border-l-[3px] ${accentColors[kpi.trend]} animate-fade-in stagger-${index + 1}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-voro-text-muted">{kpi.label}</div>
        <Sparkline
          data={sparkData[kpi.trend] ?? sparkData.flat}
          trend={kpi.trend as "up" | "down" | "flat"}
          width={56}
          height={20}
        />
      </div>
      <div className="text-3xl font-black tracking-tight text-voro-jet tabular-nums">
        <AnimatedNumber value={kpi.value} />
      </div>
      <div
        className={`text-xs font-semibold ${
          kpi.trend === "up"
            ? "text-voro-success"
            : kpi.trend === "down"
            ? "text-voro-danger"
            : "text-voro-purple"
        }`}
      >
        {kpi.delta}
      </div>
    </div>
  );
}
