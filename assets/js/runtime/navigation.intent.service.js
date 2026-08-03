/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION INTENT SERVICE
 * Path: assets/js/runtime/navigation.intent.service.js
 * Version: 124.1.0 (BUILD 124.1)
 * Status: APPROVED & LOCKED
 * SRP: Singleton SSOT Service for Preserving Navigation Continuation State in SessionStorage
 */

import { createNavigationIntentDTO } from './navigation.intent.dto.js';

const STORAGE_KEY = 'topcare_v2_navigation_intent';

class NavigationIntentServiceEngine {
    constructor() {
        if (NavigationIntentServiceEngine._instance) {
            return NavigationIntentServiceEngine._instance;
        }

        NavigationIntentServiceEngine._instance = this;
    }

    /**
     * Saves a navigation continuation intent DTO into sessionStorage.
     * @param {Object} intentData - Raw object or pre-built NavigationIntentDTO
     */
    saveIntent(intentData) {
        if (!intentData || typeof intentData !== 'object') {
            return;
        }

        const dto = createNavigationIntentDTO(intentData);

        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dto));
        } catch (error) {
            console.warn('[NavigationIntentService] Failed to save navigation intent to sessionStorage:', error);
        }
    }

    /**
     * Restores and consumes the pending navigation intent DTO, clearing it from storage.
     * @returns {Object|null} Restored NavigationIntentDTO or null if none exists
     */
    restoreIntent() {
        const intent = this.peekIntent();
        this.clearIntent();
        return intent;
    }

    /**
     * Reads the pending navigation intent DTO without clearing it from storage.
     * @returns {Object|null} NavigationIntentDTO or null if none exists
     */
    peekIntent() {
        try {
            const rawData = sessionStorage.getItem(STORAGE_KEY);
            if (!rawData) {
                return null;
            }

            const parsed = JSON.parse(rawData);
            return createNavigationIntentDTO(parsed);
        } catch (error) {
            console.warn('[NavigationIntentService] Failed to parse navigation intent from sessionStorage:', error);
            this.clearIntent();
            return null;
        }
    }

    /**
     * Clears any pending navigation intent from sessionStorage.
     */
    clearIntent() {
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            // Quiet fail on storage removal
        }
    }

    /**
     * Checks if a valid navigation intent is currently pending.
     * @returns {boolean}
     */
    hasIntent() {
        return this.peekIntent() !== null;
    }
}

export const NavigationIntentService = Object.freeze(new NavigationIntentServiceEngine());
export default NavigationIntentService;