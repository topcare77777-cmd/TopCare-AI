/**
 * TOPCARE AI PLATFORM V2 — LAZY PROVIDER REGISTRY
 * Path: api/newsletter/providers/ProviderRegistry.js
 * Architecture: Lazy Factory Pattern (Zero Startup Overhead)
 * Status: APPROVED & LOCKED (BUILD 129.7)
 */

import { BrevoProvider } from './brevo.js';
import { MailchimpProvider } from './mailchimp.js';
import { KitProvider } from './kit.js';
import { SubstackProvider } from './substack.js';

export class ProviderRegistry {
    constructor() {
        // Factory Functions: Adapters are ONLY instantiated when resolved
        this._factories = new Map([
            ['brevo', () => new BrevoProvider()],
            ['mailchimp', () => new MailchimpProvider()],
            ['kit', () => new KitProvider()],
            ['substack', () => new SubstackProvider()]
        ]);
    }

    resolve(providerKey) {
        const key = (providerKey || '').toLowerCase();
        const factory = this._factories.get(key);

        if (!factory) {
            return null;
        }

        return factory(); // Instantiates adapter on-demand
    }

    has(providerKey) {
        return this._factories.has((providerKey || '').toLowerCase());
    }
}

export const providerRegistryInstance = new ProviderRegistry();
export default providerRegistryInstance;