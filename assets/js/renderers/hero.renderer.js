/**
 * TopCare AI Platform V2.0.0
 * Hero Renderer
 * Path: assets/js/renderers/hero.renderer.js
 */

import AssetsConfig from '../config/assets.config.js';

const HeroRenderer = {
    render(data) {
        console.log("[Hero Renderer] Mounted");
        console.log("[HeroRenderer] HTML generated");

        const badgeText = data.badge?.text || 'AI Powered Personal Growth';
        const titleText = data.title || 'Kenali Dirimu Bersama TopCare AI';
        const subtitleText = data.subtitle || '';
        
        const buttonsHtml = (data.buttons || []).map(btn => `
            <a href="${btn.link}" class="btn btn-${btn.style || 'primary'}" aria-label="${btn.text}">${btn.text}</a>
        `).join('');

        const statsHtml = (data.statistics || []).map(stat => `
            <div class="hero__stat">
                <h2 class="hero__stat-value">${stat.value}</h2>
                <span class="hero__stat-label">${stat.label}</span>
            </div>
        `).join('');

        const dashboardItemsHtml = (data.dashboard?.items || []).map(item => `
            <div class="dashboard__card">
                <div class="dashboard__card-icon" aria-hidden="true">${item.icon}</div>
                <div class="dashboard__card-content">
                    <h3 class="dashboard__card-title">${item.title}</h3>
                    <p class="dashboard__card-desc">${item.desc}</p>
                </div>
            </div>
        `).join('');

        return `
            <section class="hero">
                <img src="${AssetsConfig.images.heroGlow}" alt="" class="hero__glow" loading="lazy" decoding="async" width="600" height="600" />
                <div class="hero__container">
                    <div class="hero__content">
                        <div class="hero__badge">
                            <img src="${AssetsConfig.images.brandMark}" alt="" class="hero__brand-icon" loading="lazy" decoding="async" width="20" height="20" />
                            <span class="badge-dot" aria-hidden="true"></span>
                            <span>${badgeText}</span>
                        </div>
                        <h1 class="hero__title">${titleText}</h1>
                        <p class="hero__subtitle">${subtitleText}</p>
                        <div class="hero__buttons">
                            ${buttonsHtml}
                        </div>
                        <div class="hero__stats">
                            ${statsHtml}
                        </div>
                    </div>
                    <div class="hero__preview">
                        <img src="${AssetsConfig.images.heroMain}" alt="Hero Main Illustration" class="hero__image" loading="lazy" decoding="async" width="600" height="400" />
                        <div class="dashboard">
                            <div class="dashboard__header">
                                <div class="dashboard__dot dashboard__dot--red" aria-hidden="true"></div>
                                <div class="dashboard__dot dashboard__dot--yellow" aria-hidden="true"></div>
                                <div class="dashboard__dot dashboard__dot--green" aria-hidden="true"></div>
                                <span class="dashboard__title">${data.dashboard?.title || 'TopCare AI Dashboard'}</span>
                            </div>
                            <div class="dashboard__body">
                                ${dashboardItemsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export default HeroRenderer;