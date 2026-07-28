/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Runtime Manager)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 51A.5
 * 
 * Description  : Top-level ecosystem orchestrator. Manages multiple active 
 *                coach runtime instances, handles dynamic coach switching, 
 *                routes session messages, and aggregates global event streams.
 * -----------------------------------------------------------------
 */

import CoachRuntimeFactory from './coach.runtime.factory.js';
import CoachRegistry from './coach.registry.js';

/**
 * Runtime Manager Schema Version.
 * @type {string}
 */
const MANAGER_SCHEMA_VERSION = '1.0.0';

/**
 * Coach Runtime Manager Singleton Service.
 * Centralized multi-instance orchestrator and switcher.
 */
const CoachRuntimeManager = (() => {

    /** 
     * Map storing active runtime packages indexed by coachId.
     * @type {Map<string, Object>} 
     */
    const activeInstances = new Map();

    /** @type {string|null} */
    let activeCoachId = null;

    /** @type {Set<Function>} */
    const globalListeners = new Set();

    /** @type {Map<string, Function>} */
    const instanceUnsubscribers = new Map();

    /**
     * Dispatches global aggregated events to all registered global listeners.
     * @param {Object} eventPacket - Event packet from an instance.
     * @private
     */
    function handleInstanceEvent(eventPacket) {
        for (const callback of globalListeners) {
            try {
                callback(eventPacket);
            } catch (err) {
                console.error('[CoachRuntimeManager] Error in global event listener:', err);
            }
        }
    }

    /**
     * Ensures a runtime instance exists for the given coachId, creating one via Factory if needed.
     * 
     * @param {string} coachId - Target coach identifier.
     * @param {string} [sessionId] - Optional session discriminator.
     * @returns {Object} Runtime package bundle.
     * @private
     */
    function getOrCreateInstance(coachId, sessionId = 'default-session') {
        const profile = CoachRegistry.get(coachId);
        const targetId = profile.id;

        if (!activeInstances.has(targetId)) {
            const bundle = CoachRuntimeFactory.create({
                coachId: targetId,
                sessionId
            });

            // Subscribe to instance events to aggregate globally
            const unsubscribeInstance = bundle.runtime.subscribe(handleInstanceEvent);
            instanceUnsubscribers.set(targetId, unsubscribeInstance);

            activeInstances.set(targetId, bundle);
        }

        return activeInstances.get(targetId);
    }

    /**
     * Public API: Activates and sets the current active coach persona.
     * 
     * @param {string} coachId - Coach identifier to activate.
     * @param {string} [sessionId] - Optional session ID.
     * @returns {Object} The activated runtime package bundle.
     */
    function activate(coachId, sessionId = 'default-session') {
        const profile = CoachRegistry.get(coachId);
        const bundle = getOrCreateInstance(profile.id, sessionId);

        activeCoachId = profile.id;
        return bundle;
    }

    /**
     * Public API: Retrieves the currently active coach runtime package.
     * If no active coach is set, initializes and defaults to the system default coach.
     * 
     * @returns {Object} Active runtime package bundle.
     */
    function getActive() {
        if (!activeCoachId) {
            const defaultId = CoachRegistry.getDefaultId();
            activate(defaultId);
        }
        return activeInstances.get(activeCoachId);
    }

    /**
     * Public API: Processes a message through the currently active coach runtime.
     * 
     * @param {string} message - User message input.
     * @returns {Object} Execution bundle result.
     */
    function processActive(message) {
        const activeBundle = getActive();
        if (!activeBundle || !activeBundle.runtime) {
            throw new Error('[CoachRuntimeManager] No active runtime instance available for processing.');
        }
        return activeBundle.runtime.process(message);
    }

    /**
     * Public API: Subscribes to global aggregated event notifications across all managed runtimes.
     * 
     * @param {Function} callback - Execution handler receiving aggregated event packets.
     * @returns {Function} Unsubscribe cleanup handler.
     */
    function subscribeGlobal(callback) {
        if (typeof callback === 'function') {
            globalListeners.add(callback);
        }
        return () => {
            if (typeof callback === 'function') {
                globalListeners.delete(callback);
            }
        };
    }

    /**
     * Public API: Returns a list of all currently registered and running runtime instances.
     * 
     * @returns {Array<Object>} List of active runtime summary objects.
     */
    function listActive() {
        const list = [];
        for (const [id, bundle] of activeInstances.entries()) {
            list.push(Object.freeze({
                coachId: id,
                isActive: id === activeCoachId,
                runtimeId: bundle.runtime.getIdentity().runtimeId,
                namespace: bundle.namespace
            }));
        }
        return Object.freeze(list);
    }

    /**
     * Public API: Cleans up and destroys a specific runtime instance.
     * 
     * @param {string} coachId - Coach identifier to destroy.
     * @returns {boolean} True if successfully destroyed, false otherwise.
     */
    function destroyInstance(coachId) {
        const profile = CoachRegistry.get(coachId);
        const targetId = profile.id;

        if (instanceUnsubscribers.has(targetId)) {
            const unsub = instanceUnsubscribers.get(targetId);
            unsub();
            instanceUnsubscribers.delete(targetId);
        }

        const exists = activeInstances.delete(targetId);
        if (activeCoachId === targetId) {
            activeCoachId = null;
        }
        return exists;
    }

    /**
     * Returns operational status of the manager ecosystem.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: MANAGER_SCHEMA_VERSION,
            activeCoachId,
            totalActiveInstances: activeInstances.size,
            registeredCoaches: CoachRegistry.getStatus().totalCoaches,
            factoryStatus: CoachRuntimeFactory.getStatus()
        });
    }

    return Object.freeze({
        activate,
        getActive,
        processActive,
        subscribeGlobal,
        listActive,
        destroyInstance,
        getStatus
    });
})();

export default CoachRuntimeManager;