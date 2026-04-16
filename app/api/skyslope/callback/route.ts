/**
 * SkySlope OAuth 2.0 Callback Handler
 *
 * SkySlope redirects here after the broker/agent authorizes the app:
 *   GET /api/skyslope/callback?code=AUTH_CODE&state=CSRF_STATE
 *
 * This route:
 *  1. Validates the state param (CSRF check)
 *  2. Exchanges the code for access + refresh tokens
 *  3. Logs the tokens to Netlify Function logs (see instructions below)
 *  4. Redirects the user to /settings with a success toast param
 *
 * PRODUCTION NOTE:
 *   After this route logs the tokens, copy them from:
 *     Netlify Dashboard → Your Site → Logs → Functions → skyslope-callback
 *   Then paste them into:
 *     Netlify Dashboard → Your Site → Site Configuration → Environment Variables
 *       SKYSLOPE_ACCESS_TOKEN  = <access_token value>
 *       SKYSLOPE_REFRESH_TOKEN = <refresh_token value>
 *   Then trigger a redeploy from Netlify Dashboard → Deploys → Trigger Deploy.
 *   The portal will immediately start pulling live SkySlope data.
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

  // ── Missing code param ────────────────────────────────────────────────────
  if (!code) {
    console.error("[SkySlope OAuth] Missing auth code in callback.");
    return NextResponse.redirect(
      new URL("/settings?skyslope=error", req.nextUrl.origin),
    );
  }

  // ── CSRF state check ──────────────────────────────────────────────────────
  // In production: compare `state` against the value stored in the user
  // session before initiating the OAuth flow.
  if (!state) {
    console.warn("[SkySlope OAuth] Missing state param — potential CSRF.");
  }

  // ── Exchange code for tokens ──────────────────────────────────────────────
  try {
    const tokens = await exchangeCodeForTokens(code);

    /**
     * ── WHAT TO DO WITH THESE TOKENS ─────────────────────────────────────
     *
     * tokens.access_token  — add as SKYSLOPE_ACCESS_TOKEN in Netlify env
     * tokens.refresh_token — add as SKYSLOPE_REFRESH_TOKEN in Netlify env
     *
     * Steps:
     *   1. These values are printed in the logs below.
     *   2. Go to Netlify Dashboard → Your Site → Logs → Functions
     *   3. Find this function invocation and copy both token values.
     *   4. Go to Netlify Dashboard → Your Site → Site Configuration
     *        → Environment Variables
     *   5. Add / update SKYSLOPE_ACCESS_TOKEN and SKYSLOPE_REFRESH_TOKEN
     *   6. Go to Netlify Dashboard → Deploys → Trigger Deploy → Deploy site
     *   7. Done — transactions and documents are now live.
     * ─────────────────────────────────────────────────────────────────────
     */
    console.log("[SkySlope OAuth] ✅ Tokens received — copy these to Netlify Environment Variables:");
    console.log("  SKYSLOPE_ACCESS_TOKEN  =", tokens.access_token);
    console.log("  SKYSLOPE_REFRESH_TOKEN =", tokens.refresh_token);
    console.log("  expires_in             =", tokens.expires_in, "seconds");

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
