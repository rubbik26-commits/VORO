/**
 * SkySlope API Client
 *
 * Handles OAuth 2.0 token exchange, refresh, and all REST API calls.
 * Every function checks for SKYSLOPE_ACCESS_TOKEN in env — if absent,
 * callers fall back to mock data automatically (see lib/api/index.ts).
 *
 * Docs: https://api.skyslope.com/api/docs/redoc/index.html
 *
 * ── Netlify Environment Variables Required ────────────────────────────────
 * Set all of the following in:
 *   Netlify Dashboard → Your Site → Site Configuration → Environment Variables
 *
 *   SKYSLOPE_CLIENT_ID      — from SkySlope Developer Portal
 *   SKYSLOPE_CLIENT_SECRET  — from SkySlope Developer Portal
 *   SKYSLOPE_REDIRECT_URI   — https://YOUR-SITE.netlify.app/api/skyslope/callback
 *   SKYSLOPE_ACCESS_TOKEN   — populated after first OAuth flow
 *   SKYSLOPE_REFRESH_TOKEN  — populated after first OAuth flow
 *
 * Token refresh is handled by netlify/functions/skyslope-token-refresh.ts
 * which runs on a scheduled basis via Netlify Scheduled Functions.
 * ─────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = "https://api.skyslope.com";
const AUTH_URL = "https://accounts.skyslope.com/oauth2";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SkySlopeTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;   // seconds
  token_type: string;
};

export type SkySlopeTransaction = {
  id: string;
  fileNumber: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  clientName: string;
  transactionType: "Purchase" | "Sale" | "Lease";
  status: string;
  listPrice: number;
  salePrice: number;
  commission: number;
  closingDate: string;
  brokerReviewStatus: string;
  checklist: SkySlopeChecklistItem[];
};

export type SkySlopeChecklistItem = {
  id: string;
  name: string;
  required: boolean;
  received: boolean;
  receivedDate: string | null;
};

export type SkySlopeDocument = {
  id: string;
  name: string;
  category: string;
  state: string;
  format: string;
  uploadedAt: string;
  transactionId: string;
};

// ─── OAuth Helpers ────────────────────────────────────────────────────────────

/**
 * Step 1 — Build the SkySlope authorization URL.
 * Redirect the agent/broker to this URL to authorize VORO.
 * SKYSLOPE_CLIENT_ID and SKYSLOPE_REDIRECT_URI must be set in
 * Netlify Dashboard → Site Configuration → Environment Variables.
 */
export function getAuthorizationUrl(): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id:     process.env.SKYSLOPE_CLIENT_ID ?? "",
    redirect_uri:  process.env.SKYSLOPE_REDIRECT_URI ?? "",
    scope:         "transactions documents files",
    state:         crypto.randomUUID(), // CSRF — persist in session before redirecting
  });
  return `${AUTH_URL}/authorize?${params.toString()}`;
}

/**
 * Step 2 — Exchange the auth code for access + refresh tokens.
 * Called automatically by app/api/skyslope/callback/route.ts
 * after SkySlope redirects back to your Netlify site.
 */
export async function exchangeCodeForTokens(code: string): Promise<SkySlopeTokens> {
  const res = await fetch(`${AUTH_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "authorization_code",
      code,
      client_id:     process.env.SKYSLOPE_CLIENT_ID ?? "",
      client_secret: process.env.SKYSLOPE_CLIENT_SECRET ?? "",
      redirect_uri:  process.env.SKYSLOPE_REDIRECT_URI ?? "",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SkySlope token exchange failed: ${res.status} ${err}`);
  }
  return res.json() as Promise<SkySlopeTokens>;
}

/**
 * Step 3 — Refresh an expired access token.
 * Called automatically by netlify/functions/skyslope-token-refresh.ts
 * on a schedule. You do not need to call this manually.
 */
