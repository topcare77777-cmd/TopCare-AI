/**
 * TOPCARE AI PLATFORM V2 — SERVERLESS CENTRAL CONFIG
 * Path: api/newsletter/config.js
 * Architecture: SSOT Serverless Configuration
 * Status: APPROVED & LOCKED (BUILD 129.7)
 */

export const CONFIG = Object.freeze({
    timeoutMs: Number(process.env.GATEWAY_TIMEOUT_MS || 8000),
    maxRetries: Number(process.env.GATEWAY_MAX_RETRIES || 2),
    maxEmailLength: 254,
    allowedOrigins: Object.freeze([
        'https://top-care-ai.vercel.app',
        'https://www.topcare-ai.com',
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ]),
    allowedSources: Object.freeze(['footer', 'home', 'landing', 'popup', 'modal']),
    retryableStatusCodes: Object.freeze([408, 500, 502, 503, 504]),
    securityHeaders: Object.freeze({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'interest-cohort=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Correlation-ID',
        'Access-Control-Max-Age': '86400' // Caches CORS preflight for 24 hours
    })
});

export default CONFIG;