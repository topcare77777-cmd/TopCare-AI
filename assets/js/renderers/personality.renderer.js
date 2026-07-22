/**
 * TopCare AI Platform V2.0.0
 * Personality Renderer
 * Path: assets/js/renderers/personality.renderer.js
 */

import AssetsConfig from '../config/assets.config.js';

const PersonalityRenderer = {
    render(data) {
        console.log('[Personality Renderer] Mounted');
        console.log("[PersonalityRenderer] HTML generated");
        
        const titleText = data.title || 'Personality Assessment';
        const subtitleText = data.subtitle || '';
        
        const itemsHtml = (data.items || []).map(item => `
            <div class="personality__card">
                <img src="${AssetsConfig.images.featurePersonality}" alt="" class="personality__card-icon" width="32" height="32" loading="lazy" decoding="async" />
                <h3 class="personality__card-title">${item.title || ''}</h3>
                <p class="personality__card-desc">${item.description || ''}</p>
            </div>
        `).join('');

        return `
            <section class="personality">
                <div class="personality__container">
                    <div class="personality__visual">
                        <img src="${AssetsConfig.images.personalityTest}" alt="Personality Test Preview" class="personality__image" width="600" height="400" loading="lazy" decoding="async" />
                    </div>
                    <div class="personality__content">
                        <h2 class="personality__title">${titleText}</h2>
                        <p class="personality__subtitle">${subtitleText}</p>
                        <div class="personality__grid">
                            ${itemsHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export default PersonalityRenderer;