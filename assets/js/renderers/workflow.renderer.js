/**
 * TopCare AI Platform V2.0.0
 * Workflow Renderer
 * Path: assets/js/renderers/workflow.renderer.js
 */
import BaseRenderer from './base.renderer.js';
import Logger from '../core/logger.js';

const WorkflowRenderer = {
    render(data) {
        Logger.info("[WorkflowRenderer] Rendering workflow markup");
        return `
            <section id="workflow" class="workflow" style="padding: 5rem 2rem; max-width: 1280px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 1rem;">${data.title || 'Workflow'}</h2>
                <p style="color: #9ca3af; font-size: 1.125rem;">Seamless neural orchestration for your enterprise pipelines.</p>
            </section>
        `;
    }
};

export default WorkflowRenderer;