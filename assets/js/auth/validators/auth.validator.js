/**
 * TopCare AI Platform V2.0.0
 * Composite AuthValidator (Facade pattern)
 * Path: assets/js/auth/validators/auth.validator.js
 */

class AuthValidator {
    static validateEmail(email) {
        return new EmailValidator().validate(email);
    }

    static validatePassword(password) {
        return new PasswordValidator().validate(password);
    }

    static validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword) throw new ValidationError("Konfirmasi password wajib diisi.");
        if (password !== confirmPassword) throw new ValidationError("Konfirmasi password tidak cocok.");
        return true;
    }

    static validateUsername(username) {
        if (!username) throw new ValidationError("Username wajib diisi.");
        if (username.length < 3) throw new ValidationError("Username minimal 3 karakter.");
        return true;
    }

    static validatePhone(phone) {
        return new PhoneValidator().validate(phone);
    }

    static validateOTP(otp) {
        return new OTPValidator().validate(otp);
    }

    static validateCaptcha(token) {
        if (!token) throw new ValidationError("Verifikasi captcha wajib diselesaikan.");
        return true;
    }
}