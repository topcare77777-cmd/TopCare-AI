/**
 * file: assets/js/components/auth/session.status.js
 * Version: 132.0.0
 * Status: APPROVED
 * SRP: Renders realtime session validity, expiration timer, and token state.
 */

export class SessionStatus {
    /**
     * @param {Object} session
     * @param {Object} token
     */
    constructor(session, token) {
        this.session = session;
        this.token = token;
        Object.seal(this);
    }

    render() {
        if (!this.session) {
            return `<div class="tc-session-status tc-status-none" style="color: #ef4444; font-size: 12px;">⚠️ No Active Session</div>`;
        }

        const isExpired = this.session.isExpired;
        const expiresAtStr = new Date(this.session.expiresAt).toLocaleTimeString();
        const statusBg = isExpired ? '#fee2e2' : '#f0fdf4';
        const statusColor = isExpired ? '#991b1b' : '#166534';
        const statusLabel = isExpired ? 'EXPIRED' : 'ACTIVE SESSION';

        return `
            <div class="tc-session-status-card" style="background-color: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusColor}33; padding: 10px 12px; border-radius: 6px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <strong>Status: ${statusLabel}</strong>
                    <span style="font-family: monospace;">ID: ${this.session.sessionId}</span>
                </div>
                <div style="display: flex; gap: 16px; color: #475569; font-size: 11px;">
                    <span>Expires At: <strong>${expiresAtStr}</strong></span>
                    <span>Device: <strong>${this.session.deviceId || 'Browser'}</strong></span>
                    <span>Token: <strong>${this.token?.tokenType || 'Bearer'}</strong></span>
                </div>
            </div>
        `;
    }
}