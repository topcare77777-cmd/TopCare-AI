/**
 * TopCare AI Platform V2.0.0
 * Showcase Module
 * Path: assets/js/modules/showcase.module.js
 */
import BaseModule from '../core/base.module.js';
import ShowcaseService from '../services/showcase.service.js';
import ShowcaseRenderer from '../renderers/showcase.renderer.js';
import ShowcaseComponent from '../components/showcase.component.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';

class ShowcaseModuleClass extends BaseModule {
    constructor() {
        super('Showcase', 'showcase-wrapper');
        this.service = ShowcaseService;
        this.renderer = ShowcaseRenderer;
        this.component = ShowcaseComponent;
    }

    afterMount() {
        MotionEngine.init();
        GlowEffect.attach(document.getElementById(this.containerId));

        const tabs = document.querySelectorAll('.showcase__tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetId = e.target.getAttribute('data-tab-target');
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                document.querySelectorAll('.showcase__pane').forEach(p => p.classList.remove('active'));

                e.target.classList.add('active');
                e.target.setAttribute('aria-selected', 'true');
                const targetPane = document.getElementById(targetId);
                if (targetPane) targetPane.classList.add('active');
            });
        });
    }
}

export default new ShowcaseModuleClass();