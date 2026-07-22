/**
 * TopCare AI Platform V2.0.0
 * About Renderer
 * Path: assets/js/renderers/about.renderer.js
 */

const AboutRenderer = {
    render(data) {
        console.log('[About Renderer] Mounted');
        
        const titleText = data.title || 'About TopCare AI';
        const subtitleText = data.subtitle || '';
        
        const featuresHtml = (data.features || []).map(feature => `
            <div class="about-feature-card">
                <h3>${feature.title || ''}</h3>
                <p>${feature.description || ''}</p>
            </div>
        `).join('');

        const html = `
            <section class="about-section">
                <div class="about__container">
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

        console.log("[AboutRenderer] HTML generated");
        return html;
    }
};

export default AboutRenderer;