/**
 * TopCare AI Platform V2.0.0
 * CTA Component
 * Path: assets/js/components/cta.component.js
 */

import BaseComponent from '../core/base.component.js';

const CtaComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default CtaComponent;