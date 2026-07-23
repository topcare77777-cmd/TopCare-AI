/**
 * TopCare AI Platform V2.0.0
 * Showcase Component
 * Path: assets/js/components/showcase.component.js
 */
import BaseComponent from './base.component.js';
import Logger from '../core/logger.js';

const ShowcaseComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
        Logger.info("[ShowcaseComponent] Mounted successfully");
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default ShowcaseComponent;