/**
 * TopCare AI Platform V2.0.0
 * Hero Renderer
 * Path: assets/js/renderers/hero.renderer.js
 */

const HeroRenderer = {
    render(data) {
        console.log('[Hero Renderer] Mounted');
        
        const badgeText = data.badge?.text || '🚀 AI Powered Personal Growth';
        const titleText = data.title || 'Kenali Dirimu Bersama TopCare AI';
        const subtitleText = data.subtitle || '';
        
        const buttonsHtml = (data.buttons || []).map(btn => `
            <a href="${btn.link}" class="btn btn-${btn.style || 'primary'}">${btn.text}</a>
        `).join('');

        const statsHtml = (data.statistics || []).map(stat => `
            <div class="hero-stat">
                <h2>${stat.value}</h2>
                <span>${stat.label}</span>
            </div>
        `).join('');

        const dashboardItemsHtml = (data.dashboard?.items || []).map(item => `
            <div class="dashboard-card">
                <div class="dashboard-card__icon">${item.icon}</div>
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            </div>
        `).join('');

        const html = `
            <section class="hero">
                <div class="hero__container">
                    <div class="hero__content">
                        <div class="hero__badge">
                            <span class="badge-dot"></span>
                            ${badgeText}
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
                        <div class="dashboard">
                            <div class="dashboard__header">
                                <div class="dashboard__dot red"></div>
                                <div class="dashboard__dot yellow"></div>
                                <div class="dashboard__dot green"></div>
                                <span>${data.dashboard?.title || 'TopCare AI Dashboard'}</span>
                            </div>
                            <div class="dashboard__body">
                                ${dashboardItemsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        console.log("[HeroRenderer] HTML generated");
        return html;
    }
};

export default HeroRenderer;