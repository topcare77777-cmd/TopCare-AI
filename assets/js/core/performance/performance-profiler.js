/**
 * TOPCARE AI PLATFORM V2 — PERFORMANCE PROFILER ENGINE
 * Path: assets/js/core/performance/performance-profiler.js
 * Version: 138.10.0 (BUILD 138B — TELEMETRY SUBSYSTEM STABILIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Thread-safe marks, nested hierarchical tracing, timeOrigin offsets, and sanitized metadata collection.
 */

import { TelemetryConfig, TELEMETRY_MODES, BROWSER_CAPABILITIES } from './performance.config.js';

class PerformanceProfilerEngine {
    constructor() {
        this._records = [];
        this._activeMarks = new Map();
        this._sequenceCounter = 0;
        this._timeOrigin = BROWSER_CAPABILITIES.timeOrigin ? performance.timeOrigin : Date.now();
        Object.seal(this);
    }

    /**
     * Starts a performance mark and returns an immutable Tracking Token supporting nested parent tracing.
     * @param {string} category 
     * @param {Object|null} parentToken 
     * @returns {Object|null} Immutable Tracking Token
     */
    start(category, parentToken = null) {
        const snapshot = TelemetryConfig.getSnapshot();
        if (snapshot.mode === TELEMETRY_MODES.DISABLED || typeof performance === 'undefined') {
            return null;
        }

        // Apply Sampling Rate Check
        if (snapshot.samplingRate < 1.0 && Math.random() > snapshot.samplingRate) {
            return null;
        }

        const instanceId = ++this._sequenceCounter;
        const markName = `${snapshot.measurePrefix}:${category}:start:${instanceId}`;
        const startOffset = performance.now();

        const token = Object.freeze({
            id: instanceId,
            category,
            markName,
            parentId: parentToken ? parentToken.id : null,
            parentCategory: parentToken ? parentToken.category : null,
            startOffset: Number(startOffset.toFixed(2)),
            startedAtAbsolute: Math.round(this._timeOrigin + startOffset)
        });

        this._activeMarks.set(instanceId, token);
        performance.mark(markName);

        return token;
    }

    /**
     * Ends measurement using the Tracking Token, calculates nested offsets, and stores sanitized record.
     * @param {Object} token 
     * @param {Object} rawMetadata 
     * @returns {Object|null} Recorded Execution Object
     */
    end(token, rawMetadata = {}) {
        if (!token || !token.id || !this._activeMarks.has(token.id)) {
            return null;
        }

        const snapshot = TelemetryConfig.getSnapshot();
        const markData = this._activeMarks.get(token.id);
        this._activeMarks.delete(token.id);

        const endOffset = performance.now();
        const endMarkName = `${snapshot.measurePrefix}:${markData.category}:end:${markData.id}`;
        const measureName = `${snapshot.measurePrefix}:${markData.category}`;

        performance.mark(endMarkName);

        let duration = 0;
        try {
            performance.measure(measureName, markData.markName, endMarkName);
            const entries = performance.getEntriesByName(measureName);
            if (entries.length > 0) {
                duration = entries[entries.length - 1].duration;
            }
        } catch (e) {
            duration = endOffset - markData.startOffset;
        }

        if (snapshot.autoClearMarks) {
            performance.clearMarks(markData.markName);
            performance.clearMarks(endMarkName);
            performance.clearMeasures(measureName);
        }

        const record = Object.freeze({
            id: markData.id,
            category: markData.category,
            parentId: markData.parentId,
            parentCategory: markData.parentCategory,
            duration: Number(duration.toFixed(2)),
            startOffset: markData.startOffset,
            endOffset: Number(endOffset.toFixed(2)),
            startedAt: markData.startedAtAbsolute,
            endedAt: Math.round(this._timeOrigin + endOffset),
            memory: this.getMemorySnapshot(),
            metadata: this._sanitizeMetadata(rawMetadata)
        });

        this._pushRecord(record);
        return record;
    }

    getMemorySnapshot() {
        if (!BROWSER_CAPABILITIES.memory) {
            return { supported: false };
        }

        return {
            supported: true,
            usedJSHeapMB: Number((performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)),
            totalJSHeapMB: Number((performance.memory.totalJSHeapSize / (1024 * 1024)).toFixed(2)),
            jsHeapLimitMB: Number((performance.memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2))
        };
    }

    getFinishedRecords() {
        return [...this._records];
    }

    clearFinishedRecords() {
        this._records = [];
    }

    _sanitizeMetadata(input) {
        if (typeof input !== 'object' || input === null) return {};

        // Sanitization: Allow primitive value types only, reject DOM Nodes or cyclic objects
        const allowedKeys = ['route', 'page', 'feature', 'build', 'action', 'status', 'itemCount'];
        const sanitized = {};

        for (const key of allowedKeys) {
            if (key in input) {
                const val = input[key];
                if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                    sanitized[key] = val;
                }
            }
        }

        return Object.freeze(sanitized);
    }

    _pushRecord(record) {
        const snapshot = TelemetryConfig.getSnapshot();
        if (this._records.length >= snapshot.bufferSizeLimit) {
            this._records.shift();
        }
        this._records.push(record);
    }
}

export const PerformanceProfiler = new PerformanceProfilerEngine();
export default PerformanceProfiler;