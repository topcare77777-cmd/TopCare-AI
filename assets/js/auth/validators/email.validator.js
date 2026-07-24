/**
 * TopCare AI Platform V2.0.0
 * Email Validator
 * Path: assets/js/auth/validators/email.validator.js
 */

class EmailValidator extends ValidatorInterface {
    validate(email) {
        if (!email) throw new ValidationError("Field email wajib diisi.");
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) throw new ValidationError("Format email tidak valid.");
        return true;
    }
}