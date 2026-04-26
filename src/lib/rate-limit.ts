// Simple in-memory rate limiter for admin API routes
// In production, use Redis or a dedicated rate limiting service

const rateLimits = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per window

export function rateLimit(identifier: string): { success: boolean; resetTime?: number } {
  const now = Date.now();
  const existing = rateLimits.get(identifier);

  if (!existing || now > existing.resetTime) {
    // Create or reset the rate limit
    rateLimits.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { success: true };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { success: false, resetTime: existing.resetTime };
  }

  existing.count++;
  return { success: true };
}

export function getRateLimitHeaders(identifier: string) {
  const data = rateLimits.get(identifier);
  if (!data) {
    return {
      "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
      "X-RateLimit-Remaining": RATE_LIMIT_MAX_REQUESTS.toString(),
      "X-RateLimit-Reset": (Date.now() + RATE_LIMIT_WINDOW).toString(),
    };
  }

  return {
    "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
    "X-RateLimit-Remaining": (RATE_LIMIT_MAX_REQUESTS - data.count).toString(),
    "X-RateLimit-Reset": data.resetTime.toString(),
  };
}
