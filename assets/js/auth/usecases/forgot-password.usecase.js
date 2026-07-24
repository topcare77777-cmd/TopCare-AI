/**
 * TopCare AI Platform V2.0.0
 * ForgotPassword UseCase
 * Path: assets/js/auth/usecases/forgot-password.usecase.js
 */

class ForgotPasswordUseCase {
    constructor(provider, eventBus) {
        this.provider = provider;
        this.eventBus = eventBus || globalAuthEventBus;
    }

    async execute(email) {
        AuthValidator.validateEmail(email);
        const result = await this.provider.forgotPassword(email);
        this.eventBus.dispatch(AUTH_EVENTS.PASSWORD_RESET, { email });
        return result;
    }
}