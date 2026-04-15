import { LucideIcon } from "lucide-react";
export default function EmptyState({
  icon: Icon, title, description, action,
}: {
  icon: LucideIcon; title: string; description: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-voro-soft-panel flex items-center justify-center mb-4">
        <Icon size={24} className="text-voro-purple" />
      </div>
      <h3 className="text-base font-bold text-voro-jet mb-1">{title}</h3>
      <p className="text-sm text-voro-text-muted max-w-xs">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