export async function refreshAccessToken(refreshToken: string): Promise<SkySlopeTokens> {
  const res = await fetch(`${AUTH_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: refreshToken,
      client_id:     process.env.SKYSLOPE_CLIENT_ID ?? "",
      client_secret: process.env.SKYSLOPE_CLIENT_SECRET ?? "",
    }),
  });
  if (!res.ok) {
    throw new Error(`SkySlope token refresh failed: ${res.status}`);
  }
  return res.json() as Promise<SkySlopeTokens>;
}

// ─── Internal API Fetch ───────────────────────────────────────────────────────

async function skySlopeGet<T>(path: string, accessToken?: string): Promise<T> {
  const token = accessToken ?? process.env.SKYSLOPE_ACCESS_TOKEN;
  if (!token) throw new Error("No SkySlope access token — set SKYSLOPE_ACCESS_TOKEN in Netlify Environment Variables.");

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: { revalidate: 60 }, // Next.js fetch cache — revalidate every 60s
  });

  if (res.status === 401) throw new Error("SKYSLOPE_TOKEN_EXPIRED");
  if (!res.ok) throw new Error(`SkySlope API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

// ─── Transaction Endpoints ────────────────────────────────────────────────────

export async function fetchSkySlopeTransactions(
  accessToken?: string,
): Promise<SkySlopeTransaction[]> {
  const data = await skySlopeGet<{ items: SkySlopeTransaction[] }>(
    "/api/v1/transactions?pageSize=100&pageNumber=1",
    accessToken,
  );
  return data.items ?? [];
}

export async function fetchSkySlopeTransaction(
  id: string,
  accessToken?: string,
): Promise<SkySlopeTransaction> {
  return skySlopeGet<SkySlopeTransaction>(`/api/v1/transactions/${id}`, accessToken);
}

// ─── Document Endpoints ───────────────────────────────────────────────────────

export async function fetchSkySlopeDocuments(
  accessToken?: string,
): Promise<SkySlopeDocument[]> {
  const data = await skySlopeGet<{ items: SkySlopeDocument[] }>(
    "/api/v1/documents?pageSize=100&pageNumber=1",
    accessToken,
  );
  return data.items ?? [];
}

export async function fetchSkySlopeTransactionDocuments(
  transactionId: string,
  accessToken?: string,
): Promise<SkySlopeDocument[]> {
  const data = await skySlopeGet<{ items: SkySlopeDocument[] }>(
    `/api/v1/transactions/${transactionId}/documents`,
    accessToken,
  );
  return data.items ?? [];
}

// ─── Data Mappers ─────────────────────────────────────────────────────────────

import type { Transaction, DocumentItem } from "@/lib/types";

export function mapSkySlopeTransaction(s: SkySlopeTransaction): Transaction {
  return {
    id:           s.id,
    address:      s.propertyAddress,
    city:         s.propertyCity,
    state:        s.propertyState,
    client:       s.clientName,
    side:         s.transactionType === "Sale" ? "Seller" : "Buyer",
    status:       s.status,
    listPrice:    s.listPrice,
    salePrice:    s.salePrice,
    commission:   s.commission,
    closingDate:  s.closingDate,
    brokerReview: s.brokerReviewStatus ?? "Pending",
    milestones:   s.checklist.map((c) => ({
      label:     c.name,
      completed: c.received,
      date:      c.receivedDate,
    })),
    missingDocs: s.checklist
      .filter((c) => c.required && !c.received)
      .map((c) => c.name),
  };
}

export function mapSkySlopeDocument(d: SkySlopeDocument): DocumentItem {
  return {
    id:        d.id,
    name:      d.name,
    category:  d.category,
    state:     d.state,
    format:    d.format,
    updatedAt: d.uploadedAt,
  };
}

/** Returns true when all required SkySlope env vars are present in Netlify */
export function isSkySlopeConfigured(): boolean {
  return !!(
    process.env.SKYSLOPE_CLIENT_ID &&
    process.env.SKYSLOPE_CLIENT_SECRET &&
    process.env.SKYSLOPE_ACCESS_TOKEN
  );
}
