/**
 * file: assets/js/pages/auth/profile.page.js
 * Version: 132.1.0
 * Status: APPROVED & LOCKED
 * SRP: Profile Page Conductor using public accessors AuthService.getCurrentUser(), getCurrentSession(), getCurrentToken().
 */

import { Core } from '../../core/index.js';
import { AuthService } from '../../auth/auth.service.js';
import { ProfileCard } from '../../components/auth/profile.card.js';
import { PermissionMatrix } from '../../components/auth/rbac.permission.matrix.js';

export class ProfilePage {
    constructor(hostElement) {
        this.host = hostElement;
        this.permissionMatrix = new PermissionMatrix();
        Object.seal(this);
    }

    async init() {
        Core.Logger.info("[ProfilePage] Lifecycle: Initializing...");
        const restored = await AuthService.restoreSession();
        if (!restored && !AuthService.getCurrentUser()) {
            window.location.hash = '#login';
        }
    }

    mount() {
        Core.Logger.info("[ProfilePage] Lifecycle: Mounting...");
        this.render();
        this.bindEvents();
    }

    render() {
        // Uses Public Readonly Accessors strictly
        const user = AuthService.getCurrentUser();
        const session = AuthService.getCurrentSession();
        const token = AuthService.getCurrentToken();

        const profileCard = new ProfileCard({
            user,
            session,
            token,
            onLogout: () => this.handleLogout(),
            onRefresh: () => this.handleRefresh()
        });

        this.host.innerHTML = `
            <div class="tc-page-profile-container">
                <div style="margin-bottom: 24px;">
                    ${profileCard.render()}
                </div>
                <div>
                    ${this.permissionMatrix.render()}
                </div>
            </div>
        `;

        this.profileCardInstance = profileCard;
    }

    bindEvents() {
        if (this.profileCardInstance) {
            this.profileCardInstance.bindEvents(this.host);
        }
    }

    handleLogout() {
        AuthService.logout();
        Core.Event.emit('ui.notification.show', { type: 'info', message: 'Session terminated.' });
        window.location.hash = '#login';
    }

    async handleRefresh() {
        try {
            await AuthService.rotateRefreshToken();
            Core.Event.emit('ui.notification.show', { type: 'success', message: 'Token rotated successfully!' });
            this.render();
            this.bindEvents();
        } catch (err) {
            Core.Event.emit('ui.notification.show', { type: 'error', message: `Token rotation failed: ${err.message}` });
        }
    }

    destroy() {
        this.cleanup();
    }

    cleanup() {
        this.host.innerHTML = '';
    }
}