/**
 * TopCare AI Platform V2.0.0
 * Showcase Module
 * Path: assets/js/modules/showcase.module.js
 */
import BaseModule from '../core/base.module.js';
import ShowcaseService from '../services/showcase.service.js';
import ShowcaseRenderer from '../renderers/showcase.renderer.js';
import ShowcaseComponent from '../components/showcase.component.js';
import Logger from '../core/logger.js';

class ShowcaseModuleClass extends BaseModule {
    constructor() {
        super('Showcase', 'showcase-wrapper');
        this.service = ShowcaseService;
        this.renderer = ShowcaseRenderer;
        this.component = ShowcaseComponent;
    }

    afterMount() {
        Logger.info("[ShowcaseModule] Mounted successfully.");
    }
}

export default new ShowcaseModuleClass();