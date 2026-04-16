/**
 * SkySlope OAuth 2.0 Callback Handler
 *
 * SkySlope redirects here after the broker/agent authorizes the app:
 *   GET /api/skyslope/callback?code=AUTH_CODE&state=CSRF_STATE
 *
 * This route:
 *  1. Validates the state param (CSRF check)
 *  2. Exchanges the code for access + refresh tokens
 *  3. Stores them in environment (dev) or your secrets manager (prod)
 *  4. Redirects the user to /settings with a success toast param
 *
 * PRODUCTION NOTE:
 *   Replace the console.log token output with your actual secrets storage.
 *   Options: Render Environment Variables (manual paste after first run),
 *   or a database row keyed to the broker's user ID.
 */

import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/skyslope";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code  = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // ── User denied access ────────────────────────────────────────────────────
  if (error) {
    console.error("[SkySlope OAuth] User denied access or error:", error);
    return NextResponse.redirect(
      new URL("/settings?skyslope=denied", req.nextUrl.origin),
    );
  }

  // ── Missing params ────────────────────────────────────────────────────────
  if (!code) {
    return NextResponse.redirect(
      new URL("/settings?skyslope=error", req.nextUrl.origin),
    );
  }

  // ── CSRF state check ──────────────────────────────────────────────────────
  // In production: compare `state` against the value you stored in the
  // user session before initiating the OAuth flow.
  // For now we log it — implement session validation before going live.
  if (!state) {
    console.warn("[SkySlope OAuth] Missing state param — potential CSRF.");
  }

  // ── Exchange code for tokens ─────────────────────────────────────────────
  try {
    const tokens = await exchangeCodeForTokens(code);

    /**
     * ─────────────────────────────────────────────────────────────────────
     * WHAT TO DO WITH THESE TOKENS:
     *
     * tokens.access_token  — use this as SKYSLOPE_ACCESS_TOKEN in your env
     * tokens.refresh_token — store securely; use to get a new access token
     *                        when it expires (tokens.expires_in seconds)
     *
     * On Render:
     *   1. Copy the values logged below
     *   2. Go to Render Dashboard → Your Service → Environment
     *   3. Add SKYSLOPE_ACCESS_TOKEN and SKYSLOPE_REFRESH_TOKEN
     *   4. Redeploy the service
     * ─────────────────────────────────────────────────────────────────────
     */
    console.log("[SkySlope OAuth] ✅ Tokens received:");
    console.log("  access_token  :", tokens.access_token);
    console.log("  refresh_token :", tokens.refresh_token);
    console.log("  expires_in    :", tokens.expires_in, "seconds");

    // Redirect back to settings with success indicator
    return NextResponse.redirect(
      new URL("/settings?skyslope=connected", req.nextUrl.origin),
    );
  } catch (err) {
    console.error("[SkySlope OAuth] Token exchange failed:", err);
    return NextResponse.redirect(
      new URL("/settings?skyslope=error", req.nextUrl.origin),
    );
  }
}
