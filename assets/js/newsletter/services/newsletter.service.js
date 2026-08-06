/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER SERVICE
 * Path: assets/js/newsletter/services/newsletter.service.js
 * Architecture: Clean Architecture Business Logic Layer
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Validation, Rate Limits, Session Persistence, Proxy Routing & Retries.
 */

import { NEWSLETTER_CONFIG } from '../config/newsletter.config.js';
import { providerRegistryInstance } from '../registry/provider.registry.js';
import { BrevoAdapter } from '../adapters/brevo.adapter.js';
import { MailchimpAdapter } from '../adapters/mailchimp.adapter.js';
import { KitAdapter } from '../adapters/kit.adapter.js';
import { SubstackAdapter } from '../adapters/substack.adapter.js';

export class NewsletterService {
    constructor() {
        this._activeProvider = null;
        this._isSubmitting = false;
        this._initialized = false;
        this._registerBuiltInAdapters();
    }

    _registerBuiltInAdapters() {
        if (!providerRegistryInstance.has('brevo')) {
            providerRegistryInstance.register('brevo', BrevoAdapter);
            providerRegistryInstance.register('mailchimp', MailchimpAdapter);
            providerRegistryInstance.register('kit', KitAdapter);
            providerRegistryInstance.register('substack', SubstackAdapter);
        }
    }

    async initialize(customConfig = null) {
        if (this._initialized) return;

        const config = customConfig || NEWSLETTER_CONFIG;
        const providerKey = config.activeProvider;

        if (providerRegistryInstance.has(providerKey)) {
            this._activeProvider = providerRegistryInstance.resolve(providerKey);
            const providerConfig = config.providers[providerKey] || {};
            await this._activeProvider.initialize(providerConfig);
        }

        this._initialized = true;
    }

    validateEmail(rawEmail) {
        if (!rawEmail || typeof rawEmail !== 'string') return false;
        const clean = rawEmail.trim().normalize('NFC').toLowerCase();
        if (clean.length === 0 || clean.length > NEWSLETTER_CONFIG.maxEmailLength) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(clean);
    }

