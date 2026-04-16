"use client";
import { useEffect } from "react";
import Card from "@/components/ui/Card";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to analytics / error service in production
    console.error("[portal error]", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6">
      <Card className="max-w-lg w-full text-center py-10">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} className="text-voro-danger" />
        </div>
        <h2 className="text-xl font-black text-voro-jet mb-2">Something went wrong</h2>
        <p className="text-sm text-voro-text-muted mb-6 max-w-sm mx-auto">
          An unexpected error occurred while loading this page. Try again or return to the dashboard.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="btn-primary text-sm flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Try Again
          </button>
          <Link href="/dashboard" className="btn-ghost text-sm flex items-center gap-1.5">
            <Home size={14} /> Back to Dashboard
          </Link>
        </div>
        {error.digest && (
          <p className="text-xs text-voro-text-faint mt-4">Error ID: {error.digest}</p>
        )}
      </Card>
    </div>
  );
}
