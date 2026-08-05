/**
 * TOPCARE AI PLATFORM V2 — PREMIUM CONTROLLER
 * Path: assets/js/premium/premium.controller.js
 * Status: APPROVED & LOCKED (BUILD 128.3)
 * SRP: Interactive behavior manager for Premium Center.
 */

import { PremiumRenderer } from './premium.renderer.js';

export class PremiumController {
    constructor(container) {
        this.container = container;
    }

    init() {
        if (!this.container) return;
        this.container.innerHTML = PremiumRenderer.renderPage();
        this._bindFaqEvents();
    }

    _bindFaqEvents() {
        const faqItems = this.container.querySelectorAll('.tc-faq-item');
        faqItems.forEach((item) => {
            item.addEventListener('toggle', () => {
                if (item.open) {
                    faqItems.forEach((other) => {
                        if (other !== item && other.open) {
                            other.open = false;
                        }
                    });
                }
            });
        });
    }
}

export default PremiumController;