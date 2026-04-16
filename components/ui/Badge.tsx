const v: Record<string,string> = {
  default: "bg-purple-50 text-purple-700 ring-purple-200/50",
  success: "bg-green-50 text-green-700 ring-green-200/50",
  warning: "bg-amber-50 text-amber-700 ring-amber-200/50",
  danger:  "bg-red-50 text-red-700 ring-red-200/50",
  purple:  "bg-purple-50 text-purple-700 ring-purple-200/50",
  pink:    "bg-pink-50 text-pink-600 ring-pink-200/50",
  neutral: "bg-gray-100 text-gray-600 ring-gray-200/50",
};
export default function Badge({
  children, variant = "default", className = "",
}: {
  children: React.ReactNode; variant?: string; className?: string;
}) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${v[variant] ?? v.default} ${className}`}>
      {children}
    </span>
  );
}
