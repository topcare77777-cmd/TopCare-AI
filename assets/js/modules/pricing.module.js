/**
 * TopCare AI Platform V2.0.0
 * Pricing Module
 * Path: assets/js/modules/pricing.module.js
 */
import BaseModule from '../core/base.module.js';
import PricingService from '../services/pricing.service.js';
import PricingRenderer from '../renderers/pricing.renderer.js';
import PricingComponent from '../components/pricing.component.js';
import Logger from '../core/logger.js';

class PricingModuleClass extends BaseModule {
    constructor() {
        super('Pricing', 'pricing-wrapper');
        this.service = PricingService;
        this.renderer = PricingRenderer;
        this.component = PricingComponent;
    }

    afterMount() {
        Logger.info("[PricingModule] Mounted successfully.");
    }
}

export default new PricingModuleClass();