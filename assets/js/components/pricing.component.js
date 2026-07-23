/**
 * TopCare AI Platform V2.0.0
 * Pricing Component
 * Path: assets/js/components/pricing.component.js
 */
import BaseComponent from './base.component.js';
import Logger from '../core/logger.js';

const PricingComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
        Logger.info("[PricingComponent] Mounted successfully");
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default PricingComponent;