"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  footer?: React.ReactNode;
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  footer,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Focus the dialog for screen readers.
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-voro-jet/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="voro-modal-title"
        className={`relative w-full ${sizeClasses[size]} rounded-3xl bg-white shadow-xl border border-voro-muted-border outline-none animate-[fadeIn_.18s_ease]`}
      >
        <div className="flex items-start gap-4 px-4 md:px-6 pt-5 pb-3 border-b border-voro-muted-border">
          <div className="flex-1 min-w-0">
            <div id="voro-modal-title" className="section-title">
              {title}
            </div>
            {description && <div className="section-body mt-1">{description}</div>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="shrink-0 w-8 h-8 rounded-lg text-voro-text-muted hover:text-voro-jet hover:bg-voro-ghost flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-4 md:px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>
        {footer && (
          <div className="px-4 md:px-6 py-4 border-t border-voro-muted-border flex items-center justify-end gap-2 bg-voro-ghost/60 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
