/**
 * TOPCARE AI PLATFORM V2 — NEWSLETTER RUNTIME LIFECYCLE
 * Path: assets/js/newsletter/runtime/newsletter.runtime.js
 * Architecture: Pluggable Isolated Lifecycle Engine
 * Status: APPROVED & LOCKED (BUILD 129.3)
 * SRP: Application Mounting, Unmounting & Memory Leak Management.
 */

import { NewsletterService } from '../services/newsletter.service.js';
import { NewsletterWidget } from '../widget/newsletter.widget.js';

export class NewsletterRuntime {
    constructor() {
        this._service = null;
        this._widget = null;
        this._initialized = false;
    }

    async initialize(customConfig = null) {
        if (this._initialized) return;

        this._service = new NewsletterService();
        await this._service.initialize(customConfig);

        this._widget = new NewsletterWidget(this._service);
        this._initialized = true;
    }

    mount(containerSelector = '.tc-newsletter-mount') {
        if (!this._initialized) {
            this.initialize().then(() => {
                if (this._widget) {
                    this._widget.mount(containerSelector);
                }
            });
            return;
        }

        if (this._widget) {
            this._widget.mount(containerSelector);
        }
    }

    destroy() {
        if (this._widget) {
            this._widget.destroy();
            this._widget = null;
        }

        if (this._service) {
            this._service.destroy();
            this._service = null;
        }

        this._initialized = false;
    }
}

export const newsletterRuntimeInstance = new NewsletterRuntime();
export default newsletterRuntimeInstance;