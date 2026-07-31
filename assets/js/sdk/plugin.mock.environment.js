/**
 * file: assets/js/sdk/plugin.mock.environment.js
 */

import { Core } from '../core/index.js';

export class MockPluginEnvironment {
    /**
     * Membangun lingkungan mock Host Platform terisolasi untuk pengujian lokal.
     * @param {Object} customConfig 
     * @returns {Object} Mock Environment Instance
     */
    static createMockEnvironment(customConfig = {}) {
        const mockLogs = [];
        const mockEvents = new Map();

        const mockLogger = Object.freeze({
            info: (msg) => {
                mockLogs.push({ type: 'info', msg, timestamp: Date.now() });
                Core.Logger.info(`[MockEnv:INFO] ${msg}`);
            },
            warn: (msg) => {
                mockLogs.push({ type: 'warn', msg, timestamp: Date.now() });
                Core.Logger.warn(`[MockEnv:WARN] ${msg}`);
            },
            error: (msg) => {
                mockLogs.push({ type: 'error', msg, timestamp: Date.now() });
                Core.Logger.error(`[MockEnv:ERROR] ${msg}`);
            }
        });

        const mockEventBus = Object.freeze({
            emit: (event, data) => {
                if (mockEvents.has(event)) {
                    mockEvents.get(event).forEach(cb => cb(data));
                }
            },
            on: (event, cb) => {
                if (!mockEvents.has(event)) mockEvents.set(event, []);
                mockEvents.get(event).push(cb);
            }
        });

        const mockServices = Object.freeze({
            AuthService: {
                getCurrentUser: () => ({ id: 'usr_mock_123', name: 'Dr. Jane Doe', role: 'Physician' })
            },
            PatientDataService: {
                getPatientRecord: (id) => ({ id, name: 'John Smith', age: 45, condition: 'Stable' })
            },
            ...customConfig.services
        });

        return {
            logger: mockLogger,
            event: mockEventBus,
            services: mockServices,
            getLogs: () => [...mockLogs],
            clearLogs: () => { mockLogs.length = 0; }
        };
    }
}