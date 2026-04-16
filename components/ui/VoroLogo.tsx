export default function VoroLogo({ size = 44 }: { size?: number }) {
  const fontSize = Math.round(size * 0.36);
  const lineOpacity = 0.3;
  const lineWidth = Math.max(1, Math.round(size * 0.02));
  const lineHeight = Math.round(size * 0.4);
  const lineY = Math.round(size * 0.3);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.32),
        background: "linear-gradient(135deg, #5E42BC 0%, #271C4F 100%)",
        boxShadow: "0 8px 20px rgba(94,66,188,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative" as const,
      }}
      aria-label="VORO"
    >
      <svg
        width={Math.round(size * 0.72)}
        height={Math.round(size * 0.5)}
        viewBox="0 0 72 28"
        fill="none"
        aria-hidden="true"
      >
        {/* VORO wordmark */}
        <text
          x="36"
          y="20"
          textAnchor="middle"
          fill="white"
          fontFamily="'Montserrat', 'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="20"
          letterSpacing="3"
        >
          VORO
        </text>
        {/* Decorative lines between letters at 30% opacity per brand guidelines */}
        <line x1="20" y1="6" x2="20" y2="22" stroke="white" strokeWidth="1" opacity="0.3" />
        <line x1="36" y1="6" x2="36" y2="22" stroke="white" strokeWidth="1" opacity="0.3" />
        <line x1="52" y1="6" x2="52" y2="22" stroke="white" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}
