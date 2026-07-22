/**
 * TopCare AI Platform V2.0.0
 * Performance Monitor
 * Path: assets/js/core/performance.monitor.js
 */

const PerformanceMonitor = {
    timings: {},
    bootStart: 0,

    init() {
        this.bootStart = performance.now();
    },

    start(moduleName) {
        this.timings[moduleName] = performance.now();
    },

    end(moduleName) {
        if (this.timings[moduleName]) {
            const duration = Math.round(performance.now() - this.timings[moduleName]);
            this.timings[moduleName] = duration;
        }
    },

    report() {
        const totalBoot = Math.round(performance.now() - this.bootStart);
        console.group("[PerformanceMonitor] Boot Metrics");
        for (const [mod, time] of Object.entries(this.timings)) {
            if (typeof time === 'number') {
                console.log(`${mod.padEnd(12, '.')} ${time} ms`);
            }
        }
        console.log(`Total Boot .. ${totalBoot} ms`);
        console.groupEnd();
    }
};

export default PerformanceMonitor;