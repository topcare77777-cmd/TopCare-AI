/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : User Identity Foundation Layer
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Identity Core Team
 * Created      : Sprint 47A.1
 * 
 * Description  : Reactive Identity Store managing runtime user state,
 *                subscriptions, and notification cycles without framework dependencies.
 * -----------------------------------------------------------------
 */

/**
 * @typedef {Object} UserStateData
 * @property {Object|null} currentUser - Active user entity payload.
 * @property {boolean} isLoggedIn - Authentication state flag.
 * @property {string} membership - Membership tier status.
 * @property {Object|null} personality - Personality test data and type.
 * @property {Object|null} coachPreference - AI Coach settings and preferences.
 * @property {Object|null} voicePreference - Voice AI audio configurations.
 * @property {string|null} avatar - User avatar URL or asset path.
 * @property {string|null} displayName - User friendly display name.
 * @property {string|null} email - User electronic mail address.
 * @property {string|null} lastUpdated - ISO timestamp of the last state modification.
 */

/**
 * Internal constants for configuration defaults.
 * @readonly
 * @enum {string}
 */
const STATE_CONSTANTS = {
    DEFAULT_MEMBERSHIP: 'free',
    VERSION: '1.1.0'
};

/**
 * Initial immutable baseline state structure.
 * @type {UserStateData}
 */
const INITIAL_STATE = Object.freeze({
    currentUser: null,
    isLoggedIn: false,
    membership: STATE_CONSTANTS.DEFAULT_MEMBERSHIP,
    personality: null,
    coachPreference: null,
    voicePreference: null,
    avatar: null,
    displayName: null,
    email: null,
    lastUpdated: null
});

/**
 * Reactive User State Singleton Store.
 * Purely handles runtime state holding, mutations, and subscriber notifications.
 */
const UserState = (() => {
    /** @type {UserStateData} */
    let state = { ...INITIAL_STATE };

    /** @type {Set<Function>} */
    const subscribers = new Set();

    /**
     * Retrieves a shallow copy of the current state or a specific key.
     * @param {string} [key] - Optional specific state property to retrieve.
     * @returns {Object|any} Complete state object or property value.
     */
    function get(key) {
        if (key) {
            return state[key];
        }
        return { ...state };
    }

    /**
     * Broadcasts the current state snapshot to all registered subscribers.
     * @private
     */
    function notify() {
        const currentState = get();
        for (const callback of subscribers) {
            try {
                callback(currentState);
            } catch (err) {
                console.error('[UserState] Error notifying subscriber:', err);
            }
        }
    }

    /**
     * Updates the state with partial or complete new data and triggers subscribers.
     * @param {Partial<UserStateData>} partialState - New state updates.
     * @param {string} [timestamp] - Optional controlled external timestamp.
     */
    function set(partialState, timestamp = null) {
        if (!partialState || typeof partialState !== 'object') {
            return;
        }

        state = Object.freeze({
            ...state,
            ...partialState,
            lastUpdated: timestamp || state.lastUpdated
        });

        notify();
    }

    /**
     * Resets the runtime state back to initial baseline defaults with immutable freeze and notifies listeners.
     */
    function clear() {
        state = Object.freeze({ ...INITIAL_STATE });
        notify();
    }

    /**
     * Registers a listener callback function to receive state updates.
     * @param {Function} callback - Function executed upon state changes.
     * @returns {Function} Unsubscribe handler function.
     */
    function subscribe(callback) {
        if (typeof callback === 'function') {
            subscribers.add(callback);
            // Immediately dispatch current state to the new subscriber
            try {
                callback(get());
            } catch (err) {
                console.error('[UserState] Error in subscriber callback execution:', err);
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

    return Object.freeze({
        get,
        set,
        clear,
        subscribe,
        unsubscribe
    });
})();

export default UserState;