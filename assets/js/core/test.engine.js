/**
 * TopCare AI Platform V2.0.0
 * Test Engine
 * Path: assets/js/core/test.engine.js
 */
import Logger from './logger.js';

const TestEngine = {
    tests: [],

    register(name, testFn) {
        this.tests.push({ name, testFn });
    },

    async runAll() {
        console.group("[TestEngine] Running Enterprise Unit & Integration Tests");
        let passed = 0;
        let failed = 0;

        for (const t of this.tests) {
            try {
                await t.testFn();
                console.log(`[PASS] ${t.name}`);
                passed++;
            } catch (error) {
                console.error(`[FAIL] ${t.name}:`, error);
                failed++;
            }
        }

        console.groupEnd();
        Logger.info(`[TestEngine] Complete. Passed: ${passed}, Failed: ${failed}`);
        return { passed, failed };
    }
};

export default TestEngine;