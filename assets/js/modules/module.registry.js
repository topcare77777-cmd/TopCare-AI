/**
 * TopCare AI Platform V2.0.0
 * Module Registry
 * Path: assets/js/modules/module.registry.js
 */

import ModuleLoader from '../core/module-loader.js';

import HeroModule from './hero.module.js';
import AboutModule from './about.module.js';
import PersonalityModule from './personality.module.js';
import LearningModule from './learning.module.js';

const HOMEPAGE_MODULES = [
    { name: 'hero', module: HeroModule },
    { name: 'about', module: AboutModule },
    { name: 'personality', module: PersonalityModule },
    { name: 'learning', module: LearningModule }
];

const ModuleRegistry = {
    async init() {
        console.log('[ModuleRegistry] Initializing modules...');

        for (const item of HOMEPAGE_MODULES) {
            if (item.module) {
                await ModuleLoader.load(item.name, item.module);
            }
        }
    }
};

export default ModuleRegistry;