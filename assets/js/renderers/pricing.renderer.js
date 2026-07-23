/**
 * TopCare AI Platform V2.0.0
 * Pricing Renderer
 * Path: assets/js/renderers/pricing.renderer.js
 */
import BaseRenderer from './base.renderer.js';
import Logger from '../core/logger.js';

const PricingRenderer = {
    render(data) {
        Logger.info("[PricingRenderer] Rendering pricing markup");
        return `
            <section id="pricing" class="pricing" style="padding: 6rem 2rem; max-width: 1280px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 1rem;">${data.title || 'Pricing'}</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 3rem;">
                    <div class="glass-card" style="padding: 2.5rem; background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;">
                        <h3 style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Starter</h3>
                        <p style="color: #9ca3af; font-size: 1rem; margin-bottom: 1.5rem;">Free tier for personal growth.</p>
                        <div style="font-size: 2rem; font-weight: 800; color: #06b6d4; margin-bottom: 1.5rem;">$0</div>
                        <a href="#cta" class="btn btn-primary" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--gradient-primary); border-radius: 50px; color: white; font-weight: 600;">Get Started</a>
                    </div>
                    <div class="glass-card" style="padding: 2.5rem; background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(37, 99, 235, 0.4); border-radius: 20px; position: relative;">
                        <span style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #2563eb; color: white; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 50px; text-transform: uppercase;">Most Popular</span>
                        <h3 style="color: white; font-size: 1.5rem; margin-bottom: 0.5rem;">Enterprise</h3>
                        <p style="color: #9ca3af; font-size: 1rem; margin-bottom: 1.5rem;">For high-performance scale.</p>
                        <div style="font-size: 2rem; font-weight: 800; color: #06b6d4; margin-bottom: 1.5rem;">Custom</div>
                        <a href="#cta" class="btn btn-primary" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--gradient-primary); border-radius: 50px; color: white; font-weight: 600;">Contact Sales</a>
                    </div>
                </div>
            </section>
        `;
    }
};

export default PricingRenderer;