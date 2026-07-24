/**
 * TopCare AI Platform V2.0.0
 * DispatchStrategy abstraction utilizing abstract DispatchContext for partition/batch/priority support
 * Path: assets/js/auth/events/dispatch/dispatch.strategy.js
 */

class DispatchContext {
    constructor(envelope, handlers, invokeHandler) {
        this.envelope = envelope;
        this.handlers = handlers;
        this.invokeHandler = invokeHandler;
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class DispatchStrategyInterface {
    async dispatch(dispatchContext) { throw new Error("Not implemented"); }
}

class SequentialDispatchStrategy extends DispatchStrategyInterface {
    async dispatch(dispatchContext) {
        const { envelope, handlers, invokeHandler } = dispatchContext;
        let deliveredCount = 0;
        for (const handler of handlers) {
            if (envelope.context.cancellationToken.isCancellationRequested) break;
            const success = await invokeHandler(handler, envelope);
            if (success) deliveredCount++;
        }
        return deliveredCount;
    }
}

class ParallelDispatchStrategy extends DispatchStrategyInterface {
    async dispatch(dispatchContext) {
        const { envelope, handlers, invokeHandler } = dispatchContext;
        if (envelope.context.cancellationToken.isCancellationRequested) return 0;
        
        const promises = handlers.map(async handler => {
            if (envelope.context.cancellationToken.isCancellationRequested) return false;
            return await invokeHandler(handler, envelope);
        });

        const results = await Promise.all(promises);
        return results.filter(Boolean).length;
    }
}