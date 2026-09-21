/**
 * Sliding-window rate limiter for the contact form.
 *
 * Deliberately in-memory: this site runs on one small Vercel deployment and
 * the form already sits behind a honeypot and Turnstile, so a Redis
 * round-trip would cost more than it buys. The trade-off is that the counter
 * lives per serverless instance, so a determined flood spread over many cold
 * starts gets a few extra attempts. Swap `takeToken` for an Upstash-backed
 * version if that ever stops being good enough.
 */

export const WINDOW_MS = 10 * 60 * 1000;
export const MAX_ATTEMPTS = 5;

const attempts = new Map<string, number[]>();

export type RateLimitResult = {
  allowed: boolean;
  /** How long until the oldest attempt drops out of the window. */
  retryAfterMs: number;
};

/** Drops keys whose attempts have all expired, so the map cannot grow forever. */
function prune(now: number): void {
  for (const [key, times] of attempts) {
    const fresh = times.filter((t) => now - t < WINDOW_MS);
    if (fresh.length) attempts.set(key, fresh);
    else attempts.delete(key);
  }
}

export function takeToken(key: string, now: number = Date.now()): RateLimitResult {
  prune(now);

  const times = attempts.get(key) ?? [];

  if (times.length >= MAX_ATTEMPTS) {
    const oldest = times[0];
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - oldest) };
  }

  times.push(now);
  attempts.set(key, times);
  return { allowed: true, retryAfterMs: 0 };
}

/** Test seam. */
export function resetRateLimit(): void {
  attempts.clear();
}

/** Test seam: how many visitors are currently tracked. */
export function rateLimitSize(): number {
  return attempts.size;
}
