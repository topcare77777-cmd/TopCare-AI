/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Auth Validator Layer
 * Status       : ACTIVE
 * Version      : 2.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Enterprise Auth Validation Engine
 * -----------------------------------------------------------------
 */

export class AuthValidator {
    static validateEmail(email) {
        if (!email || typeof email !== "string") {
            throw new Error("Email wajib diisi.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            throw new Error("Format email tidak valid.");
        }
        return true;
    }

    static validatePassword(password) {
        if (!password || typeof password !== "string") {
            throw new Error("Password wajib diisi.");
        }
        if (password.length < 6) {
            throw new Error("Password minimal harus 6 karakter.");
        }
        return true;
    }

    static validateUsername(username) {
        if (!username || typeof username !== "string") {
            throw new Error("Username wajib diisi.");
        }
        if (username.trim().length < 3) {
            throw new Error("Username minimal harus 3 karakter.");
        }
        return true;
    }

    static validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword || typeof confirmPassword !== "string") {
            throw new Error("Konfirmasi password wajib diisi.");
        }
        if (password !== confirmPassword) {
            throw new Error("Konfirmasi password tidak cocok.");
        }
        return true;
    }

    static validateOTP(otp) {
        if (!otp || typeof otp !== "string") {
            throw new Error("Kode OTP wajib diisi.");
        }
        if (otp.trim().length !== 6) {
            throw new Error("Kode OTP harus 6 digit.");
        }
        return true;
    }

    static validatePhone(phone) {
        if (!phone || typeof phone !== "string") {
            throw new Error("Nomor telepon wajib diisi.");
        }
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone.trim())) {
            throw new Error("Format nomor telepon tidak valid.");
        }
        return true;
    }
}

export default AuthValidator;