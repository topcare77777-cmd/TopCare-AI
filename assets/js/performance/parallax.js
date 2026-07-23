/**
 * TopCare AI Platform V2.0.0
 * Mouse Parallax Effect (Initialization Guard)
 * Path: assets/js/core/parallax.js
 */
import Logger from '../core/logger.js';

const Parallax = {
    initialized: false,

    init() {
        if (this.initialized) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            const elements = document.querySelectorAll('[data-parallax]');
            elements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 1;
                el.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
            });
        });

        this.initialized = true;
        Logger.info("[Parallax] Initialized.");
    }
};

export default Parallax;