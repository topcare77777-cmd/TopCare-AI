/**
 * TopCare AI Platform V2.0.0
 * Hardened MemoryLeaseManager utilizing ITokenGenerator and mutable internal state
 * Path: assets/js/auth/events/coordination/adapters/memory.lease.manager.js
 */

class MemoryLeaseManager extends ILeaseManager {
    constructor(clock = new SystemClock(), tokenGenerator = new CryptoTokenGenerator()) {
        super();
        this.clock = clock;
        this.tokenGenerator = tokenGenerator;
        this.leases = new Map(); // resourceKey -> LeaseRecord
    }

    async acquireLease(resourceKey, ownerId, ttlMs = 10000) {
        const now = this.clock.now();
        const existing = this.leases.get(resourceKey);

        if (existing && existing.expiresAt > now && existing.ownerId !== ownerId) {
            return { acquired: false, token: null, ownerId: existing.ownerId, generation: existing.generation };
        }

        const generation = existing && existing.ownerId === ownerId ? existing.generation + 1 : 1;
        const record = new LeaseRecord(resourceKey, ownerId, ttlMs, generation);
        record.token = this.tokenGenerator.generateToken('lease');
        record.expiresAt = now + ttlMs;

        this.leases.set(resourceKey, record);
        return { acquired: true, token: record.token, ownerId, generation: record.generation };
    }

    async renewLease(resourceKey, ownerId, leaseToken, extensionMs = 10000) {
        const now = this.clock.now();
        const existing = this.leases.get(resourceKey);

        if (!existing || existing.token !== leaseToken || existing.ownerId !== ownerId || existing.expiresAt <= now) {
            return false;
        }

        existing.expiresAt = now + extensionMs;
        existing.version++;
        return true;
    }

    async releaseLease(resourceKey, ownerId, leaseToken) {
        const existing = this.leases.get(resourceKey);
        if (existing && existing.token === leaseToken && existing.ownerId === ownerId) {
            this.leases.delete(resourceKey);
            return true;
        }
        return false;
    }

    async getLeaseHolder(resourceKey) {
        const now = this.clock.now();
        const existing = this.leases.get(resourceKey);
        if (existing && existing.expiresAt > now) {
            return { ownerId: existing.ownerId, generation: existing.generation };
        }
        return null;
    }
}