/**
 * file: assets/js/auth/auth.policy.js
 * Version: 132.1.0
 * Status: APPROVED & LOCKED
 * SRP: Policy Authorization SSOT supporting predicates, wildcard matching, and role evaluation matrix.
 */

import { ROLES } from './auth.role.js';
import { PERMISSIONS } from './auth.permission.js';

export class AuthPolicy {
    static ROLE_HIERARCHY = Object.freeze({
        [ROLES.SYSTEM_ADMIN]: 100,
        [ROLES.ADMIN]: 80,
        [ROLES.PHYSICIAN]: 60,
        [ROLES.NURSE]: 40,
        [ROLES.PHARMACIST]: 40,
        [ROLES.PATIENT]: 10
    });

    /**
     * Default SSOT Role Permission Mapping matrix
     */
    static ROLE_PERMISSIONS_SSOT = Object.freeze({
        [ROLES.SYSTEM_ADMIN]: ['*'],
        [ROLES.PHYSICIAN]: [PERMISSIONS.PATIENT_CREATE, PERMISSIONS.PATIENT_READ, PERMISSIONS.PATIENT_UPDATE, PERMISSIONS.SOAP_WRITE, PERMISSIONS.SOAP_READ, PERMISSIONS.VITAL_WRITE, PERMISSIONS.PRESCRIPTION_WRITE],
        [ROLES.NURSE]: [PERMISSIONS.PATIENT_CREATE, PERMISSIONS.PATIENT_READ, PERMISSIONS.PATIENT_UPDATE, PERMISSIONS.SOAP_READ, PERMISSIONS.VITAL_WRITE],
        [ROLES.PHARMACIST]: [PERMISSIONS.PATIENT_READ, PERMISSIONS.PRESCRIPTION_DISPENSE],
        [ROLES.PATIENT]: [PERMISSIONS.PATIENT_PORTAL_READ]
    });

    /**
     * Evaluates permission for a given role against the SSOT matrix.
     * @param {string} role 
     * @param {string} requiredPermission 
     * @returns {boolean}
     */
    static evaluateRolePermission(role, requiredPermission) {
        const allowedList = AuthPolicy.ROLE_PERMISSIONS_SSOT[role] || [];
        if (allowedList.includes('*')) return true;

        for (const perm of allowedList) {
            if (perm === requiredPermission) return true;
            if (perm.endsWith('.*')) {
                const prefix = perm.slice(0, -2);
                if (requiredPermission.startsWith(prefix + '.')) return true;
            }
        }
        return false;
    }

    /**
     * Dynamic predicate authorization evaluator.
     * @param {Object} user 
     * @param {string} permission 
     * @param {Object} [context={}] 
     * @returns {boolean}
     */
    static can(user, permission, context = {}) {
        if (!user || user.status !== 'ACTIVE') return false;

        // System Admin global bypass
        if (user.roles?.includes(ROLES.SYSTEM_ADMIN)) return true;

        const userPermissions = user.permissions || [];
        for (const perm of userPermissions) {
            if (perm === permission || perm === '*') return true;
            if (perm.endsWith('.*')) {
                const prefix = perm.slice(0, -2);
                if (permission.startsWith(prefix + '.')) return true;
            }
        }
        return false;
    }
}