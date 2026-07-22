/**
 * TopCare AI Platform V2.0.0
 * Page Engine
 * Path: assets/js/pages/page.engine.js
 */

const PageEngine = {
    createHomepageLayout() {
        const root = document.getElementById('app') || document.body;
        
        // Cek apakah #app-container sudah ada agar tidak duplikat
        let appContainer = document.getElementById('app-container');
        if (!appContainer) {
            appContainer = document.createElement('div');
            appContainer.id = 'app-container';
            root.appendChild(appContainer);
        }

        // Buat section hero-wrapper di dalam app-container
        if (!document.getElementById('hero-wrapper')) {
            const heroSection = document.createElement('section');
            heroSection.id = 'hero-wrapper';
            appContainer.appendChild(heroSection);
        }

        console.log('[PageEngine] Homepage Created');
    }
};

export default PageEngine;