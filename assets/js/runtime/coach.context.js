/**
 * TOPCARE AI PLATFORM V2 — COACH CONTEXT SERVICE
 * Path: assets/js/runtime/coach.context.js
 * Status: ACTIVE (BUILD 137 — ASSET V3 MIGRATION)
 * Role: Single Source of Truth for Selected AI Coach State
 */

class CoachContextService {
    constructor() {
        if (CoachContextService._instance) {
            return CoachContextService._instance;
        }

        this._storageKey = 'topcare_selected_coach_id';
        this._defaultCoach = 'maya';

        CoachContextService._instance = this;
    }

    setCoach(coach) {
        let coachId = this._defaultCoach;

        if (typeof coach === 'string') {
            coachId = coach.toLowerCase().trim();
        }

        if (coach && typeof coach === 'object' && coach.id) {
            coachId = String(coach.id).toLowerCase().trim();
        }

        const validId = ['alex', 'maya'].includes(coachId)
            ? coachId
            : this._defaultCoach;

        try {
            sessionStorage.setItem(this._storageKey, validId);
        } catch (error) {
            console.warn('[CoachContext] Storage unavailable');
        }
    }

    getCoach() {
        try {
            const saved = sessionStorage.getItem(this._storageKey);

            if (['alex', 'maya'].includes(saved)) {
                return saved;
            }

        } catch (error) { }

        return this._defaultCoach;
    }

    getCoachProfile() {

        const id = this.getCoach();

        return {
            id,
            name: id === 'alex' ? 'Alex' : 'Maya',
            label: `AI Coach ${id}`,
            title: id === 'alex'
                ? 'Strategic AI Coach'
                : 'Empathetic AI Coach',

            avatar:
                'assets/images/coaches/coach-placeholder.webp',

            personaId:
                id === 'alex'
                    ? 'coach-kael'
                    : 'coach-sarah',

            summaryStyle:
                id === 'alex'
                    ? 'action_items'
                    : 'reflective_narrative',

            emojiPolicy:
                id === 'alex'
                    ? 'minimal'
                    : 'expressive'
        };
    }

    clearCoach() {
        try {
            sessionStorage.removeItem(this._storageKey);
        } catch (error) { }
    }
}

export const CoachContext = new CoachContextService();
export default CoachContext;