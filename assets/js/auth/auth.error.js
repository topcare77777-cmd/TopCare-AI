/**
 * TopCare AI Platform V2.0.0
 * Structured Custom Authentication Error Classes
 * Path: assets/js/auth/errors/auth.errors.js
 */

class AuthError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code || "AUTH_ERROR";
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AuthError {
    constructor(message) {
        super(message, "VALIDATION_ERROR");
    }
}

class UnauthorizedError extends AuthError {
    constructor(message = "Unauthorized access.") {
        super(message, "UNAUTHORIZED");
    }
}

class SessionExpiredError extends AuthError {
    constructor(message = "Session has expired.") {
        super(message, "SESSION_EXPIRED");
    }
}

class ProviderError extends AuthError {
    constructor(message) {
        super(message, "PROVIDER_ERROR");
    }
}

class NetworkError extends AuthError {
    constructor(message = "Network communication failed.") {
        super(message, "NETWORK_ERROR");
    }
}