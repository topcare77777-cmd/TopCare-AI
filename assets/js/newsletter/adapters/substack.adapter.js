/**
 * TOPCARE AI PLATFORM V2 — SUBSTACK PROVIDER ADAPTER
 * Path: assets/js/newsletter/adapters/substack.adapter.js
 * Architecture: Provider Adapter Pattern
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Substack Integration Adapter.
 */

import { INewsletterProvider } from '../contracts/newsletter.provider.js';

export class SubstackAdapter extends INewsletterProvider {
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
        return Boolean(this._config && this._config.embedUrl);
    }

    async subscribe(email, options = {}) {
        if (!this._initialized) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'substack',
                originalCode: 'UNINITIALIZED',
                message: 'Substack Adapter missing embedUrl.'
            };
        }

        const payload = {
            email: email,
            domain: window.location.hostname
        };

        try {
            const response = await fetch(this._config.embedUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                return {
                    success: true,
                    code: 'SUCCESS',
                    provider: 'substack',
                    message: 'Subscribed successfully via Substack.'
                };
            }

            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'substack',
                originalCode: `HTTP_${response.status}`,
                message: 'Substack endpoint returned error.'
            };
        } catch (error) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'substack',
                originalCode: 'FETCH_FAILED',
                message: error.message || 'Network request failed for Substack.'
            };
        }
    }

    async unsubscribe(email) {
        return {
            success: true,
            code: 'UNSUBSCRIBED',
            provider: 'substack',
            message: 'Unsubscribe managed directly through Substack email links.'
        };
    }

    destroy() {
        this._config = null;
        this._initialized = false;
    }
}

export default SubstackAdapter;