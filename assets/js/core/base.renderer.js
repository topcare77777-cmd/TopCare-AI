/**
 * TopCare AI Platform V2.0.0
 * Base Renderer (Centralized sanitization, HTML escaping, and safe URL helpers)
 * Path: assets/js/core/base.renderer.js
 */
import Logger from './logger.js';

const BaseRenderer = {
    sanitize(str) {
        if (typeof str !== 'string') return str;
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    escapeHTML(str) {
        return this.sanitize(str);
    },

    safeURL(url) {
        if (typeof url !== 'string') return '#';
        const trimmed = url.trim();
        if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) {
            Logger.warn(`[BaseRenderer] Unsafe URL blocked: ${url}`);
            return '#';
        }
        return this.sanitize(trimmed);
    },

    renderSection(className, contentHtml) {
        return `<section class="${this.sanitize(className)}">${contentHtml}</section>`;
    }
};

export default BaseRenderer;