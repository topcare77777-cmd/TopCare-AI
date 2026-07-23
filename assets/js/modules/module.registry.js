/**
 * TopCare AI Platform V2.0.0
 * Module Registry
 * Path: assets/js/modules/module.registry.js
 */

import HeroModule from './hero.module.js';
import FeaturesModule from './features.module.js';
import ArticleModule from './article.module.js';
import DashboardModule from './dashboard.module.js';
import CtaModule from './cta.module.js';
import FooterModule from './footer.module.js';
import Logger from '../core/logger.js';

const ModuleRegistry = {
    modules: new Map(),

    async init() {
        Logger.info("[ModuleRegistry] Registering enterprise modules...");
        
        this.register('hero', HeroModule);
        this.register('features', FeaturesModule);
        this.register('article', ArticleModule);
        this.register('dashboard', DashboardModule);
        this.register('cta', CtaModule);
        this.register('footer', FooterModule);

        Logger.info(`[ModuleRegistry] Successfully registered ${this.modules.size} modules.`);
    },

    register(name, moduleInstance) {
        this.modules.set(name, moduleInstance);
    },

    get(name) {
        return this.modules.get(name);
    }
};

export default ModuleRegistry;