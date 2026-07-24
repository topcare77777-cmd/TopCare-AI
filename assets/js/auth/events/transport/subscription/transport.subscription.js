/**
 * TopCare AI Platform V2.0.0
 * Production TransportSubscription with async lifecycle, readiness, health, and state listeners
 * Path: assets/js/auth/events/transport/subscription/transport.subscription.js
 */

class TransportSubscription {
    constructor(channel, handler, disposeCallback) {
        this.channel = channel;
        this.handler = handler;
        this._disposeCallback = disposeCallback;
        this.state = TransportSubscriptionState.ACTIVE;
        this._listeners = new Set();
        Object.seal(this);
    }

    onStateChanged(listener) {
        if (typeof listener === 'function') this._listeners.add(listener);
        return { dispose: () => this._listeners.delete(listener) };
    }

    _transitionTo(newState) {
        if (this.state !== newState) {
            const oldState = this.state;
            this.state = newState;
            this._listeners.forEach(l => {
                try { l(newState, oldState); } catch (e) {}
            });
        }
    }

    isDisposed() {
        return this.state === TransportSubscriptionState.DISPOSED;
    }

    async awaitReady(timeoutMs = 3000) {
        const start = Date.now();
        while (this.state !== TransportSubscriptionState.ACTIVE) {
            if (Date.now() - start > timeoutMs) {
                throw new TransportTimeoutException("Subscription failed to reach ACTIVE state within timeout.");
            }
            await new Promise(r => setTimeout(r, 50));
        }
        return true;
    }

    health() {
        return Object.freeze({
            channel: this.channel,
            state: this.state,
            healthy: this.state === TransportSubscriptionState.ACTIVE
        });
    }

    async pause() {
        if (this.state === TransportSubscriptionState.ACTIVE) {
            await new Promise(resolve => setTimeout(resolve, 10));
            this._transitionTo(TransportSubscriptionState.PAUSED);
        }
    }

    async resume() {
        if (this.state === TransportSubscriptionState.PAUSED) {
            await new Promise(resolve => setTimeout(resolve, 10));
            this._transitionTo(TransportSubscriptionState.ACTIVE);
        }
    }

    async drain() {
        if (this.state === TransportSubscriptionState.ACTIVE) {
            await new Promise(resolve => setTimeout(resolve, 20));
        }
    }

    async dispose() {
        if (this.state !== TransportSubscriptionState.DISPOSED) {
            this._transitionTo(TransportSubscriptionState.DISPOSED);
            if (typeof this._disposeCallback === 'function') {
                await this._disposeCallback();
            }
        }
    }
}