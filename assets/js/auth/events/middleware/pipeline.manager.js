/**
 * TopCare AI Platform V2.0.0
 * Pipeline Manager for composing and executing ordered event middleware chains
 * Path: assets/js/auth/events/middleware/pipeline.manager.js
 */

class PipelineManager {
    constructor() {
        this.middlewares = [];
    }

    use(middleware) {
        if (!middleware || typeof middleware.handle !== 'function') {
            throw new Error("InvalidArgument: Middleware must implement IEventMiddleware contract.");
        }
        this.middlewares.push(middleware);
        return this;
    }

    async execute(dispatchContext, finalHandler) {
        let index = -1;
        const runner = async (i) => {
            if (i <= index) throw new Error("IllegalState: next() called multiple times in middleware chain.");
            index = i;
            const middleware = this.middlewares[i];
            if (middleware) {
                await middleware.handle(dispatchContext, () => runner(i + 1));
            } else {
                await finalHandler(dispatchContext.envelope);
            }
        };

        await runner(0);
    }
}