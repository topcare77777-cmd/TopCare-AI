/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER PUBLIC MODULE EXPORTS
 * Path: assets/js/newsletter/index.js
 * Architecture: Public API Gate
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Tree-shake Friendly Public API Exports for Newsletter Engine.
 */

export { INewsletterProvider } from './contracts/newsletter.provider.js';
export { NEWSLETTER_CONFIG } from './config/newsletter.config.js';
export { ProviderRegistry, providerRegistryInstance } from './registry/provider.registry.js';
export { BrevoAdapter } from './adapters/brevo.adapter.js';
export { MailchimpAdapter } from './adapters/mailchimp.adapter.js';
export { KitAdapter } from './adapters/kit.adapter.js';
export { SubstackAdapter } from './adapters/substack.adapter.js';
export { NewsletterService } from './services/newsletter.service.js';
export { NewsletterWidget } from './widget/newsletter.widget.js';
export { NewsletterRuntime, newsletterRuntimeInstance } from './runtime/newsletter.runtime.js';