/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Runtime Factory)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 51A.4
 * 
 * Description  : Centralized factory orchestrator. Combines CoachRegistry,
 *                MemoryNamespaceManager, and CoachRuntimeInstance generators
 *                to produce fully configured, isolated coach runtime units.
 * -----------------------------------------------------------------
 */

import CoachRegistry from './coach.registry.js';
import MemoryNamespaceManager from './memory.namespace.manager.js';
import createCoachRuntimeInstance from './coach.runtime.instance.js';

/**
 * Factory Schema Version.
 * @type {string}
 */
const FACTORY_SCHEMA_VERSION = '1.0.0';

/**
 * Coach Runtime Factory Singleton Service.
 * Produces isolated execution runtimes bound to valid registry profiles and memory namespaces.
 */
const CoachRuntimeFactory = (() => {

    /**
     * Generates a deterministic memory namespace key based on coach and session context.
     * 
     * @param {string} coachId - Validated coach identifier.
     * @param {string} [sessionId] - Optional session identifier.
     * @returns {string} Formatted namespace key string.
     * @private
     */
    function resolveNamespaceKey(coachId, sessionId) {
        const cleanCoach = typeof coachId === 'string' ? coachId.trim().toLowerCase() : 'coach-kael';
        const cleanSession = typeof sessionId === 'string' && sessionId.trim() ? sessionId.trim() : 'default-session';
        return `${cleanCoach}-${cleanSession}-namespace`;
    }

    /**
     * Creates a fully initialized and namespaced Coach Runtime Instance.
     * 
     * @param {Object} options - Creation configuration options.
     * @param {string} [options.coachId] - Target coach persona identifier.
     * @param {string} [options.sessionId] - Optional session namespace discriminator.
     * @param {Object} [options.initialMemoryData] - Optional initial memory seed.
     * @returns {Object} Bundled creation package containing runtime instance, identity profile, and namespace key.
     */
    function create(options) {
        const safeOptions = options && typeof options === 'object' ? options : {};

        // 1. Resolve and validate coach profile from Registry
        const requestedCoachId = safeOptions.coachId || CoachRegistry.getDefaultId();
        const coachProfile = CoachRegistry.get(requestedCoachId);

        // 2. Resolve isolated memory namespace key
        const namespaceKey = resolveNamespaceKey(coachProfile.id, safeOptions.sessionId);

        // 3. Ensure memory namespace exists and is seeded if needed
        MemoryNamespaceManager.create(namespaceKey, safeOptions.initialMemoryData);

        // 4. Instantiate standalone runtime instance with injected namespace manager
        const runtimeInstance = createCoachRuntimeInstance({
            coachId: coachProfile.id,
            persona: coachProfile.persona,
            memoryNamespace: namespaceKey,
            memoryManager: MemoryNamespaceManager
        });

        return Object.freeze({
            runtime: runtimeInstance,
            identity: Object.freeze({ ...coachProfile }),
            namespace: namespaceKey,
            metadata: Object.freeze({
                version: FACTORY_SCHEMA_VERSION,
                createdAt: new Date().toISOString()
            })
        });
    }

    /**
     * Returns operational status of the runtime factory.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: FACTORY_SCHEMA_VERSION,
            registryStatus: CoachRegistry.getStatus(),
            namespaceStatus: MemoryNamespaceManager.getStatus()
        });
    }

    return Object.freeze({
        create,
        getStatus
    });
})();

export default CoachRuntimeFactory;