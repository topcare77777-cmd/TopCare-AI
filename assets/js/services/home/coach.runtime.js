/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Runtime Facade Gateway)
 * Status       : ACTIVE (BUILD AC-013R2 - GOLDEN BASELINE)
 * Version      : 2.2.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 *
 * Description  : Lightweight Runtime Facade V2.
 *                Maintains 100% backward compatibility with V1 Public API
 *                while delegating execution pipelines directly to CoachRuntimeManager.
 * -----------------------------------------------------------------
 */

import CoachRuntimeManager from './coach.runtime.manager.js';

/**
 * Event Types emitted by CoachRuntime.
 * @readonly
 */
const RUNTIME_EVENTS = Object.freeze({
    RESPONSE_READY: 'COACH_RESPONSE_READY',
    PIPELINE_ERROR: 'COACH_PIPELINE_ERROR'
});

/**
 * Coach Runtime Facade Gateway Singleton Service.
 * Delegate-only wrapper enforcing Zero Breaking Changes for V1 consumers.
 */
const CoachRuntime = (() => {

    /**
     * Public API: Subscribes to global runtime pipeline events via CoachRuntimeManager.
     * @param {Function} callback - Execution handler receiving event packets.
     * @returns {Function} Unsubscribe cleanup handler.
     */
    function subscribe(callback) {
        return CoachRuntimeManager.subscribeGlobal(callback);
    }

    /**
     * Public API: Unregisters an existing event listener callback.
     * Pure delegation directly to CoachRuntimeManager.
     * @param {Function} callback - Handler to remove.
     */
    function unsubscribe(callback) {
        if (typeof callback === 'function' && typeof CoachRuntimeManager.unsubscribeGlobal === 'function') {
            return CoachRuntimeManager.unsubscribeGlobal(callback);
        }
    }

    /**
     * Public API: Delegates user message processing to CoachRuntimeManager active instance.
     *
     * @param {string} message - Raw user input message.
     * @returns {Object} Execution bundle result from active Runtime Instance.
     */
    function process(message) {
        return CoachRuntimeManager.processActive(message);
    }

    return Object.freeze({
        process,
        subscribe,
        unsubscribe,
        EVENTS: RUNTIME_EVENTS
    });
})();

export default CoachRuntime;
