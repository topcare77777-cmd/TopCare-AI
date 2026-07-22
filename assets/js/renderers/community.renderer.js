/**
 * TopCare AI Platform V2.0.0
 * Community Renderer
 * Path: assets/js/renderers/community.renderer.js
 */

import AssetsConfig from '../config/assets.config.js';

const CommunityRenderer = {
    render(data) {
        console.log('[Community Renderer] Mounted');
        console.log("[CommunityRenderer] HTML generated");

        return `
            <section class="community">
                <div class="community__container">
                    <div class="community__visual">
                        <img src="${AssetsConfig.images.community}" alt="Community preview" class="community__image" width="600" height="400" loading="lazy" decoding="async" />
                    </div>
                    <div class="community__content">
                        <h2 class="community__title">${data.title || 'TopCare Community'}</h2>
                        <p class="community__subtitle">${data.subtitle || 'Bergabunglah dengan ribuan pengguna lainnya.'}</p>
                        <img src="${AssetsConfig.images.featureCommunity}" alt="" class="community__icon" width="40" height="40" loading="lazy" decoding="async" />
                    </div>
                </div>
            </section>
        `;
    }
};

export default CommunityRenderer;