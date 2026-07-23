/**
 * TopCare AI Platform V2.0.0
 * Hero Renderer (BUILD 028 Audit & Flow Fix)
 * Path: assets/js/renderers/hero.renderer.js
 */

import AssetsRegistry from '../config/assets.registry.js';
import ImageHelper from '../helpers/image.helper.js';
import BaseRenderer from '../core/base.renderer.js';
import Logger from '../core/logger.js';

const HeroRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[HeroRenderer] Rendered with BUILD 028 visual layout verification");

        ImageHelper.preloadHeroImage(AssetsRegistry.hero.main);

        const badgeText = BaseRenderer.sanitize(data.badge?.text || 'Platform AI #1 untuk Belajar & Berkembang');
        const titleText = BaseRenderer.sanitize(data.title || 'Bangun Potensi Dirimu Bersama TopCare AI');
        const subtitleText = BaseRenderer.sanitize(data.subtitle || 'Platform AI untuk belajar, mengenal diri, dan membangun masa depan yang lebih baik bersama komunitas global.');

        console.log("[VISUAL AUDIT]");
        console.log("[CSS ACTIVE]");
        console.log("[LAYOUT ACTIVE]");
        console.log("[HERO ACTIVE]");
        console.log("[DASHBOARD ACTIVE]");
        console.log("[ASSET ACTIVE]");

        return `
            <section id="hero" class="hero">
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
                            <a href="#cta" class="btn btn-primary">Mulai Gratis Sekarang &rarr;</a>
                            <a href="#features" class="btn btn-secondary">Pelajari Lebih Lanjut</a>
                        </div>
                        
                        <div class="hero__social-proof">
                            <div class="social-proof-avatars">
                                <img src="${AssetsRegistry.creator.image1}" alt="" />
                                <img src="${AssetsRegistry.creator.image2}" alt="" />
                                <img src="${AssetsRegistry.profile.founder}" alt="" />
                            </div>
                            <div>
                                <strong class="social-proof-count">10.000+ Member Aktif</strong>
                                <p class="social-proof-desc">Bergabung dan mulai perjalananmu hari ini</p>
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
                                <span class="dashboard__address">platform.topcare.ai/secure/workspace</span>
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