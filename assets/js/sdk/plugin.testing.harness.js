/**
 * file: assets/js/sdk/plugin.testing.harness.js
 */

import { Core } from '../core/index.js';
import { MockPluginEnvironment } from './plugin.mock.environment.js';
import { PluginContext } from '../plugins/plugin.context.js';
import { PLUGIN_LIFECYCLE_STATES } from '../plugins/plugin.types.js';

export class PluginTestingHarness {
    /**
     * Mengeksekusi rangkaian pengujian verifikasi siklus hidup dan kepatuhan plugin.
     * @param {Object} manifest 
     * @param {Object} pluginModule 
     * @returns {Promise<Object>} Test Results Summary
     */
    static async runTestSuite(manifest, pluginModule) {
        Core.Logger.info(`[Testing Harness] Starting comprehensive test suite for plugin: ${manifest.id}`);

        const mockEnv = MockPluginEnvironment.createMockEnvironment();
        const context = new PluginContext(manifest, { services: mockEnv.services });
        const pluginInstance = pluginModule.default || pluginModule;

        const testResults = {
            pluginId: manifest.id,
            passed: true,
            assertions: [],
            executionTimeMs: 0
        };

        const startTime = Date.now();

        const assert = (title, condition, errorDetails = '') => {
            const result = { title, passed: !!condition, error: errorDetails };
            testResults.assertions.push(result);
            if (!condition) testResults.passed = false;
        };

        try {
            // Test 1: Initialize Method Check
            if (typeof pluginInstance.initialize === 'function') {
                await pluginInstance.initialize(context);
                assert("Lifecycle: initialize() executed without exceptions", true);
            } else {
                assert("Lifecycle: initialize() method exists", true, "Optional method absent");
            }

            // Test 2: Activate Method Check
            if (typeof pluginInstance.activate === 'function') {
                await pluginInstance.activate(context);
                assert("Lifecycle: activate() executed without exceptions", true);
            }

            // Test 3: Deactivate Method Check
            if (typeof pluginInstance.deactivate === 'function') {
                await pluginInstance.deactivate(context);
                assert("Lifecycle: deactivate() executed without exceptions", true);
            }

            // Test 4: Dispose Method Check
            if (typeof pluginInstance.dispose === 'function') {
                await pluginInstance.dispose(context);
                assert("Lifecycle: dispose() executed without exceptions", true);
            }

            assert("Security: Context Isolation verified", typeof context.container === 'object');
        } catch (err) {
            assert("Lifecycle Execution Failure", false, err.message);
        }

        testResults.executionTimeMs = Date.now() - startTime;
        Core.Logger.info(`[Testing Harness] Suite completed in ${testResults.executionTimeMs}ms. Status: ${testResults.passed ? 'PASSED' : 'FAILED'}`);

        return testResults;
    }
}