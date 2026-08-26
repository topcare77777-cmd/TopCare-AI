/**
 * TOPCARE AI PLATFORM V3 — ADMIN HEALTH VIEW
 * Path: assets/js/admin/modules/admin.health.view.js
 */

export class AdminHealthView {
    static render(healthState = {}) {
        const getBadge = (status) => {
            switch (status) {
                case 'ONLINE':
                    return `<span style="padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800; background: rgba(34, 197, 94, 0.2); color: #4ade80;">ONLINE</span>`;
                case 'OFFLINE':
                    return `<span style="padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800; background: rgba(239, 68, 68, 0.2); color: #f87171;">OFFLINE</span>`;
                case 'NOT VERIFIED':
                    return `<span style="padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800; background: rgba(234, 179, 8, 0.2); color: #eab308;">NOT VERIFIED</span>`;
                default:
                    return `<span style="padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 800; background: rgba(148, 163, 184, 0.2); color: #94a3b8;">UNKNOWN</span>`;
            }
        };

        const checks = [
            { name: 'Browser Connectivity', status: healthState.browser || (navigator.onLine ? 'ONLINE' : 'OFFLINE') },
            { name: 'Authentication Session', status: healthState.auth || 'NOT VERIFIED' },
            { name: 'Platform Configuration Retrieval', status: healthState.config || 'NOT VERIFIED' },
            { name: 'User Repository Retrieval', status: healthState.userRepo || 'NOT VERIFIED' },
            { name: 'Router Availability', status: healthState.router || 'NOT VERIFIED' }
        ];

        return `
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 1.75rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0 0 1rem 0;">🛡️ System Health (Evaluasi Nyata)</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                    ${checks.map(c => `
                        <div style="background: rgba(30, 41, 59, 0.6); padding: 1rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #cbd5e1; font-size: 0.9rem;">${c.name}</span>
                            ${getBadge(c.status)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}