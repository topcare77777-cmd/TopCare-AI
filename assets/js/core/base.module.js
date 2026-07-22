/**
 * TopCare AI Platform V2.0.0
 * Base Module Class
 * Path: assets/js/core/base.module.js
 */

import PerformanceMonitor from './performance.monitor.js';

export default class BaseModule {
    constructor(name, containerId) {
        this.name = name;
        this.containerId = containerId;
        this.service = null;
        this.renderer = null;
        this.component = null;
    }

    async init() {
        PerformanceMonitor.start(this.name);
        try {
            console.log(`[${this.name}Module] Initialized`);
            const data = await this.loadData();
            if (data) {
                this.render(data);
            }
            this.afterMount();
        } catch (error) {
            console.error(`[${this.name}Module] Error in init:`, error);
            this.handleError(error);
        } finally {
            PerformanceMonitor.end(this.name);
        }
    }

    async loadData() {
        if (!this.service || typeof this.service.load !== 'function') {
            return null;
        }
        console.log(`[${this.name}Service] Data received`);
        return await this.service.load();
    }

    render(data) {
        if (!this.renderer || !this.component) return;
        const html = this.renderer.render(data);
        this.mount(html);
    }

    mount(html) {
        if (this.component && typeof this.component.mount === 'function') {
            this.component.mount(this.containerId, html);
        }
    }

    afterMount() {
        // Lifecycle hook after mounting
    }

    destroy() {
        if (this.component && typeof this.component.destroy === 'function') {
            this.component.destroy(this.containerId);
        }
    }

    handleError(error) {
        if (this.component && typeof this.component.mount === 'function') {
            const errorHtml = `<div class="module-error-fallback" style="padding: 2rem; text-align: center; color: #9ca3af;"><p>Unable to load ${this.name} module content.</p></div>`;
            this.component.mount(this.containerId, errorHtml);
        }
    }
}