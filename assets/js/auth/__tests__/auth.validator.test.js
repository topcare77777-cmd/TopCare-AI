/**
 * TopCare AI Platform V2.0.0
 * Unit Test for Validators
 * Path: assets/js/auth/__tests__/auth.validator.test.js
 */

function runAuthValidatorTests() {
    console.log("[Test] Running AuthValidator tests...");
    try {
        AuthValidator.validateEmail("test@topcare.ai");
        AuthValidator.validatePassword("secret123");
        AuthValidator.validatePhone("081234567890");
        AuthValidator.validateOTP("123456");
        console.log("[Test] AuthValidator tests PASSED.");
    } catch (e) {
        console.error("[Test] AuthValidator tests FAILED:", e);
    }
}