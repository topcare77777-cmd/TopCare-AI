/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER PROVIDER CONTRACT
 * Path: assets/js/newsletter/contracts/newsletter.provider.js
 * Architecture: Clean Architecture / Provider Adapter Pattern
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Base Interface Contract for Newsletter Provider Adapters.
 */

export class INewsletterProvider {
    /**
     * Initializes the provider adapter instance.
     * @param {Object} config - Provider configuration block.
     * @returns {Promise<void>}
     */
    async initialize(config) {
        throw new Error('INewsletterProvider.initialize() must be implemented.');
    }

    /**
     * Subscribes an email address to the configured mailing list.
     * @param {string} email - Normalized email address.
     * @param {Object} options - Additional metadata (attributes, tags, source).
     * @returns {Promise<{success: boolean, code: string, provider: string, originalCode?: string, message: string}>}
     */
    async subscribe(email, options = {}) {
        throw new Error('INewsletterProvider.subscribe() must be implemented.');
    }

    /**
     * Unsubscribes an email address from the configured mailing list.
     * @param {string} email - Normalized email address.
     * @returns {Promise<{success: boolean, code: string, provider: string, originalCode?: string, message: string}>}
     */
    async unsubscribe(email) {
        throw new Error('INewsletterProvider.unsubscribe() must be implemented.');
    }

    /**
     * Validates if the provider adapter configuration contains required parameters.
     * @returns {boolean}
     */
    validate() {
        throw new Error('INewsletterProvider.validate() must be implemented.');
    }

    /**
     * Cleans up any resources or instances used by the adapter.
     * @returns {void}
     */
    destroy() {
        throw new Error('INewsletterProvider.destroy() must be implemented.');
    }
}

export default INewsletterProvider;