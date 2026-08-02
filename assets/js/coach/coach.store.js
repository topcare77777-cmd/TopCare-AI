/**
 * TOPCARE AI PLATFORM V2 — COACH STORE (SSOT STATE)
 * Path: assets/js/coach/coach.store.js
 * Status: ACTIVE - SPRINT 1A CANONICAL RELEASE
 * Role: Isolated SSOT State & Storage Manager for Selected Coach Metadata
 */

import { COACH_STORAGE_KEY, COACH_REGISTRY } from './coach.types.js';

export const CoachStore = (() => {
    function saveSelectedCoachId(id) {
        if (!id || typeof id !== 'string') {
            console.warn('[CoachStore] Invalid Coach ID provided for storage.');
            return false;
        }
        try {
            localStorage.setItem(COACH_STORAGE_KEY, id);
            return true;
        } catch (err) {
            console.warn('[CoachStore] Failed to persist selected coach ID:', err);
            return false;
        }
    }

    function getSelectedCoachId() {
        try {
            return localStorage.getItem(COACH_STORAGE_KEY) || COACH_REGISTRY.ALEX.id;
        } catch (err) {
            return COACH_REGISTRY.ALEX.id;
        }
    }

    function getCoachById(id) {
        if (!id) return COACH_REGISTRY.ALEX;
        const normalizedId = String(id).toLowerCase();

        const found = Object.values(COACH_REGISTRY).find(
            coach => coach.id.toLowerCase() === normalizedId
        );

        return found || COACH_REGISTRY.ALEX;
    }

    function getSelectedCoach() {
        const id = getSelectedCoachId();
        return getCoachById(id);
    }

    function clear() {
        try {
            localStorage.removeItem(COACH_STORAGE_KEY);
        } catch (err) {
            console.warn('[CoachStore] Failed to clear coach storage:', err);
        }
    }

    return Object.freeze({
        saveSelectedCoachId,
        getSelectedCoachId,
        getCoachById,
        getSelectedCoach,
        clear
    });
})();

export default CoachStore;
