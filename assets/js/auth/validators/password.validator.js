/**
 * TopCare AI Platform V2.0.0
 * Password Validator
 * Path: assets/js/auth/validators/password.validator.js
 */

class PasswordValidator extends ValidatorInterface {
    validate(password) {
        if (!password) throw new ValidationError("Field password wajib diisi.");
        if (password.length < 6) throw new ValidationError("Password minimal harus 6 karakter.");
        return true;
    }
}