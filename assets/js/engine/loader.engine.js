/**
 * TopCare AI Platform V2.0.0
 * Loader Engine
 * Path: assets/js/core/loader.engine.js
 */
const LoaderEngine = {
    showFullscreen() {
        let loader = document.getElementById('global-fullscreen-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'global-fullscreen-loader';
            loader.style.cssText = 'position:fixed;inset:0;background:var(--color-bg-primary);z-index:99999;display:flex;align-items:center;justify-content:center;transition:opacity var(--transition-normal);';
            loader.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(loader);
        }
        loader.style.opacity = '1';
        loader.style.pointerEvents = 'auto';
    },

    hideFullscreen() {
        const loader = document.getElementById('global-fullscreen-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
        }
    }
};

export default LoaderEngine;