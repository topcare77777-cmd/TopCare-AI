/**
 * file: assets/js/auth/auth.constants.js
 */
export const AUTH_CONSTANTS = Object.freeze({
    STORAGE_KEY: 'tc_sec_session_envelope_v1',
    ACCESS_TOKEN_TTL_SEC: 3600,       // 1 Hour
    REFRESH_TOKEN_TTL_SEC: 86400 * 7, // 7 Days
    SESSION_TIMEOUT_MS: 3600 * 1000,
    ENDPOINTS: Object.freeze({
        LOGIN: '/api/v1/auth/login',
        LOGOUT: '/api/v1/auth/logout',
        REFRESH: '/api/v1/auth/refresh',
        REGISTER: '/api/v1/auth/register',
        FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
        RESET_PASSWORD: '/api/v1/auth/reset-password',
        VERIFY_OTP: '/api/v1/auth/verify-otp'
    })
});