/**
 * TopCare AI Platform V2.0.0
 * Phone Validator with normalization
 * Path: assets/js/auth/validators/phone.validator.js
 */

class PhoneValidator extends ValidatorInterface {
    validate(phone) {
        if (!phone) throw new ValidationError("Field nomor telepon wajib diisi.");
        const normalized = phone.replace(/[^\d]/g, '');
        if (normalized.length < 10 || normalized.length > 15) {
            throw new ValidationError("Nomor telepon tidak valid (10-15 digit).");
        }
        return true;
    }
}