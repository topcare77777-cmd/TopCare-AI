/**
 * TopCare AI Platform V2.0.0
 * Middleware Engine
 * Path: assets/js/core/middleware.engine.js
 */
const MiddlewareEngine = {
    middlewares: [],
    use(mw) { this.middlewares.push(mw); },
    async execute(context) {
        for (const mw of this.middlewares) {
            await mw(context);
        }
    }
};

export default MiddlewareEngine;