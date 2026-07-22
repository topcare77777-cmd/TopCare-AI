/**
 * TopCare AI Platform V2.0.0
 * Assistant Renderer
 * Path: assets/js/renderers/assistant.renderer.js
 */

import AssetsConfig from '../config/assets.config.js';

const AssistantRenderer = {
    render(data) {
        console.log('[Assistant Renderer] Mounted');
        console.log("[AssistantRenderer] HTML generated");

        return `
            <section class="assistant">
                <div class="assistant__container">
                    <div class="assistant__content">
                        <img src="${AssetsConfig.images.featureAiAssistant}" alt="" class="assistant__icon" width="48" height="48" loading="lazy" decoding="async" />
                        <h2 class="assistant__title">${data.title || 'AI Assistant'}</h2>
                        <p class="assistant__subtitle">${data.subtitle || 'Asisten pintar siap membantu Anda 24/7.'}</p>
                    </div>
                    <div class="assistant__preview">
                        <img src="${AssetsConfig.images.aiAssistant}" alt="AI Assistant Interface" class="assistant__image" width="600" height="400" loading="lazy" decoding="async" />
                    </div>
                </div>
            </section>
        `;
    }
};

export default AssistantRenderer;