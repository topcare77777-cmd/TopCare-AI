/**
 * TOPCARE AI PLATFORM V2 — HOME DOMAIN RENDERER
 * Path: assets/js/home/home.renderer.js
 * Status: APPROVED & LOCKED (BUILD 128.8 - HERO CTA UPDATE)
 * SRP: Pure View Generator for Home Ecosystem Landing Page.
 */

import AssetsRegistry from '../core/registries/assets.registry.js';
import { HOME_DATA } from './home.data.js';

export const HomeRenderer = {
    renderPage() {
        const d = HOME_DATA;
        const heroImg = AssetsRegistry.images.home.heroIllustration || 'assets/images/features/feature-learning.svg';

        return `
            <div class="tc-home-container">
                <!-- HERO SECTION -->
                <section class="tc-home-hero">
                    <div class="tc-home-hero-grid">
                        <div class="tc-home-hero-text">
                            <span class="tc-home-badge">${d.hero.badge}</span>
                            <h1 class="tc-home-title">${d.hero.title}</h1>
                            <p class="tc-home-subtitle">${d.hero.subtitle}</p>
                            <div class="tc-home-hero-actions">
                                <a href="#/learning" class="tc-btn-hero-primary">Mulai Belajar Sekarang →</a>
                                <a href="#/personality" class="tc-btn-hero-secondary">Tes Kepribadian</a>
                            </div>
                        </div>
                        <div class="tc-home-hero-media">
                            <div class="tc-hero-img-box">
                                <img src="${heroImg}" alt="TopCare AI Platform Visual" class="tc-image-cover">
                            </div>
                        </div>
                    </div>
                </section>

                <!-- OVERVIEW DOMAINS SECTION -->
                <section class="tc-home-section">
                    <div class="tc-home-section-header text-center">
                        <h2>Apa itu TopCare AI?</h2>
                        <p>Satu platform terintegrasi untuk mendukung transformasi pengetahuan dan produktivitas Anda.</p>
                    </div>
                    <div class="tc-domains-grid">
                        ${d.overviewDomains.map(item => `
                            <article class="tc-domain-card">
                                <div class="tc-domain-icon">${item.icon}</div>
                                <h3>${item.title}</h3>
                                <p>${item.desc}</p>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <!-- LEARNING CENTER HIGHLIGHT -->
                <section class="tc-home-section">
                    <div class="tc-home-section-header text-center">
                        <h2>Pusat Pembelajaran Utama</h2>
                        <p>Pilih jalur edukasi yang sesuai dengan fokus pengembangan Anda.</p>
                    </div>
                    <div class="tc-learning-cards-grid">
                        ${d.learningCenterCards.map(c => `
                            <article class="tc-learning-card">
                                <span class="tc-card-tag">${c.badge}</span>
                                <h3>${c.title}</h3>
                                <p>${c.desc}</p>
                                <a href="${c.link}" class="tc-card-link">Masuk Ke Modul →</a>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <!-- CREATOR CENTER HIGHLIGHT -->
                <section class="tc-home-section">
                    <div class="tc-home-section-header text-center">
                        <h2>Creator Ecosystem</h2>
                        <p>Akses pustaka resource digital terstruktur untuk mendukung hasil kerja Anda.</p>
                    </div>
                    <div class="tc-creator-highlights-grid">
                        ${d.creatorHighlights.map(cr => `
                            <article class="tc-creator-highlight-card">
                                <div class="tc-highlight-icon">${cr.icon}</div>
                                <h3>${cr.title}</h3>
                                <p>${cr.desc}</p>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <!-- FEATURED MODULES GRID -->
                <section class="tc-home-section">
                    <div class="tc-home-section-header text-center">
                        <h2>Modul Pembelajaran Unggulan</h2>
                        <p>Materi pilihan yang disiapkan untuk Anda.</p>
                    </div>
                    <div class="tc-modules-grid">
                        ${d.featuredModules.map(m => `
                            <div class="tc-module-box">
                                <span class="tc-module-cat">${m.category}</span>
                                <h4>${m.title}</h4>
                                <span class="tc-module-level">${m.level}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- PLATFORM ROADMAP -->
                <section class="tc-home-section">
                    <div class="tc-home-section-header text-center">
                        <h2>Platform Ecosystem Roadmap</h2>
                        <p>Alur perkembangan platform TopCare AI dari masa ke masa.</p>
                    </div>
                    <div class="tc-home-roadmap-grid">
                        ${d.platformRoadmap.map((r, i) => `
                            <div class="tc-roadmap-step">
                                <span class="tc-step-num">${i + 1}</span>
                                <h4>${r.phase}</h4>
                                <p>${r.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- FAQ SECTION -->
                <section class="tc-home-section">
                    <div class="tc-home-section-header text-center">
                        <h2>Pertanyaan Umum</h2>
                    </div>
                    <div class="tc-home-faq-wrapper">
                        ${d.faqs.map(f => `
                            <details class="tc-home-faq-item">
                                <summary class="tc-home-faq-q">
                                    <span>${f.q}</span>
                                    <span>▼</span>
                                </summary>
                                <div class="tc-home-faq-a"><p>${f.a}</p></div>
                            </details>
                        `).join('')}
                    </div>
                </section>

                <!-- CTA -->
                <section class="tc-home-cta">
                    <h2>Mulai Perjalanan Anda Bersama TopCare AI</h2>
                    <p>Bergabunglah bersama komunitas pengguna global dan jelajahi ekosistem pembelajaran modern hari ini.</p>
                    <a href="#/learning" class="tc-btn-cta">Mulai Sekarang — Gratis</a>
                </section>
            </div>
        `;
    }
};

export default HomeRenderer;