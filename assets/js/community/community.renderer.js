/**
 * TOPCARE AI PLATFORM V2 — COMMUNITY RENDERER (WITH ASSET REGISTRY SSOT)
 * Path: assets/js/community/community.renderer.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Pure UI template generator for Community Hub section components using AssetsRegistry.
 */

import AssetsRegistry from '../core/registries/assets.registry.js';

export const CommunityRenderer = {
    renderHero(hero) {
        return `
            <header class="tc-comm-hero">
                <div class="tc-comm-hero-glow"></div>
                <span class="tc-comm-badge">${hero.badge}</span>
                <h1 class="tc-comm-title">${hero.title}</h1>
                <p class="tc-comm-subtitle">${hero.subtitle}</p>
                <div class="tc-comm-banner-box">
                    <img src="${AssetsRegistry.images.community.banner}" 
                         alt="Community Hub Banner" 
                         class="tc-image-cover tc-image-banner" 
                         loading="lazy" 
                         decoding="async">
                </div>
            </header>
        `;
    },

    renderTopics(topics) {
        return `
            <section class="tc-comm-section">
                <div class="tc-comm-section-header">
                    <h2>Topik Pembelajaran Utama</h2>
                    <p>Pilih kategori topik modul Personality Plus yang ingin Anda selami</p>
                </div>
                <div class="tc-comm-grid tc-grid-topics">
                    ${topics.map(t => `
                        <article class="tc-comm-card tc-card-topic">
                            <div class="tc-card-top">
                                <div class="tc-topic-icon">${t.icon}</div>
                                <span class="tc-topic-tag">${t.tag}</span>
                            </div>
                            <h3 class="tc-topic-title">${t.title}</h3>
                            <p class="tc-topic-desc">${t.desc}</p>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderStudyGroups(groups) {
        return `
            <section class="tc-comm-section">
                <div class="tc-comm-section-header">
                    <h2>Katalog Kelompok Belajar</h2>
                    <p>Kelompok belajar terstruktur sesuai minat dan fokus pengembangan diri Anda</p>
                </div>
                <div class="tc-comm-grid tc-grid-groups">
                    ${groups.map(g => `
                        <article class="tc-comm-card tc-card-group">
                            <div class="tc-group-header">
                                <span class="tc-group-icon">${g.icon}</span>
                                <span class="tc-status-badge">${g.status}</span>
                            </div>
                            <h3 class="tc-group-name">${g.name}</h3>
                            <p class="tc-group-desc">${g.desc}</p>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderGuidelines(guidelines) {
        return `
            <section class="tc-comm-section tc-section-guidelines">
                <div class="tc-comm-section-header">
                    <h2>Aturan & Panduan Komunitas</h2>
                    <p>Prinsip utama menjaga lingkungan belajar yang aman, suportif, dan beretika</p>
                </div>
                <div class="tc-comm-guidelines-list">
                    ${guidelines.map(g => `
                        <div class="tc-guideline-item">
                            <span class="tc-guideline-num">${g.number}</span>
                            <div class="tc-guideline-content">
                                <h3>${g.title}</h3>
                                <p>${g.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderComingSoon(items) {
        return `
            <section class="tc-comm-section">
                <div class="tc-comm-section-header">
                    <h2>Akan Hadir</h2>
                    <p>Fitur interaktif dan program kegiatan komunitas pembelajaran mendatang</p>
                </div>
                <div class="tc-comm-grid tc-grid-coming">
                    ${items.map(item => `
                        <article class="tc-comm-card tc-card-coming">
                            <div class="tc-coming-icon">${item.icon}</div>
                            <h3>${item.title}</h3>
                            <p>${item.desc}</p>
                            <span class="tc-coming-badge">Tahap Perencanaan</span>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    }
};

export default CommunityRenderer;