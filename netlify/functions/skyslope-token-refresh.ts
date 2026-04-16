/**
 * Netlify Scheduled Function — SkySlope Token Refresh
 *
 * Automatically refreshes the SKYSLOPE_ACCESS_TOKEN before it expires.
 * SkySlope access tokens expire in ~1 hour. This function runs every
 * 45 minutes via a Netlify cron schedule to keep the token fresh.
 *
 * ── Setup ─────────────────────────────────────────────────────────────────
 * This function runs automatically once deployed — no manual steps needed
 * beyond having SKYSLOPE_REFRESH_TOKEN set in:
 *   Netlify Dashboard → Your Site → Site Configuration → Environment Variables
 *
 * ── How token updates work ────────────────────────────────────────────────
 * Netlify Scheduled Functions cannot write back to environment variables
 * automatically. When a new token is received, this function logs it.
 * You have two options:
 *
 * Option A (Simple — recommended for most teams):
 *   1. This function logs the new access_token in Netlify Function logs
 *   2. Go to Netlify Dashboard → Your Site → Logs → Functions
 *   3. Copy the new SKYSLOPE_ACCESS_TOKEN value
 *   4. Update it in Netlify → Environment Variables → redeploy
 *
 * Option B (Automatic — for production at scale):
 *   Replace the console.log below with a write to your database
 *   (e.g., Supabase, PlanetScale, Upstash) and update lib/skyslope.ts
 *   to read the token from the database instead of process.env.
 * ─────────────────────────────────────────────────────────────────────────
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { refreshAccessToken } from "@/lib/skyslope";

// Runs every 45 minutes — cron syntax: min hour * * *
export const config = {
  schedule: "*/45 * * * *",
};

const handler: Handler = async (
  _event: HandlerEvent,
  _context: HandlerContext,
) => {
  const refreshToken = process.env.SKYSLOPE_REFRESH_TOKEN;

  if (!refreshToken) {
    console.warn(
      "[SkySlope Refresh] SKYSLOPE_REFRESH_TOKEN not set in Netlify Environment Variables. "
      + "Complete the OAuth flow in Settings first.",
    );
    return { statusCode: 200, body: "No refresh token configured — skipping." };
  }

  try {
    const tokens = await refreshAccessToken(refreshToken);

    console.log("[SkySlope Refresh] ✅ Token refreshed successfully.");
    console.log("  Update SKYSLOPE_ACCESS_TOKEN in Netlify Environment Variables to:");
    console.log("  SKYSLOPE_ACCESS_TOKEN =", tokens.access_token);
    console.log("  New expires_in        =", tokens.expires_in, "seconds");

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, expires_in: tokens.expires_in }),
    };
  } catch (err) {
    console.error("[SkySlope Refresh] ❌ Token refresh failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: String(err) }),
    };
  }
};

export { handler };
