/**
 * TopCare AI Platform V2.0.0
 * Hero Renderer (BUILD 025 Enterprise Visual Restoration)
 * Path: assets/js/renderers/hero.renderer.js
 */

import AssetsRegistry from '../config/assets.registry.js';
import ImageHelper from '../helpers/image.helper.js';
import BaseRenderer from '../core/base.renderer.js';
import Logger from '../core/logger.js';

const HeroRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[HeroRenderer] Rendered with BUILD 025 full visual specifications");

        ImageHelper.preloadHeroImage(AssetsRegistry.hero.main);

        const badgeText = BaseRenderer.sanitize(data.badge?.text || 'Platform AI #1 untuk Belajar & Berkembang');
        const titleText = BaseRenderer.sanitize(data.title || 'Bangun Potensi Dirimu Bersama TopCare AI');
        const subtitleText = BaseRenderer.sanitize(data.subtitle || 'Platform AI untuk belajar, mengenal diri, dan membangun masa depan yang lebih baik bersama komunitas global.');

        return `
            <section id="hero" class="hero" style="background-image: url('${AssetsRegistry.hero.mesh}'); background-size: cover; background-position: center; position: relative;">
                <div class="hero__aurora-bg" aria-hidden="true">
                    <img src="${AssetsRegistry.hero.glow}" alt="" class="hero__glow" />
                </div>
                
                <div class="hero__container">
                    <div class="hero__content" data-animate="fade-right">
                        <div class="hero__badge glass-card">
                            <span class="badge-dot" aria-hidden="true"></span>
                            <span>${badgeText}</span>
                        </div>
                        
                        <h1 class="hero__title">${titleText}</h1>
                        <p class="hero__subtitle">${subtitleText}</p>
                        
                        <div class="hero__buttons">
                            <a href="#cta" class="btn btn-primary" style="padding: 0.75rem 1.5rem; background: var(--gradient-primary); border-radius: 50px; color: white; font-weight: 600;">Mulai Gratis Sekarang →</a>
                            <a href="#features" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50px; color: white; font-weight: 600;">Pelajari Lebih Lanjut</a>
                        </div>
                        
                        <div class="hero__social-proof" style="display: flex; align-items: center; gap: 1rem; margin-top: 1.5rem;">
                            <div style="display: flex;">
                                <img src="${AssetsRegistry.creator.image1}" alt="" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #030712;" />
                                <img src="${AssetsRegistry.creator.image2}" alt="" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #030712; margin-left: -10px;" />
                                <img src="${AssetsRegistry.profile.founder}" alt="" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #030712; margin-left: -10px;" />
                            </div>
                            <div>
                                <strong style="color: white; font-size: 0.875rem;">10.000+ Member Aktif</strong>
                                <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Bergabung dan mulai perjalananmu hari ini</p>
                            </div>
                        </div>
                    </div>

                    <div class="hero__preview" data-animate="fade-left">
                        <img src="${AssetsRegistry.hero.main}" alt="TopCare AI Neural Core" class="hero__image" fetchpriority="high" loading="eager" decoding="async" />
                        
                        <div class="dashboard">
                            <div class="dashboard__header">
                                <span class="dashboard__dot dashboard__dot--red"></span>
                                <span class="dashboard__dot dashboard__dot--yellow"></span>
                                <span class="dashboard__dot dashboard__dot--green"></span>
                                <span style="margin-left: 0.5rem; font-family: monospace; font-size: 0.75rem;">platform.topcare.ai/secure/workspace</span>
                            </div>
                            <div class="dashboard__body">
                                <div class="dashboard__card">
                                    <div class="dashboard__card-icon">⚡</div>
                                    <div>
                                        <div class="dashboard__card-title">AI Assistant 24/7</div>
                                        <div class="dashboard__card-desc">Zero Latency Neural Inference</div>
                                    </div>
                                </div>
                                <div class="dashboard__card">
                                    <div class="dashboard__card-icon">🧠</div>
                                    <div>
                                        <div class="dashboard__card-title">Personality Test</div>
                                        <div class="dashboard__card-desc">4 Temperaments Analyzed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export default HeroRenderer;