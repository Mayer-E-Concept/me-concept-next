import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Distributed rate limiting via Upstash Redis when configured (UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN env vars). On serverless (Vercel) each Lambda instance otherwise
// gets its own in-memory counter, so a spammer hitting different instances was never
// actually throttled — Redis gives one shared counter across all instances.
// Falls back to the old in-memory Map (single-instance only) when Upstash isn't configured,
// so local dev and not-yet-provisioned deployments keep working.
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const distributedLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      prefix: "me-concept-ratelimit",
    })
  : null;

const memoryStore = new Map<string, { count: number; reset: number }>();

function memoryRateLimit(ip: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = memoryStore.get(ip);
  if (!entry || now > entry.reset) {
    memoryStore.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export async function rateLimit(ip: string): Promise<boolean> {
  if (distributedLimiter) {
    const { success } = await distributedLimiter.limit(ip);
    return success;
  }
  return memoryRateLimit(ip);
}
