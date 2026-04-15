export default function Card({
  children, className = "", padding = true,
}: {
  children: React.ReactNode; className?: string; padding?: boolean;
}) {
  return (
    <div className={`bg-white border border-voro-muted-border rounded-2xl shadow-soft ${padding ? "p-5" : ""} ${className}`}>
      {children}
    </div>
  );
}
