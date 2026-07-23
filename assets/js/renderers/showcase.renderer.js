/**
 * TopCare AI Platform V2.0.0
 * Showcase Renderer
 * Path: assets/js/renderers/showcase.renderer.js
 */
import BaseRenderer from './base.renderer.js';
import Logger from '../core/logger.js';

const ShowcaseRenderer = {
    render(data) {
        Logger.info("[ShowcaseRenderer] Rendering showcase markup");
        return `
            <section id="showcase" class="showcase" style="padding: 5rem 2rem; max-width: 1280px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 1rem;">${data.title || 'Showcase'}</h2>
                <p style="color: #9ca3af; font-size: 1.125rem;">Explore real-world enterprise implementations powered by TopCare AI.</p>
            </section>
        `;
    }
};

export default ShowcaseRenderer;