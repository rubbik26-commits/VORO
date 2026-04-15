export default function PageHeader({
  title, description, action,
}: {
  title: string; description?: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-2">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-voro-jet leading-tight">{title}</h1>
        {description && <p className="text-sm text-voro-text-muted mt-1">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
