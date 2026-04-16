/**
 * VORO Commercial — Powered by Skyline Properties
 * SVG logo matching the brand asset: purple VORO wordmark,
 * gold COMMERCIAL, gold sparkle accents, dark background strip,
 * italic serif "Powered by Skyline Properties" subtitle.
 */
export default function VoroCommercialLogo({
  width = 320,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  const h = Math.round(width * 0.28);
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 320 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VORO Commercial — Powered by Skyline Properties"
      className={className}
      role="img"
    >
      {/* Dark background */}
      <rect width="320" height="90" rx="6" fill="#0e0c14" />

      {/* Gold horizontal rule top */}
      <rect x="20" y="10" width="280" height="1" fill="url(#goldLine)" opacity="0.6" />

      {/* Sparkles — gold star glints */}
      {/* top-left */}
      <g transform="translate(18,14)">
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#f5d060" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#f5d060" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="-3" y1="-3" x2="3" y2="3" stroke="#f5d060" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="3" y1="-3" x2="-3" y2="3" stroke="#f5d060" strokeWidth="0.7" strokeLinecap="round" />
      </g>
      {/* top-right */}
      <g transform="translate(302,14)">
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#f5d060" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#f5d060" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="-3" y1="-3" x2="3" y2="3" stroke="#f5d060" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="3" y1="-3" x2="-3" y2="3" stroke="#f5d060" strokeWidth="0.7" strokeLinecap="round" />
      </g>
      {/* small sparkle mid-right */}
      <g transform="translate(285,26)">
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#f5d060" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="-3" y1="0" x2="3" y2="0" stroke="#f5d060" strokeWidth="0.9" strokeLinecap="round" />
      </g>

      {/* VORO — purple gradient wordmark */}
      <text
        x="160"
        y="46"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="900"
        fontSize="34"
        letterSpacing="6"
        fill="url(#purpleGrad)"
      >
        VORO
      </text>

      {/* COMMERCIAL — gold gradient */}
      <text
        x="160"
        y="63"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="10"
        fill="url(#goldGrad)"
      >
        COMMERCIAL
      </text>

      {/* Gold horizontal rule bottom */}
      <rect x="20" y="68" width="280" height="1" fill="url(#goldLine)" opacity="0.5" />

      {/* Powered by Skyline Properties — italic serif */}
      <text
        x="160"
        y="82"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="10"
        fill="#c9a84c"
        opacity="0.9"
      >
        Powered by Skyline Properties
      </text>

      <defs>
        <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78cef" />
          <stop offset="50%" stopColor="#7c5cbf" />
          <stop offset="100%" stopColor="#c4a8ff" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a84c" />
          <stop offset="40%" stopColor="#f5e27a" />
          <stop offset="70%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#f0d060" />
        </linearGradient>
        <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0" />
          <stop offset="30%" stopColor="#f5e27a" stopOpacity="1" />
          <stop offset="70%" stopColor="#f5e27a" stopOpacity="1" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
