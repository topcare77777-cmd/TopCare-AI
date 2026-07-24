/**
 * TopCare AI Platform V2.0.0
 * Built-in Authorization Middleware checking event execution permissions
 * Path: assets/js/auth/events/middleware/built.in/authorization.middleware.js
 */

class AuthorizationMiddleware extends IEventMiddleware {
    constructor(authorizerFn) {
        super();
        this.authorizerFn = authorizerFn || (async () => true);
    }

    async handle(dispatchContext, next) {
        const { envelope } = dispatchContext;
        const isAuthorized = await this.authorizerFn(envelope);
        if (!isAuthorized) {
            throw new Error(`UnauthorizedEventAccess: Event [${envelope.event.name}] rejected by authorization middleware.`);
        }
        await next();
    }
}