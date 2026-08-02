/**
 * TOPCARE AI PLATFORM V2 — SLIDING WINDOW RATE LIMITER
 * Path: assets/js/services/security/rate.limiter.js
 * Status: ACTIVE (SPRINT J - LOCKED GOLDEN BASELINE)
 * Role: Sliding Window Log Algorithm Preventing Resource Abuse
 */

import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export class SlidingWindowRateLimiter {
    constructor(maxRequests = 10, windowMs = 60000) {
        this.maxRequests = Math.max(1, Number(maxRequests));
        this.windowMs = Math.max(1000, Number(windowMs));
        /** @type {Map<string, Array<number>>} SubjectId -> Array of timestamps */
        this.timestampsMap = new Map();
    }

    /**
     * Checks if request from subject is allowed under sliding window limits.
     */
    checkLimit(subjectId) {
        const now = TimeProvider.now();
        const windowStart = now - this.windowMs;

        let timestamps = this.timestampsMap.get(subjectId) || [];
        // Filter out timestamps outside sliding window
        timestamps = timestamps.filter(ts => ts > windowStart);

        if (timestamps.length >= this.maxRequests) {
            return deepFreezeDTO({
                allowed: false,
                remainingRequests: 0,
                resetInMs: timestamps[0] + this.windowMs - now
            });
        }

        timestamps.push(now);
        this.timestampsMap.set(subjectId, timestamps);

        return deepFreezeDTO({
            allowed: true,
            remainingRequests: this.maxRequests - timestamps.length,
            resetInMs: this.windowMs
        });
    }

    reset(subjectId) {
        if (subjectId) this.timestampsMap.delete(subjectId);
        else this.timestampsMap.clear();
    }
}

export default SlidingWindowRateLimiter;
