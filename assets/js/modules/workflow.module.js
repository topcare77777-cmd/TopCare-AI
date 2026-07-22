/**
 * TopCare AI Platform V2.0.0
 * Workflow Module
 * Path: assets/js/modules/workflow.module.js
 */
import BaseModule from '../core/base.module.js';
import WorkflowService from '../services/workflow.service.js';
import WorkflowRenderer from '../renderers/workflow.renderer.js';
import WorkflowComponent from '../components/workflow.component.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';

class WorkflowModuleClass extends BaseModule {
    constructor() {
        super('Workflow', 'workflow-wrapper');
        this.service = WorkflowService;
        this.renderer = WorkflowRenderer;
        this.component = WorkflowComponent;
    }

    afterMount() {
        MotionEngine.init();
        GlowEffect.attach(document.getElementById(this.containerId));
    }
}

export default new WorkflowModuleClass();