/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : User Identity Foundation Layer
 * Status       : ACTIVE
 * Version      : 2.5.0
 * Architecture : Development Constitution v1.1
 * Owner        : Identity Core Team
 * Created      : Sprint 47A.2
 * 
 * Description  : Enterprise Adapter and Facade layer connecting auth events,
 *                session layers, and profile services to UserState via Event-Driven Architecture.
 * -----------------------------------------------------------------
 */

import UserState from './user.state.js';
import AuthManager from '../auth/auth.manager.js';
import SessionManager from '../auth/session.manager.js';
import ProfileService from '../auth/profile.service.js';
import { BrowserEventBus } from '../auth/bus/browser.event.bus.js';
import { AUTH_EVENTS } from '../auth/auth.events.js';

/**
 * User Identity Facade & Adapter Singleton (Event-Driven Architecture).
 * Listens to authentication events and synchronizes unified user identity into UserState.
 */
const UserIdentity = (() => {
    let isInitialized = false;
    let isSyncing = false;
    let syncPromiseLock = null;
    let isClearing = false;
    
    /** @type {Array<Function>} */
    const cleanupSubscriptions = [];

    /**
     * Resolves display name using a strict enterprise priority waterfall including nickname.
     * @param {Object} [user] - User entity object.
     * @returns {string} Resolved display name or fallback.
     * @private
     */
    function resolveDisplayName(user) {
        if (!user) return 'Guest';
        return user.displayName || user.fullName || user.name || user.username || user.nickname || user.email || 'Guest';
    }

    /**
     * Normalizes raw user, session, and profile data into a comprehensive unified identity structure
     * strictly adhering to UserStateData baseline schema.
     * @param {Object} [authData] - Raw authentication data.
     * @param {Object} [sessionData] - Raw session data.
     * @param {Object} [profileData] - Raw profile data.
     * @returns {Object} Comprehensive normalized identity payload.
     * @private
     */
    function normalizeIdentity(authData = null, sessionData = null, profileData = null) {
        const user = profileData || authData?.user || sessionData?.user || authData || null;
        const userId = user?.id || user?.uid || sessionData?.userId || null;
        const isAuthenticated = Boolean(userId || user || authData?.isAuthenticated || sessionData?.isActive);

        const baseline = {
            currentUser: null,
            isLoggedIn: false,
            membership: 'free',
            personality: null,
            coachPreference: null,
            voicePreference: null,
            avatar: null,
            displayName: 'Guest',
            email: null
        };

        if (!isAuthenticated) {
            return baseline;
        }

        return {
            ...baseline,
            currentUser: user,
            isLoggedIn: true,
            membership: user?.membership || sessionData?.membership || 'free',
            personality: user?.personality || sessionData?.personality || null,
            coachPreference: user?.coachPreference || sessionData?.coachPreference || null,
            voicePreference: user?.voicePreference || sessionData?.voicePreference || null,
            avatar: user?.avatar || user?.photoURL || null,
            displayName: resolveDisplayName(user),
            email: user?.email || null
        };
    }

    /**
     * Initializes identity synchronization by connecting event bus listeners
     * and performing an initial state synchronization.
     */
    function initialize() {
        if (isInitialized) {
            return;
        }

        try {
            // Perform initial synchronization safely as a void intent call
            void sync();

            // Bind Event Bus listeners securely using repository-aligned methods
            const eventBus = BrowserEventBus;
            if (eventBus && typeof eventBus.subscribe === 'function') {
                const eventsToListen = [
                    AUTH_EVENTS?.LOGIN_SUCCESS,
                    AUTH_EVENTS?.LOGOUT,
                    AUTH_EVENTS?.SESSION_RESTORED,
                    AUTH_EVENTS?.SESSION_EXPIRED
                ].filter(Boolean);

                eventsToListen.forEach(eventType => {
                    const unsubscribeFn = eventBus.subscribe(eventType, () => {
                        if (!isClearing) {
                            void sync();
                        }
                    });
                    if (typeof unsubscribeFn === 'function') {
                        cleanupSubscriptions.push(unsubscribeFn);
                    }
                });
            }

            isInitialized = true;
        } catch (err) {
            console.error('[UserIdentity] Initialization error:', err);
        }
    }

    /**
     * Synchronizes identity state with Promise locking mechanism to prevent race conditions and double syncing.
     * @returns {Promise<Object>} Synchronized normalized identity object.
     */
    async function sync() {
        if (isClearing) {
            return UserState.get();
        }

        if (isSyncing && syncPromiseLock) {
            return syncPromiseLock;
        }

        isSyncing = true;
        syncPromiseLock = (async () => {
            try {
                let authData = null;
                let sessionData = null;
                let profileData = null;

                if (AuthManager && typeof AuthManager.getCurrentUser === 'function') {
                    authData = AuthManager.getCurrentUser();
                } else if (AuthManager && AuthManager.currentUser) {
                    authData = AuthManager.currentUser;
                }

                if (SessionManager && typeof SessionManager.getSession === 'function') {
                    sessionData = SessionManager.getSession();
                }

                const resolvedUserId = sessionData?.userId || authData?.id || authData?.uid || null;

                // Safely invoke ProfileService with flexible signature support
                if (ProfileService && typeof ProfileService.getProfile === 'function') {
                    try {
                        profileData = resolvedUserId 
                            ? await ProfileService.getProfile(resolvedUserId)
                            : await ProfileService.getProfile();
                    } catch (profileErr) {
                        // Fallback gracefully if profile fetching fails
                    }
                }

                const normalized = normalizeIdentity(authData, sessionData, profileData);
                
                if (!isClearing) {
                    // State updated without introducing new Date() sources directly; timestamp delegated to store baseline.
                    UserState.set(normalized);
                }
                
                return normalized;
            } catch (err) {
                console.error('[UserIdentity] Sync error:', err);
                return UserState.get();
            } finally {
                isSyncing = false;
                syncPromiseLock = null;
            }
        })();

        return syncPromiseLock;
    }

    /**
     * Retrieves the current snapshot of user identity data from UserState.
     * @returns {Object} Current user identity object.
     */
    function getIdentity() {
        return UserState.get();
    }

    /**
     * Clears user session, destroys subscriptions, and resets the UserState foundation.
     */
    function clearIdentity() {
        isClearing = true;
        try {
            if (AuthManager && typeof AuthManager.logout === 'function') {
                AuthManager.logout();
            } else if (SessionManager && typeof SessionManager.clear === 'function') {
                SessionManager.clear();
            }
        } catch (err) {
            console.error('[UserIdentity] Error during session teardown:', err);
        } finally {
            destroy();
            UserState.clear();
        }
    }

    /**
     * Cleans up all registered event listeners and subscriptions, and resets synchronization flags.
     */
    function destroy() {
        while (cleanupSubscriptions.length > 0) {
            const unsub = cleanupSubscriptions.pop();
            try {
                if (typeof unsub === 'function') {
                    unsub();
                }
            } catch (err) {
                console.error('[UserIdentity] Error cleaning up subscription:', err);
            }
        }
        isInitialized = false;
        isSyncing = false;
        syncPromiseLock = null;
        isClearing = false;
    }

    return Object.freeze({
        initialize,
        sync,
        getIdentity,
        clearIdentity,
        destroy
    });
})();

export default UserIdentity;