/**
 * TOPCARE AI PLATFORM V2 — GRANULAR CAPABILITY PERMISSION GUARD
 * Path: assets/js/services/capability/capability.permission.guard.js
 * Status: ACTIVE (SPRINT A - LOCKED GOLDEN BASELINE)
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const CapabilityPermissionGuard = Object.freeze({
    /**
     * Verifies that capability requested permissions are satisfied by granted permissions scope.
     * @param {Object} manifestDTO - Target CapabilityManifestDTO
     * @param {Array<string>} grantedPermissionsScope - List of active granted permissions
     * @returns {Object} Permission Check Verification DTO
     */
    verifyPermissions(manifestDTO, grantedPermissionsScope = []) {
        const requiredPermissions = manifestDTO.permissions || [];
        const grantedSet = new Set(grantedPermissionsScope.map(p => String(p).toLowerCase().trim()));

        const missingPermissions = [];

        for (const perm of requiredPermissions) {
            // Wildcard matching e.g. "context.personality.*"
            const permParts = perm.split('.');
            let isGranted = grantedSet.has(perm) || grantedSet.has('*');

            if (!isGranted && permParts.length > 1) {
                const wildcardKey = `${permParts[0]}.${permParts[1]}.*`;
                const rootWildcardKey = `${permParts[0]}.*`;
                if (grantedSet.has(wildcardKey) || grantedSet.has(rootWildcardKey)) {
                    isGranted = true;
                }
            }

            if (!isGranted) {
                missingPermissions.push(perm);
            }
        }

        return deepFreezeDTO({
            isAllowed: missingPermissions.length === 0,
            missingPermissions: Object.freeze(missingPermissions),
            grantedPermissions: Object.freeze([...grantedPermissionsScope])
        });
    }
});

export default CapabilityPermissionGuard;
