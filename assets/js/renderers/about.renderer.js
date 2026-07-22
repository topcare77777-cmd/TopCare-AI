/**
 * TopCare AI Platform V2.0.0
 * About Renderer
 * Path: assets/js/renderers/about.renderer.js
 */

import AssetsConfig from '../config/assets.config.js';

const AboutRenderer = {
    render(data) {
        console.log('[About Renderer] Mounted');
        console.log("[AboutRenderer] HTML generated");
        
        const titleText = data.title || 'About TopCare AI';
        const subtitleText = data.subtitle || '';
        
        const featuresHtml = (data.features || []).map(feature => `
            <div class="about__feature-card">
                <h3 class="about__feature-title">${feature.title || ''}</h3>
                <p class="about__feature-desc">${feature.description || ''}</p>
            </div>
        `).join('');

        return `
            <section class="about">
                <div class="about__container">
                    <div class="about__visual">
                        <img src="${AssetsConfig.images.aboutTeam}" alt="About Team Illustration" class="about__image" loading="lazy" decoding="async" width="600" height="400" />
                    </div>
                    <div class="about__content">
                        <h2 class="about__title">${titleText}</h2>
                        <p class="about__subtitle">${subtitleText}</p>
                        <div class="about__features">
                            ${featuresHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export default AboutRenderer;