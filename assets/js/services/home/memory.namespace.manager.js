/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Memory Namespace Manager)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 51A.3
 * 
 * Description  : Isolated namespace memory manager. Coordinates separate 
 *                runtime RAM memory spaces for individual coach runtime instances,
 *                preventing cross-contamination of conversation history and state.
 * -----------------------------------------------------------------
 */

/**
 * Namespace Manager Schema Version.
 * @type {string}
 */
const NAMESPACE_SCHEMA_VERSION = '1.0.0';

/**
 * Default clean memory structure contract.
 * @readonly
 */
const DEFAULT_MEMORY_TEMPLATE = Object.freeze({
    identity: Object.freeze({
        isLoggedIn: false,
        displayName: 'Guest',
        membership: 'free',
        personality: null,
        avatar: null
    }),
    conversation: Object.freeze({
        turnCount: 0,
        lastIntent: null,
        lastTopic: null,
        lastGreeting: null,
        history: Object.freeze([])
    }),
    preferences: Object.freeze({
        coach: null,
        voice: null
    }),
    metadata: Object.freeze({
        createdAt: null,
        updatedAt: null
    })
});

/**
 * Memory Namespace Manager Singleton Service.
 * Maintains isolated RAM memory instances indexed by unique namespace keys.
 */
const MemoryNamespaceManager = (() => {

    /**
     * Internal dictionary storing namespaced memory states in RAM.
     * @type {Map<string, Object>}
     */
    const namespaces = new Map();

    /**
     * Normalizes a namespace identifier string.
     * @param {string} namespace - Raw namespace key.
     * @returns {string} Cleaned key string.
     * @private
     */
    function sanitizeKey(namespace) {
        if (typeof namespace !== 'string' || !namespace.trim()) {
            return 'default-session';
        }
        return namespace.trim();
    }

    /**
     * Deep clones a template to ensure isolated state references.
     * @returns {Object} Fresh memory state object.
     * @private
     */
    function createFreshMemory() {
        const now = new Date().toISOString();
        return {
            identity: { ...DEFAULT_MEMORY_TEMPLATE.identity },
            conversation: {
                turnCount: 0,
                lastIntent: null,
                lastTopic: null,
                lastGreeting: null,
                history: []
            },
            preferences: { ...DEFAULT_MEMORY_TEMPLATE.preferences },
            metadata: {
                createdAt: now,
                updatedAt: now
            }
        };
    }

    /**
     * Creates or initializes a new memory namespace.
     * If namespace already exists, returns existing state without resetting.
     * 
     * @param {string} namespace - Unique namespace identifier.
     * @param {Object} [initialData] - Optional initial state data to seed.
     * @returns {Object} The initialized namespaced memory state.
     */
    function create(namespace, initialData = null) {
        const key = sanitizeKey(namespace);

        if (!namespaces.has(key)) {
            const fresh = createFreshMemory();
            if (initialData && typeof initialData === 'object') {
                if (initialData.identity) Object.assign(fresh.identity, initialData.identity);
                if (initialData.conversation) Object.assign(fresh.conversation, initialData.conversation);
                if (initialData.preferences) Object.assign(fresh.preferences, initialData.preferences);
            }
            namespaces.set(key, fresh);
        }

        return get(key);
    }

    /**
     * Retrieves the memory snapshot for a specified namespace.
     * Auto-creates namespace if it does not yet exist.
     * 
     * @param {string} namespace - Unique namespace identifier.
     * @returns {Object} Immutable memory snapshot contract.
     */
    function get(namespace) {
        const key = sanitizeKey(namespace);

        if (!namespaces.has(key)) {
            create(key);
        }

        const mem = namespaces.get(key);

        return Object.freeze({
            identity: Object.freeze({ ...mem.identity }),
            conversation: Object.freeze({
                ...mem.conversation,
                history: Object.freeze(mem.conversation.history.map(item => Object.freeze({ ...item })))
            }),
            preferences: Object.freeze({ ...mem.preferences }),
            metadata: Object.freeze({ ...mem.metadata })
        });
    }

    /**
     * Updates an existing memory namespace with partial data.
     * 
     * @param {string} namespace - Unique namespace identifier.
     * @param {Object} updatePayload - Partial object containing updates for identity, conversation, or preferences.
     * @returns {Object} Updated immutable memory snapshot.
     */
    function update(namespace, updatePayload) {
        const key = sanitizeKey(namespace);

        if (!namespaces.has(key)) {
            create(key);
        }

        const mem = namespaces.get(key);
        const safePayload = updatePayload && typeof updatePayload === 'object' ? updatePayload : {};

        if (safePayload.identity && typeof safePayload.identity === 'object') {
            Object.assign(mem.identity, safePayload.identity);
        }

        if (safePayload.conversation && typeof safePayload.conversation === 'object') {
            Object.assign(mem.conversation, safePayload.conversation);
        }

        if (safePayload.preferences && typeof safePayload.preferences === 'object') {
            Object.assign(mem.preferences, safePayload.preferences);
        }

        mem.metadata.updatedAt = new Date().toISOString();

        return get(key);
    }

    /**
     * Appends a conversation turn into the history array of a specified namespace.
     * Automatically increments the conversation turn count.
     * 
     * @param {string} namespace - Unique namespace identifier.
     * @param {Object} historyItem - Turn item object (role, intent, topic, timestamp).
     * @returns {Object} Updated immutable memory snapshot.
     */
    function appendHistory(namespace, historyItem) {
        const key = sanitizeKey(namespace);

        if (!namespaces.has(key)) {
            create(key);
        }

        const mem = namespaces.get(key);
        const safeItem = historyItem && typeof historyItem === 'object' ? { ...historyItem } : {};

        mem.conversation.history.push(safeItem);
        mem.conversation.turnCount = mem.conversation.history.length;
        mem.metadata.updatedAt = new Date().toISOString();

        return get(key);
    }

    /**
     * Completely removes and clears a memory namespace from RAM.
     * 
     * @param {string} namespace - Unique namespace identifier.
     * @returns {boolean} True if successfully removed, false if not found.
     */
    function remove(namespace) {
        const key = sanitizeKey(namespace);
        return namespaces.delete(key);
    }

    /**
     * Returns operational metadata and active namespace statistics.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: NAMESPACE_SCHEMA_VERSION,
            activeNamespacesCount: namespaces.size,
            namespaces: Object.freeze(Array.from(namespaces.keys()))
        });
    }

    return Object.freeze({
        create,
        get,
        update,
        appendHistory,
        remove,
        getStatus
    });
})();

export default MemoryNamespaceManager;