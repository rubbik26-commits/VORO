"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

type ToastKind = "success" | "info" | "error";
type ToastItem = { id: number; message: string; kind: ToastKind };

type ToastContextValue = {
  toast: (message: string, kind?: ToastKind) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Graceful fallback so non-wrapped callers don't crash.
    return {
      toast: (m: string) => {
        if (typeof window !== "undefined") console.info("[toast]", m);
      },
    };
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-[90vw] sm:max-w-sm"
      >
        {toasts.map((t) => (
          <ToastPill key={t.id} item={t} onDismiss={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastPill({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const icon =
    item.kind === "error" ? (
      <AlertCircle size={16} className="text-voro-danger" />
    ) : item.kind === "info" ? (
      <Info size={16} className="text-voro-purple" />
    ) : (
      <CheckCircle2 size={16} className="text-voro-success" />
    );

  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-2xl bg-white border border-voro-muted-border shadow-medium px-4 py-3 transition-all duration-300 ${
        entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="text-sm font-semibold text-voro-jet flex-1 leading-snug">{item.message}</div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 text-voro-text-faint hover:text-voro-jet transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
