/**
 * file: assets/js/components/auth/profile.card.js
 * Version: 132.0.0
 * Status: APPROVED
 * SRP: Renders current user profile card, badges, permissions, and session timer.
 */

import { UserAvatar } from './user.avatar.js';
import { RoleBadge } from './role.badge.js';
import { PermissionBadge } from './permission.badge.js';
import { SessionStatus } from './session.status.js';

export class ProfileCard {
    /**
     * @param {Object} options
     * @param {Object} options.user
     * @param {Object} options.session
     * @param {Object} options.token
     * @param {Function} options.onLogout
     * @param {Function} options.onRefresh
     */
    constructor(options = {}) {
        this.user = options.user;
        this.session = options.session;
        this.token = options.token;
        this.onLogout = options.onLogout || (() => { });
        this.onRefresh = options.onRefresh || (() => { });
        Object.seal(this);
    }

    render() {
        if (!this.user) {
            return `
                <div style="padding: 24px; text-align: center; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <p style="color: #ef4444; margin: 0 0 12px 0;">No active user authenticated.</p>
                    <a href="#login" style="color: #2563eb; font-weight: 600; text-decoration: none;">Go to Login</a>
                </div>
            `;
        }

        const avatar = new UserAvatar({ fullName: this.user.fullName, size: 'lg', status: this.user.status });
        const sessionWidget = new SessionStatus(this.session, this.token);

        return `
            <div class="tc-profile-card" style="width: 100%; max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <div style="display: flex; gap: 16px; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 18px; margin-bottom: 18px;">
                    ${avatar.render()}
                    <div style="text-align: left; flex-grow: 1;">
                        <h2 style="margin: 0 0 4px 0; font-size: 18px; color: #0f172a;">${this.user.fullName}</h2>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 8px;">@${this.user.username} • ${this.user.email}</div>
                        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                            ${(this.user.roles || []).map(r => new RoleBadge(r).render()).join('')}
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 18px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #334155; text-align: left;">Assigned Permissions</h4>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        ${(this.user.permissions || []).map(p => new PermissionBadge(p, true).render()).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    ${sessionWidget.render()}
                </div>

                <div style="display: flex; gap: 10px;">
                    <button id="tc-profile-refresh-btn" style="flex: 1; padding: 8px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: 600; cursor: pointer;">
                        🔄 Rotate Refresh Token
                    </button>
                    <button id="tc-profile-logout-btn" style="flex: 1; padding: 8px; background: #ef4444; color: #ffffff; border: none; border-radius: 4px; font-weight: 600; cursor: pointer;">
                        🚪 Terminate Session
                    </button>
                </div>
            </div>
        `;
    }

    bindEvents(containerElement) {
        const logoutBtn = containerElement.querySelector('#tc-profile-logout-btn');
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.onLogout());

        const refreshBtn = containerElement.querySelector('#tc-profile-refresh-btn');
        if (refreshBtn) refreshBtn.addEventListener('click', () => this.onRefresh());
    }
}