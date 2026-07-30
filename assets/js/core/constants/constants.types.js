/**
 * file: assets/js/core/constants/constants.types.js
 */

export const APP = Object.freeze({
    NAME: 'TopCare AI',
    VERSION: '2.0.0'
});

export const EVENTS = Object.freeze({
    READY: 'app.ready',
    ROUTE_CHANGED: 'route.changed',
    LOGIN: 'auth.login',
    LOGOUT: 'auth.logout'
});

export const ROUTES = Object.freeze({
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PERSONALITY: '/personality',
    COACH: '/coach'
});

export const AUTH_REASONS = Object.freeze({
    UNAUTHENTICATED: 'unauthenticated',
    EXPIRED: 'expired',
    FORBIDDEN: 'forbidden',
    NO_PERMISSION: 'no_permission',
    ROUTE_MISSING: 'route_missing'
});

export const STATUS = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    READY: 'ready',
    ERROR: 'error'
});

export const STORAGE = Object.freeze({
    TOKEN: 'token',
    SESSION: 'session'
});