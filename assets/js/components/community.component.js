/**
 * TopCare AI Platform V2.0.0
 * Community Component
 * Path: assets/js/components/community.component.js
 */
import BaseComponent from './base.component.js';
import Logger from '../core/logger.js';

const CommunityComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
        Logger.info("[CommunityComponent] Mounted successfully");
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default CommunityComponent;