/**
 * TopCare AI Platform V2.0.0
 * Learning Renderer
 * Path: assets/js/renderers/learning.renderer.js
 */

import AssetsConfig from '../config/assets.config.js';

const LearningRenderer = {
    render(data) {
        console.log("[Learning Renderer] Mounted");
        console.log("[LearningRenderer] HTML generated");
        
        const titleText = data.title || 'Learning Center';
        const subtitleText = data.subtitle || '';
        
        const coursesHtml = (data.courses || []).map(course => `
            <div class="learning__card">
                <img src="${AssetsConfig.images.featureLearning}" alt="" class="learning__card-icon" width="28" height="28" loading="lazy" decoding="async" />
                <h3 class="learning__card-title">${course.title || ''}</h3>
                <p class="learning__card-desc">${course.description || ''}</p>
            </div>
        `).join('');

        return `
            <section class="learning">
                <div class="learning__container">
                    <div class="learning__visual">
                        <img src="${AssetsConfig.images.learningCenter}" alt="Learning Center Banner" class="learning__image" width="600" height="400" loading="lazy" decoding="async" />
                    </div>
                    <div class="learning__content">
                        <h2 class="learning__title">${titleText}</h2>
                        <p class="learning__subtitle">${subtitleText}</p>
                        <div class="learning__grid">
                            ${coursesHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export default LearningRenderer;