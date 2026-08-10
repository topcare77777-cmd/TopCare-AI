/**
 * TOPCARE AI PLATFORM V2 — HOME DOMAIN RENDERER
 * Path: assets/js/pages/home.renderer.js
 * Status: APPROVED & UPDATED (INTERACTIVE FLOATING BADGES NAVIGATION)
 * SRP: Pure UI Component templates generator with Safe Array Handlers & Fail-safe Imports.
 */

import AssetsRegistry from '../config/assets.registry.js';
import { HOME_DATA } from './home.data.js';

export const HomeRenderer = {
    renderPage() {
        const d = HOME_DATA || {};

        // Ambil ilustrasi utama dengan fallback aman
        const mainImg = (AssetsRegistry && AssetsRegistry.images && AssetsRegistry.images.home && AssetsRegistry.images.home.heroIllustration)
            ? AssetsRegistry.images.home.heroIllustration
            : 'assets/images/features/topcareai_home.webp';

        const partners = Array.isArray(d.partners) ? d.partners : [];
        const features = Array.isArray(d.features) ? d.features : [];
        const stats = Array.isArray(d.stats) ? d.stats : [];
        const articles = Array.isArray(d.articles) ? d.articles : [];

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
                                <a href="#/register" class="tc-btn-hero-primary">Mulai Gratis Sekarang →</a>
                                <a href="#/personality" class="tc-btn-hero-secondary">Tes Kepribadian</a>
                            </div>
                            <div class="tc-hero-members">
                                <div class="tc-member-avatars">
                                    <span class="avatar">👨‍💻</span>
                                    <span class="avatar">👩‍💼</span>
                                    <span class="avatar">👨‍🎨</span>
                                </div>
                                <div class="tc-member-info">
                                    <strong>${d.hero?.memberCount || '10.000+ Member Aktif'}</strong>
                                    <small>${d.hero?.memberNote || 'Bergabung dan mulai perjalananmu hari ini'}</small>
                                </div>
                            </div>
                        </div>

                        <!-- INTERACTIVE HERO VISUAL WITH CLICKABLE BADGES -->
                        <div class="tc-hero-visual">
                            <div class="tc-visual-center-box">
                                <img src="${mainImg}" alt="AI Brain Visual" class="tc-visual-img" width="400" height="400" fetchpriority="high" loading="eager" onerror="this.onerror=null; this.src='assets/images/logos/logo-utama.webp';">
                                
                                <!-- 1. AI Assistant -> Coach AI Chat -->
                                <a href="#/coach" class="tc-floating-badge badge-top-left" style="text-decoration: none; cursor: pointer;">
                                    <span>🤖 AI Assistant</span>
                                    <small>24/7</small>
                                </a>

                                <!-- 2. Personality -> Hub Tes Kepribadian -->
                                <a href="#/personality" class="tc-floating-badge badge-top-right" style="text-decoration: none; cursor: pointer;">
                                    <span>🧠 Personality</span>
                                    <small>4 Tipe</small>
                                </a>

                                <!-- 3. Marketplace -> Halaman Marketplace -->
                                <a href="#/marketplace" class="tc-floating-badge badge-bottom-left" style="text-decoration: none; cursor: pointer;">
                                    <span>🛒 Marketplace</span>
                                    <small>Prompt & Asset</small>
                                </a>

                                <!-- 4. Premium -> Halaman Premium VIP -->
                                <a href="#/premium" class="tc-floating-badge badge-bottom-right" style="text-decoration: none; cursor: pointer;">
                                    <span>👑 Premium</span>
                                    <small>Akses VIP</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- PARTNER LOGOS -->
                <section class="tc-partners-section">
                    <p class="tc-partners-title">Dipercaya oleh Komunitas & Partner Global</p>
                    <div class="tc-partners-logos">
                        ${partners.map(p => `
                            <div class="tc-partner-item">
                                <span class="partner-text">${p.name}</span>
                            </div>
                        `).join('')}
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
                        ${stats.map(s => `
                            <div class="tc-stat-item">
                                <span class="tc-stat-icon">${s.icon}</span>
                                <div class="tc-stat-text">
                                    <strong>${s.num}</strong>
                                    <small>${s.label}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- ARTICLES & PREMIUM SECTION -->
                <section class="tc-section tc-articles-section">
                    <div class="tc-section-header flex-between">
                        <h2>Artikel Terbaru</h2>
                        <a href="#/artikel" class="tc-link-more">Lihat Semua Artikel →</a>
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
                            <p>Dapatkan akses tak terbatas ke semua kursus premium, ebook eksklusif, dan fitur AI advanced.</p>
                            <ul class="tc-promo-list">
                                <li>✓ Akses semua kursus premium</li>
                                <li>✓ Ebook eksklusif setiap bulan</li>
                                <li>✓ AI Assistant priority</li>
                                <li>✓ Sertifikat digital</li>
                            </ul>
                            <a href="#/premium" class="tc-btn-promo">Mulai Premium</a>
                        </div>
                    </div>
                </section>

                <!-- CTA BANNER -->
                <section class="tc-cta-banner-section">
                    <div class="tc-cta-banner-content">
                        <h2>Siap Mengembangkan Potensi Terbaikmu?</h2>
                        <p>Bergabunglah dengan ribuan member TopCare AI dan mulai perjalanan transformasimu hari ini.</p>
                    </div>
                    <a href="#/register" class="tc-btn-cta-banner">Mulai Gratis Sekarang →</a>
                </section>

                <!-- FOOTER -->
                <footer class="tc-main-footer">
                    <div class="tc-footer-container">
                        <div class="tc-footer-col col-brand">
                            <div class="tc-brand-logo">
                                <span class="tc-brand-icon">✨</span>
                                <span>TopCare <strong>AI</strong></span>
                            </div>
                            <p class="tc-brand-desc">Platform AI untuk belajar, berkembang, mengenal diri, dan membangun masa depan.</p>
                            <div class="tc-social-icons">
                                <a href="#" aria-label="Facebook">f</a>
                                <a href="#" aria-label="Instagram">📷</a>
                                <a href="#" aria-label="YouTube">▶</a>
                                <a href="#" aria-label="LinkedIn">in</a>
                                <a href="#" aria-label="TikTok">♪</a>
                            </div>
                        </div>
                        <div class="tc-footer-col">
                            <h4>Platform</h4>
                            <a href="#/learning">Belajar AI</a>
                            <a href="#/personality">Personality Test</a>
                            <a href="#/ebook">Ebook & Library</a>
                            <a href="#/prompt">Prompt Marketplace</a>
                        </div>
                        <div class="tc-footer-col">
                            <h4>Komunitas</h4>
                            <a href="#/community">Community Hub</a>
                            <a href="#/creator">Creator Platform</a>
                            <a href="#/community">Event & Webinar</a>
                            <a href="#/community">Forum Diskusi</a>
                        </div>
                        <div class="tc-footer-col">
                            <h4>Perusahaan</h4>
                            <a href="#/about">Tentang Kami</a>
                            <a href="#/about">Visi & Misi</a>
                            <a href="#/about">Karir</a>
                            <a href="#/about">Kontak</a>
                        </div>
                        <div class="tc-footer-col">
                            <h4>Bantuan</h4>
                            <a href="#/faq">FAQ</a>
                            <a href="#/faq">Panduan</a>
                            <a href="#/about">Kebijakan Privasi</a>
                            <a href="#/about">Syarat & Ketentuan</a>
                        </div>
                        <div class="tc-footer-col col-newsletter">
                            <h4>Newsletter</h4>
                            <p>Dapatkan update terbaru dari TopCare AI langsung ke email Anda.</p>
                            <div class="tc-newsletter-form">
                                <input type="email" placeholder="Masukkan email Anda" aria-label="Masukkan email Anda">
                                <button type="button" aria-label="Kirim Email">→</button>
                            </div>
                        </div>
                    </div>
                    <div class="tc-footer-bottom">
                        <p>© 2026 TopCare AI. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        `;
    }
};

export default HomeRenderer;