/**
 * TopCare AI Platform V2.0.0
 * Module Registry
 * Path: assets/js/modules/module.registry.js
 */

import ModuleLoader from '../core/module-loader.js';
import HeroModule from './hero.module.js';
import AboutModule from './about.module.js';

const ModuleRegistry = {
    modules: {
        hero: HeroModule,
        about: AboutModule
    },

    async init() {
        console.log('[ModuleRegistry] Initializing modules...');
        
        if (this.modules.hero) {
            await ModuleLoader.load('hero', this.modules.hero);
        }

        if (this.modules.about) {
            await ModuleLoader.load('about', this.modules.about);
        }
    }
};

export default ModuleRegistry;