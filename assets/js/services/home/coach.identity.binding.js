/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Identity Binding Adapter)
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Architecture Team
 * Created      : Sprint 48A.2
 * 
 * Description  : Reactive adapter bridging UserState changes selectively 
 *                into CoachMemory without direct auth dependencies.
 * -----------------------------------------------------------------
 */

import UserState from '../../user/user.state.js';
import CoachMemory from './coach.memory.js';

/**
 * Compares two identity states to determine if relevant coaching parameters changed.
 * @param {Object|null} prev - Previous identity attributes.
 * @param {Object} next - Current identity attributes.
 * @returns {boolean} True if significant attributes differ.
 * @private
 */
function hasRelevantIdentityChanged(prev, next) {
    if (!prev) return true;
    return (
        prev.isLoggedIn !== next.isLoggedIn ||
        prev.displayName !== next.displayName ||
        prev.membership !== next.membership ||
        prev.personality !== next.personality ||
        prev.coachPreference !== next.coachPreference ||
        prev.voicePreference !== next.voicePreference ||
        prev.avatar !== next.avatar
    );
}

/**
 * Coach Identity Binding Adapter Singleton.
 * Manages the reactive pipeline from UserState updates to CoachMemory storage.
 */
const CoachIdentityBinding = (() => {
    let isInitialized = false;
    let unsubscribeUserState = null;
    let lastSyncedIdentity = null;

    /**
     * Extracts only the coaching-relevant subset from full identity state with defensive fallbacks.
     * @param {Object} state - Full user identity state snapshot.
     * @returns {Object} Filtered identity attributes.
     * @private
     */
    function extractCoachIdentity(state) {
        if (!state) {
            return {
                isLoggedIn: false,
                displayName: 'Guest',
                membership: 'free',
                personality: null,
                coachPreference: null,
                voicePreference: null,
                avatar: null
            };
        }
        return {
            isLoggedIn: Boolean(state.isLoggedIn),
            displayName: state.displayName || state.name || 'Guest',
            membership: state.membership || 'free',
            personality: state.personality || null,
            coachPreference: state.coachPreference || null,
            voicePreference: state.voicePreference || null,
            avatar: state.avatar || null
        };
    }

    /**
     * Handles incoming state updates from UserState and synchronizes selectively to CoachMemory.
     * @param {Object} [state={}] - Current user state snapshot.
     * @private
     */
    function handleUserStateChange(state = {}) {
        const currentCoachIdentity = extractCoachIdentity(state);

        if (hasRelevantIdentityChanged(lastSyncedIdentity, currentCoachIdentity)) {
            lastSyncedIdentity = { ...currentCoachIdentity };
            
            CoachMemory.update({
                identity: lastSyncedIdentity
            });
        }
    }

    /**
     * Initializes the binding by performing initial sync and subscribing to UserState.
     */
    function initialize() {
        if (isInitialized) {
            return;
        }

        try {
            // Initial sync capture from current UserState
            const initialState = UserState.get() || {};
            const initialCoachIdentity = extractCoachIdentity(initialState);
            
            lastSyncedIdentity = { ...initialCoachIdentity };
            
            // Fixed contract alignment: initialize CoachMemory directly with identity payload
            CoachMemory.initialize(lastSyncedIdentity);

            // Subscribe to reactive UserState updates with defensive callback handling
            if (typeof UserState.subscribe === 'function') {
                unsubscribeUserState = UserState.subscribe((state) => {
                    handleUserStateChange(state);
                });
            }

            isInitialized = true;
        } catch (err) {
            console.error('[CoachIdentityBinding] Initialization error:', err);
        }
    }

    /**
     * Cleans up the subscription and resets internal binding state.
     */
    function destroy() {
        if (typeof unsubscribeUserState === 'function') {
            try {
                unsubscribeUserState();
            } catch (err) {
                console.error('[CoachIdentityBinding] Unsubscribe error during destroy:', err);
            }
            unsubscribeUserState = null;
        }

        lastSyncedIdentity = null;
        isInitialized = false;
    }

    return Object.freeze({
        initialize,
        destroy
    });
})();

export default CoachIdentityBinding;