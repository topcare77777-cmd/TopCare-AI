/**
 * TOPCARE AI PLATFORM V2 — TELEMETRY CONFIGURATION & CAPABILITY DETECTION
 * Path: assets/js/core/performance/performance.config.js
 * Version: 138.10.0 (BUILD 138B — TELEMETRY SUBSYSTEM STABILIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Immutable Telemetry Session Configuration and Runtime Browser API Capability Detection.
 */

export const TELEMETRY_MODES = Object.freeze({
    DISABLED: 'disabled',
    DEVELOPMENT: 'development',
    BENCHMARK: 'benchmark',
    PRODUCTION: 'production'
});

/**
 * Detects browser support for advanced W3C & Chromium Performance APIs safely.
 */
export const BROWSER_CAPABILITIES = Object.freeze({
    timeOrigin: typeof performance !== 'undefined' && typeof performance.timeOrigin === 'number',
    memory: typeof performance !== 'undefined' && 'memory' in performance,
    observer: typeof PerformanceObserver !== 'undefined',
    supportedEntryTypes: (typeof PerformanceObserver !== 'undefined' && Array.isArray(PerformanceObserver.supportedEntryTypes))
        ? PerformanceObserver.supportedEntryTypes
        : [],
    longTask: typeof PerformanceObserver !== 'undefined' &&
        Array.isArray(PerformanceObserver.supportedEntryTypes) &&
        PerformanceObserver.supportedEntryTypes.includes('longtask'),
    resource: typeof PerformanceObserver !== 'undefined' &&
        Array.isArray(PerformanceObserver.supportedEntryTypes) &&
        PerformanceObserver.supportedEntryTypes.includes('resource')
});

class TelemetrySessionConfig {
    constructor() {
        this._mode = TELEMETRY_MODES.BENCHMARK;
        this._samplingRate = 1.0; // 100% for Benchmark/Dev, 0.05 for Prod
        this._longTaskThreshold = 50;
        this._bufferSizeLimit = 200;
        this._observerBufferLimit = 50;
        this._autoClearMarks = true;
        this._measurePrefix = 'TC-V2';
        Object.seal(this);
    }

    get mode() { return this._mode; }
    get samplingRate() { return this._samplingRate; }
    get longTaskThreshold() { return this._longTaskThreshold; }
    get bufferSizeLimit() { return this._bufferSizeLimit; }
    get observerBufferLimit() { return this._observerBufferLimit; }
    get autoClearMarks() { return this._autoClearMarks; }
    get measurePrefix() { return this._measurePrefix; }

    /**
     * Creates an immutable config snapshot.
     */
    getSnapshot() {
        return Object.freeze({
            mode: this._mode,
            samplingRate: this._samplingRate,
            longTaskThreshold: this._longTaskThreshold,
            bufferSizeLimit: this._bufferSizeLimit,
            observerBufferLimit: this._observerBufferLimit,
            autoClearMarks: this._autoClearMarks,
            measurePrefix: this._measurePrefix,
            capabilities: BROWSER_CAPABILITIES
        });
    }

    /**
     * Updates session config safely with bounds validation.
     * @param {Object} options 
     */
    configure(options = {}) {
        if (typeof options !== 'object' || options === null) return this.getSnapshot();

        if (options.mode && Object.values(TELEMETRY_MODES).includes(options.mode)) {
            this._mode = options.mode;
        }
        if (typeof options.samplingRate === 'number') {
            this._samplingRate = Math.max(0, Math.min(1, options.samplingRate));
        }
        if (typeof options.bufferSizeLimit === 'number' && options.bufferSizeLimit > 0) {
            this._bufferSizeLimit = options.bufferSizeLimit;
        }
        if (typeof options.observerBufferLimit === 'number' && options.observerBufferLimit > 0) {
            this._observerBufferLimit = options.observerBufferLimit;
        }

        return this.getSnapshot();
    }
}

export const TelemetryConfig = new TelemetrySessionConfig();
export default TelemetryConfig;