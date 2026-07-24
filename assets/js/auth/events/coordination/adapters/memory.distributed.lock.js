/**
 * TopCare AI Platform V2.0.0
 * Hardened MemoryDistributedLock utilizing Clock abstraction wait and Crypto Token Generator
 * Path: assets/js/auth/events/coordination/adapters/memory.distributed.lock.js
 */

class MemoryDistributedLock extends IDistributedLock {
    constructor(clock = new SystemClock(), tokenGenerator = new CryptoTokenGenerator()) {
        super();
        this.clock = clock;
        this.tokenGenerator = tokenGenerator;
        this.locks = new Map(); // resourceKey -> LockToken
        this._globalFencingCounter = 0n;
    }

    async acquire(resourceKey, ownerId, ttlMs = 5000, timeoutMs = 3000) {
        const startTime = this.clock.now();
        const deadline = startTime + timeoutMs;

        while (this.clock.now() <= deadline) {
            const now = this.clock.now();
            const existing = this.locks.get(resourceKey);

            if (!existing || existing.expiresAt <= now) {
                this._globalFencingCounter++;
                const token = new LockToken(resourceKey, ownerId, this._globalFencingCounter, now + ttlMs);
                token.leaseId = this.tokenGenerator.generateToken('lock');
                token.secret = this.tokenGenerator.generateToken('sec');
                
                this.locks.set(resourceKey, token);
                return token;
            }

            // Non-blocking clock abstraction wait
            await this.clock.waitNextTick(50);
        }

        throw new DistributedLockAcquisitionException(`Timeout acquiring lock for resource '${resourceKey}'.`);
    }

    async release(resourceKey, ownerId, lockToken) {
        const existing = this.locks.get(resourceKey);
        if (existing && existing.secret === lockToken.secret && existing.ownerId === ownerId) {
            this.locks.delete(resourceKey);
            return true;
        }
        return false;
    }

    async renew(resourceKey, ownerId, lockToken, extensionMs = 5000) {
        const now = this.clock.now();
        const existing = this.locks.get(resourceKey);
        if (existing && existing.secret === lockToken.secret && existing.ownerId === ownerId && existing.expiresAt > now) {
            existing.expiresAt = now + extensionMs;
            existing.version++;
            return true;
        }
        return false;
    }
}