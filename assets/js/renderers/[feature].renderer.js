/**
 * TopCare AI Platform V2.0.0
 * Feature Renderer Template
 */

const FeatureRenderer = {
    render(data) {
        console.log('[FeatureRenderer] Mounted');
        
        // Transform data object into semantic HTML string
        const html = `
            <div class="feature-content">
                <h2>${data.title || 'Feature Title'}</h2>
                <p>${data.subtitle || ''}</p>
            </div>
        `;

        console.log("[FeatureRenderer] HTML generated");
        return html;
    }
};

export default FeatureRenderer;
