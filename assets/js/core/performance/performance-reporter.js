/**
 * TOPCARE AI PLATFORM V2 — PERFORMANCE DATA REPORTER & FORMATTERS
 * Path: assets/js/core/performance/performance-reporter.js
 * Version: 138.10.0 (BUILD 138B — TELEMETRY SUBSYSTEM STABILIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Emits raw metric reports and formats them for Console, JSON, or Chrome Trace Event specifications.
 */

import { PerformanceProfiler } from './performance-profiler.js';
import { PlatformPerformanceObserver } from './performance-observer.js';
import { TelemetryConfig, BROWSER_CAPABILITIES } from './performance.config.js';

export class PerformanceReporterEngine {
    /**
     * Emits pure, unformatted Telemetry Data Object.
     * @returns {Object}
     */
    getRawReport() {
        const snapshot = TelemetryConfig.getSnapshot();
        const records = PerformanceProfiler.getFinishedRecords();
        const longTasks = PlatformPerformanceObserver.getLongTasks();
        const slowResources = PlatformPerformanceObserver.getSlowResources();
        const memory = PerformanceProfiler.getMemorySnapshot();

        const totalTrackedDuration = records.reduce((sum, r) => sum + r.duration, 0);

        return Object.freeze({
            metadata: {
                platform: 'TopCare AI Platform V2',
                mode: snapshot.mode,
                generatedAt: new Date().toISOString(),
                recordCount: records.length,
                longTaskCount: longTasks.length,
                slowResourceCount: slowResources.length,
                capabilities: BROWSER_CAPABILITIES
            },
            memory,
            summary: {
                totalTrackedDurationMS: Number(totalTrackedDuration.toFixed(2)),
                averageExecutionMS: records.length > 0 ? Number((totalTrackedDuration / records.length).toFixed(2)) : 0
            },
            records,
            longTasks,
            slowResources
        });
    }

    /**
     * Formatter Adapter: Chrome Trace Event Format (compatible with chrome://tracing / Perfetto).
     * @returns {Object}
     */
    toChromeTraceFormat() {
        const report = this.getRawReport();
        const traceEvents = report.records.map(r => ({
            name: r.category,
            cat: 'topcare.v2',
            ph: 'X', // Complete Event
            ts: Math.round(r.startOffset * 1000), // Microseconds
            dur: Math.round(r.duration * 1000), // Microseconds
            pid: 1,
            tid: 1,
            args: { ...r.metadata, parentCategory: r.parentCategory }
        }));

        return { traceEvents };
    }

    /**
     * Formatter Adapter: Console Visual Writer.
     */
    dumpToConsole() {
        const report = this.getRawReport();

        console.group('%c 🚀 TOPCARE V2 — EMPIRICAL PERFORMANCE REPORT ', 'background: #0f172a; color: #38bdf8; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 4px;');

        if (report.memory.supported) {
            console.log(`%c Heap Memory: %c${report.memory.usedJSHeapMB} MB / ${report.memory.totalJSHeapMB} MB (Limit: ${report.memory.jsHeapLimitMB} MB)`, 'font-weight: bold;', 'color: #a78bfa;');
        } else {
            console.log('%c Heap Memory: %cUnsupported Browser / Capability Guarded', 'font-weight: bold;', 'color: #fbbf24;');
        }

        if (report.records.length > 0) {
            console.log('%c Execution Metrics (ms):', 'font-weight: bold; color: #34d399;');
            console.table(report.records.map(r => ({
                Category: r.category,
                Parent: r.parentCategory || 'ROOT',
                'Duration (ms)': r.duration,
                'Start Offset (ms)': r.startOffset,
                'Heap Used (MB)': r.memory.supported ? r.memory.usedJSHeapMB : 'N/A'
            })));
        }

        if (report.longTasks.length > 0) {
            console.warn(`%c ⚠️ Detected ${report.longTasks.length} Main-Thread LongTasks (>50ms):`, 'font-weight: bold; color: #fbbf24;');
            console.table(report.longTasks);
        }

        if (report.slowResources.length > 0) {
            console.warn(`%c ⚠️ Detected ${report.slowResources.length} Slow Resources (>100ms):`, 'font-weight: bold; color: #f87171;');
            console.table(report.slowResources);
        }

        console.groupEnd();
    }
}

export const PerformanceReporter = new PerformanceReporterEngine();
export default PerformanceReporter;