/**
 * TopCare AI Platform V2.0.0
 * Hardened Authentication Service using AuthCryptoUtil exclusively
 * Path: assets/js/auth/application/memory.auth.service.js
 */

class NoOpTelemetryContext {
    constructor() {
        this.traceId = '00000000000000000000000000000000';
        this.spanId = '0000000000000000';
        this.correlationId = 'corr-noop-default';
    }
}

class MemoryAuthenticationService extends IAuthenticationService {
    constructor(userRepository = new LocalStorageUserRepository(), sessionManager = null, tokenGenerator = new CryptoTokenGenerator(), clock = new SystemClock(), eventBus = null) {
        super();
        this.userRepo = userRepository;
        this.sessionManager = sessionManager;
        this.tokenGenerator = tokenGenerator;
        this.clock = clock;
        this.eventBus = eventBus;
    }

    async _hashPassword(password) {
        if (typeof AuthCryptoUtil !== 'undefined' && typeof AuthCryptoUtil.hashPassword === 'function') {
            return await AuthCryptoUtil.hashPassword(password);
        }
        throw new AuthenticationException("AuthCryptoUtil is mandatory for secure password hashing.");
    }

    _publishEventAsync(eventName, payload, telemetryCtx = new NoOpTelemetryContext()) {
        const ctx = telemetryCtx || new NoOpTelemetryContext();
        queueMicrotask(() => {
            if (this.eventBus && typeof this.eventBus.publish === 'function') {
                this.eventBus.publish(eventName, {
                    ...payload,
                    timestamp: this.clock.toISOString(),
                    traceId: ctx.traceId,
                    spanId: ctx.spanId,
                    correlationId: ctx.correlationId
                });
            }
        });
    }

    async register(fullName, email, password, telemetryCtx = new NoOpTelemetryContext()) {
        if (!email || !fullName || !password) {
            throw new ValidationException("All registration fields are required.");
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existing = await this.userRepo.findByEmail(normalizedEmail);
        if (existing) {
            this._publishEventAsync(AuthenticationEvents.REGISTRATION_FAILED, { email: normalizedEmail, reason: 'Email already registered' }, telemetryCtx);
            throw new AuthenticationException("User with this email already exists.");
        }

        if (password.length < 8) {
            throw new ValidationException("Password must be at least 8 characters long.");
        }

        const passwordHash = await this._hashPassword(password);
        const nowIso = this.clock.toISOString();
        const newUser = new User({
            userId: this.tokenGenerator.generateToken('usr'),
            fullName: fullName.trim(),
            email: normalizedEmail,
            passwordHash,
            createdAt: nowIso,
            updatedAt: nowIso
        });

        await this.userRepo.create(newUser);
        this._publishEventAsync(AuthenticationEvents.USER_REGISTERED, { userId: newUser.userId, email: newUser.email }, telemetryCtx);
        return newUser.toSnapshot();
    }

    async login(email, password, rememberMe = false, telemetryCtx = new NoOpTelemetryContext()) {
        if (!email || !password) {
            throw new ValidationException("Email and password are required.");
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.userRepo.findByEmail(normalizedEmail);
        if (!user) {
            this._publishEventAsync(AuthenticationEvents.LOGIN_FAILED, { email: normalizedEmail, reason: 'User not found' }, telemetryCtx);
            throw new AuthenticationException("Invalid email or password.");
        }

        const inputHash = await this._hashPassword(password);
        if (user.passwordHash !== inputHash) {
            this._publishEventAsync(AuthenticationEvents.LOGIN_FAILED, { userId: user.userId, email: user.email, reason: 'Invalid password' }, telemetryCtx);
            throw new AuthenticationException("Invalid email or password.");
        }

        const sessionToken = this.tokenGenerator.generateToken('sess');
        if (this.sessionManager) {
            this.sessionManager.createSession(user, sessionToken, rememberMe, telemetryCtx);
        }

        this._publishEventAsync(AuthenticationEvents.LOGIN_SUCCESS, { userId: user.userId, email: user.email }, telemetryCtx);
        return {
            user: user.toSnapshot(),
            token: sessionToken
        };
    }

    async logout(telemetryCtx = new NoOpTelemetryContext()) {
        if (this.sessionManager) {
            this.sessionManager.destroySession();
        }
        return true;
    }

    async refreshSession() {
        if (this.sessionManager) {
            return this.sessionManager.restoreSession();
        }
        return null;
    }
}