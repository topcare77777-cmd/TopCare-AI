/**
 * file: assets/js/auth/index.js
 */

import { Core } from '../core/index.js';
import { AUTH_EVENTS } from './auth.types.js';
import { InstallationAuditTrail } from '../plugins/plugin.audit.trail.js';

const getClientContext = () => ({
    userAgent: navigator.userAgent || 'Unknown',
    platform: navigator.platform || 'Unknown',
    language: navigator.language || 'en-US',
    screenResolution: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
});

// Single Correlation ID Tracing across Event Lifecycle to Audit Trail
Core.Event.on(AUTH_EVENTS.LOGIN_BEGIN, (data) => {
    InstallationAuditTrail.recordAction('AUTH_LOGIN_BEGIN', data.username, {
        correlationId: data.correlationId,
        clientCtx: getClientContext()
    });
});

Core.Event.on(AUTH_EVENTS.LOGIN_SUCCESS, (data) => {
    InstallationAuditTrail.recordAction('AUTH_LOGIN_SUCCESS', data.userId, {
        correlationId: data.correlationId,
        sessionId: data.sessionId,
        clientCtx: getClientContext()
    });
});

Core.Event.on(AUTH_EVENTS.LOGIN_FAILED, (data) => {
    InstallationAuditTrail.recordAction('AUTH_LOGIN_FAILED', data.username, {
        correlationId: data.correlationId,
        error: data.error,
        clientCtx: getClientContext()
    });
});

Core.Event.on(AUTH_EVENTS.TOKEN_ROTATED, (data) => {
    InstallationAuditTrail.recordAction('AUTH_TOKEN_ROTATED', data.sessionId, {
        correlationId: data.correlationId,
        clientCtx: getClientContext()
    });
});

Core.Event.on(AUTH_EVENTS.UNAUTHORIZED, (data) => {
    InstallationAuditTrail.recordAction('AUTH_UNAUTHORIZED_ACCESS', data.userId || 'GUEST', {
        correlationId: data.correlationId,
        permission: data.permission,
        clientCtx: getClientContext()
    });
});

export { AuthService } from './auth.service.js';
export { AuthGuard } from './auth.guard.js';
export { AuthPolicy } from './auth.policy.js';
export { AuthRepository } from './auth.repository.js';
export { User } from './auth.user.js';
export { Session } from './auth.session.js';
export { AuthToken } from './auth.token.js';
export { ROLES } from './auth.role.js';
export { PERMISSIONS } from './auth.permission.js';
export { AUTH_EVENTS, USER_STATUS } from './auth.types.js';
export { AUTH_CONSTANTS } from './auth.constants.js';