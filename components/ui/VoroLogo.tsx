export default function VoroLogo({ size = 44 }: { size?: number }) {
  return (
    <div
      style={{ width:size,height:size,borderRadius:Math.round(size*0.32),background:"linear-gradient(135deg,#5E42BC 0%,#271C4F 100%)",boxShadow:"0 8px 20px rgba(94,66,188,0.35)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}
      aria-label="VORO"
    >
      <svg width={size*0.5} height={size*0.5} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </div>
  );
}
