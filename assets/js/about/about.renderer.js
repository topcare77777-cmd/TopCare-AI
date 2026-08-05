/**
 * TOPCARE AI PLATFORM V2 — ABOUT RENDERER (WITH ASSET REGISTRY SSOT)
 * Path: assets/js/about/about.renderer.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Pure template generator consuming image mappings strictly via AssetsRegistry.
 */

import AssetsRegistry from '../core/registries/assets.registry.js';

export const AboutRenderer = {
    renderHero(hero) {
        return `
            <header class="tc-about-hero">
                <div class="tc-about-hero-glow"></div>
                <span class="tc-about-badge">${hero.badge}</span>
                <h1 class="tc-about-title">${hero.title}</h1>
                <p class="tc-about-subtitle">${hero.description}</p>
                <div class="tc-about-showcase-box">
                    <img src="${AssetsRegistry.images.about.showcase}" 
                         alt="TopCare Showcase" 
                         class="tc-image-cover tc-image-banner" 
                         loading="lazy" 
                         decoding="async">
                </div>
            </header>
        `;
    },

    renderVisionMissions(vision, missions) {
        return `
            <section class="tc-about-section">
                <div class="tc-vision-card">
                    <h2>${vision.title}</h2>
                    <p>${vision.content}</p>
                </div>
                
                <div class="tc-about-section-header">
                    <h2>Misi Pembelajaran & Tim</h2>
                    <p>Langkah nyata TopCare AI dalam mendukung pengembangan diri masyarakat</p>
                </div>

                <div class="tc-about-team-box">
                    <img src="${AssetsRegistry.images.about.team}" 
                         alt="TopCare Team" 
                         class="tc-image-cover tc-image-card" 
                         loading="lazy" 
                         decoding="async">
                </div>
                
                <div class="tc-about-grid tc-grid-missions">
                    ${missions.map(m => `
                        <article class="tc-about-card tc-card-mission">
                            <div class="tc-mission-icon">${m.icon}</div>
                            <h3>${m.title}</h3>
                            <p>${m.desc}</p>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderWhatWeLearn(items) {
        return `
            <section class="tc-about-section">
                <div class="tc-about-section-header">
                    <h2>Apa yang Dipelajari?</h2>
                    <p>Fokus topik utama yang disusun untuk kesadaran diri dan pengembangan keterampilan</p>
                </div>
                <div class="tc-about-grid tc-grid-learn">
                    ${items.map(item => `
                        <article class="tc-about-card tc-card-learn">
                            <div class="tc-learn-icon">${item.icon}</div>
                            <h3>${item.title}</h3>
                            <p>${item.desc}</p>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderValues(values) {
        return `
            <section class="tc-about-section">
                <div class="tc-about-section-header">
                    <h2>Nilai Platform</h2>
                    <p>Prinsip utama yang melandasi perancangan dan penyajian materi di TopCare AI</p>
                </div>
                <div class="tc-about-grid tc-grid-values">
                    ${values.map(v => `
                        <article class="tc-about-card tc-card-value">
                            <h3>${v.title}</h3>
                            <p>${v.desc}</p>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderLearningSteps(steps) {
        return `
            <section class="tc-about-section">
                <div class="tc-about-section-header">
                    <h2>Cara Belajar</h2>
                    <p>Alur sederhana untuk mengoptimalkan pengalaman pembelajaran Anda</p>
                </div>
                <div class="tc-steps-timeline">
                    ${steps.map(s => `
                        <div class="tc-step-item">
                            <span class="tc-step-num">${s.step}</span>
                            <div class="tc-step-content">
                                <h3>${s.title}</h3>
                                <p>${s.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderContextualInfo(principles, aboutBook) {
        return `
            <section class="tc-about-section tc-grid-duo">
                <div class="tc-info-card">
                    <h3>${principles.title}</h3>
                    <p>${principles.content}</p>
                </div>
                <div class="tc-info-card">
                    <h3>${aboutBook.title}</h3>
                    <p>${aboutBook.content}</p>
                </div>
            </section>
        `;
    },

    renderClosing(closing) {
        return `
            <footer class="tc-about-closing">
                <h2>${closing.title}</h2>
                <p>${closing.content}</p>
            </footer>
        `;
    }
};

export default AboutRenderer;