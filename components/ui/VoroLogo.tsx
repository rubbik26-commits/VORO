/**
 * Official VORO® trademark logo.
 *
 * The mark features a stylized "V" with an origami-bird notch,
 * followed by "ORO" in rounded sans-serif, plus the ® symbol.
 * Primary brand color: #5E42BC (VORO purple).
 *
 * Props:
 *  - width:  overall SVG width (height scales proportionally)
 *  - color:  fill color (defaults to VORO purple)
 *  - mono:   if true, renders in white (for dark backgrounds)
 */
export default function VoroLogo({
  width = 100,
  color,
  mono = false,
}: {
  width?: number;
  color?: string;
  mono?: boolean;
}) {
  const fill = mono ? "#FFFFFF" : (color ?? "#5E42BC");
  // viewBox is 660x160 — height ratio = 160/660 ≈ 0.242
  const height = Math.round(width * 0.242);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 660 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VORO®"
      role="img"
      className="shrink-0"
    >
      {/* ── Stylized "V" with bird notch ────────────────────── */}
      <path
        d="M0 10 L56 10 L82 72 L60 42 L38 72 L82 150 L120 10 L134 10 L82 160 L30 160 Z"
        fill={fill}
      />
      {/* Triangular notch / beak between the V strokes */}
      <path
        d="M60 42 L82 72 L38 72 Z"
        fill={fill}
        opacity="0.92"
      />

      {/* ── "O" ─────────────────────────────────────────────── */}
      <path
        d="M175 80 C175 36 210 10 250 10 C290 10 325 36 325 80 C325 124 290 150 250 150 C210 150 175 124 175 80 Z M205 80 C205 110 224 130 250 130 C276 130 295 110 295 80 C295 50 276 30 250 30 C224 30 205 50 205 80 Z"
        fill={fill}
        fillRule="evenodd"
      />

      {/* ── "R" ─────────────────────────────────────────────── */}
      <path
        d="M340 10 L340 150 L368 150 L368 95 L400 95 L430 150 L462 150 L428 90 C445 82 455 66 455 48 C455 24 436 10 408 10 Z M368 30 L405 30 C424 30 432 38 432 50 C432 62 424 72 405 72 L368 72 Z"
        fill={fill}
      />

      {/* ── "O" ─────────────────────────────────────────────── */}
      <path
        d="M468 80 C468 36 503 10 543 10 C583 10 618 36 618 80 C618 124 583 150 543 150 C503 150 468 124 468 80 Z M498 80 C498 110 517 130 543 130 C569 130 588 110 588 80 C588 50 569 30 543 30 C517 30 498 50 498 80 Z"
        fill={fill}
        fillRule="evenodd"
      />

      {/* ── ® symbol ────────────────────────────────────────── */}
      <circle cx="640" cy="22" r="14" stroke={fill} strokeWidth="2" fill="none" />
      <path
        d="M633 16 L633 28 L636 28 L636 23 L640 23 L644 28 L647 28 L643 22.5 C645 21.5 646 20 646 18.5 C646 16 644 15 641 15 L633 15 Z M636 17 L640 17 C642.5 17 643.5 18 643.5 19.5 C643.5 21 642.5 21.5 640 21.5 L636 21.5 Z"
        fill={fill}
      />
    </svg>
  );
}
