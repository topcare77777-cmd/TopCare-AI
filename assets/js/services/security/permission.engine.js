/**
 * TOPCARE AI PLATFORM V2 — PERMISSION ENGINE & AUTHORIZATION GUARD
 * Path: assets/js/services/security/permission.engine.js & authorization.guard.js
 * Status: ACTIVE (SPRINT J - LOCKED GOLDEN BASELINE)
 * Role: Fine-Grained Authorization Guard Enforcing Deny-by-Default Security Principle
 */

import { SECURITY_PERMISSIONS, SECURITY_EVENTS, createAuthorizationResultDTO } from '../../core/security/security.dto.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const PermissionEngine = Object.freeze({
    /**
     * Verifies if requested permission token is cataloged and granted in subject's scope.
     * J-03 Compliance: Deny-by-default if permission is uncataloged or scope is missing.
     */
    evaluatePermission(subjectId, requestedPermission, grantedPermissionsScope = []) {
        if (!subjectId || !requestedPermission) {
            return createAuthorizationResultDTO({
                subjectId: subjectId || 'UNKNOWN',
                requestedPermission: requestedPermission || 'NONE',
                isAuthorized: false,
                reason: 'DENY_BY_DEFAULT: Missing subjectId or requestedPermission parameter.'
            });
        }

        // J-01 Compliance: Verify permission against SSOT catalog values
        const catalogValues = Object.values(SECURITY_PERMISSIONS);
        const reqPerm = String(requestedPermission).toLowerCase().trim();

        if (!catalogValues.includes(reqPerm)) {
            return createAuthorizationResultDTO({
                subjectId,
                requestedPermission: reqPerm,
                isAuthorized: false,
                reason: `DENY_BY_DEFAULT: Permission "${reqPerm}" is not cataloged in SECURITY_PERMISSIONS SSOT.`
            });
        }

        const grantedSet = new Set(grantedPermissionsScope.map(p => String(p).toLowerCase().trim()));
        const isAuthorized = grantedSet.has(reqPerm) || grantedSet.has('*');

        return createAuthorizationResultDTO({
            subjectId,
            requestedPermission: reqPerm,
            isAuthorized,
            reason: isAuthorized ? 'AUTHORIZED' : `DENY: Subject "${subjectId}" lacks granted permission "${reqPerm}".`
        });
    }
});

export const AuthorizationGuard = Object.freeze({
    /**
     * Guard Gateway executing authorization check and emitting security telemetry.
     */
    authorize(subjectId, requestedPermission, grantedScope = [], eventBus = null) {
        const resultDTO = PermissionEngine.evaluatePermission(subjectId, requestedPermission, grantedScope);

        if (eventBus && typeof eventBus.publish === 'function') {
            const eventType = resultDTO.isAuthorized ? SECURITY_EVENTS.AUTHORIZED : SECURITY_EVENTS.PERMISSION_DENIED;
            eventBus.publish({
                type: eventType,
                payload: { ...resultDTO }
            });
        }

        if (!resultDTO.isAuthorized) {
            console.warn(`[AuthorizationGuard] Access DENIED for subject "${subjectId}": ${resultDTO.reason}`);
        }

        return resultDTO;
    }
});

export default AuthorizationGuard;
