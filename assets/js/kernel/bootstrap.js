/**
 * TopCare AI Platform V2.0.0
 * Bootstrap Module
 * Path: assets/js/kernel/bootstrap.js
 */

import PageEngine from '../pages/page.engine.js';
import ModuleRegistry from '../modules/module.registry.js';
import Router from '../framework/router.js';

export const Bootstrap = {
    async run() {
        console.log('[Bootstrap] Running platform boot sequence...');

        // 1. Initialize Page Engine to create Homepage Layout before modules run
        if (typeof PageEngine !== 'undefined' && typeof PageEngine.createHomepageLayout === 'function') {
            PageEngine.createHomepageLayout();
        }

        // 2. Loading Module Registry
        console.log('[Bootstrap] Loading Module Registry...');
        if (typeof ModuleRegistry !== 'undefined' && typeof ModuleRegistry.init === 'function') {
            await ModuleRegistry.init();
        }

        // 3. Initialize Router safely
        if (typeof Router !== 'undefined') {
            if (typeof Router.start === 'function') {
                Router.start();
            } else if (typeof Router.init === 'function') {
                Router.init();
            }
        }

        console.log('[Bootstrap] Boot sequence completed.');
    }
};

export default Bootstrap;