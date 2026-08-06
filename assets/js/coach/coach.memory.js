/**
 * TOPCARE AI PLATFORM V2 — COACH RUNTIME MEMORY
 * Path: assets/js/coach/coach.memory.js
 * Status: APPROVED & LOCKED (BUILD 128 — UPGRADE)
 * SRP: Session memory for Personality Assessment DTO & Companion State.
 */

class CoachMemoryStore {
    constructor() {
        this.memoryKey = 'tc_v2_personality_assessment_result';
        this._state = this._loadMemory();
    }

    _loadMemory() {
        try {
            const raw = sessionStorage.getItem(this.memoryKey);
            if (!raw) return this.getDefaults();
            const parsed = JSON.parse(raw);
            return { ...parsed, hasAssessed: true };
        } catch (e) {
            return this.getDefaults();
        }
    }

    getDefaults() {
        return {
            hasAssessed: false,
            userName: 'Member TopCare',
            dominantPersonality: null,
            secondaryPersonality: null,
            scores: { koleris: 0, melankolis: 0, sanguinis: 0, plegmatis: 0 },
            assessmentDate: null,
            academyProgress: 0,
            currentLevel: 'Level Dasar'
        };
    }

    getMemory() {
        return { ...this._state };
    }

    saveAssessmentResult(resultDTO) {
        if (!resultDTO) return;

        this._state = {
            hasAssessed: true,
            userName: resultDTO.userName || resultDTO.name || 'Member',
            dominantPersonality: resultDTO.dominant || resultDTO.dominantPersonality || 'Melankolis',
            secondaryPersonality: resultDTO.secondary || resultDTO.secondaryPersonality || 'Plegmatis',
            scores: resultDTO.scores || {},
            assessmentDate: new Date().toLocaleDateString('id-ID'),
            academyProgress: resultDTO.academyProgress || 0,
            currentLevel: resultDTO.currentLevel || 'Level Dasar'
        };

        try {
            sessionStorage.setItem(this.memoryKey, JSON.stringify(this._state));
        } catch (e) {
            console.warn('[CoachMemory] Saved in runtime memory only.');
        }
    }

    clearMemory() {
        this._state = this.getDefaults();
        try {
            sessionStorage.removeItem(this.memoryKey);
        } catch (e) {}
    }
}

export const CoachMemory = new CoachMemoryStore();
export default CoachMemory;