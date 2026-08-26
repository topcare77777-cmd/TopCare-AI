/**
 * TOPCARE AI PLATFORM V3 — ADMIN AUDIT VIEW
 * Path: assets/js/admin/modules/admin.audit.view.js
 */

export class AdminAuditView {
    static render() {
        return `
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2rem; text-align: center;">
                <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📜</div>
                <h3 style="font-size: 1.1rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.25rem;">Audit log source belum tersedia.</h3>
                <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Sistem pencatatan log audit database belum diaktifkan.</p>
            </div>
        `;
    }
}