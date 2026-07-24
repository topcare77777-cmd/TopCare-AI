/**
 * TopCare AI Platform V2.0.0
 * Explicit Authentication Validator
 * Path: assets/js/auth/auth.validator.js
 */

class AuthValidator {
    static validateEmail(email) {
        if (!email) return getAuthErrorMessage('REQUIRED_FIELD');
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email) ? null : getAuthErrorMessage('INVALID_EMAIL');
    }

    static validatePassword(password) {
        if (!password) return getAuthErrorMessage('REQUIRED_FIELD');
        return password.length >= 6 ? null : getAuthErrorMessage('INVALID_PASSWORD');
    }

    static validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword) return getAuthErrorMessage('REQUIRED_FIELD');
        return password === confirmPassword ? null : getAuthErrorMessage('PASSWORD_MISMATCH');
    }

    static validateUsername(username) {
        if (!username) return getAuthErrorMessage('REQUIRED_FIELD');
        return username.length >= 3 ? null : "Username minimal 3 karakter.";
    }

    static validatePhone(phone) {
        if (!phone) return getAuthErrorMessage('REQUIRED_FIELD');
        const normalized = phone.replace(/[^\d]/g, '');
        return (normalized.length >= 10 && normalized.length <= 15) ? null : getAuthErrorMessage('INVALID_PHONE');
    }

    static validateOTP(otp) {
        if (!otp) return getAuthErrorMessage('REQUIRED_FIELD');
        const otpRegex = /^\d{6}$/;
        return otpRegex.test(otp) ? null : getAuthErrorMessage('INVALID_OTP');
    }

    static validateCaptcha(token) {
        if (!token) return getAuthErrorMessage('INVALID_CAPTCHA');
        return null;
    }
}