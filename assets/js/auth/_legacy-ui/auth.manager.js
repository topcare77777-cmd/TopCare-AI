/**
 * TopCare AI Platform V2.0.0
 * Purely Dependency-Injected AuthManager exposing UseCase APIs
 * Path: assets/js/auth/auth.manager.js
 */

class AuthManager {
    constructor(dependencies = {}) {
        this.config = dependencies.config || AUTH_CONFIG;
        this.eventBus = dependencies.eventBus || globalAuthEventBus;
        this.storage = dependencies.storage || new AuthStorage(this.config);
        this.sessionManager = dependencies.sessionManager || new SessionManager(this.storage, this.config, this.eventBus);
        this.provider = dependencies.provider || AuthProviderFactory.create(this.config);

        this.loginUseCase = new LoginUseCase(this.provider, this.sessionManager, this.eventBus);
        this.registerUseCase = new RegisterUseCase(this.provider, this.sessionManager, this.eventBus);
        this.logoutUseCase = new LogoutUseCase(this.sessionManager, this.eventBus);
        this.refreshTokenUseCase = new RefreshTokenUseCase(this.sessionManager, this.eventBus);
        this.restoreSessionUseCase = new RestoreSessionUseCase(this.sessionManager, this.eventBus);
        this.changePasswordUseCase = new ChangePasswordUseCase(this.provider, this.eventBus);
        this.verifyOtpUseCase = new VerifyOtpUseCase(this.eventBus);
        this.forgotPasswordUseCase = new ForgotPasswordUseCase(this.provider, this.eventBus);

        this.eventBus.dispatch(AUTH_EVENTS.AUTH_PROVIDER_CHANGED, { provider: this.config.API_PROVIDER });
    }

    async login(email, password) {
        return await this.loginUseCase.execute(email, password);
    }

    async register(name, email, password, confirmPassword) {
        return await this.registerUseCase.execute(name, email, password, confirmPassword);
    }

    logout() {
        return this.logoutUseCase.execute();
    }

    async refreshToken() {
        return await this.refreshTokenUseCase.execute();
    }

    restoreSession() {
        return this.restoreSessionUseCase.execute();
    }

    async changePassword(oldPassword, newPassword) {
        return await this.changePasswordUseCase.execute(oldPassword, newPassword);
    }

    verifyOTP(otp) {
        return this.verifyOtpUseCase.execute(otp);
    }

    async forgotPassword(email) {
        return await this.forgotPasswordUseCase.execute(email);
    }

    getCurrentUser() {
        const session = this.sessionManager.getSession();
        return session ? session.user : null;
    }
}