/**
 * TOPCARE AI PLATFORM V2 — GATEWAY ENGINE
 * Path: api/newsletter/gateway.js
 * Architecture: Resilient Fetch & Business Flow Manager
 * Status: APPROVED & LOCKED (BUILD 129.7)
 */

import crypto from 'node:crypto';
import { CONFIG } from './config.js';
import { Logger } from './logger.js';
import { providerRegistryInstance } from './providers/ProviderRegistry.js';
import { ValidationError } from './errors/ValidationError.js';
import { ProviderError } from './errors/ProviderError.js';

export function resolveCorrelationId(req) {
    const existing = req.headers['x-correlation-id'] || req.headers['x-request-id'];
    return (typeof existing === 'string' && existing.trim() !== '')
        ? existing.trim()
        : crypto.randomUUID();
}

export function applySecurityHeaders(req, res, requestId) {
    // Apply static security headers
    Object.entries(CONFIG.securityHeaders).forEach(([header, value]) => {
        res.setHeader(header, value);
    });

    // Strict Origin Whitelisting: ONLY set header if origin is explicitly allowed
    const origin = req.headers.origin;
    if (origin && CONFIG.allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Dual Tracking Headers
    res.setHeader('X-Correlation-ID', requestId);
    res.setHeader('X-Request-ID', requestId);
}

export function processEmailInput(rawEmail) {
    if (typeof rawEmail !== 'string') return null;
    const clean = rawEmail.trim().normalize('NFC').toLowerCase().replace(/[<>'"\\]/g, '');
    if (clean.length === 0 || clean.length > CONFIG.maxEmailLength) return null;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(clean) ? clean : null;
}

export function normalizeSource(rawSource) {
    if (typeof rawSource !== 'string') return 'footer';
    const clean = rawSource.trim().toLowerCase();
    return CONFIG.allowedSources.includes(clean) ? clean : 'footer';
}

async function fetchWithRetryAndTimeout(url, options, requestId) {
    let attempt = 0;
    const maxRetries = CONFIG.maxRetries;

    while (attempt <= maxRetries) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeoutMs);

        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);

            // Return immediately if OK or non-retryable status (including 429)
            if (response.ok || !CONFIG.retryableStatusCodes.includes(response.status)) {
                return response;
            }

            Logger.warn(`Fetch Retry Attempt ${attempt + 1}`, `HTTP Status: ${response.status}`, requestId);
            if (attempt >= maxRetries) return response;

        } catch (error) {
            clearTimeout(timeoutId);
            const isTimeout = error.name === 'AbortError';
            Logger.warn(`Fetch Failure Attempt ${attempt + 1}`, isTimeout ? 'Timeout' : error, requestId);
            if (attempt >= maxRetries) throw error;
        }

        attempt++;
        await new Promise((res) => setTimeout(res, 1000 * attempt));
    }

    throw new ProviderError(502, 'PROVIDER_ERROR', 'Network retry attempts exhausted.');
}

export async function executeNewsletterSubscription(email, source, providerKey, requestId) {
    const provider = providerRegistryInstance.resolve(providerKey);
    if (!provider) {
        throw new ValidationError('Provider tidak didukung.');
    }

    const envConfig = provider.validateEnvironment();

    if (providerKey === 'brevo') {
        const headers = provider.getHeaders(envConfig.apiKey);
        const payload = provider.getPayload(email, source, envConfig.listId);

        const response = await fetchWithRetryAndTimeout(envConfig.apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        }, requestId);

        if (response.ok || response.status === 201 || response.status === 204) {
            return { success: true, code: 'SUCCESS', message: 'Terima kasih! Email Anda berhasil terdaftar.' };
        }

        if (response.status === 429) {
            throw new ProviderError(429, 'RATE_LIMITED', 'Harap tunggu sebelum mencoba lagi.');
        }

        Logger.error('Brevo Non-200 Response', `HTTP Status: ${response.status}`, requestId);
        throw new ProviderError(502, 'PROVIDER_ERROR', 'Gagal memproses pendaftaran ke penyedia.');
    }

    throw new ProviderError(500, 'SERVER_ERROR', 'Provider configuration error.');
}