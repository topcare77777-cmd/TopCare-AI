/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION INTENT MANAGER
 * Path: assets/js/runtime/navigation.intent.manager.js
 * Version: 124.1.0 (BUILD 124.1)
 * Status: APPROVED & LOCKED
 * SRP: Manager Delegation Wrapper following ApplicationEntryManager Pattern
 */

import { NavigationIntentService } from './navigation.intent.service.js';

export const NavigationIntentManager = Object.freeze({
    /**
     * Delegates saving intent to SSOT NavigationIntentService.
     * @param {Object} intentData
     */
    saveIntent(intentData) {
        NavigationIntentService.saveIntent(intentData);
    },

    /**
     * Delegates restoring and consuming intent to SSOT NavigationIntentService.
     * @returns {Object|null} NavigationIntentDTO or null
     */
    restoreIntent() {
        return NavigationIntentService.restoreIntent();
    },

    /**
     * Delegates reading intent to SSOT NavigationIntentService.
     * @returns {Object|null} NavigationIntentDTO or null
     */
    peekIntent() {
        return NavigationIntentService.peekIntent();
    },

    /**
     * Delegates clearing intent to SSOT NavigationIntentService.
     */
    clearIntent() {
        NavigationIntentService.clearIntent();
    },

    /**
     * Delegates checking pending intent presence to SSOT NavigationIntentService.
     * @returns {boolean}
     */
    hasIntent() {
        return NavigationIntentService.hasIntent();
    }
});

export default NavigationIntentManager;