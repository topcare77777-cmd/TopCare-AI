/**
 * TopCare AI Platform V2.0.0
 * OTP Validator (Strict 6 digits)
 * Path: assets/js/auth/validators/otp.validator.js
 */

class OTPValidator extends ValidatorInterface {
    validate(otp) {
        if (!otp) throw new ValidationError("Kode OTP wajib diisi.");
        const otpRegex = /^\d{6}$/;
        if (!otpRegex.test(otp)) throw new ValidationError("Kode OTP harus persis 6 digit angka.");
        return true;
    }
}