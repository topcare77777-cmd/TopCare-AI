/**
 * TopCare AI Platform V2.0.0
 * Footer Component
 * Path: assets/js/components/footer.component.js
 */

import BaseComponent from '../core/base.component.js';

const FooterComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default FooterComponent;