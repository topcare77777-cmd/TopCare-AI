/**
 * TopCare AI Platform V2.0.0
 * Features Renderer (BUILD 028 Audit & Flow Fix)
 * Path: assets/js/renderers/features.renderer.js
 */

import AssetsRegistry from '../config/assets.registry.js';
import BaseRenderer from './base.renderer.js';
import Logger from '../core/logger.js';

const FeaturesRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[FeaturesRenderer] Rendered with BUILD 028 visual layout verification");

        const tagText = BaseRenderer.sanitize(data.tag || 'Jelajahi Fitur Unggulan Kami');

        const featureItems = [
            { icon: AssetsRegistry.features.aiAssistant, title: "AI Assistant", desc: "Pendamping cerdas untuk belajar dan produktivitas Anda." },
            { icon: AssetsRegistry.features.personality, title: "Personality Test", desc: "Kenali tipe temperamen dasar dan kembangkan dirimu." },
            { icon: AssetsRegistry.features.learning, title: "Learning Center", desc: "Ratusan kursus berkualitas untuk tingkatkan skill Anda." },
            { icon: AssetsRegistry.features.prompt, title: "Prompt Marketplace", desc: "Temukan prompt terbaik untuk berbagai kebutuhan AI." },
            { icon: AssetsRegistry.features.analytics, title: "E-Library & Ebook", desc: "Koleksi ebook premium dan gratis untuk Anda." },
            { icon: AssetsRegistry.features.community, title: "Community Hub", desc: "Bergabung dengan komunitas positif dan inspiratif." },
            { icon: AssetsRegistry.features.security, title: "Creator Platform", desc: "Jadi kreator dan bagikan karya & ilmu Anda." }
        ];

        const cardsHtml = featureItems.map(item => `
            <div class="features__card glass-card" data-animate="fade-up">
                <div class="features__icon">
                    <img src="${item.icon}" alt="" width="24" height="24" loading="lazy" decoding="async" />
                </div>
                <h3 class="features__card-title">${item.title}</h3>
                <p class="features__card-desc">${item.desc}</p>
            </div>
        `).join('');

        console.log("[FEATURES ACTIVE]");

        return `
            <section id="features" class="features">
                <div class="features__container">
                    <div class="features__header" data-animate="fade-up">
                        <h2 class="features__title">${tagText}</h2>
                    </div>
                    <div class="features__grid">
                        ${cardsHtml}
                    </div>
                </div>
            </section>
        `;
    }
};

export default FeaturesRenderer;