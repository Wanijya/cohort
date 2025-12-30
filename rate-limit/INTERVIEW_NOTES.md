# Express Rate Limiting — Interview Notes

## Quick Summary

Rate limiting controls how many requests a client (IP, user, API key) can make within a time window. It's used to protect services from abuse, reduce load spikes, enforce fair usage, and mitigate denial-of-service attacks.

## Why it matters
- Protects backend resources and third-party APIs.
- Prevents brute-force and scraping.
- Ensures fair resource allocation across users.

## Common algorithms & trade-offs

- Fixed Window: count requests per fixed interval (e.g., per minute). Simple, but prone to bursts at window edges.
- Sliding Window Log: store timestamps per request for exact limits. Accurate but storage-heavy.
- Sliding Window Counter: approximate sliding behavior with multiple subwindows. Trade-off between accuracy and storage.
- Token Bucket: tokens added at a rate; each request consumes a token. Allows bursts up to bucket size.
- Leaky Bucket: fixed processing rate; excess requests are queued/dropped. Smooths bursts.

Choose based on accuracy, memory/storage, burst tolerance, and distributed requirements.

## Local vs Distributed rate limiting

- Local (in-memory): easy to implement with low latency, but not suitable for multi-instance deployments.
- Distributed (Redis, Memcached, database): required for horizontal scaling and consistent limits across instances.

## Express implementations — brief examples

1) Basic: `express-rate-limit` (suitable for single-instance or behind a shared Redis store with custom store)

```js
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
})
app.use(limiter)
```

Notes: simple and quick to add; internal store is memory by default — not shared between instances.

2) Production-ready: `rate-limiter-flexible` with Redis (supports token bucket, sliding windows, and penalty & block strategies)

```js
const { RateLimiterRedis } = require('rate-limiter-flexible')
const redis = require('redis')
const client = redis.createClient({ url: process.env.REDIS_URL })

const opts = {
  storeClient: client,
  points: 10, // 10 requests
  duration: 1, // per second
  blockDuration: 60, // block for 60 sec if consumed
}
const rateLimiter = new RateLimiterRedis(opts)

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip)
    next()
  } catch (rejRes) {
    res.set('Retry-After', String(Math.round(rejRes.msBeforeNext / 1000)))
    res.status(429).send('Too Many Requests')
  }
})
```

Notes: scalable, configurable, supports penalties and distributed counters.

## Best practices

- Identify the correct key: IP for anonymous, user ID or API key for authenticated users.
- Use Redis (or equivalent) for multi-instance deployments.
- Different limits per endpoint (e.g., login endpoints stricter than public read endpoints).
- Return standard headers: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` (or `Retry-After`).
- Provide meaningful responses and monitor metrics for false positives.
- Offer graceful degradation and retry guidance to clients.

## Security & operational considerations

- Protect Redis with authentication and VPC rules.
- Watch for clock skew when using timestamps in distributed systems.
- Avoid storing per-request logs for high-traffic endpoints; use counters or approximations.
- Consider whitelisting trusted IPs (internal services) or applying different policies.

## Common pitfalls

- Relying on in-memory stores for production multi-instance deployments.
- Blocking legitimate users due to coarse keys (e.g., many users behind NAT share an IP).
- Not accounting for proxies or correct `X-Forwarded-For` handling.
- Making limits too strict without a backoff or appeal path.

## Observability

- Emit metrics: allowed, blocked, consumed points, latency of limiter operations.
- Alert on sudden spikes in 429s.

## Interview Q&A (concise answers)

- Q: What is rate limiting? A: A mechanism to cap requests per client over time to protect resources.
- Q: Fixed window vs sliding window? A: Fixed window groups requests into intervals; sliding window smooths counts across time for accuracy.
- Q: When use Token Bucket? A: When you want to allow bursts but enforce an average rate.
- Q: How to handle multiple app instances? A: Use a shared store (Redis) or an API Gateway that enforces limits centrally.
- Q: How do you handle authenticated vs unauthenticated limits? A: Use user ID/API key for authenticated; fallback to IP for unauthenticated; apply different limits.
- Q: How to avoid false positives from NAT or proxies? A: Use a more accurate key (api key or auth token), or higher limits for shared IP ranges.

## Example interview talking points (short)

- Show understanding of algorithms (trade-offs) and when to use each.
- Explain how to make a solution horizontally scalable (Redis, consistent hashing, central gateway).
- Discuss user experience: headers, Retry-After, backoff recommendations.
- Mention testing: simulate burst traffic, multi-instance integration tests, observe 429 rates.

## Quick checklist to implement in a real app

1. Choose the key (IP/user/API key).
2. Pick an algorithm based on burst tolerance and accuracy needs.
3. Use Redis for distributed counters.
4. Add middleware early in request pipeline.
5. Return standard headers and `429` on limit exceeded.
6. Monitor, log, and tune thresholds.

---

If you want, I can also:
- Add a small runnable example app demonstrating Redis-backed limiting.
- Provide sample load-test commands (wrk/hey) to validate behavior.
