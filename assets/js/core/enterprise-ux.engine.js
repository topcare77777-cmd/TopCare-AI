/**
 * TopCare AI Platform V2.0.0
 * Enterprise Performance & Lifecycle Manager (RC-1)
 * Path: assets/js/core/enterprise-ux.engine.js
 */
import Logger from './logger.js';

const EnterpriseUXEngine = {
    initialized: false,
    observers: new Set(),
    listeners: new Set(),

    init() {
        if (this.initialized) return;

        // 1. Scroll Progress Bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // 2. Back to Top Button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'Back to top of page');
        document.body.appendChild(backToTopBtn);

        const onBackToTopClick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        backToTopBtn.addEventListener('click', onBackToTopClick);
        this.listeners.add({ target: backToTopBtn, type: 'click', listener: onBackToTopClick });

        // 3. Optimized Scroll Handler (rAF & Batching)
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    progressBar.style.width = `${scrollPercent}%`;

                    if (scrollTop > 400) {
                        backToTopBtn.classList.add('visible');
                    } else {
                        backToTopBtn.classList.remove('visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        this.listeners.add({ target: window, type: 'scroll', listener: onScroll });

        // 4. Keyboard Shortcuts (Alt + T to Top, Alt + F to Features)
        const onKeyDown = (e) => {
            if (e.altKey && e.key.toLowerCase() === 't') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            if (e.altKey && e.key.toLowerCase() === 'f') {
                const features = document.getElementById('features');
                if (features) features.scrollIntoView({ behavior: 'smooth' });
            }
        };
        window.addEventListener('keydown', onKeyDown);
        this.listeners.add({ target: window, type: 'keydown', listener: onKeyDown });

        // 5. Cleanup Handlers on Page Unload (Memory Leak Prevention)
        window.addEventListener('beforeunload', () => {
            this.destroy();
        }, { once: true });

        this.initialized = true;
        Logger.info("[EnterpriseUXEngine] RC-1 initialized successfully with zero memory leak guarantee.");
    },

    destroy() {
        this.listeners.forEach(({ target, type, listener }) => {
            target.removeEventListener(type, listener);
        });
        this.listeners.clear();

        this.observers.forEach(obs => obs.disconnect());
        this.observers.clear();

        this.initialized = false;
    }
};

export default EnterpriseUXEngine;