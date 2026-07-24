/**
 * TopCare AI Platform V2.0.0
 * Extended Clock Family with async tick support for non-blocking operations
 * Path: assets/js/auth/events/utils/platform.clock.js
 */

class IClock {
    now() { throw new Error("Not implemented"); }
    toISOString() { throw new Error("Not implemented"); }
    async waitNextTick(ms) { await new Promise(r => setTimeout(r, ms)); }
}

class SystemClock extends IClock {
    now() { return Date.now(); }
    toISOString() { return new Date().toISOString(); }
    async waitNextTick(ms) { await new Promise(r => setTimeout(r, ms)); }
}

class FakeClock extends IClock {
    constructor(initialTimestamp = Date.now()) {
        super();
        this._current = initialTimestamp;
    }
    now() { return this._current; }
    toISOString() { return new Date(this._current).toISOString(); }
    advance(ms) { this._current += ms; }
    travelTo(timestamp) { this._current = timestamp; }
    async waitNextTick(ms) { this._current += ms; }
}

class FrozenClock extends IClock {
    constructor(frozenTimestamp = Date.now()) {
        super();
        this._frozen = frozenTimestamp;
    }
    now() { return this._frozen; }
    toISOString() { return new Date(this._frozen).toISOString(); }
    async waitNextTick(ms) {
        throw new TransportException("FrozenClock does not allow time passage or waiting.");
    }
}

class OffsetClock extends IClock {
    constructor(baseClock, offsetMs = 0) {
        super();
        this.baseClock = baseClock;
        this.offsetMs = offsetMs;
    }
    now() { return this.baseClock.now() + this.offsetMs; }
    toISOString() { return new Date(this.now()).toISOString(); }
    async waitNextTick(ms) { await this.baseClock.waitNextTick(ms); }
}

class ReplayClock extends IClock {
    constructor(timestamps = []) {
        super();
        this.timestamps = timestamps;
        this.index = 0;
    }
    now() {
        if (this.index < this.timestamps.length) {
            return this.timestamps[this.index++];
        }
        return this.timestamps[this.timestamps.length - 1] || Date.now();
    }
    toISOString() { return new Date(this.now()).toISOString(); }
    async waitNextTick(ms) { /* Replay clock advances instantly on demand */ }
}