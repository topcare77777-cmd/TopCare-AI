/**
 * TOPCARE AI PLATFORM V2 — BREVO PROVIDER ADAPTER
 * Path: api/newsletter/providers/brevo.js
 * Status: APPROVED & LOCKED (BUILD 129.7)
 */

import { ProviderError } from '../errors/ProviderError.js';

export class BrevoProvider {
    constructor() {
        this.name = 'brevo';
    }

    validateEnvironment() {
        const apiKey = process.env.BREVO_API_KEY;
        const listId = process.env.BREVO_LIST_ID;

        if (!apiKey || apiKey.trim() === '') {
            throw new ProviderError(500, 'SERVER_ERROR', 'Missing BREVO_API_KEY environment variable.');
        }

        if (!listId || isNaN(Number(listId))) {
            throw new ProviderError(500, 'SERVER_ERROR', 'Missing or invalid BREVO_LIST_ID environment variable.');
        }

        return {
            apiKey: apiKey.trim(),
            listId: Number(listId),
            apiUrl: process.env.BREVO_API_URL || 'https://api.brevo.com/v3/contacts'
        };
    }

    getHeaders(apiKey) {
        return {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': apiKey
        };
    }

    getPayload(email, source, listId) {
        return {
            email: email,
            listIds: [listId],
            updateEnabled: true,
            emailBlacklisted: false,
            smsBlacklisted: false,
            attributes: {
                SOURCE: source,
                PLATFORM: 'TopCareAI_V2'
            }
        };
    }
}

export default BrevoProvider;