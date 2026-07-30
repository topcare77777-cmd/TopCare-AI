/**
 * file: assets/js/services/service.types.js
 */

export const SERVICE_EVENTS = Object.freeze({
    EXECUTE: 'service.execute',
    SUCCESS: 'service.success',
    ERROR: 'service.error'
});

export const USER_SERVICE_ACTIONS = Object.freeze({
    GET_PROFILE: 'user.getProfile',
    UPDATE_PROFILE: 'user.updateProfile',
    CHANGE_PASSWORD: 'user.changePassword',
    GET_DASHBOARD: 'user.getDashboard'
});