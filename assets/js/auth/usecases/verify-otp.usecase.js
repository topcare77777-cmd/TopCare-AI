/**
 * TopCare AI Platform V2.0.0
 * VerifyOTP UseCase
 * Path: assets/js/auth/usecases/verify-otp.usecase.js
 */

class VerifyOtpUseCase {
    constructor(eventBus) {
        this.eventBus = eventBus || globalAuthEventBus;
    }

    execute(otp) {
        AuthValidator.validateOTP(otp);
        return { success: true, message: "OTP verified successfully." };
    }
}