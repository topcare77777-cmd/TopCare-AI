/**
 * TopCare AI Platform V2.0.0
 * Pricing Module with Interactive Toggle Binding
 * Path: assets/js/modules/pricing.module.js
 */

import BaseModule from '../core/base.module.js';
import PricingService from '../services/pricing.service.js';
import PricingRenderer from '../renderers/pricing.renderer.js';
import PricingComponent from '../components/pricing.component.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';

class PricingModuleClass extends BaseModule {
    constructor() {
        super('Pricing', 'pricing-wrapper');
        this.service = PricingService;
        this.renderer = PricingRenderer;
        this.component = PricingComponent;
    }

    afterMount() {
        MotionEngine.init();
        GlowEffect.attach(document.getElementById(this.containerId));

        const toggle = document.getElementById('pricing-toggle');
        const monthlyLabel = document.getElementById('monthly-label');
        const yearlyLabel = document.getElementById('yearly-label');

        if (toggle) {
            toggle.addEventListener('change', (e) => {
                const isYearly = e.target.checked;
                monthlyLabel.classList.toggle('active', !isYearly);
                yearlyLabel.classList.toggle('active', isYearly);

                document.querySelectorAll('.pricing__amount').forEach(el => {
                    const priceVal = el.querySelector('.pricing__price-value');
                    const periodVal = el.querySelector('.pricing__period');
                    if (priceVal) {
                        priceVal.textContent = isYearly ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
                        periodVal.textContent = isYearly ? '/yr' : '/mo';
                    }
                });
            });
        }
    }
}

export default new PricingModuleClass();