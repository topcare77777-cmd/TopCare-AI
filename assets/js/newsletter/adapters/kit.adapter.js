/**
 * TOPCARE AI PLATFORM V2 — KIT (CONVERTKIT) PROVIDER ADAPTER
 * Path: assets/js/newsletter/adapters/kit.adapter.js
 * Architecture: Provider Adapter Pattern
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Kit v3 API Integration Adapter.
 */

import { INewsletterProvider } from '../contracts/newsletter.provider.js';

export class KitAdapter extends INewsletterProvider {
    constructor() {
        super();
        this._config = null;
        this._initialized = false;
    }

    async initialize(config) {
        this._config = config;
        this._initialized = this.validate();
    }

    validate() {
        return Boolean(this._config && this._config.apiUrl && this._config.formId);
    }

    async subscribe(email, options = {}) {
        if (!this._initialized) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'kit',
                originalCode: 'UNINITIALIZED',
                message: 'Kit Adapter missing formId or API URL.'
            };
        }

        const endpoint = `${this._config.apiUrl}/${encodeURIComponent(this._config.formId)}/subscribe`;
        const payload = {
            email: email,
            tags: [options.source || 'footer']
        };

        if (this._config.apiKey) {
            payload.api_key = this._config.apiKey;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                return {
                    success: true,
                    code: 'SUCCESS',
                    provider: 'kit',
                    message: 'Subscribed successfully via Kit.'
                };
            }

            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'kit',
                originalCode: `HTTP_${response.status}`,
                message: 'Kit API error response.'
            };
        } catch (error) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'kit',
                originalCode: 'FETCH_FAILED',
                message: error.message || 'Network request failed for Kit.'
            };
        }
    }

    async unsubscribe(email) {
        return {
            success: true,
            code: 'UNSUBSCRIBED',
            provider: 'kit',
            message: 'Unsubscribe managed via Kit.'
        };
    }

    destroy() {
        this._config = null;
        this._initialized = false;
    }
}

export default KitAdapter;