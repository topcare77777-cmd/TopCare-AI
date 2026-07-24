/**
 * TopCare AI Platform V2.0.0
 * Login UseCase
 * Path: assets/js/auth/usecases/login.usecase.js
 */

class LoginUseCase {
    constructor(provider, sessionManager, eventBus) {
        this.provider = provider;
        this.sessionManager = sessionManager;
        this.eventBus = eventBus || globalAuthEventBus;
    }

    async execute(email, password) {
        this.eventBus.dispatch(AUTH_EVENTS.LOGIN_STARTED, { email });

        try {
            AuthValidator.validateEmail(email);
            AuthValidator.validatePassword(password);
        } catch (err) {
            this.eventBus.dispatch(AUTH_EVENTS.LOGIN_FAILED, { error: err.message });
            throw err;
        }

        try {
            const result = await this.provider.login(email, password);
            this.sessionManager.createSession(result.user, result.token);
            return { success: true, user: result.user };
        } catch (error) {
            this.eventBus.dispatch(AUTH_EVENTS.LOGIN_FAILED, { error: error.message });
            throw error;
        }
    }
}