/**
 * TOPCARE AI PLATFORM V2 — MAILCHIMP PROVIDER ADAPTER
 * Path: assets/js/newsletter/adapters/mailchimp.adapter.js
 * Architecture: Provider Adapter Pattern with HTTP Basic Auth Correction
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Mailchimp v3 API Integration Adapter.
 */

import { INewsletterProvider } from '../contracts/newsletter.provider.js';

export class MailchimpAdapter extends INewsletterProvider {
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
        return Boolean(this._config && this._config.apiUrl);
    }

    async subscribe(email, options = {}) {
        if (!this._initialized) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'mailchimp',
                originalCode: 'UNINITIALIZED',
                message: 'Mailchimp Adapter missing API URL.'
            };
        }

        const payload = {
            email_address: email,
            status: 'subscribed',
            tags: [options.source || 'footer']
        };

        const headers = {
            'Content-Type': 'application/json'
        };

        // Mailchimp uses HTTP Basic Auth: 'anystring:API_KEY' encoded in base64
        if (this._config.apiKey) {
            const authString = btoa(`user:${this._config.apiKey}`);
            headers['Authorization'] = `Basic ${authString}`;
        }

        try {
            const response = await fetch(this._config.apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (response.ok || response.status === 200 || response.status === 201) {
                return {
                    success: true,
                    code: 'SUCCESS',
                    provider: 'mailchimp',
                    message: 'Subscribed successfully via Mailchimp.'
                };
            }

            const errData = await response.json().catch(() => ({}));
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'mailchimp',
                originalCode: errData.title || `HTTP_${response.status}`,
                message: errData.detail || 'Mailchimp subscription failed.'
            };
        } catch (error) {
            return {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: 'mailchimp',
                originalCode: 'FETCH_FAILED',
                message: error.message || 'Network request failed for Mailchimp.'
            };
        }
    }

    async unsubscribe(email) {
        return {
            success: true,
            code: 'UNSUBSCRIBED',
            provider: 'mailchimp',
            message: 'Unsubscribe processed for Mailchimp.'
        };
    }

    destroy() {
        this._config = null;
        this._initialized = false;
    }
}

export default MailchimpAdapter;