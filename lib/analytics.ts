/**
 * Analytics stub — safe to call from client or server.
 * Swap the body of each function with Segment/Amplitude/PostHog/etc. later.
 */
type Props = Record<string, unknown>;

const isDebug =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

function log(label: string, payload: Props) {
  if (isDebug && typeof console !== "undefined") {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${label}`, payload);
  }
}

export function track(event: string, props: Props = {}) {
  log(`track:${event}`, props);
}

export function identify(userId: string, traits: Props = {}) {
  log("identify", { userId, ...traits });
}

export function page(name: string, props: Props = {}) {
  log(`page:${name}`, props);
}
