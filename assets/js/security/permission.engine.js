/**
 * @file permission.engine.js
 * @description Enterprise-grade Role-Based Access Control (RBAC) and permission evaluation engine.
 * Governs the 6 system privilege tiers and wildcard permission lookups with fail-closed security.
 * @module Security/PermissionEngine
 * @version 3.0.0
 * @status Production Ready
 */

export class PermissionEngine {
    #roleHierarchy;
    #roleWeights;

    constructor() {
        this.#roleWeights = Object.freeze({
            GUEST: 0,
            MEMBER: 1,
            PREMIUM: 2,
            CREATOR: 3,
            ADMIN: 4,
            SUPER_ADMIN: 5
        });

        this.#roleHierarchy = Object.freeze([
            'GUEST',
            'MEMBER',
            'PREMIUM',
            'CREATOR',
            'ADMIN',
            'SUPER_ADMIN'
        ]);
    }

    /**
     * Normalizes a role string into a standard uppercase format.
     * @private
     * @param {string} role - Raw role input.
     * @returns {string} Normalized role.
     */
    #normalizeRole(role) {
        if (!role || typeof role !== 'string') return '';
        return role.trim().toUpperCase().replace(/-/g, '_');
    }

    /**
     * Normalizes a permission string into a standard lowercase format.
     * @private
     * @param {string} permission - Raw permission input.
     * @returns {string} Normalized permission.
     */
    #normalizePermission(permission) {
        if (!permission || typeof permission !== 'string') return '';
        return permission.trim().toLowerCase();
    }

    /**
     * Validates if a given role exists within the enterprise hierarchy.
     * @private
     * @param {string} role - Normalized role.
     * @returns {boolean} True if valid.
     */
    #isValidRole(role) {
        return Object.prototype.hasOwnProperty.call(this.#roleWeights, role);
    }

    /**
     * Gets the numerical weight of a role for hierarchical comparisons.
     * @param {string} role - Role string.
     * @returns {number} Role weight or -1 if invalid.
     */
    getRoleWeight(role) {
        const normalized = this.#normalizeRole(role);
        if (!this.#isValidRole(normalized)) {
            return -1;
        }
        return this.#roleWeights[normalized];
    }

    /**
     * Evaluates if a user role matches or exceeds a required role using hierarchy weights.
     * @param {string} userRole - The role assigned to the user.
     * @param {string} requiredRole - The minimum required role.
     * @returns {boolean} True if authorized.
     */
    hasRole(userRole, requiredRole) {
        const userWeight = this.getRoleWeight(userRole);
        const requiredWeight = this.getRoleWeight(requiredRole);

        if (userWeight === -1 || requiredWeight === -1) {
            return false;
        }

        return userWeight >= requiredWeight;
    }

    /**
     * Evaluates if a user has a specific permission, supporting wildcards (e.g., 'course:*', '*').
     * @param {string[]|Set<string>} userPermissions - Collection of user permissions.
     * @param {string} permission - Target permission to check.
     * @returns {boolean} True if granted.
     */
    hasPermission(userPermissions, permission) {
        if (!userPermissions || !permission) {
            return false;
        }

        const targetPerm = this.#normalizePermission(permission);
        if (!targetPerm) {
            return false;
        }

        const permSet = userPermissions instanceof Set 
            ? userPermissions 
            : new Set(Array.from(userPermissions).map(p => this.#normalizePermission(p)));

        if (permSet.has('*')) {
            return true;
        }

        if (permSet.has(targetPerm)) {
            return true;
        }

        const [domain] = targetPerm.split(':');
        if (domain && permSet.has(`${domain}:*`)) {
            return true;
        }

        return false;
    }

    /**
     * Evaluates if a user has any of the listed permissions.
     * @param {string[]|Set<string>} userPermissions - Collection of user permissions.
     * @param {string[]} permissions - List of target permissions.
     * @returns {boolean} True if at least one permission matches.
     */
    hasAnyPermission(userPermissions, permissions) {
        if (!Array.isArray(permissions) || permissions.length === 0) {
            return false;
        }

        const permSet = userPermissions instanceof Set 
            ? userPermissions 
            : new Set(Array.from(userPermissions || []).map(p => this.#normalizePermission(p)));

        if (permSet.has('*')) {
            return true;
        }

        for (let i = 0; i < permissions.length; i++) {
            if (this.hasPermission(permSet, permissions[i])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Evaluates if a user has all of the listed permissions.
     * @param {string[]|Set<string>} userPermissions - Collection of user permissions.
     * @param {string[]} permissions - List of target permissions.
     * @returns {boolean} True if all permissions match.
     */
    hasAllPermissions(userPermissions, permissions) {
        if (!Array.isArray(permissions) || permissions.length === 0) {
            return false;
        }

        const permSet = userPermissions instanceof Set 
            ? userPermissions 
            : new Set(Array.from(userPermissions || []).map(p => this.#normalizePermission(p)));

        if (permSet.has('*')) {
            return true;
        }

        for (let i = 0; i < permissions.length; i++) {
            if (!this.hasPermission(permSet, permissions[i])) {
                return false;
            }
        }

        return true;
    }

    /**
     * Validates if a user role meets or exceeds a minimum tier requirement.
     * @param {string} userRole - Current user role.
     * @param {string} minimumRole - Minimum tier required.
     * @returns {boolean} True if tier access is valid.
     */
    validateTierAccess(userRole, minimumRole) {
        return this.hasRole(userRole, minimumRole);
    }

    /**
     * Checks if the role matches GUEST.
     * @param {string} role - Role to check.
     * @returns {boolean} True if GUEST.
     */
    isGuest(role) {
        return this.#normalizeRole(role) === 'GUEST';
    }

    /**
     * Checks if the role matches MEMBER.
     * @param {string} role - Role to check.
     * @returns {boolean} True if MEMBER.
     */
    isMember(role) {
        return this.#normalizeRole(role) === 'MEMBER';
    }

    /**
     * Checks if the role matches PREMIUM.
     * @param {string} role - Role to check.
     * @returns {boolean} True if PREMIUM.
     */
    isPremium(role) {
        return this.#normalizeRole(role) === 'PREMIUM';
    }

    /**
     * Checks if the role matches CREATOR.
     * @param {string} role - Role to check.
     * @returns {boolean} True if CREATOR.
     */
    isCreator(role) {
        return this.#normalizeRole(role) === 'CREATOR';
    }

    /**
     * Checks if the role matches ADMIN.
     * @param {string} role - Role to check.
     * @returns {boolean} True if ADMIN.
     */
    isAdmin(role) {
        return this.#normalizeRole(role) === 'ADMIN';
    }

    /**
     * Checks if the role matches SUPER_ADMIN.
     * @param {string} role - Role to check.
     * @returns {boolean} True if SUPER_ADMIN.
     */
    isSuperAdmin(role) {
        return this.#normalizeRole(role) === 'SUPER_ADMIN';
    }
}

export const permissionEngine = new PermissionEngine();