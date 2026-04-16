import { NextResponse, type NextRequest } from "next/server";

/**
 * Route gating for optional modules. Gating is OFF by default so local dev
 * works without configuration. Set NEXT_PUBLIC_ROLE_GATING_ENABLED=true and
 * optionally NEXT_PUBLIC_DEV_ROLES to simulate restricted roles.
 *
 * When gating is enabled and the current roles don't match, the request is
 * redirected to /dashboard with a ?denied=<module> query string that the
 * portal can surface as a toast.
 */
const MODULE_ROLE_MAP: Record<string, string[]> = {
  "/commercial": ["agent", "team_lead", "commercial_advisor", "broker", "admin"],
  "/recruiting": ["team_lead", "broker", "admin"],
  "/revenue-share": ["team_lead", "broker", "admin"],
  "/teams": ["agent", "team_lead", "broker", "admin"],
};

function currentRoles(): string[] {
  const raw = process.env.NEXT_PUBLIC_DEV_ROLES;
  if (!raw) return ["agent", "team_lead"];
  return raw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);
}

export function middleware(req: NextRequest) {
  const gating = process.env.NEXT_PUBLIC_ROLE_GATING_ENABLED === "true";
  if (!gating) return NextResponse.next();

  const { pathname } = req.nextUrl;
  const matchedPrefix = Object.keys(MODULE_ROLE_MAP).find((p) =>
    pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!matchedPrefix) return NextResponse.next();

  const allowed = MODULE_ROLE_MAP[matchedPrefix];
  const roles = currentRoles();
  const ok = roles.some((r) => allowed.includes(r));
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/dashboard";
  url.searchParams.set("denied", matchedPrefix.replace(/^\//, ""));
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/commercial/:path*",
    "/recruiting/:path*",
    "/revenue-share/:path*",
    "/teams/:path*",
  ],
};
