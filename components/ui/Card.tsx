type CardVariant = "default" | "featured" | "stat" | "glass";

const variantClasses: Record<CardVariant, string> = {
  default:  "bg-white border border-voro-muted-border shadow-soft hover:shadow-lift transition-shadow duration-300",
  featured: "bg-white border border-voro-muted-border shadow-soft hover:shadow-lift transition-all duration-300 card-accent-left",
  stat:     "bg-gradient-to-br from-white to-voro-ghost border border-voro-muted-border shadow-soft hover:shadow-lift transition-all duration-300",
  glass:    "glass border border-white/60 shadow-soft hover:shadow-lift transition-all duration-300",
};

export default function Card({
  children,
  className = "",
  padding = true,
  variant = "default",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  variant?: CardVariant;
  accent?: "success" | "warning" | "danger" | "purple" | "brand-red";
}) {
  const accentClass = accent ? `accent-${accent}` : "";
  return (
    <div
      className={`rounded-2xl ${variantClasses[variant]} ${padding ? "p-5" : ""} ${accentClass} ${className}`}
    >
      {children}
    </div>
  );
}
