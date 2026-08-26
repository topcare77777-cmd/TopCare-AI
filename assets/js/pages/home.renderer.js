/**
 * TOPCARE AI PLATFORM V3 — HOME DOMAIN RENDERER
 * Path: assets/js/pages/home.renderer.js
 * Status: PHASE 2.3 CONNECTIVITY & CANONICAL FOOTER APPLIED
 */

import AssetsRegistry from '../config/assets.registry.js';
import { HOME_DATA } from './home.data.js';
import { FooterRenderer } from '../renderers/footer.renderer.js';

export const HomeRenderer = {
    async renderPage(userCount = 0) {
        const d = HOME_DATA || {};

        // Ambil ilustrasi utama dengan fallback aman
        const mainImg = (AssetsRegistry && AssetsRegistry.images && AssetsRegistry.images.home && AssetsRegistry.images.home.heroIllustration)
            ? AssetsRegistry.images.home.heroIllustration
            : 'assets/images/features/topcareai_home.webp';

        const features = Array.isArray(d.features) ? d.features : [];
        const articles = Array.isArray(d.articles) ? d.articles : [];

        // Hitung atau tampilkan member count riil jika tersedia
        const displayMemberCount = userCount > 0 ? `${userCount} Member Terdaftar` : 'Komunitas AI Berkembang';

        // Render Footer V3 secara dinamis dari PlatformService
        const dynamicFooterHtml = await FooterRenderer.render();

        return `
            <div class="tc-home-wrapper">
                <!-- HERO SECTION -->
                <section class="tc-hero-section">
                    <div class="tc-hero-glow-bg"></div>
                    <div class="tc-hero-content-grid">
                        <div class="tc-hero-text">
                            <span class="tc-hero-badge">${d.hero?.badge || 'Platform AI #1 untuk Belajar & Berkembang'}</span>
                            <h1 class="tc-hero-title">${d.hero?.title || 'Bangun Potensi Dirimu Bersama TopCare AI'}</h1>
                            <p class="tc-hero-subtitle">${d.hero?.subtitle || 'Platform AI untuk belajar, mengenal diri, dan membangun masa depan.'}</p>
                            <div class="tc-hero-actions">
                                <a href="#/register" data-route="/register" class="tc-btn-hero-primary">Mulai Gratis Sekarang →</a>
                                <a href="#/personality" data-route="/personality" class="tc-btn-hero-secondary">Tes Kepribadian</a>
                            </div>
                            <div class="tc-hero-members">
                                <div class="tc-member-avatars">
                                    <span class="avatar">👨‍💻</span>
                                    <span class="avatar">👩‍💼</span>
                                    <span class="avatar">👨‍🎨</span>
                                </div>
                                <div class="tc-member-info">
                                    <strong>${displayMemberCount}</strong>
                                    <small>${d.hero?.memberNote || 'Bergabung dan mulai perjalananmu hari ini'}</small>
                                </div>
                            </div>
                        </div>

                        <!-- INTERACTIVE HERO VISUAL WITH CLICKABLE BADGES -->
                        <div class="tc-hero-visual">
                            <div class="tc-visual-center-box">
                                <img src="${mainImg}" alt="AI Brain Visual" class="tc-visual-img" width="400" height="400" fetchpriority="high" loading="eager" onerror="this.onerror=null; this.src='assets/images/logos/logo-utama.webp';">
                                
                                <!-- 1. AI Assistant -> Coach AI Chat -->
                                <a href="#/coach" data-route="/coach" class="tc-floating-badge badge-top-left" style="text-decoration: none; cursor: pointer; display: flex; flex-direction: column; justify-content: center;">
                                    <span>🤖 AI Assistant</span>
                                    <small>24/7 Interactive</small>
                                </a>

                                <!-- 2. Personality -> Hub Tes Kepribadian -->
                                <a href="#/personality" data-route="/personality" class="tc-floating-badge badge-top-right" style="text-decoration: none; cursor: pointer; display: flex; flex-direction: column; justify-content: center;">
                                    <span>🧠 Personality</span>
                                    <small>4 Tipe & Jung</small>
                                </a>

                                <!-- 3. Marketplace -> Halaman Marketplace -->
                                <a href="#/marketplace" data-route="/marketplace" class="tc-floating-badge badge-bottom-left" style="text-decoration: none; cursor: pointer; display: flex; flex-direction: column; justify-content: center;">
                                    <span>🛒 Marketplace</span>
                                    <small>Prompt & Asset</small>
                                </a>

                                <!-- 4. Premium -> Halaman Premium VIP -->
                                <a href="#/premium" data-route="/premium" class="tc-floating-badge badge-bottom-right" style="text-decoration: none; cursor: pointer; display: flex; flex-direction: column; justify-content: center;">
                                    <span>👑 Premium</span>
                                    <small>Akses VIP</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- FEATURES SECTION -->
                <section class="tc-section tc-features-section">
                    <div class="tc-section-header text-center">
                        <h2>Jelajahi Fitur Unggulan Kami</h2>
                    </div>
                    <div class="tc-features-grid">
                        ${features.map(f => `
                            <article class="tc-feature-card">
                                <div class="tc-feature-icon">${f.icon}</div>
                                <h3>${f.title}</h3>
                                <p>${f.desc}</p>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <!-- STATS COUNTER STRIP -->
                <section class="tc-stats-strip">
                    <div class="tc-stats-container">
                        <div class="tc-stat-item">
                            <span class="tc-stat-icon">👥</span>
                            <div class="tc-stat-text">
                                <strong>${userCount > 0 ? userCount : 'Aktif'}</strong>
                                <small>Pengguna Terdaftar</small>
                            </div>
                        </div>
                        <div class="tc-stat-item">
                            <span class="tc-stat-icon">🧠</span>
                            <div class="tc-stat-text">
                                <strong>3 Modul</strong>
                                <small>Tes Asesmen AI</small>
                            </div>
                        </div>
                        <div class="tc-stat-item">
                            <span class="tc-stat-icon">📖</span>
                            <div class="tc-stat-text">
                                <strong>3 Level</strong>
                                <small>Kurikulum AI</small>
                            </div>
                        </div>
                        <div class="tc-stat-item">
                            <span class="tc-stat-icon">🌐</span>
                            <div class="tc-stat-text">
                                <strong>Global</strong>
                                <small>Akses Komunitas</small>
                            </div>
                        </div>
                        <div class="tc-stat-item">
                            <span class="tc-stat-icon">🤍</span>
                            <div class="tc-stat-text">
                                <strong>100%</strong>
                                <small>Dukungan AI 24/7</small>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ARTICLES & PREMIUM SECTION -->
                <section class="tc-section tc-articles-section">
                    <div class="tc-section-header flex-between">
                        <h2>Artikel Terbaru</h2>
                        <a href="#/learning" data-route="/learning" class="tc-link-more">Lihat Pembelajaran →</a>
                    </div>
                    <div class="tc-articles-grid-wrapper">
                        <!-- ARTICLES LIST -->
                        <div class="tc-articles-list">
                            ${articles.map(a => `
                                <article class="tc-article-card">
                                    <div class="tc-article-thumb-box" style="position: relative; overflow: hidden; height: 160px; border-radius: 12px; margin-bottom: 1rem;">
                                        <img src="${a.image || 'assets/images/articles/article-ai.webp'}" alt="${a.title}" width="340" height="160" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='assets/images/features/feature-learning.webp';">
                                        <span class="tc-article-badge" style="position: absolute; top: 12px; left: 12px; z-index: 2;">${a.category}</span>
                                    </div>
                                    <div class="tc-article-body">
                                        <h3>${a.title}</h3>
                                        <p>${a.desc}</p>
                                        <div class="tc-article-meta" style="margin-top: 0.75rem; font-size: 0.8rem; color: #64748b;">
                                            <span>${a.date}</span> • <span>${a.readTime}</span>
                                        </div>
                                    </div>
                                </article>
                            `).join('')}
                        </div>

                        <!-- PREMIUM PROMO CARD -->
                        <div class="tc-premium-promo-card">
                            <span class="crown-icon">👑</span>
                            <h3>Upgrade ke Premium</h3>
                            <p>Dapatkan akses tak terbatas ke semua kursus premium, prompt eksklusif, dan fitur AI Coach advanced.</p>
                            <ul class="tc-promo-list">
                                <li>✓ Akses Creator Hub & Prompt Pro</li>
                                <li>✓ AI Smart Coach Workspace</li>
                                <li>✓ Download Center & Lisensi Aset</li>
                                <li>✓ Panduan 4 Temperamen Eksklusif</li>
                            </ul>
                            <a href="#/premium" data-route="/premium" class="tc-btn-promo">Mulai Premium</a>
                        </div>
                    </div>
                </section>

                <!-- CTA BANNER -->
                <section class="tc-cta-banner-section">
                    <div class="tc-cta-banner-content">
                        <h2>Siap Mengembangkan Potensi Terbaikmu?</h2>
                        <p>Bergabunglah dengan komunitas TopCare AI dan mulai perjalanan transformasimu hari ini.</p>
                    </div>
                    <a href="#/register" data-route="/register" class="tc-btn-cta-banner">Mulai Gratis Sekarang →</a>
                </section>

                <!-- CANONICAL V3 DYNAMIC FOOTER -->
                ${dynamicFooterHtml}
            </div>
        `;
    }
};

export default HomeRenderer;