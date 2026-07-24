/**
 * TopCare AI Platform V2.0.0
 * Hardened InMemoryEventBus delegating execution exclusively to PipelineManager
 * Path: assets/js/auth/events/bus/in.memory.event.bus.js
 */

class InMemoryEventBus extends EventBusInterface {
    constructor(telemetry, options = {}) {
        super();
        const telemetryAdapter = telemetry instanceof IEventTelemetry ? telemetry : new ConsoleEventTelemetryAdapter(telemetry);
        this.diagnostics = new EventDiagnostics(telemetryAdapter);
        this.subscribers = new Map();
        this.retryStrategy = options.retryStrategy || new ExponentialRetryStrategy();
        this.deadLetterStore = options.deadLetterStore || new MemoryDeadLetterStore();
        this.dispatchStrategy = options.dispatchStrategy || new SequentialDispatchStrategy();
        this.pipelineManager = new PipelineManager();
    }

    use(middleware) {
        this.pipelineManager.use(middleware);
        return this;
    }

    subscribe(eventName, handler) {
        if (!eventName || typeof handler !== 'function') {
            throw new Error("Event name and handler function are required for subscription.");
        }
        if (!this.subscribers.has(eventName)) {
            this.subscribers.set(eventName, new Set());
        }
        this.subscribers.get(eventName).add(handler);
        
        return {
            dispose: () => this.unsubscribe(eventName, handler)
        };
    }

    unsubscribe(eventName, handler) {
        if (this.subscribers.has(eventName)) {
            this.subscribers.get(eventName).delete(handler);
        }
    }

    async publish(domainEvent, options = {}) {
        if (!(domainEvent instanceof DomainEvent)) {
            throw new Error("InvalidArgument: publish expects a DomainEvent instance.");
        }

        const eventContext = new EventContext({
            eventId: domainEvent.id,
            eventName: domainEvent.name,
            timestamp: domainEvent.occurredAt,
            metadata: options.metadata || {},
            cancellationToken: options.cancellationToken
        });

        const envelope = new EventEnvelope(domainEvent, eventContext);

        this.diagnostics.logPublished(envelope);

        if (!this.subscribers.has(domainEvent.name)) {
            return { success: true, deliveredCount: 0 };
        }

        const handlers = Array.from(this.subscribers.get(domainEvent.name));

        const invokeHandler = async (handler, env) => {
            let success = false;
            let attempts = 0;
            let lastError = null;

            while (!success) {
                if (env.context.cancellationToken.isCancellationRequested) break;
                attempts++;
                try {
                    // Delegate completely to PipelineManager orchestrating middlewares and final handler
                    const dispatchCtx = { envelope: env, handler };
                    await this.pipelineManager.execute(dispatchCtx, async (finalEnv) => {
                        await handler(finalEnv.event, finalEnv.context);
                    });

                    success = true;
                    this.diagnostics.logHandled(env, handler.name);
                } catch (e) {
                    lastError = e;
                    this.diagnostics.logHandlerFailed(env, e, attempts);
                    
                    const decision = this.retryStrategy.evaluate(e, attempts);
                    if (!decision.retry) {
                        break;
                    }
                    if (decision.delay > 0) {
                        await new Promise(resolve => setTimeout(resolve, decision.delay));
                    }
                }
            }

            if (!success) {
                const dlqEntry = new DeadLetterEntry(env, lastError, attempts);
                this.diagnostics.logDeadLetter(env, lastError);
                await this.deadLetterStore.save(dlqEntry);
            }

            return success;
        };

        const dispatchContext = new DispatchContext(envelope, handlers, invokeHandler);
        const deliveredCount = await this.dispatchStrategy.dispatch(dispatchContext);

        return { success: deliveredCount > 0 || handlers.length === 0, deliveredCount };
    }

    async getDeadLetterQueue() {
        return await this.deadLetterStore.getAll();
    }

    async clearDeadLetterQueue() {
        await this.deadLetterStore.clear();
    }
}