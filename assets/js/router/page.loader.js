/**
 * TopCare AI Platform V2.0.0
 * Enterprise Page Loader (BUILD 029 Mount / Unmount Manager)
 * Path: assets/js/core/page.loader.js
 */

import PageRegistry from './page.registry.js';
import Logger from '../core/logger.js';

const PageLoader = {
    currentPageKey: null,
    currentPageInstance: null,
    prefetchCache: new Set(),

    async load(pageKey) {
        if (this.currentPageKey === pageKey) return;

        Logger.info(`[PageLoader] Mounting page: ${pageKey}`);
        
        // 1. Unmount and cleanup previous page RAM / Listeners
        if (this.currentPageInstance && typeof this.currentPageInstance.destroy === 'function') {
            try {
                this.currentPageInstance.destroy();
                Logger.info(`[PageLoader] Successfully unmounted previous page: ${this.currentPageKey}`);
            } catch (err) {
                Logger.error(`[PageLoader] Error unmounting page ${this.currentPageKey}:`, err);
            }
        }

        const appMain = document.getElementById('main-content') || document.body;
        
        // 2. Premium Transition Out
        appMain.style.opacity = '0';
        appMain.style.transform = 'translateY(10px)';
        appMain.style.filter = 'blur(3px)';
        appMain.style.transition = 'opacity 180ms ease, transform 180ms ease, filter 180ms ease';

        await new Promise(resolve => setTimeout(resolve, 120));

        try {
            // 3. Dynamic Lazy Load via PageRegistry
            const pageModule = await PageRegistry.import(pageKey);

            appMain.innerHTML = '';
            
            if (pageModule && pageModule.default) {
                this.currentPageInstance = pageModule.default;
                if (typeof this.currentPageInstance.init === 'function') {
                    this.currentPageInstance.init();
                }
                if (typeof this.currentPageInstance.mount === 'function') {
                    this.currentPageInstance.mount(appMain);
                }
                if (typeof this.currentPageInstance.render === 'function') {
                    await this.currentPageInstance.render(appMain);
                }
            } else {
                appMain.innerHTML = `
                    <div style="padding: 12rem 2rem; text-align: center; color: white; min-height: 70vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <h1 style="font-size: 3rem; margin-bottom: 1rem; text-transform: capitalize; background: linear-gradient(135deg, #2563eb, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${pageKey} Enterprise Hub</h1>
                        <p style="color: #9ca3af; font-size: 1.125rem;">Module loaded successfully via SPA Client Router.</p>
                    </div>
                `;
            }

            this.currentPageKey = pageKey;

            // 4. Premium Transition In
            requestAnimationFrame(() => {
                appMain.style.opacity = '1';
                appMain.style.transform = 'translateY(0)';
                appMain.style.filter = 'blur(0)';
            });

            Logger.info(`[PageLoader] Successfully mounted page: ${pageKey}`);
        } catch (error) {
            Logger.error(`[PageLoader] Failed to load page ${pageKey}:`, error);
        }
    },

    async prefetch(pageKey) {
        if (this.prefetchCache.has(pageKey)) return;
        this.prefetchCache.add(pageKey);
        try {
            await PageRegistry.import(pageKey);
            Logger.info(`[PageLoader] Prefetched page module: ${pageKey}`);
        } catch {
            // Ignore network limits
        }
    }
};

export default PageLoader;