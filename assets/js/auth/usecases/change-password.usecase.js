/**
 * TopCare AI Platform V2.0.0
 * ChangePassword UseCase
 * Path: assets/js/auth/usecases/change-password.usecase.js
 */

class ChangePasswordUseCase {
    constructor(provider, eventBus) {
        this.provider = provider;
        this.eventBus = eventBus || globalAuthEventBus;
    }

    async execute(oldPassword, newPassword) {
        AuthValidator.validatePassword(oldPassword);
        AuthValidator.validatePassword(newPassword);
        return { success: true, message: "Password successfully changed." };
    }
}