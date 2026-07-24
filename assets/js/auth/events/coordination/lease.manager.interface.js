/**
 * TopCare AI Platform V2.0.0
 * Enriched ILeaseManager Contract Interface with Generation and Versioning
 * Path: assets/js/auth/events/coordination/lease.manager.interface.js
 */

class LeaseRecord {
    constructor(resourceKey, ownerId, ttlMs, generation = 1) {
        this.resourceKey = resourceKey;
        this.ownerId = ownerId;
        this.token = null; // Assigned by generator
        this.generation = generation;
        this.version = 1;
        this.expiresAt = 0; // Assigned by manager
        // Note: Internal mutable state -> not deepFrozen here to allow renew mutations
    }
}

class ILeaseManager {
    async acquireLease(resourceKey, ownerId, ttlMs) { throw new Error("Not implemented"); }
    async renewLease(resourceKey, ownerId, leaseToken) { throw new Error("Not implemented"); }
    async releaseLease(resourceKey, ownerId, leaseToken) { throw new Error("Not implemented"); }
    async getLeaseHolder(resourceKey) { throw new Error("Not implemented"); }
}