/**
 * file: assets/js/auth/auth.types.js
 *
 * TOPCARE AI PLATFORM V2
 * Layer      : Authentication Domain Types
 * Version    : BUILD 138.4 Compatibility
 * SRP        : Authentication constants and state contracts.
 */


export const AUTH_EVENTS = Object.freeze({

    LOGIN_BEGIN: 'auth.login.begin',
    LOGIN_SUCCESS: 'auth.login.success',
    LOGIN_FAILED: 'auth.login.failed',
    LOGOUT: 'auth.logout',

    REFRESH_BEGIN: 'auth.refresh.begin',
    REFRESH_SUCCESS: 'auth.refresh.success',
    REFRESH_FAILED: 'auth.refresh.failed',

    SESSION_EXPIRED: 'auth.session.expired',
    SESSION_RESTORED: 'auth.session.restored',
    SESSION_INVALIDATED: 'auth.session.invalidated',
    TOKEN_ROTATED: 'auth.token.rotated',

    PASSWORD_CHANGED: 'auth.password.changed',
    ACCOUNT_LOCKED: 'auth.account.locked',
    UNAUTHORIZED: 'auth.unauthorized.access'
});


export const USER_STATUS = Object.freeze({

    GUEST: 'guest',

    ACTIVE: 'active',

    INACTIVE: 'inactive',

    SUSPENDED: 'suspended',

    LOCKED: 'locked',

    PENDING: 'pending'
});