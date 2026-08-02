/**
 * TOPCARE AI PLATFORM V2 — SIDEBAR SERVICE
 * Path: assets/js/services/sidebar.service.js
 * Version: 138.7.2 (BUILD 138.7.2 — AUTH V2 MIGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Provides reactive and permission-driven sidebar menu structures using AuthService V2 SSOT.
 */

import { Core } from '../core/index.js';
import { AuthService } from '../auth/auth.service.js';
import { AUTH_EVENTS, PERMISSIONS, ROLES } from '../auth/index.js';

class SidebarService {
    constructor() {
        this._cachedMenu = null;
        this._isSubscribed = false;
        this._initEventSubscriptions();
    }

    /**
     * Mendaftarkan reactive event bus listener untuk menyinkronkan menu saat state autentikasi berubah.
     * @private
     */
    _initEventSubscriptions() {
        if (this._isSubscribed) return;

        if (Core && Core.Event && typeof Core.Event.on === 'function') {
            // Reaktif terhadap login sukses pasca AuthService.login()
            Core.Event.on(AUTH_EVENTS.LOGIN_SUCCESS, () => {
                Core.Logger.info('[SidebarService] AUTH_EVENTS.LOGIN_SUCCESS received. Invalidate menu cache.');
                this.refresh();
            });

            // Reaktif terhadap logout pasca AuthService.logout()
            Core.Event.on(AUTH_EVENTS.LOGOUT, () => {
                Core.Logger.info('[SidebarService] AUTH_EVENTS.LOGOUT received. Resetting menu to Guest.');
                this.refresh();
            });

            this._isSubscribed = true;
        }
    }

    /**
     * Mengambil daftar menu berdasarkan status autentikasi, role, dan permission pengguna dari AuthService V2 SSOT.
     * @returns {Promise<Array<Object>>} List of menu items DTO
     */
    async menu() {
        const currentUser = await AuthService.getCurrentUser();
        const isAuthenticated = await AuthService.isAuthenticated();

        // 1. Base Menu Structure
        const menuItems = [];

        if (!isAuthenticated || !currentUser) {
            // Guest Default Menu
            menuItems.push(
                { id: 'nav_home', label: 'Home', path: '/home', icon: 'home', active: true },
                { id: 'nav_login', label: 'Login', path: '/login', icon: 'log-in', active: false }
            );
            return menuItems;
        }

        // 2. Authenticated Base Menu
        menuItems.push(
            { id: 'nav_home', label: 'Home', path: '/home', icon: 'home', active: true },
            { id: 'nav_dashboard', label: 'Dashboard', path: '/workspace', icon: 'layout', active: false }
        );

        // Extract Roles and Permissions safely from V2 User object / session
        const userRoles = currentUser.roles || [];
        const userPermissions = currentUser.permissions || [];

        const hasPermission = (permissionKey) => {
            if (Array.isArray(userPermissions)) {
                return userPermissions.includes(permissionKey) || userPermissions.includes('*');
            }
            return false;
        };

        const hasRole = (roleKey) => {
            if (Array.isArray(userRoles)) {
                return userRoles.includes(roleKey);
            }
            return false;
        };

        // 3. Conditional Feature: AI Coach Menu (Requires 'coach.access')
        if (hasPermission(PERMISSIONS.COACH_ACCESS || 'coach.access')) {
            menuItems.push({
                id: 'nav_coach',
                label: 'AI Coach',
                path: '/workspace/coach',
                icon: 'bot',
                badge: 'AI',
                active: false
            });
        }

        // 4. Conditional Feature: Personality Test Menu (Requires 'personality.test')
        if (hasPermission(PERMISSIONS.PERSONALITY_TEST || 'personality.test')) {
            menuItems.push({
                id: 'nav_personality',
                label: 'Personality Test',
                path: '/personality-test',
                icon: 'user-check',
                active: false
            });
        }

        // 5. Conditional Feature: Administration Menu (Requires 'ADMIN' role)
        if (hasRole(ROLES.ADMIN || 'ADMIN') || hasRole(ROLES.SUPER_ADMIN || 'SUPER_ADMIN')) {
            menuItems.push({
                id: 'nav_admin',
                label: 'Administration',
                path: '/admin',
                icon: 'shield',
                active: false
            });
        }

        return menuItems;
    }

    /**
     * Memperbarui cache dan memberitahukan UI bahwa struktur menu telah berubah.
     */
    refresh() {
        this._cachedMenu = null;
        if (Core && Core.Event && typeof Core.Event.emit === 'function') {
            Core.Event.emit('sidebar:refreshed', { timestamp: Date.now() });
        }
    }
}

export const sidebarService = new SidebarService();
export default sidebarService;
