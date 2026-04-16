"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { ShieldAlert } from "lucide-react";

function DeniedBannerInner() {
  const { toast } = useToast();
  const params = useSearchParams();
  const [dismissed, setDismissed] = useState(false);
  const denied = params?.get("denied") ?? null;

  useEffect(() => {
    if (denied) {
      toast(
        `Access to "${denied}" is restricted for your current role. Contact your broker for access.`,
        "error",
      );
    }
  }, [denied, toast]);

  if (!denied || dismissed) return null;

  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-voro-danger/30 bg-red-50/40 p-4">
      <ShieldAlert size={18} className="text-voro-danger mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-voro-jet">Module access denied</div>
        <p className="text-xs text-voro-text-muted mt-1">
          You were redirected because your role does not have access to the{" "}
          <span className="font-semibold text-voro-jet capitalize">{denied}</span> module.
          Contact your broker to request access.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-xs font-semibold text-voro-text-muted hover:text-voro-jet shrink-0"
      >
        Dismiss
      </button>
    </div>
  );
}

export default function DeniedBanner() {
  return (
    <Suspense>
      <DeniedBannerInner />
    </Suspense>
  );
}
