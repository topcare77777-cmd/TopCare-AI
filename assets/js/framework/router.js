/**
 * TopCare AI Platform V2.0.0
 * Framework Router
 * Path: assets/js/framework/router.js
 */

import heroComponent from "../components/hero.component.js";
import cardComponent from "../components/card.component.js";
import contentService from "../services/content.service.js";

export const Router = {
    routes: ["home", "about", "personality", "article", "ebook", "community"],

    start() {
        window.addEventListener("hashchange", () => this.handleRoute());
        this.handleRoute();
    },

    init() {
        this.start();
    },

    async handleRoute() {
        const hash = window.location.hash.replace("#", "") || "home";
        const container = document.getElementById("app-container");
        
        if (!container) return;

        if (hash === "home") {
            container.innerHTML = `<div id="hero-wrapper"></div><div class="tc-container section-container"><div class="section-header"><h2>Platform Capabilities</h2><p>Kenali fitur unggulan untuk akselerasi potensi Anda.</p></div><div id="home-cards" class="grid-cols-3"></div></div>`;
            if (typeof heroComponent !== 'undefined' && typeof heroComponent.render === 'function') {
                heroComponent.render("hero-wrapper");
            }
            if (typeof contentService !== 'undefined' && typeof contentService.fetchHomeContent === 'function') {
                const data = await contentService.fetchHomeContent();
                if (data && data.features && typeof cardComponent !== 'undefined' && typeof cardComponent.renderGrid === 'function') {
                    cardComponent.renderGrid("home-cards", data.features);
                }
            }
        } else if (hash === "personality") {
            container.innerHTML = `
                <div class="personality-page">
                    <div class="personality-header">
                        <h2>Tes Kepribadian 4 Temperamen</h2>
                        <p>Temukan karakter dasar Anda: Koleris, Sanguinis, Melankolis, atau Plegmatis.</p>
                    </div>
                    <div id="temperament-grid" class="temperaments-grid"></div>
                </div>
            `;
            if (typeof contentService !== 'undefined' && typeof contentService.fetchHomeContent === 'function') {
                const data = await contentService.fetchHomeContent();
                const grid = document.getElementById("temperament-grid");
                if (grid && data && data.temperaments) {
                    grid.innerHTML = data.temperaments.map(t => `
                        <div class="temperament-card">
                            <h3>${t.title}</h3>
                            <p>${t.description}</p>
                        </div>
                    `).join("");
                }
            }
        } else {
            container.innerHTML = `
                <div style="padding: 6rem 2rem; text-align: center;">
                    <h2>Modul ${hash.toUpperCase()}</h2>
                    <p>Halaman sedang dipersiapkan dalam ekosistem TopCare AI V2.0.0.</p>
                </div>
            `;
        }
    }
};

export default Router;