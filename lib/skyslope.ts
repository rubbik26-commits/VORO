/**
 * SkySlope API Client
 *
 * Handles OAuth 2.0 token exchange, refresh, and all REST API calls.
 * Every function checks for SKYSLOPE_ACCESS_TOKEN in env — if absent,
 * callers fall back to mock data automatically (see lib/api/index.ts).
 *
 * Docs: https://api.skyslope.com/api/docs/redoc/index.html
 */

const BASE_URL = "https://api.skyslope.com";
const AUTH_URL = "https://accounts.skyslope.com/oauth2";

// ─── Types ───────────────────────────────────────────────────────────────────

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
 * Step 1 — Redirect URL
 * Send the agent/broker to this URL to authorize VORO to access their SkySlope account.
 */
export function getAuthorizationUrl(): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id:     process.env.SKYSLOPE_CLIENT_ID ?? "",
    redirect_uri:  process.env.SKYSLOPE_REDIRECT_URI ?? "",
    scope:         "transactions documents files",
    state:         crypto.randomUUID(), // CSRF protection — persist in session
  });
  return `${AUTH_URL}/authorize?${params.toString()}`;
}

/**
 * Step 2 — Exchange auth code for access + refresh tokens
 * Called from /api/skyslope/callback after SkySlope redirects back.
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
 * Step 3 — Refresh an expired access token
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

// ─── API Client ───────────────────────────────────────────────────────────────

async function skySlopeGet<T>(path: string, accessToken?: string): Promise<T> {
  const token = accessToken ?? process.env.SKYSLOPE_ACCESS_TOKEN;
  if (!token) throw new Error("No SkySlope access token available.");

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: { revalidate: 60 }, // cache 60s — Next.js fetch cache
  });

  if (res.status === 401) throw new Error("SKYSLOPE_TOKEN_EXPIRED");
  if (!res.ok) throw new Error(`SkySlope API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

// ─── Transaction Endpoints ────────────────────────────────────────────────────

/** Fetch all transactions for the authenticated brokerage/agent */
export async function fetchSkySlopeTransactions(
  accessToken?: string,
): Promise<SkySlopeTransaction[]> {
  // SkySlope returns paginated results — fetch first page (up to 100)
  const data = await skySlopeGet<{ items: SkySlopeTransaction[] }>(
    "/api/v1/transactions?pageSize=100&pageNumber=1",
    accessToken,
  );
  return data.items ?? [];
}

/** Fetch a single transaction with full checklist */
export async function fetchSkySlopeTransaction(
  id: string,
  accessToken?: string,
): Promise<SkySlopeTransaction> {
  return skySlopeGet<SkySlopeTransaction>(`/api/v1/transactions/${id}`, accessToken);
}

// ─── Document Endpoints ───────────────────────────────────────────────────────

/** Fetch all documents across all transactions */
export async function fetchSkySlopeDocuments(
  accessToken?: string,
): Promise<SkySlopeDocument[]> {
  const data = await skySlopeGet<{ items: SkySlopeDocument[] }>(
    "/api/v1/documents?pageSize=100&pageNumber=1",
    accessToken,
  );
  return data.items ?? [];
}

/** Fetch documents for a specific transaction */
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
// Map SkySlope shapes → VORO internal types so the rest of the app
// never needs to know which data source is active.

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
    missingDocs:  s.checklist
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

/** True when SkySlope credentials are configured in env */
export function isSkySlopeConfigured(): boolean {
  return !!(
    process.env.SKYSLOPE_CLIENT_ID &&
    process.env.SKYSLOPE_CLIENT_SECRET &&
    process.env.SKYSLOPE_ACCESS_TOKEN
  );
}
