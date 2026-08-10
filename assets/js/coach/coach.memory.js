/**
 * TOPCARE AI PLATFORM V2 — COACH RUNTIME MEMORY
 * Path: assets/js/coach/coach.memory.js
 * Status: APPROVED & LOCKED (BUILD 130 — CROSS-STORAGE BRIDGE FIX)
 * SRP: Session memory for Personality Assessment DTO & Companion State.
 */

class CoachMemoryStore {
    constructor() {
        this.memoryKey = 'tc_v2_personality_assessment_result'; // Kunci V2 (Session)
        this.legacyKey = 'topcare-personality-test-v2';         // Kunci V1 Asli (Local)
        this._state = this._loadMemory();
    }

    _loadMemory() {
        try {
            // 1. Coba baca dari Session Storage (Format Baru V2)
            const rawSession = sessionStorage.getItem(this.memoryKey);
            if (rawSession) {
                const parsed = JSON.parse(rawSession);
                return { ...parsed, hasAssessed: true };
            }

            // 2. FALLBACK BRIDGE: Coba baca dari Local Storage (Format Asli V1)
            // Ini akan menangkap hasil tes yang disimpan oleh personality-storage.js
            const rawLocal = localStorage.getItem(this.legacyKey);
            if (rawLocal) {
                const legacyParsed = JSON.parse(rawLocal);
                const report = legacyParsed.report || legacyParsed;

                // Ekstrak hasil dominan dari format lama
                const dominant = report.primary || report.primaryType || report.dominant || 'Koleris';
                const secondary = report.secondary || report.secondaryType || 'Sanguinis';

                // Otomatis ubah menjadi format V2 dan simpan state
                return {
                    hasAssessed: true,
                    userName: legacyParsed.userName || 'Member TopCare',
                    dominantPersonality: dominant,
                    secondaryPersonality: secondary,
                    scores: report.scores || report.breakdown || {},
                    assessmentDate: legacyParsed.timestamp || new Date().toLocaleDateString('id-ID'),
                    academyProgress: 15,
                    currentLevel: 'Level Dasar'
                };
            }

            // 3. Jika benar-benar kosong di kedua tempat
            return this.getDefaults();
        } catch (e) {
            console.warn("[CoachMemory] Gagal membaca memori, menggunakan default.", e);
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
        // Refresh load to catch real-time changes
        this._state = this._loadMemory();
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
            localStorage.removeItem(this.legacyKey); // Hapus juga yang lama
        } catch (e) { }
    }
}

export const CoachMemory = new CoachMemoryStore();
export default CoachMemory;