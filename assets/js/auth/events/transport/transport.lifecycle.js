/**
 * TopCare AI Platform V2.0.0
 * Transport Lifecycle State Machine managing connection states
 * Path: assets/js/auth/events/transport/transport.lifecycle.js
 */

const TransportLifecycleState = Object.freeze({
    DISCONNECTED: 'DISCONNECTED',
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    RECONNECTING: 'RECONNECTING'
});

class TransportLifecycleManager {
    constructor(initialState = TransportLifecycleState.DISCONNECTED) {
        this.state = initialState;
        this._listeners = new Set();
    }

    transitionTo(newState) {
        if (this.state !== newState) {
            const oldState = this.state;
            this.state = newState;
            this._listeners.forEach(listener => {
                try { listener(newState, oldState); } catch (e) {}
            });
        }
    }

    onChange(listener) {
        this._listeners.add(listener);
        return {
            dispose: () => this._listeners.delete(listener)
        };
    }
}