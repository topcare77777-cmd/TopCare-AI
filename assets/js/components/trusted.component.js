/**
 * TopCare AI Platform V2.0.0
 * Trusted Component
 * Path: assets/js/components/trusted.component.js
 */

import BaseComponent from '../core/base.component.js';

const TrustedComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default TrustedComponent;