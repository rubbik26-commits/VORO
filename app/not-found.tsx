import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-voro-ghost px-6 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="text-[88px] leading-none font-black text-transparent bg-clip-text bg-gradient-accent">
          404
        </div>
        <h1 className="text-2xl font-black text-voro-jet mt-2">Page not found</h1>
        <p className="text-sm text-voro-text-muted mt-3">
          We couldn&apos;t find that page in the VORO Portal. It may have moved or you may have
          mistyped the URL.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/dashboard" className="btn-primary text-sm flex items-center gap-1.5">
            <Home size={14} /> Back to Dashboard
          </Link>
          <Link href="/support" className="btn-ghost text-sm flex items-center gap-1.5">
            <ArrowLeft size={14} /> Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
