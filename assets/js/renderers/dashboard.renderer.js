/**
 * TopCare AI Platform V2.0.0
 * Enterprise Dashboard Renderer
 * Path: assets/js/renderers/dashboard.renderer.js
 */

import BaseRenderer from '../core/base.renderer.js';
import Logger from '../core/logger.js';

const DashboardRenderer = {
    render(data) {
        if (!data) return '';
        Logger.info("[DashboardRenderer] Rendering enterprise dashboard interface");

        const metricsHtml = (data.metrics || []).map(m => `
            <div class="dashboard__metric-card glass-card" data-animate="fade-up">
                <span class="metric-label">${BaseRenderer.sanitize(m.label)}</span>
                <h3 class="metric-value">${BaseRenderer.sanitize(m.value)}</h3>
                <span class="metric-status">${BaseRenderer.sanitize(m.status)}</span>
            </div>
        `).join('');

        const activityHtml = (data.recentActivity || []).map(a => `
            <div class="dashboard__activity-row">
                <span class="activity-task">${BaseRenderer.sanitize(a.task)}</span>
                <span class="activity-time">${BaseRenderer.sanitize(a.time)}</span>
                <span class="activity-badge">${BaseRenderer.sanitize(a.status)}</span>
            </div>
        `).join('');

        return `
            <section class="enterprise-dashboard" aria-label="Enterprise Dashboard">
                <div class="dashboard__container">
                    <div class="dashboard__header" data-animate="fade-up">
                        <h2>${BaseRenderer.sanitize(data.title)}</h2>
                        <p>Real-time telemetry and cluster management interface.</p>
                    </div>
                    <div class="dashboard__metrics-grid">
                        ${metricsHtml}
                    </div>
                    <div class="dashboard__activity-section glass-card" data-animate="fade-up">
                        <h4>Operational Audit Log</h4>
                        <div class="dashboard__activity-list">
                            ${activityHtml}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

export default DashboardRenderer;