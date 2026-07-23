/**
 * @file access.control.js
 * @description Enterprise Role-Based Access Control (RBAC) evaluator managing granular permission 
 * checks, role normalization, privilege aggregations, and fail-closed security guarantees across 
 * route guards, page controllers, and modules.
 * @module Security/AccessControl
 * @version 3.0.0
 * @status Production Ready
 */

export class AccessControl {
    #roles;
    #permissionsMap;

    /**
     * Creates an instance of AccessControl.
     */
    constructor() {
        this.#roles = new Set(['guest', 'member', 'creator', 'admin', 'superadmin']);

        // Define permission matrix per role
        this.#permissionsMap = new Map([
            ['guest', new Set([])],
            ['member', new Set([
                'dashboard.view',
                'profile.view',
                'profile.edit'
            ])],
            ['creator', new Set([
                'dashboard.view',
                'profile.view',
                'profile.edit',
                'cms.view',
                'cms.create',
                'cms.update',
                'cms.delete'
            ])],
            ['admin', new Set([
                'dashboard.view',
                'profile.view',
                'profile.edit',
                'cms.view',
                'cms.create',
                'cms.update',
                'cms.delete',
                'admin.view',
                'admin.manage',
                'user.manage'
            ])],
            ['superadmin', new Set([
                'dashboard.view',
                'profile.view',
                'profile.edit',
                'cms.view',
                'cms.create',
                'cms.update',
                'cms.delete',
                'admin.view',
                'admin.manage',
                'user.manage'
            ])]
        ]);
    }

    /**
     * Normalizes a role string into a standard lowercase identifier, defaulting to 'guest'.
     * @private
     * @param {string} role - Raw role string.
     * @returns {string} Normalized role.
     */
    #normalizeRole(role) {
        if (!role || typeof role !== 'string') {
            return 'guest';
        }
        const cleaned = role.trim().toLowerCase();
        return this.#roles.has(cleaned) ? cleaned : 'guest';
    }

    /**
     * Normalizes a permission string into a standard lowercase identifier.
     * @private
     * @param {string} permission - Raw permission string.
     * @returns {string} Normalized permission.
     */
    #normalizePermission(permission) {
        if (!permission || typeof permission !== 'string') {
            return '';
        }
        return permission.trim().toLowerCase();
    }

    /**
     * Evaluates if a given normalized role possesses a normalized permission.
     * @private
     * @param {string} normalizedRole - Validated role string.
     * @param {string} normalizedPermission - Validated permission string.
     * @returns {boolean} True if permitted.
     */
    #hasPermission(normalizedRole, normalizedPermission) {
        if (!this.#permissionsMap.has(normalizedRole)) {
            return false;
        }
        const permissions = this.#permissionsMap.get(normalizedRole);
        return permissions.has(normalizedPermission);
    }

    /**
     * Evaluates whether a role has a specific permission.
     * @param {string} role - User role.
     * @param {string} permission - Permission key to check.
     * @returns {boolean} True if allowed, false (fail-closed) otherwise.
     */
    can(role, permission) {
        try {
            const normRole = this.#normalizeRole(role);
            const normPerm = this.#normalizePermission(permission);

            if (!normPerm || !this.#permissionsMap.has(normRole)) {
                return false;
            }

            return this.#hasPermission(normRole, normPerm);
        } catch (error) {
            return false;
        }
    }

    /**
     * Evaluates whether a role possesses any of the provided permissions.
     * @param {string} role - User role.
     * @param {string[]} permissions - Array of permission keys.
     * @returns {boolean} True if at least one permission matches.
     */
    canAny(role, permissions) {
        try {
            if (!Array.isArray(permissions) || permissions.length === 0) {
                return false;
            }
            const normRole = this.#normalizeRole(role);
            for (const perm of permissions) {
                const normPerm = this.#normalizePermission(perm);
                if (normPerm && this.#hasPermission(normRole, normPerm)) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Evaluates whether a role possesses all of the provided permissions.
     * @param {string} role - User role.
     * @param {string[]} permissions - Array of permission keys.
     * @returns {boolean} True if all permissions match.
     */
    canAll(role, permissions) {
        try {
            if (!Array.isArray(permissions) || permissions.length === 0) {
                return false;
            }
            const normRole = this.#normalizeRole(role);
            for (const perm of permissions) {
                const normPerm = this.#normalizePermission(perm);
                if (!normPerm || !this.#hasPermission(normRole, normPerm)) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Retrieves all assigned permissions for a given role.
     * @param {string} role - User role.
     * @returns {string[]} Array of permission strings.
     */
    getPermissions(role) {
        try {
            const normRole = this.#normalizeRole(role);
            if (!this.#permissionsMap.has(normRole)) {
                return [];
            }
            return Array.from(this.#permissionsMap.get(normRole));
        } catch (error) {
            return [];
        }
    }
}

export const accessControl = new AccessControl();