/**
 * TOPCARE AI PLATFORM V2 — SUBSCRIBE ROUTE HANDLER
 * Path: api/newsletter/subscribe.js
 * Runtime: Vercel Serverless Function (Node.js 18+ / ES Modules)
 * Status: APPROVED & LOCKED (BUILD 129.7 — GOLDEN BASELINE)
 */

import {
    resolveCorrelationId,
    applySecurityHeaders,
    processEmailInput,
    normalizeSource,
    executeNewsletterSubscription
} from '../../server/newsletter/gateway.js';

import { Logger } from '../../server/newsletter/logger.js';
import { GatewayError } from '../../server/newsletter/errors/GatewayError.js';
import { ValidationError } from '../../server/newsletter/errors/ValidationError.js';

export default async function handler(req, res) {
    const requestId = resolveCorrelationId(req);

    // 1. CORS Preflight
    if (req.method === 'OPTIONS') {
        applySecurityHeaders(req, res, requestId);
        return res.status(204).end();
    }

    applySecurityHeaders(req, res, requestId);

    // 2. Guard Method
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            code: 'METHOD_NOT_ALLOWED'
        });
    }

    // 3. Guard Content-Type
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
        return res.status(415).json({
            success: false,
            code: 'UNSUPPORTED_MEDIA_TYPE'
        });
    }

    // 4. Safely Parse Payload
    let body = {};
    try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    } catch (parseErr) {
        Logger.error('JSON Parse Exception', parseErr, requestId);
        return res.status(400).json({
            success: false,
            code: 'INVALID_EMAIL',
            message: 'Format payload tidak valid.'
        });
    }

    // 5. Input Validation
    const email = processEmailInput(body.email);
    if (!email) {
        return res.status(400).json({
            success: false,
            code: 'INVALID_EMAIL',
            message: 'Format email tidak valid.'
        });
    }

    const source = normalizeSource(body.source);
    const providerKey = (body.provider || 'brevo').toLowerCase();

    // 6. Execute Business Logic
    try {
        const result = await executeNewsletterSubscription(email, source, providerKey, requestId);
        return res.status(200).json(result);

    } catch (error) {
        if (error instanceof GatewayError) {
            return res.status(error.statusCode).json({
                success: false,
                code: error.code,
                message: error.message
            });
        }

        Logger.error('Unhandled Gateway Exception', error, requestId);
        return res.status(500).json({
            success: false,
            code: 'SERVER_ERROR',
            message: 'Terjadi kesalahan sistem.'
        });
    }
}