/**
 * TopCare AI Platform V2.0.0
 * Enterprise Dashboard Component
 * Path: assets/js/components/dashboard.component.js
 */

import BaseComponent from '../core/base.component.js';
import Logger from '../core/logger.js';

const DashboardComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
        Logger.info("[DashboardComponent] Component mounted");
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default DashboardComponent;