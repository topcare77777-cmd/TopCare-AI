/**
 * TopCare AI Platform V2.0.0
 * Generic Intersection Observer Utility (Shared Observer)
 * Path: assets/js/core/observer.js
 */
import Logger from '../core/logger.js';

const Observer = {
    sharedObserver: null,
    callbacks: new Map(),

    getObserver() {
        if (!this.sharedObserver) {
            this.sharedObserver = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cb = this.callbacks.get(entry.target);
                        if (cb) {
                            cb(entry.target, observerInstance);
                        }
                    }
                });
            }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
        }
        return this.sharedObserver;
    },

    observe(element, callback) {
        if (!element) return;
        const obs = this.getObserver();
        if (callback) {
            this.callbacks.set(element, callback);
        }
        obs.observe(element);
        Logger.info("[Observer] Element registered for observation.");
    },

    unobserve(element) {
        if (!element) return;
        if (this.sharedObserver) {
            this.sharedObserver.unobserve(element);
        }
        this.callbacks.delete(element);
    }
};

export default Observer;