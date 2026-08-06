/**
 * TOPCARE AI PLATFORM V2 — BREVO PROVIDER ADAPTER
 * Path: assets/js/newsletter/adapters/brevo.adapter.js
 * Architecture: Provider Adapter Pattern with Proxy Gateway Fallback
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Brevo REST API Integration Handler.
 */

import { INewsletterProvider } from '../contracts/newsletter.provider.js';

export class BrevoAdapter extends INewsletterProvider {
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
        return Boolean(this._config && (this._config.apiUrl || this._config.listId));
    }

    async subscribe(email, options = {}) {
        if (!this._initialized) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'brevo',
                originalCode: 'UNINITIALIZED',
                message: 'Brevo Adapter is not initialized.'
            };
        }

        const payload = {
            email: email,
            listIds: [Number(this._config.listId)],
            updateEnabled: true,
            attributes: {
                ...(this._config.attributes || {}),
                SOURCE: options.source || 'footer'
            },
            emailBlacklisted: false,
            smsBlacklisted: false
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        try {
            const response = await fetch(this._config.apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (response.ok || response.status === 201 || response.status === 204) {
                return {
                    success: true,
                    code: 'SUCCESS',
                    provider: 'brevo',
                    message: 'Subscribed successfully via Brevo.'
                };
            }

            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'brevo',
                originalCode: errorData.code || `HTTP_${response.status}`,
                message: errorData.message || 'Brevo API error.'
            };
        } catch (error) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'brevo',
                originalCode: 'FETCH_FAILED',
                message: error.message || 'Network error reaching Brevo.'
            };
        }
    }

    async unsubscribe(email) {
        if (!this._initialized) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'brevo',
                originalCode: 'UNINITIALIZED',
                message: 'Brevo Adapter uninitialized.'
            };
        }

        try {
            const deleteUrl = `${this._config.apiUrl}/${encodeURIComponent(email)}`;
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok || response.status === 204) {
                return {
                    success: true,
                    code: 'UNSUBSCRIBED',
                    provider: 'brevo',
                    message: 'Unsubscribed successfully.'
                };
            }

            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'brevo',
                originalCode: `HTTP_${response.status}`,
                message: 'Failed to unsubscribe contact from Brevo.'
            };
        } catch (error) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'brevo',
                originalCode: 'FETCH_FAILED',
                message: error.message || 'Network error.'
            };
        }
    }

    destroy() {
        this._config = null;
        this._initialized = false;
    }
}

export default BrevoAdapter;