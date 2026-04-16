/**
 * Tiny inline SVG sparkline chart.
 * Renders a smooth polyline with an optional gradient fill beneath.
 */
export default function Sparkline({
  data,
  width = 64,
  height = 24,
  color = "#5E42BC",
  trend,
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  trend?: "up" | "down" | "flat";
}) {
  if (data.length < 2) return null;

  const resolvedColor =
    trend === "up" ? "#15A46B" : trend === "down" ? "#D84C63" : color;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padY = 2;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padY + ((max - v) / range) * (height - padY * 2);
    return `${x},${y}`;
  });

  const gradId = `spark-${resolvedColor.replace("#", "")}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={resolvedColor} stopOpacity={0.25} />
          <stop offset="100%" stopColor={resolvedColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Gradient fill area */}
      <polygon
        points={`0,${height} ${points.join(" ")} ${width},${height}`}
        fill={`url(#${gradId})`}
      />
      {/* Line */}
      <polyline
        points={points.join(" ")}
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={width}
        cy={parseFloat(points[points.length - 1].split(",")[1])}
        r={2}
        fill={resolvedColor}
      />
    </svg>
  );
}
