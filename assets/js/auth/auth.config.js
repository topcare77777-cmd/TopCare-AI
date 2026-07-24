/**
 * TopCare AI Platform V2.0.0
 * Deep Frozen Authentication Configuration
 * Path: assets/js/auth/auth.config.js
 */

const AUTH_CONFIG = deepFreeze({
    API_PROVIDER: "local",
    LOGIN_URL: "",
    REGISTER_URL: "",
    FORGOT_PASSWORD_URL: "",
    LOGOUT_URL: "",
    TOKEN_REFRESH_URL: "",
    STORAGE_PREFIX: "topcare_auth_",
    STORAGE_TYPE: "localStorage",
    SESSION_TIMEOUT_MS: 1800000,
    SESSION_CHECK_INTERVAL_MS: 60000
});