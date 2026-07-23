/**
 * TopCare AI Platform V2.0.0
 * Statistics Module (Using shared Observer utility)
 * Path: assets/js/modules/statistics.module.js
 */

import BaseModule from '../core/base.module.js';
import StatisticsService from '../services/statistics.service.js';
import StatisticsRenderer from '../renderers/statistics.renderer.js';
import StatisticsComponent from '../components/statistics.component.js';
import MotionEngine from '../engine/motion.engine.js';
import CountUp from '../performance/countUp.js';
import Observer from '../performance/observer.js';

class StatisticsModuleClass extends BaseModule {
    constructor() {
        super('Statistics', 'statistics-wrapper');
        this.service = StatisticsService;
        this.renderer = StatisticsRenderer;
        this.component = StatisticsComponent;
    }

    afterMount() {
        MotionEngine.init();
        
        document.querySelectorAll('.statistics__card').forEach(card => {
            Observer.observe(card, (target, obs) => {
                const valueEl = target.querySelector('.statistics__value');
                if (valueEl && !valueEl.classList.contains('counted')) {
                    valueEl.classList.add('counted');
                    const targetVal = valueEl.getAttribute('data-target');
                    CountUp.animate(valueEl, targetVal, 2000);
                }
                obs.unobserve(target);
            });
        });
    }
}

export default new StatisticsModuleClass();