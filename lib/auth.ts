/**
 * Lightweight auth + role utilities.
 *
 * The portal doesn't currently have a real auth provider wired in — this
 * module stands in for one. When a real session (NextAuth, Clerk, Supabase,
 * etc.) is added later, replace the bodies of `getCurrentAgent` and
 * `getCurrentRoles` and every call site will Just Work.
 *
 * Role overrides (useful for dev + QA) can be driven from the
 * `NEXT_PUBLIC_DEV_ROLES` env var as a comma-separated list, e.g.
 *   NEXT_PUBLIC_DEV_ROLES=agent,team_lead,commercial_advisor
 */
import { agent as mockAgent } from "@/data/mock-data";
import type { Agent, ModuleKey, Role } from "@/lib/types";

const DEFAULT_ROLES: Role[] = ["agent", "team_lead"];

export function getCurrentAgent(): Agent {
  return mockAgent;
}

export function getCurrentRoles(): Role[] {
  const raw = process.env.NEXT_PUBLIC_DEV_ROLES;
  if (!raw) return DEFAULT_ROLES;
  const parsed = raw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean) as Role[];
  return parsed.length ? parsed : DEFAULT_ROLES;
}

const MODULE_ROLE_MAP: Record<ModuleKey, Role[]> = {
  commercial: ["agent", "team_lead", "commercial_advisor", "broker", "admin"],
  recruiting: ["team_lead", "broker", "admin"],
  revenue_share: ["team_lead", "broker", "admin"],
  teams: ["agent", "team_lead", "broker", "admin"],
};

export function canAccess(moduleKey: ModuleKey, roles: Role[] = getCurrentRoles()): boolean {
  if (!isRoleGatingEnabled()) return true;
  const allowed = MODULE_ROLE_MAP[moduleKey] ?? [];
  return roles.some((r) => allowed.includes(r));
}

export function isRoleGatingEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ROLE_GATING_ENABLED === "true";
}

export function hasRole(role: Role, roles: Role[] = getCurrentRoles()): boolean {
  return roles.includes(role);
}
