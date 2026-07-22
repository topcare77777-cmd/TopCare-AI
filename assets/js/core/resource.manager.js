/**
 * TopCare AI Platform V2.0.0
 * Resource Manager
 * Path: assets/js/core/resource.manager.js
 */
import Logger from './logger.js';

const ResourceManager = {
    cache: new Map(),

    preloadImage(src) {
        if (this.cache.has(src)) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                this.cache.set(src, img);
                resolve();
            };
            img.onerror = reject;
        });
    },

    prefetch(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
        Logger.info(`[ResourceManager] Prefetched: ${url}`);
    }
};

export default ResourceManager;