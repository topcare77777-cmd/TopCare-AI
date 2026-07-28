/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Memory Foundation & Conversation Context)
 * Status       : ACTIVE
 * Version      : 2.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Memory Team
 * Created      : Sprint 48A.1
 * Last Updated : Sprint 48A.3
 * 
 * Description  : In-memory runtime context repository for AI Coach,
 *                managing conversation states, history rotation, deterministic greetings,
 *                and reactive subscriptions.
 * -----------------------------------------------------------------
 */

/**
 * Maximum items allowed in conversation history array to preserve RAM.
 * @type {number}
 */
const MAX_HISTORY = 20;

/**
 * Baseline initial memory structure with structured conversation context.
 * @readonly
 */
const INITIAL_MEMORY = Object.freeze({
    initialized: false,
    identity: null,
    conversation: {
        lastGreeting: null,
        lastIntent: null,
        lastTopic: null,
        turnCount: 0,
        history: [],
        activeContext: null
    },
    preferences: {
        coach: null,
        voice: null
    },
    runtime: {
        mounted: false,
        updatedAt: null
    }
});

/**
 * Reactive Coach Memory Singleton Service.
 * Manages runtime memory states, conversation turns, history rotation, and subscriptions purely in RAM.
 */
const CoachMemory = (() => {
    /** @type {Object} */
    let memory = JSON.parse(JSON.stringify(INITIAL_MEMORY));

    /** @type {Set<Function>} */
    const subscribers = new Set();

    /**
     * Retrieves a deep-cloned snapshot of the current memory state.
     * Valid ES function expression syntax inside IIFE.
     * @returns {Object} Current memory state snapshot.
     */
    const get = () => {
        return JSON.parse(JSON.stringify(memory));
    };

    /**
     * Broadcasts the current memory state snapshot to all registered subscribers.
     * @private
     */
    function notify() {
        const currentSnapshot = get();
        for (const callback of subscribers) {
            try {
                callback(currentSnapshot);
            } catch (err) {
                console.error('[CoachMemory] Error notifying subscriber:', err);
            }
        }
    }

    /**
     * Generates a deterministic greeting based on current identity properties.
     * @returns {string} Deterministic greeting string.
     */
    function generateGreeting() {
        const id = memory.identity;
        const name = id?.displayName || id?.name;
        const membership = id?.membership;
        const personality = id?.personality;
        const coachPref = id?.coachPreference;

        if (!id || !id.isLoggedIn || !name) {
            return "Halo. Silakan masuk untuk mendapatkan pengalaman coaching yang dipersonalisasi.";
        }

        if (coachPref) {
            return `Selamat datang kembali, ${name}. Mari lanjutkan pembahasan sesuai gaya coaching pilihan Anda bersama ${coachPref}.`;
        }

        if (personality) {
            return `Halo ${name}, siap melanjutkan pengembangan diri hari ini dengan pendekatan kepribadian ${personality}?`;
        }

        if (membership && membership.toLowerCase() !== 'free') {
            return `Selamat datang kembali, ${name}. Senang melihat Anda memanfaatkan keanggotaan ${membership} Anda hari ini.`;
        }

        return `Halo, ${name}. Selamat datang kembali di TopCare AI.`;
    }

    /**
     * Initializes memory baseline using a provided user identity payload and sets initial greeting.
     * @param {Object} [identity] - User identity payload from UserState.
     */
    function initialize(identity = null) {
        const cleanIdentity = identity ? JSON.parse(JSON.stringify(identity)) : null;
        
        memory = {
            ...JSON.parse(JSON.stringify(INITIAL_MEMORY)),
            initialized: true,
            identity: cleanIdentity,
            preferences: {
                coach: cleanIdentity?.coachPreference || null,
                voice: cleanIdentity?.voicePreference || null
            },
            runtime: {
                ...INITIAL_MEMORY.runtime,
                mounted: true
            }
        };

        memory.conversation.lastGreeting = generateGreeting();
        notify();
    }

    /**
     * Replaces the entire memory structure with a new payload and notifies listeners.
     * @param {Object} newMemory - Complete new memory structure.
     */
    function set(newMemory) {
        if (!newMemory || typeof newMemory !== 'object') {
            return;
        }
        memory = {
            ...JSON.parse(JSON.stringify(INITIAL_MEMORY)),
            ...JSON.parse(JSON.stringify(newMemory)),
            conversation: {
                ...INITIAL_MEMORY.conversation,
                ...(newMemory.conversation ? JSON.parse(JSON.stringify(newMemory.conversation)) : {})
            },
            preferences: {
                ...INITIAL_MEMORY.preferences,
                ...(newMemory.preferences ? JSON.parse(JSON.stringify(newMemory.preferences)) : {})
            },
            runtime: {
                ...INITIAL_MEMORY.runtime,
                ...(newMemory.runtime ? JSON.parse(JSON.stringify(newMemory.runtime)) : {})
            }
        };
        notify();
    }

    /**
     * Performs a shallow merge update on top-level properties and deep merge on sub-objects including identity, then notifies listeners.
     * @param {Object} partialMemory - Partial memory updates.
     */
    function update(partialMemory) {
        if (!partialMemory || typeof partialMemory !== 'object') {
            return;
        }

        memory = {
            ...memory,
            ...partialMemory,
            identity: {
                ...(memory.identity || {}),
                ...(partialMemory.identity || {})
            },
            conversation: {
                ...memory.conversation,
                ...(partialMemory.conversation || {})
            },
            preferences: {
                ...memory.preferences,
                ...(partialMemory.preferences || {})
            },
            runtime: {
                ...memory.runtime,
                ...(partialMemory.runtime || {})
            }
        };

        // Recalculate greeting if identity shifted during updates
        if (partialMemory.identity) {
            memory.conversation.lastGreeting = generateGreeting();
        }

        notify();
    }

    /**
     * Explicit API: Sets the active last greeting message.
     * @param {string} greeting - Greeting string.
     */
    function setGreeting(greeting) {
        memory.conversation.lastGreeting = greeting;
        notify();
    }

    /**
     * Explicit API: Sets the active interaction intent.
     * @param {string} intent - Intent identifier.
     */
    function setIntent(intent) {
        memory.conversation.lastIntent = intent;
        notify();
    }

    /**
     * Explicit API: Sets the active discussion topic.
     * @param {string} topic - Topic identifier.
     */
    function setTopic(topic) {
        memory.conversation.lastTopic = topic;
        notify();
    }

    /**
     * Explicit API: Appends a conversation turn to history with strict size limits (FIFO ring buffer) 
     * and incremental absolute turn counts without direct new Date() generation.
     * @param {Object} entry - History entry object (e.g. { role, intent, topic, timestamp }).
     */
    function appendHistory(entry) {
        if (!entry || typeof entry !== 'object') {
            return;
        }

        const sanitizedEntry = {
            role: entry.role || 'user',
            intent: entry.intent || null,
            topic: entry.topic || null,
            timestamp: entry.timestamp ?? null
        };

        const history = [...memory.conversation.history, sanitizedEntry];
        
        // Enforce MAX_HISTORY boundary (FIFO rotation for RAM preservation)
        if (history.length > MAX_HISTORY) {
            history.shift();
        }

        memory.conversation.history = history;
        memory.conversation.turnCount = (memory.conversation.turnCount || 0) + 1;
        notify();
    }

    /**
     * Explicit API: Clears conversation history and turn counts while keeping identity intact.
     */
    function clearConversation() {
        memory.conversation = {
            ...JSON.parse(JSON.stringify(INITIAL_MEMORY.conversation)),
            lastGreeting: generateGreeting()
        };
        notify();
    }

    /**
     * Registers a listener callback function to receive memory state updates.
     * @param {Function} callback - Function executed upon memory changes.
     * @returns {Function} Unsubscribe handler function.
     */
    function subscribe(callback) {
        if (typeof callback === 'function') {
            subscribers.add(callback);
            try {
                callback(get());
            } catch (err) {
                console.error('[CoachMemory] Error in subscriber callback execution:', err);
            }
        }
        return () => unsubscribe(callback);
    }

    /**
     * Unregisters a previously registered listener callback function.
     * @param {Function} callback - Function to remove from subscribers.
     */
    function unsubscribe(callback) {
        if (typeof callback === 'function') {
            subscribers.delete(callback);
        }
    }

    /**
     * Resets memory back to initial baseline defaults and notifies listeners.
     */
    function clear() {
        memory = JSON.parse(JSON.stringify(INITIAL_MEMORY));
        notify();
    }

    /**
     * Destroys runtime memory state and purges all active subscribers.
     */
    function destroy() {
        subscribers.clear();
        memory = JSON.parse(JSON.stringify(INITIAL_MEMORY));
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