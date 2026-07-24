/**
 * TopCare AI Platform V2.0.0
 * Global type-safe Injection Tokens using Symbol.for() to prevent bundler duplication issues
 * Path: assets/js/auth/container/injection.tokens.js
 */

const TOKENS = Object.freeze({
    Config: Symbol.for("TopCare.Config"),
    Storage: Symbol.for("TopCare.Storage"),
    EventBus: Symbol.for("TopCare.EventBus"),
    Logger: Symbol.for("TopCare.Logger"),
    SessionManager: Symbol.for("TopCare.SessionManager"),
    Provider: Symbol.for("TopCare.Provider"),
    AuthRepository: Symbol.for("TopCare.AuthRepository"),
    AuthManager: Symbol.for("TopCare.AuthManager")
});