/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Memory Persistence Coordinator)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 50A.4
 * 
 * Description  : Lifecycle coordinator responsible for automatic
 *                memory restoration, persistence scheduling,
 *                debounce control, and persistence event handling.
 * -----------------------------------------------------------------
 */

import MemoryRepository from './memory.repository.js';
import CoachRuntime from '../coach.runtime.js';

/**
 * Persistence Configuration Parameters.
 * @readonly
 */
const PERSISTENCE_CONFIG = Object.freeze({
    DEBOUNCE_MS: 1500,
    MAX_RETRY: 3,
    RETRY_DELAY_MS: 1000
});

/**
 * Persistence Lifecycle Event Types.
 * @readonly
 */
const PERSISTENCE_EVENTS = Object.freeze({
    RESTORE_SUCCESS: 'MEMORY_RESTORE_SUCCESS',
    RESTORE_FAILED: 'MEMORY_RESTORE_FAILED',
    SAVE_SUCCESS: 'MEMORY_SAVE_SUCCESS',
    SAVE_FAILED: 'MEMORY_SAVE_FAILED',
    CLEAR_SUCCESS: 'MEMORY_CLEAR_SUCCESS'
});

/**
 * Memory Persistence Coordinator Singleton Service.
 * Manages automatic session restoration, debounce saving, and runtime event coordination.
 */
const MemoryPersistenceCoordinator = (() => {

    /** @type {Set<Function>} */
    const listeners = new Set();

    /** @type {Function|null} */
    let runtimeUnsubscribe = null;

    /** @type {NodeJS.Timeout|number|null} */
    let debounceTimer = null;

    /**
     * Internal state tracking variables.
     */
    const state = {
        initialized: false,
        pendingSave: false,
        retryCount: 0,
        lastPersistedAt: null,
        lastRestoreAt: null
    };

    /**
     * Emits persistence lifecycle events to registered subscribers.
     * @param {string} type - Event type identifier.
     * @param {Object} [payload={}] - Optional event payload data.
     * @private
     */
    function emit(type, payload = {}) {
        const eventObject = Object.freeze({
            type,
            payload: Object.freeze(payload),
            timestamp: new Date().toISOString()
        });

        for (const callback of listeners) {
            try {
                callback(eventObject);
            } catch (err) {
                console.error('[MemoryPersistenceCoordinator] Error in listener callback:', err);
            }
        }
    }

    /**
     * Executes session restoration from repository storage.
     * @returns {Promise<boolean>} Resolves to true if restoration succeeded.
     */
    async function restore() {
        try {
            const success = await MemoryRepository.restoreSession();
            state.lastRestoreAt = new Date().toISOString();

            if (success) {
                emit(PERSISTENCE_EVENTS.RESTORE_SUCCESS, { timestamp: state.lastRestoreAt });
            } else {
                emit(PERSISTENCE_EVENTS.RESTORE_FAILED, { reason: 'No prior session found or data invalid' });
            }

            return success;
        } catch (err) {
            console.error('[MemoryPersistenceCoordinator] Restore session error:', err);
            emit(PERSISTENCE_EVENTS.RESTORE_FAILED, { error: err.message });
            return false;
        }
    }

    /**
     * Executes session persistence with built-in retry policy.
     * @returns {Promise<boolean>} Resolves to true if persistence succeeded.
     */
    async function persist() {
        state.pendingSave = false;

        try {
            const success = await MemoryRepository.persistSession();

            if (success) {
                state.retryCount = 0;
                state.lastPersistedAt = new Date().toISOString();
                emit(PERSISTENCE_EVENTS.SAVE_SUCCESS, { timestamp: state.lastPersistedAt });
                return true;
            } else {
                throw new Error('Repository returned false on persist session.');
            }
        } catch (err) {
            console.warn(`[MemoryPersistenceCoordinator] Persist attempt failed (retry ${state.retryCount}/${PERSISTENCE_CONFIG.MAX_RETRY}):`, err);

            if (state.retryCount < PERSISTENCE_CONFIG.MAX_RETRY) {
                state.retryCount++;
                // Schedule retry with delay
                setTimeout(() => {
                    persist();
                }, PERSISTENCE_CONFIG.RETRY_DELAY_MS * state.retryCount);
            } else {
                console.error('[MemoryPersistenceCoordinator] Max retry reached. Persistence failed.');
                emit(PERSISTENCE_EVENTS.SAVE_FAILED, { error: err.message, retries: state.retryCount });
                state.retryCount = 0;
            }

            return false;
        }
    }

    /**
     * Schedules session persistence using a debounce timer.
     * Prevents excessive write spikes during rapid conversation turns.
     * @private
     */
    function schedulePersist() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        state.pendingSave = true;

        debounceTimer = setTimeout(() => {
            debounceTimer = null;
            persist();
        }, PERSISTENCE_CONFIG.DEBOUNCE_MS);
    }

    /**
     * Clears persisted session storage and resets tracking states.
     * @returns {Promise<boolean>} Resolves to true if successfully cleared.
     */
    async function clear() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }

        state.pendingSave = false;
        state.retryCount = 0;

        const success = await MemoryRepository.clearSession();
        if (success) {
            emit(PERSISTENCE_EVENTS.CLEAR_SUCCESS);
        }
        return success;
    }

    /**
     * Public API: Initializes the coordinator, restores session, and subscribes to runtime events.
     * @returns {Promise<boolean>} Resolves when initialization sequence completes.
     */
    async function initialize() {
        if (state.initialized) {
            return true;
        }

        // 1. Restore previous session data into RAM memory
        await restore();

        // 2. Subscribe to CoachRuntime response events to trigger auto-persistence
        if (CoachRuntime && typeof CoachRuntime.subscribe === 'function') {
            runtimeUnsubscribe = CoachRuntime.subscribe((event) => {
                if (event && event.type === CoachRuntime.EVENTS.RESPONSE_READY) {
                    schedulePersist();
                }
            });
        }

        state.initialized = true;
        return true;
    }

    /**
     * Public API: Shuts down the coordinator, clears timers, and unsubscribes from runtime events.
     */
    function shutdown() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }

        if (typeof runtimeUnsubscribe === 'function') {
            runtimeUnsubscribe();
            runtimeUnsubscribe = null;
        }

        listeners.clear();
        state.initialized = false;
        state.pendingSave = false;
    }

    /**
     * Public API: Subscribes to persistence lifecycle event notifications.
     * @param {Function} callback - Execution handler receiving event packets.
     * @returns {Function} Unsubscribe cleanup handler.
     */
    function subscribe(callback) {
        if (typeof callback === 'function') {
            listeners.add(callback);
        }
        return () => {
            if (typeof callback === 'function') {
                listeners.delete(callback);
            }
        };
    }

    /**
     * Public API: Returns current coordinator internal state copy.
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            ...state,
            hasPendingSave: state.pendingSave
        });
    }

    return Object.freeze({
        initialize,
        shutdown,
        persist,
        restore,
        clear,
        subscribe,
        getStatus,
        EVENTS: PERSISTENCE_EVENTS
    });
})();

export default MemoryPersistenceCoordinator;