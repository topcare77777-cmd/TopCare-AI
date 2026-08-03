/**
 * TOPCARE AI PLATFORM V2 — COACH CONTEXT SERVICE
 * Path: assets/js/runtime/coach.context.js
 * Status: ACTIVE (BUILD 125 — HARDENED PERSISTENT CONTEXT)
 * Role: Single Source of Truth for Selected AI Coach State
 */

class CoachContextService {
    constructor() {
        if (CoachContextService._instance) {
            return CoachContextService._instance;
        }

        this._storageKey = 'topcare_selected_coach_id';
        CoachContextService._instance = this;
    }

    /**
     * Sets active coach ID and persists to Session / Local Storage.
     * @param {string|Object} coach
     */
    setCoach(coach) {
        let coachId = 'maya';

        if (typeof coach === 'string') {
            coachId = coach.toLowerCase().trim();
        } else if (coach && typeof coach === 'object' && coach.id) {
            coachId = String(coach.id).toLowerCase().trim();
        }

        const validId = (coachId === 'alex') ? 'alex' : 'maya';

        try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
                sessionStorage.setItem(this._storageKey, validId);
            }
        } catch (e) {
            console.warn('[CoachContext] Storage write error:', e);
        }
    }

    /**
     * Returns string coach ID ('maya' | 'alex')
     * @returns {string}
     */
    getCoach() {
        try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
                const saved = sessionStorage.getItem(this._storageKey);
                if (saved && (saved === 'maya' || saved === 'alex')) {
                    return saved;
                }
            }
        } catch (e) {
            // Ignore storage errors
        }
        return 'maya';
    }

    /**
     * Returns full profile metadata object for UI/Persona
     * @returns {Object}
     */
    getCoachProfile() {
        const id = this.getCoach();
        if (id === 'alex') {
            return {
                id: 'alex',
                name: 'Alex',
                label: 'AI Coach Alex',
                title: 'Strategic AI Coach',
                avatar: 'assets/images/coaches/alex.png',
                personaId: 'coach-kael',
                summaryStyle: 'action_items',
                emojiPolicy: 'minimal'
            };
        }

        return {
            id: 'maya',
            name: 'Maya',
            label: 'AI Coach Maya',
            title: 'Empathetic AI Coach',
            avatar: 'assets/images/coaches/maya.png',
            personaId: 'coach-sarah',
            summaryStyle: 'reflective_narrative',
            emojiPolicy: 'expressive'
        };
    }

    clearCoach() {
        try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
                sessionStorage.removeItem(this._storageKey);
            }
        } catch (e) {
            // Ignore storage errors
        }
    }
}

export const CoachContext = new CoachContextService();
export default CoachContext;