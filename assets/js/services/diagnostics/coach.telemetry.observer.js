/**
 * TOPCARE AI PLATFORM V2 — TELEMETRY PASSIVE OBSERVER
 * Path: assets/js/services/diagnostics/coach.telemetry.observer.js
 * Status: ACTIVE (BUILD AC-017R1 - LOCKED GOLDEN BASELINE)
 * Role: Passive Read-Only Side-Car Observer
 */

import { deepCloneDTO, deepFreezeDTO } from '../../core/utils/dto.js';

const MAX_LOG_BUFFER = 50;

export const CoachTelemetryObserver = (() => {
    /** @type {Array<Object>} Internal Ring Buffer (FIFO) */
    const logBuffer = [];

    function record(domain, eventName, payload) {
        const logEntry = {
            domain,
            eventName,
            payload: payload ? deepCloneDTO(payload) : {}
        };

        logBuffer.push(logEntry);
        if (logBuffer.length > MAX_LOG_BUFFER) {
            logBuffer.shift(); // Enforces FIFO Ring Buffer for constant RAM usage
        }
    }

    function attach(eventEngine) {
        if (!eventEngine || typeof eventEngine.subscribe !== 'function') return;

        eventEngine.subscribe((eventObject) => {
            const type = eventObject?.type || 'UNKNOWN';
            if (type.startsWith('COACH_')) {
                record('RUNTIME', type, eventObject.payload);
            } else if (type.startsWith('LLM_')) {
                record('LLM', type, eventObject.payload);
            } else if (type.startsWith('MEMORY_')) {
                record('MEMORY', type, eventObject.payload);
            }
        });
    }

    function getLogs() {
        return deepFreezeDTO([...logBuffer]);
    }

    function clear() {
        logBuffer.length = 0;
    }

    return Object.freeze({
        attach,
        getLogs,
        clear
    });
})();

export default CoachTelemetryObserver;
