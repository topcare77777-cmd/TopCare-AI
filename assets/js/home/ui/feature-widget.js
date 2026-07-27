/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer              : Widget Layer (UI Renderer)
 * Owner              : FeatureWidget
 * Dependencies       : HomeService
 * Forbidden          : Router, TopCareApp, ViewManager, Component Layer
 * Supported API      :
 * render(container)
 * destroy()
 * -----------------------------------------------------------------
 */

import { HomeService } from '../../services/home/home.service.js';

export const FeatureWidget = {
    async render(container) {
        if (!container) return;

        let featureData;
        try {
            featureData = await HomeService.getFeaturesData();
        } catch (e) {
            featureData = {
                title: "Fitur Unggulan",
                description: "Semua yang Anda butuhkan untuk berkembang bersama AI.",
                features: [
                    { title: "AI Coach Personal", desc: "Bimbingan pintar yang memahami karakter dan kebutuhan belajar Anda." },
                    { title: "Analisis Kepribadian", desc: "Kenali potensi diri lebih dalam melalui pendekatan sains psikologi modern." },
                    { title: "Ecosystem Terintegrasi", desc: "Akses artikel, ebook, e-learning, dan komunitas dalam satu platform." }
                ]
            };
        }

        const itemsHtml = (featureData.features || []).map(item => `
            <div class="feature-card-match">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `).join('');

        container.innerHTML = `
            <section class="features-section-match">
                <div class="section-header">
                    <h2>${featureData.title}</h2>
                    <p>${featureData.description}</p>
                </div>
                <div class="features-grid-match">
                    ${itemsHtml}
                </div>
            </section>
        `;
    },

    destroy() {
        // Reserved for future widget-level event listener or observer cleanup
    }
};

export default FeatureWidget;