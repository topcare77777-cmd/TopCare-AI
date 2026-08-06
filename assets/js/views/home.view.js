/**
 * TOPCARE AI PLATFORM V2 — HOME VIEW ORCHESTRATOR
 * Path: assets/js/views/home.view.js
 * Version: 133.0.1 (BUILD 133.0 — GOLDEN BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Orchestrates Home Page mounting and integrates Marketplace Feature.
 */

import { MarketplaceComponent } from '../features/marketplace/index.js';

export class HomeView {
    constructor() {
        this._marketplace = new MarketplaceComponent();
    }

    async mount() {
        const appViewport = document.getElementById("app");
        if (!appViewport) return;

        appViewport.innerHTML = `
            <div class="tc-home-wrapper">
                <section class="tc-hero-banner" style="padding: 3rem 1rem; text-align: center; background: rgba(255,255,255,0.02);">
                    <h1>Selamat Datang di TopCare AI Platform</h1>
                    <p>Platform AI terpadu untuk belajar, berkreasi, dan tumbuh bersama.</p>
                </section>
                <div id="tc-home-marketplace-host"></div>
            </div>
        `;

        await this._marketplace.mount("#tc-home-marketplace-host");
    }

    refresh() {
        this._marketplace.refresh();
    }

    destroy() {
        this._marketplace.destroy();
        const appViewport = document.getElementById("app");
        if (appViewport) {
            appViewport.innerHTML = "";
        }
    }
}

export default HomeView;