export default function PageHeader({
  title,
  description,
  eyebrow,
  action,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-2 animate-fade-in">
      <div>
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-voro-muted-border bg-voro-soft-panel px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-voro-purple mb-2">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl font-extrabold tracking-tight text-voro-jet leading-tight">{title}</h1>
        {description && <p className="text-sm text-voro-text-muted mt-1">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
