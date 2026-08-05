/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING BASIC: RENDERER
 * Path: assets/js/learning/ai/basic/basic.renderer.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Pure UI template generator for Hero, Levels Overview, Cards, Lists, and Footer CTA.
 */

export const BasicRenderer = {
    renderHero(hero) {
        return `
            <header class="tc-ai-basic-hero">
                <div class="tc-ai-hero-glow"></div>
                <span class="tc-ai-badge">${hero.badge}</span>
                <h1 class="tc-ai-hero-title">${hero.title}</h1>
                <p class="tc-ai-hero-subtitle">${hero.subtitle}</p>
            </header>
        `;
    },

    renderLevelOverview(overview, levels) {
        return `
            <section class="tc-ai-overview-section">
                <div class="tc-ai-section-header">
                    <h2>${overview.title}</h2>
                    <p>${overview.description}</p>
                </div>
                <div class="tc-ai-levels-bar">
                    ${levels.map(lvl => `
                        <div class="tc-level-tab ${lvl.active ? 'active' : 'disabled'}">
                            <span class="tc-level-tab-title">${lvl.title}</span>
                            <span class="tc-ai-badge-status ${lvl.active ? 'status-active' : 'status-coming'}">${lvl.badge}</span>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderBasicModules(modules) {
        return `
            <section class="tc-ai-modules-section">
                <div class="tc-ai-section-header">
                    <h2>Daftar Modul Level Dasar</h2>
                    <p>Materi pembelajaran fondasi dasar kecerdasan buatan</p>
                </div>
                <div class="tc-ai-card-grid">
                    ${modules.map(mod => `
                        <article class="tc-ai-learning-card">
                            <div class="tc-card-top-header">
                                <span class="tc-card-icon">${mod.icon}</span>
                                <span class="tc-ai-badge-level">${mod.badge}</span>
                            </div>
                            <h3 class="tc-card-title">${mod.title}</h3>
                            <p class="tc-card-description">${mod.description}</p>
                            
                            <div class="tc-card-points-box">
                                <span class="tc-points-label">Yang dipelajari:</span>
                                <ul class="tc-learning-list">
                                    ${mod.learningPoints.map(pt => `
                                        <li><span class="tc-list-check">✓</span> ${pt}</li>
                                    `).join('')}
                                </ul>
                            </div>

                            <div class="tc-card-footer-info">
                                <div class="tc-card-meta">
                                    <span class="tc-meta-estimation">⏱️ ${mod.estimation}</span>
                                    <span class="tc-meta-status">${mod.status}</span>
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderFooterCta() {
        return `
            <footer class="tc-ai-footer-cta">
                <h2>Siap Mengembangkan Wawasan AI Anda?</h2>
                <p>Pelajari seluruh modul dasar di atas untuk membangun fondasi pemahaman kecerdasan buatan yang kuat.</p>
            </footer>
        `;
    }
};

export default BasicRenderer;