/**
 * TopCare AI Platform V2.0.0
 * True Snowflake Generator with Logical Clock Rollback Policy
 * Path: assets/js/auth/events/transport/utils/monotonic.sequence.generator.js
 */

const ClockRollbackPolicy = Object.freeze({
    WAIT: 'WAIT',
    FAIL: 'FAIL',
    BACKOFF: 'BACKOFF',
    USE_LOGICAL_CLOCK: 'USE_LOGICAL_CLOCK'
});

class MonotonicSequenceGenerator {
    constructor(clock, datacenterId = 1, workerId = 1, customEpoch = 1704067200000, rollbackPolicy = ClockRollbackPolicy.USE_LOGICAL_CLOCK, maxRollbackWaitMs = 100) {
        if (!clock || typeof clock.now !== 'function') {
            throw new ConfigurationException("MonotonicSequenceGenerator requires an IClock instance.");
        }
        this.clock = clock;
        this.datacenterId = BigInt(datacenterId & 0x1F);
        this.workerId = BigInt(workerId & 0x1F);
        this.customEpoch = BigInt(customEpoch);
        this.rollbackPolicy = rollbackPolicy;
        this.maxRollbackWaitMs = maxRollbackWaitMs;
        
        this._lastTimestamp = -1n;
        this._sequence = 0n;
        this._sequenceMask = 0xFFFn;
        this._logicalOffset = 0n;
    }

    async nextId() {
        let rawNow = BigInt(this.clock.now());
        let now = rawNow;

        if (now < this._lastTimestamp) {
            const diff = Number(this._lastTimestamp - now);
            if (this.rollbackPolicy === ClockRollbackPolicy.FAIL) {
                throw new TransportException(`Clock moved backwards by ${diff}ms.`);
            } else if (this.rollbackPolicy === ClockRollbackPolicy.USE_LOGICAL_CLOCK) {
                // Use last valid timestamp and increment logical offset
                now = this._lastTimestamp;
                this._logicalOffset++;
            } else if (this.rollbackPolicy === ClockRollbackPolicy.WAIT) {
                if (diff > this.maxRollbackWaitMs) {
                    throw new TransportException(`Clock rollback wait exceeded limit.`);
                }
                while (now < this._lastTimestamp) {
                    await this.clock.waitNextTick(1);
                    now = BigInt(this.clock.now());
                }
            }
        } else {
            this._logicalOffset = 0n;
        }

        if (now === this._lastTimestamp) {
            this._sequence = (this._sequence + 1n + this._logicalOffset) & this._sequenceMask;
            if (this._sequence === 0n) {
                while (now <= this._lastTimestamp) {
                    await this.clock.waitNextTick(1);
                    now = BigInt(this.clock.now());
                }
            }
        } else {
            this._sequence = 0n;
        }

        this._lastTimestamp = now;

        const delta = now - this.customEpoch;
        const snowflake = (delta << 22n) | (this.datacenterId << 17n) | (this.workerId << 12n) | this._sequence;
        return snowflake;
    }

    async nextNumeric() {
        return await this.nextId();
    }
}