/**
 * TopCare AI Platform V2.0.0
 * Motion Engine (Single Persistent IntersectionObserver)
 * Path: assets/js/core/motion.engine.js
 */
import Logger from './logger.js';

const MotionEngine = {
    observer: null,
    initialized: false,

    init() {
        if (this.initialized) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        document.documentElement.classList.add('motion-safe');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => this.observer.observe(el));
        this.initialized = true;
        Logger.info("[MotionEngine] Initialized with persistent observer.");
    },

    observe(element) {
        if (this.observer && element instanceof Element) {
            this.observer.observe(element);
        }
    }
};

export default MotionEngine;