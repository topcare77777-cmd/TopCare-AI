/**
 * TopCare AI Platform V2.0.0
 * FAQ Module
 * Path: assets/js/modules/faq.module.js
 */
import BaseModule from '../core/base.module.js';
import FaqService from '../services/faq.service.js';
import FaqRenderer from '../renderers/faq.renderer.js';
import FaqComponent from '../components/faq.component.js';
import MotionEngine from '../engine/motion.engine.js';
import GlowEffect from '../performance/glow.effect.js';

class FaqModuleClass extends BaseModule {
    constructor() {
        super('Faq', 'faq-wrapper');
        this.service = FaqService;
        this.renderer = FaqRenderer;
        this.component = FaqComponent;
    }

    afterMount() {
        MotionEngine.init();
        GlowEffect.attach(document.getElementById(this.containerId));

        const questions = document.querySelectorAll('.faq__question');
        questions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.currentTarget.closest('.faq__item');
                const isActive = item.classList.contains('active');
                
                document.querySelectorAll('.faq__item').forEach(el => {
                    el.classList.remove('active');
                    el.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                });

                if (!isActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
}

export default new FaqModuleClass();