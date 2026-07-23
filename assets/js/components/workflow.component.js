/**
 * TopCare AI Platform V2.0.0
 * Workflow Component
 * Path: assets/js/components/workflow.component.js
 */
import BaseComponent from './base.component.js';
import Logger from '../core/logger.js';

const WorkflowComponent = {
    mount(containerId, html) {
        BaseComponent.mount(containerId, html);
        Logger.info("[WorkflowComponent] Mounted successfully");
    },
    destroy(containerId) {
        BaseComponent.destroy(containerId);
    }
};

export default WorkflowComponent;