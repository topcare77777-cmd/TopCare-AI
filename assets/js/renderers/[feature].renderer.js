/**
 * TopCare AI Platform V2.0.0
 * Features Renderer (BUILD 025 Enterprise Visual Restoration)
 * Path: assets/js/renderers/features.renderer.js
 */

import AssetsRegistry from '../config/assets.registry.js';
import BaseRenderer from '../core/base.renderer.js';
import Logger from '../core/logger.js';

const FeaturesRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[FeaturesRenderer] Rendered with enterprise SVG feature assets");

        const tagText = BaseRenderer.sanitize(data.tag || 'Jelajahi Fitur Unggulan Kami');
        const titleText = BaseRenderer.sanitize(data.title || 'Engineered for High-Performance Workflows');

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
            <div class="features__card glass-card" data-animate="fade-up" style="background: rgba(17, 24, 39, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem; transition: transform 0.3s ease;">
                <div class="features__icon" style="width: 48px; height: 48px; background: rgba(99, 102, 241, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <img src="${item.icon}" alt="" width="24" height="24" loading="lazy" decoding="async" />
                </div>
                <h3 style="font-size: 1.125rem; font-weight: 700; color: white;">${item.title}</h3>
                <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">${item.desc}</p>
            </div>
        `).join('');

        return `
            <section id="features" class="features" style="padding: 7rem 2rem; max-width: 1280px; margin: 0 auto;">
                <div class="features__container" style="display: flex; flex-direction: column; gap: 4rem;">
                    <div class="features__header" style="text-align: center; display: flex; flex-direction: column; gap: 1rem; align-items: center;">
                        <h2 style="font-size: clamp(2rem, 3vw, 2.75rem); font-weight: 800; color: white;">${tagText}</h2>
                    </div>
                    <div class="features__grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
                        ${cardsHtml}
                    </div>
                </div>
            </section>
        `;
    }
};

export default FeaturesRenderer;