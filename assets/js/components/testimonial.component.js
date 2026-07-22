/**
 * TopCare AI Platform V2.0.0
 * Testimonials Component
 * Path: assets/js/components/testimonials.component.js
 */
import BaseComponent from '../core/base.component.js';
import Logger from '../core/logger.js';

const TestimonialsComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
        Logger.info("[TestimonialsComponent] Mounted successfully");
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default TestimonialsComponent;