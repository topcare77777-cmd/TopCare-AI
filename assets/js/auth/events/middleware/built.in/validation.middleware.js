/**
 * TopCare AI Platform V2.0.0
 * Built-in Validation Middleware validating event payload structures
 * Path: assets/js/auth/events/middleware/built.in/validation.middleware.js
 */

class ValidationMiddleware extends IEventMiddleware {
    constructor(validatorFn) {
        super();
        this.validatorFn = validatorFn || (() => true);
    }

    async handle(dispatchContext, next) {
        const { envelope } = dispatchContext;
        const isValid = await this.validatorFn(envelope.event.payload, envelope);
        if (!isValid) {
            throw new Error(`EventValidationFailed: Payload validation failed for event [${envelope.event.name}].`);
        }
        await next();
    }
}