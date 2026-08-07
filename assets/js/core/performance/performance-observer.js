/**
 * TOPCARE AI PLATFORM V2 — PERFORMANCE OBSERVER ENGINE
 * Path: assets/js/core/performance/performance-observer.js
 * Version: 138.10.0 (BUILD 138B — TELEMETRY SUBSYSTEM STABILIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Asynchronous PerformanceObserver guarded explicitly by browser capabilities for LongTasks and Resource Timing.
 */

import { TelemetryConfig, TELEMETRY_MODES, BROWSER_CAPABILITIES } from './performance.config.js';

export class PerformanceObserverEngine {
    constructor() {
        this._longTasks = [];
        this._slowResources = [];
        this._observer = null;
        this._isListening = false;
        Object.seal(this);
    }

    /**
     * Initializes observer strictly matching host browser capability detection.
     */
    init() {
        const snapshot = TelemetryConfig.getSnapshot();
        if (this._isListening || snapshot.mode === TELEMETRY_MODES.DISABLED || !BROWSER_CAPABILITIES.observer) {
            return;
        }

        const entryTypesToObserve = [];
        if (BROWSER_CAPABILITIES.longTask) {
            entryTypesToObserve.push('longtask');
        }
        if (BROWSER_CAPABILITIES.resource && snapshot.mode === TELEMETRY_MODES.BENCHMARK) {
            entryTypesToObserve.push('resource');
        }

        if (entryTypesToObserve.length === 0) {
            return;
        }

        try {
            this._observer = new PerformanceObserver((list) => {
                const snap = TelemetryConfig.getSnapshot();
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'longtask' && entry.duration >= snap.longTaskThreshold) {
                        this._pushTask({
                            name: entry.name,
                            duration: Number(entry.duration.toFixed(2)),
                            startTimeOffset: Number(entry.startTime.toFixed(2)),
                            containerType: entry.attribution?.[0]?.containerType || 'window',
                            containerName: entry.attribution?.[0]?.containerName || 'main'
                        });
                    } else if (entry.entryType === 'resource' && entry.duration >= 100) {
                        this._pushResource({
                            name: entry.name.split('/').pop().split('?')[0] || entry.name,
                            fullUrl: entry.name,
                            initiatorType: entry.initiatorType,
                            duration: Number(entry.duration.toFixed(2)),
                            transferSize: entry.transferSize || 0
                        });
                    }
                }
            });

            this._observer.observe({ entryTypes: entryTypesToObserve });
            this._isListening = true;
        } catch (err) {
            this._isListening = false;
        }
    }

    getLongTasks() {
        return [...this._longTasks];
    }

    getSlowResources() {
        return [...this._slowResources];
    }

    clear() {
        this._longTasks = [];
        this._slowResources = [];
    }

    disconnect() {
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }
        this._isListening = false;
    }

    _pushTask(task) {
        const snapshot = TelemetryConfig.getSnapshot();
        if (this._longTasks.length >= snapshot.observerBufferLimit) {
            this._longTasks.shift();
        }
        this._longTasks.push(task);
    }

    _pushResource(resource) {
        const snapshot = TelemetryConfig.getSnapshot();
        if (this._slowResources.length >= snapshot.observerBufferLimit) {
            this._slowResources.shift();
        }
        this._slowResources.push(resource);
    }
}

export const PlatformPerformanceObserver = new PerformanceObserverEngine();
export default PlatformPerformanceObserver;