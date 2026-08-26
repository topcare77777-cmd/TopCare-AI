/**
 * TOPCARE AI PLATFORM V3 — HOME DOMAIN RENDERER
 * Path: assets/js/pages/home.renderer.js
 * Status: PHASE 2.7.1 AUTH INTENT & ZERO-IMAGE SSOT APPLIED
 */

import AssetsRegistry from '../config/assets.registry.js';
import { HOME_DATA } from './home.data.js';
import { FooterRenderer } from '../renderers/footer.renderer.js';

export const HomeRenderer = {
    async renderPage(userCount = 0, isAuthenticated = false) {
        const d = HOME_DATA || {};

        // Ambil ilustrasi visual hero utama
        const mainImg = (AssetsRegistry && AssetsRegistry.images && AssetsRegistry.images.home && AssetsRegistry.images.home.heroIllustration)
            ? AssetsRegistry.images.home.heroIllustration
            : 'assets/images/features/topcareai_home.webp';

        const features = Array.isArray(d.features) ? d.features : [];
        const articles = Array.isArray(d.articles) ? d.articles : [];

        // Hitung atau tampilkan member count riil
        const displayMemberCount = userCount > 0 ? `${userCount} Member Terdaftar` : 'Komunitas AI Berkembang';

        // Tautan dinamis tombol CTA utama
        const registerRoute = isAuthenticated ? '#/dashboard' : '#/register';
        const registerDataRoute = isAuthenticated ? '/dashboard' : '/register';
        const registerLabel = isAuthenticated ? 'Buka Dashboard →' : 'Mulai Gratis Sekarang →';

        // Render Footer V3 secara dinamis
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
                                <a href="${registerRoute}" data-route="${registerDataRoute}" class="tc-btn-hero-primary">${registerLabel}</a>
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
                        <!-- ARTICLES LIST (Zero 404 Image Overhead) -->
                        <div class="tc-articles-list">
                            ${articles.map(a => `
                                <article class="tc-article-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                                    <div>
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                            <span style="font-size: 0.75rem; font-weight: 700; color: #38bdf8; background: rgba(56, 189, 248, 0.15); padding: 0.2rem 0.5rem; border-radius: 4px;">${a.category}</span>
                                            <span style="font-size: 0.8rem; color: #64748b;">${a.readTime}</span>
                                        </div>
                                        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: #f8fafc;">${a.title}</h3>
                                        <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">${a.desc}</p>
                                    </div>
                                    <div style="font-size: 0.8rem; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem;">
                                        Dipublikasikan: ${a.date}
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
                    <a href="${registerRoute}" data-route="${registerDataRoute}" class="tc-btn-cta-banner">${registerLabel}</a>
                </section>

                <!-- CANONICAL V3 DYNAMIC FOOTER -->
                ${dynamicFooterHtml}
            </div>
        `;
    }
};

export default HomeRenderer;