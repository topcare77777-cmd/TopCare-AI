/**
 * TopCare AI Platform V2.0.0
 * Accessibility Engine
 * Path: assets/js/core/accessibility.engine.js
 */
import Logger from '../core/logger.js';

const AccessibilityEngine = {
    initialized: false,

    init() {
        if (this.initialized) return;

        // Skip to Content handler
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to content';
        skipLink.className = 'skip-to-content';
        skipLink.style.cssText = 'position:absolute;top:-40px;left:0;background:var(--color-accent-primary);color:white;padding:8px;z-index:100000;transition:top 0.3s;';
        skipLink.addEventListener('focus', () => skipLink.style.top = '0');
        skipLink.addEventListener('blur', () => skipLink.style.top = '-40px');
        document.body.prepend(skipLink);

        this.initialized = true;
        Logger.info("[AccessibilityEngine] Initialized successfully.");
    },

    trapFocus(element) {
        if (!element) return;
        const focusableElements = element.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        element.addEventListener('keydown', handleKeyDown);
        return () => element.removeEventListener('keydown', handleKeyDown);
    }
};

export default AccessibilityEngine;