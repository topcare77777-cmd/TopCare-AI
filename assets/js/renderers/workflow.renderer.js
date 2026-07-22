/**
 * TopCare AI Platform V2.0.0
 * AI Workflow Renderer (Section 4)
 * Path: assets/js/renderers/workflow.renderer.js
 */
import BaseRenderer from '../core/base.renderer.js';
import Logger from '../core/logger.js';

const WorkflowRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[WorkflowRenderer] HTML generated");

        const tagText = BaseRenderer.sanitize(data.tag || 'Seamless Execution');
        const titleText = BaseRenderer.sanitize(data.title || 'How TopCare AI Works');

        const stepsHtml = (data.steps || []).map((step, index) => `
            <div class="workflow__step glass-card" data-animate="fade-up" style="transition-delay: ${index * 150}ms;">
                <div class="workflow__step-number">0${index + 1}</div>
                <h3 class="workflow__step-title">${BaseRenderer.sanitize(step.title || '')}</h3>
                <p class="workflow__step-desc">${BaseRenderer.sanitize(step.description || '')}</p>
            </div>
        `).join('');

        return `
            <section id="workflow" class="workflow">
                <div class="workflow__container">
                    <div class="workflow__header" data-animate="fade-up">
                        <span class="workflow__tag">${tagText}</span>
                        <h2 class="workflow__title">${titleText}</h2>
                    </div>
                    <div class="workflow__timeline">
                        <div class="workflow__line"></div>
                        ${stepsHtml}
                    </div>
                </div>
            </section>
        `;
    }
};

export default WorkflowRenderer;