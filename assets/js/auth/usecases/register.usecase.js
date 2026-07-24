/**
 * TopCare AI Platform V2.0.0
 * Register UseCase
 * Path: assets/js/auth/usecases/register.usecase.js
 */

class RegisterUseCase {
    constructor(provider, sessionManager, eventBus) {
        this.provider = provider;
        this.sessionManager = sessionManager;
        this.eventBus = eventBus || globalAuthEventBus;
    }

    async execute(name, email, password, confirmPassword) {
        this.eventBus.dispatch(AUTH_EVENTS.REGISTER_STARTED, { email });

        try {
            if (!name) throw new ValidationError("Nama lengkap wajib diisi.");
            AuthValidator.validateEmail(email);
            AuthValidator.validatePassword(password);
            AuthValidator.validateConfirmPassword(password, confirmPassword);
        } catch (err) {
            this.eventBus.dispatch(AUTH_EVENTS.REGISTER_FAILED, { error: err.message });
            throw err;
        }

        try {
            const result = await this.provider.register(name, email, password);
            this.sessionManager.createSession(result.user, result.token);
            this.eventBus.dispatch(AUTH_EVENTS.REGISTER_SUCCESS, { user: result.user });
            return { success: true, user: result.user };
        } catch (error) {
            this.eventBus.dispatch(AUTH_EVENTS.REGISTER_FAILED, { error: error.message });
            throw error;
        }
    }
}