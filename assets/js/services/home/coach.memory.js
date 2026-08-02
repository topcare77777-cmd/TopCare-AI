/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Memory Compatibility Adapter)
 * Status       : ACTIVE (BUILD AC-013R1)
 * Version      : 2.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Memory Team
 *
 * Description  : Compatibility Facade Adapter for Coach Memory.
 *                Directs all storage operations to MemoryNamespaceManager (SSOT)
 *                under the active default namespace while maintaining V1 API.
 * -----------------------------------------------------------------
 */

import MemoryNamespaceManager from './memory.namespace.manager.js';

/**
 * Default fallback memory namespace key.
 * @type {string}
 */
const DEFAULT_NAMESPACE = 'coach-kael-default-session-namespace';

/**
 * Safe Object Cloner preserving native structures.
 * @param {*} data
 * @returns {*}
 */
function safeClone(data) {
    if (data === null || typeof data !== 'object') return data;
    if (typeof structuredClone === 'function') {
        try {
            return structuredClone(data);
        } catch (_) {
            // Fallback for non-cloneable objects
        }
    }
    return JSON.parse(JSON.stringify(data));
}

/**
 * Reactive Coach Memory Compatibility Adapter.
 * Storage-Only Adapter without business logic or greeting generation.
 */
const CoachMemory = (() => {

    function ensureNamespace() {
        if (!MemoryNamespaceManager.has(DEFAULT_NAMESPACE)) {
            MemoryNamespaceManager.create(DEFAULT_NAMESPACE);
        }
    }

    function get() {
        ensureNamespace();
        return MemoryNamespaceManager.get(DEFAULT_NAMESPACE);
    }

    function initialize(identity = null) {
        ensureNamespace();
        if (identity) {
            MemoryNamespaceManager.update(DEFAULT_NAMESPACE, {
                identity: safeClone(identity)
            });
        }
    }

    function set(newMemory) {
        ensureNamespace();
        MemoryNamespaceManager.update(DEFAULT_NAMESPACE, safeClone(newMemory));
    }

    function update(partialMemory) {
        ensureNamespace();
        MemoryNamespaceManager.update(DEFAULT_NAMESPACE, safeClone(partialMemory));
    }

    function setGreeting(greeting) {
        ensureNamespace();
        const current = get();
        MemoryNamespaceManager.update(DEFAULT_NAMESPACE, {
            conversation: {
                ...(current.conversation || {}),
                lastGreeting: greeting
            }
        });
    }

    function setIntent(intent) {
        ensureNamespace();
        const current = get();
        MemoryNamespaceManager.update(DEFAULT_NAMESPACE, {
            conversation: {
                ...(current.conversation || {}),
                lastIntent: intent
            }
        });
    }

    function setTopic(topic) {
        ensureNamespace();
        const current = get();
        MemoryNamespaceManager.update(DEFAULT_NAMESPACE, {
            conversation: {
                ...(current.conversation || {}),
                lastTopic: topic
            }
        });
    }

    function appendHistory(entry) {
        ensureNamespace();
        MemoryNamespaceManager.appendHistory(DEFAULT_NAMESPACE, entry);
    }

    function clearConversation() {
        ensureNamespace();
        MemoryNamespaceManager.clearConversation(DEFAULT_NAMESPACE);
    }

    function subscribe(callback) {
        ensureNamespace();
        return MemoryNamespaceManager.subscribe(DEFAULT_NAMESPACE, callback);
    }

    function unsubscribe(callback) {
        // Handled directly by disposer function returned from subscribe()
    }

    /**
     * Resets whole memory baseline under active namespace (Full Reset).
     */
    function clear() {
        ensureNamespace();
        MemoryNamespaceManager.destroyNamespace(DEFAULT_NAMESPACE);
        MemoryNamespaceManager.create(DEFAULT_NAMESPACE);
    }

    function destroy() {
        MemoryNamespaceManager.destroyNamespace(DEFAULT_NAMESPACE);
    }

    return Object.freeze({
        initialize,
        get,
        set,
        update,
        setGreeting,
        setIntent,
        setTopic,
        appendHistory,
        clearConversation,
        subscribe,
        unsubscribe,
        clear,
        destroy
    });
})();

export default CoachMemory;
