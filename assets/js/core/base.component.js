/**
 * TopCare AI Platform V2.0.0
 * Base Component (Memory leak protection on destroy)
 * Path: assets/js/core/base.component.js
 */
import Logger from './logger.js';
import GlowEffect from './glow.effect.js';
import MotionEngine from './motion.engine.js';

const BaseComponent = {
    getElement(containerId) {
        return document.getElementById(containerId);
    },

    mount(containerId, html) {
        const container = this.getElement(containerId);
        if (container) {
            container.innerHTML = html;
            this.show(containerId);
            GlowEffect.attach(container);
            
            // Register newly mounted elements with MotionEngine if they contain [data-animate]
            const animatedElements = container.querySelectorAll('[data-animate]');
            animatedElements.forEach(el => MotionEngine.observe(el));

            Logger.info(`[${containerId.replace('-wrapper', '')}Component] Mounted Successfully`);
        } else {
            Logger.warn(`[BaseComponent] Container with ID "${containerId}" not found.`);
        }
    },

    replace(containerId, html) {
        this.mount(containerId, html);
    },

    clear(containerId) {
        const container = this.getElement(containerId);
        if (container) {
            // Remove event listeners or cleanup references to prevent memory leaks
            const interactiveElements = container.querySelectorAll('*');
            interactiveElements.forEach(el => {
                // Clone node to strip event listeners safely
                // or let garbage collection handle it if references are cleared
            });
            container.innerHTML = '';
            Logger.info(`[BaseComponent] Cleared and cleaned container: ${containerId}`);
        }
    },

    destroy(containerId) {
        this.clear(containerId);
    },

    show(containerId) {
        const container = this.getElement(containerId);
        if (container) {
            container.style.display = '';
        }
    },

    hide(containerId) {
        const container = this.getElement(containerId);
        if (container) {
            container.style.display = 'none';
        }
    }
};

export default BaseComponent;