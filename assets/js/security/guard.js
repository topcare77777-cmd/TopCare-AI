import { tokenEngine } from '../engine/token.engine.js';
import { permissionEngine } from './permission.engine.js';
import { sessionEngine } from '../engine/session.engine.js';

export class AuthenticationRequiredError extends Error {
constructor(message = 'Authentication required.') {
super(message);
this.name = 'AuthenticationRequiredError';
}
}

export class GuestOnlyError extends Error {
constructor(message = 'Restricted to guest users only.') {
super(message);
this.name = 'GuestOnlyError';
}
}

export class PermissionDeniedError extends Error {
constructor(message = 'Permission denied.') {
super(message);
this.name = 'PermissionDeniedError';
}
}

export class InsufficientRoleError extends Error {
constructor(message = 'Insufficient role privileges.') {
super(message);
this.name = 'InsufficientRoleError';
}
}

export class SessionExpiredError extends Error {
constructor(message = 'Session has expired or is invalid.') {
super(message);
this.name = 'SessionExpiredError';
}
}

export class FeatureDisabledError extends Error {
constructor(message = 'Feature is disabled.') {
super(message);
this.name = 'FeatureDisabledError';
}
}

export class Guard {
#featureFlags;

constructor() {
    this.#featureFlags = Object.freeze({
        'beta-features': false,
        'advanced-ai': true,
        'creator-tools': true,
        'cms-v3': true
    });
}

#throwSecurityError(ErrorClass, message) {
    throw new ErrorClass(message);
}

#getCurrentUser() {
    try {
        return sessionEngine.getSessionData();
    } catch (error) {
        return null;
    }
}

#getCurrentPermissions() {
    const user = this.#getCurrentUser();
    if (!user) return [];
    return user.permissions || user.perms || [];
}

#normalizeFeatureFlag(flag) {
    if (!flag || typeof flag !== 'string') return '';
    return flag.trim().toLowerCase();
}

assertAuthenticated() {
    const hasToken = tokenEngine.getToken();
    const expired = tokenEngine.isTokenExpired();
    const sessionValid = sessionEngine.isSessionValid();

    if (!hasToken || expired || !sessionValid) {
        this.#throwSecurityError(AuthenticationRequiredError, 'User is not authenticated or session is invalid.');
    }

    return true;
}

assertGuest() {
    const hasToken = tokenEngine.getToken();
    const expired = tokenEngine.isTokenExpired();
    const sessionValid = sessionEngine.isSessionValid();

    if (hasToken && !expired && sessionValid) {
        this.#throwSecurityError(GuestOnlyError, 'Action restricted to guest users.');
    }

    return true;
}

assertRole(role) {
    this.assertAuthenticated();
    const user = this.#getCurrentUser();
    const userRole = user ? (user.role || user.tier || 'GUEST') : 'GUEST';

    const authorized = permissionEngine.hasRole(userRole, role);
    if (!authorized) {
        this.#throwSecurityError(InsufficientRoleError, 'User role does not meet required privileges.');
    }

    return true;
}

assertPermission(permission) {
    this.assertAuthenticated();
    const permissions = this.#getCurrentPermissions();

    const authorized = permissionEngine.hasPermission(permissions, permission);
    if (!authorized) {
        this.#throwSecurityError(PermissionDeniedError, 'Required permission is missing.');
    }

    return true;
}

assertAnyPermission(permissions) {
    this.assertAuthenticated();
    const userPerms = this.#getCurrentPermissions();

    const authorized = permissionEngine.hasAnyPermission(userPerms, permissions);
    if (!authorized) {
        this.#throwSecurityError(PermissionDeniedError, 'None of the required permissions are present.');
    }

    return true;
}

assertAllPermissions(permissions) {
    this.assertAuthenticated();
    const userPerms = this.#getCurrentPermissions();

    const authorized = permissionEngine.hasAllPermissions(userPerms, permissions);
    if (!authorized) {
        this.#throwSecurityError(PermissionDeniedError, 'Not all required permissions are present.');
    }

    return true;
}

assertSession() {
    const valid = sessionEngine.isSessionValid();
    if (!valid) {
        this.#throwSecurityError(SessionExpiredError, 'Active session is invalid or expired.');
    }

    return true;
}

assertFeatureEnabled(flag) {
    const normalized = this.#normalizeFeatureFlag(flag);
    const isEnabled = Object.prototype.hasOwnProperty.call(this.#featureFlags, normalized) 
        ? this.#featureFlags[normalized] 
        : false;

    if (!isEnabled) {
        this.#throwSecurityError(FeatureDisabledError, 'Requested feature is disabled.');
    }

    return true;
}
}

export const guard = new Guard();