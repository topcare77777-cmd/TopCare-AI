/**
 * TopCare AI Platform V2.0.0
 * Audited SessionManager incorporating spanId alongside traceId and correlationId
 * Path: assets/js/auth/session/session.manager.js
 */

class SessionManager {
    constructor(storageKey = 'topcare_user_session_v3', clock = new SystemClock(), tokenGenerator = new CryptoTokenGenerator()) {
        this.storageKey = storageKey;
        this.clock = clock;
        this.tokenGenerator = tokenGenerator;
        this.currentSession = null;
    }

    createSession(userEntity, token, rememberMe = false, telemetryCtx = {}) {
        const now = this.clock.now();
        const durationMs = rememberMe ? (7 * 24 * 60 * 60 * 1000) : (2 * 60 * 60 * 1000);

        this.currentSession = Object.freeze({
            sessionId: this.tokenGenerator.generateToken('sessid'),
            userId: userEntity.userId,
            token,
            issuedAt: now,
            expiresAt: now + durationMs,
            deviceId: DeviceFingerprint.generate(),
            rememberMe,
            traceId: telemetryCtx.traceId || null,
            spanId: telemetryCtx.spanId || null,
            correlationId: telemetryCtx.correlationId || null
        });

        const storage = rememberMe ? localStorage : sessionStorage;
        try {
            storage.setItem(this.storageKey, JSON.stringify(this.currentSession));
        } catch (e) {
            throw new PersistenceException("Failed to persist session state.");
        }
        return this.currentSession;
    }

    restoreSession() {
        if (this.currentSession) {
            if (this.clock.now() > this.currentSession.expiresAt) {
                this.destroySession();
                return null;
            }
            return this.currentSession;
        }

        let raw = sessionStorage.getItem(this.storageKey) || localStorage.getItem(this.storageKey);
        if (!raw) return null;

        try {
            const parsed = JSON.parse(raw);
            if (this.clock.now() > parsed.expiresAt) {
                this.destroySession();
                return null;
            }
            this.currentSession = Object.freeze(parsed);
            return this.currentSession;
        } catch (e) {
            this.destroySession();
            return null;
        }
    }

    destroySession() {
        this.currentSession = null;
        try {
            sessionStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.storageKey);
        } catch (e) {}
    }

    isAuthenticated() {
        return this.restoreSession() !== null;
    }
}