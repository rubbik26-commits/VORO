export default function ProgressBar({
  value, max = 100, label,
}: {
  value: number; max?: number; label?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs text-voro-text-muted mb-1">
          <span>{label}</span>
          <span className="font-semibold">{pct}%</span>
        </div>
      )}
      <div className="h-2.5 rounded-full bg-voro-soft-panel overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? `${pct}% complete`}
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg,#5E42BC 0%,#F982FF 100%)" }}
        />
      </div>
    </div>
  );
}