    sanitizeEmail(rawEmail) {
        if (!rawEmail) return '';
        return rawEmail.trim().normalize('NFC').toLowerCase().replace(/[<>'"\\]/g, '');
    }

    _isRateLimited() {
        try {
            const last = sessionStorage.getItem(NEWSLETTER_CONFIG.storageKeys.LAST_SUBMIT);
            if (!last) return false;
            return (Date.now() - Number(last)) < NEWSLETTER_CONFIG.rateLimitMs;
        } catch (e) {
            return false;
        }
    }

    _updateRateLimitTimestamp() {
        try {
            sessionStorage.setItem(NEWSLETTER_CONFIG.storageKeys.LAST_SUBMIT, String(Date.now()));
        } catch (e) { }
    }

    _isEmailCached(email) {
        try {
            const cached = JSON.parse(sessionStorage.getItem(NEWSLETTER_CONFIG.storageKeys.CACHE_EMAILS) || '[]');
            return Array.isArray(cached) && cached.includes(email);
        } catch (e) {
            return false;
        }
    }

    _cacheEmail(email) {
        try {
            const cached = JSON.parse(sessionStorage.getItem(NEWSLETTER_CONFIG.storageKeys.CACHE_EMAILS) || '[]');
            if (!cached.includes(email)) {
                cached.push(email);
                sessionStorage.setItem(NEWSLETTER_CONFIG.storageKeys.CACHE_EMAILS, JSON.stringify(cached));
            }
        } catch (e) { }
    }

    _dispatchPlatformEvent(eventName, detail) {
        try {
            const customEvent = new CustomEvent(eventName, { detail, bubbles: true });
            window.dispatchEvent(customEvent);
        } catch (e) { }
    }

    async _fetchWithTimeoutAndRetry(url, options, retries = NEWSLETTER_CONFIG.maxRetries) {
        let attempt = 0;
        while (attempt <= retries) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), NEWSLETTER_CONFIG.timeoutMs);

            try {
                const response = await fetch(url, { ...options, signal: controller.signal });
                clearTimeout(timeoutId);
                return response;
            } catch (error) {
                clearTimeout(timeoutId);
                if (attempt >= retries || error.name === 'AbortError') {
                    throw error;
                }
                attempt++;
                await new Promise(res => setTimeout(res, 1000 * attempt));
            }
        }
    }

    async subscribe(rawEmail, source = NEWSLETTER_CONFIG.sources.FOOTER) {
        if (!this._initialized) await this.initialize();

        const email = this.sanitizeEmail(rawEmail);

        if (this._isSubmitting) {
            return { success: false, code: 'DUPLICATE_SUBMIT', message: NEWSLETTER_CONFIG.messages.DUPLICATE_SUBMIT };
        }

        if (this._isRateLimited()) {
            return { success: false, code: 'RATE_LIMITED', message: NEWSLETTER_CONFIG.messages.RATE_LIMITED };
        }

        if (!this.validateEmail(email)) {
            return { success: false, code: 'INVALID_EMAIL', message: NEWSLETTER_CONFIG.messages.INVALID_EMAIL };
        }

        if (this._isEmailCached(email)) {
            return { success: false, code: 'DUPLICATE_SUBMIT', message: NEWSLETTER_CONFIG.messages.DUPLICATE_SUBMIT };
        }

        this._isSubmitting = true;
        this._dispatchPlatformEvent('newsletter:subscribe:start', { email, source });

        try {
            let result;

            // Proxy Gateway Routing vs Direct Adapter Routing
            if (NEWSLETTER_CONFIG.useProxyGateway && NEWSLETTER_CONFIG.proxyEndpoint) {
                const response = await this._fetchWithTimeoutAndRetry(NEWSLETTER_CONFIG.proxyEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        source: source,
                        provider: NEWSLETTER_CONFIG.activeProvider
                    })
                });

                if (response.ok) {
                    result = { success: true, code: 'SUCCESS', message: NEWSLETTER_CONFIG.messages.SUCCESS };
                } else {
                    const errData = await response.json().catch(() => ({}));
                    result = {
                        success: false,
                        code: 'PROVIDER_ERROR',
                        provider: NEWSLETTER_CONFIG.activeProvider,
                        originalCode: errData.code || `HTTP_${response.status}`,
                        message: errData.message || NEWSLETTER_CONFIG.messages.SERVER_ERROR
                    };
                }
            } else {
                if (!this._activeProvider || !this._activeProvider.validate()) {
                    result = { success: false, code: 'CONFIG_ERROR', message: NEWSLETTER_CONFIG.messages.CONFIG_ERROR };
                } else {
                    result = await this._activeProvider.subscribe(email, { source });
                }
            }

            this._isSubmitting = false;

            if (result.success) {
                this._updateRateLimitTimestamp();
                this._cacheEmail(email);
                this._dispatchPlatformEvent('newsletter:subscribe:success', { email, source, result });
                return { success: true, code: 'SUCCESS', message: NEWSLETTER_CONFIG.messages.SUCCESS };
            } else {
                this._dispatchPlatformEvent('newsletter:subscribe:error', { email, source, result });
                return result;
            }
        } catch (error) {
            this._isSubmitting = false;
            const errorResult = {
                success: false,
                code: 'PROVIDER_ERROR',
                provider: NEWSLETTER_CONFIG.activeProvider,
                originalCode: error.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR',
                message: NEWSLETTER_CONFIG.messages.NETWORK_ERROR
            };
            this._dispatchPlatformEvent('newsletter:subscribe:error', { email, source, result: errorResult });
            return errorResult;
        }
    }

    destroy() {
        if (this._activeProvider) {
            this._activeProvider.destroy();
            this._activeProvider = null;
        }
        this._isSubmitting = false;
        this._initialized = false;
    }
}

export default NewsletterService;