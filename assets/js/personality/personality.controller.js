/**
 * TOPCARE AI PLATFORM V2 — PERSONALITY CONTROLLER
 * Path: assets/js/personality/personality.controller.js
 * Status: APPROVED & LOCKED (BUILD 135 - DIRECT MEMORY BRIDGE FIX)
 * SRP: Handles assessment completion and cross-domain memory sync.
 */

export const PersonalityController = {
    onAssessmentComplete(resultDTO) {
        // Ekstrak data hasil tes
        const detail = {
            userName: resultDTO.userName || resultDTO.name || 'Member TopCare',
            dominantPersonality: resultDTO.dominant || resultDTO.dominantPersonality || 'Melankolis',
            secondaryPersonality: resultDTO.secondary || resultDTO.secondaryPersonality || 'Plegmatis',
            scores: resultDTO.scores || {}
        };

        // 1. Dispatch Event (Perilaku Asli untuk kompatibilitas V1)
        const event = new CustomEvent('tc:assessment:completed', { detail });
        window.dispatchEvent(event);

        // 2. DIRECT MEMORY BRIDGE FIX: Sinkronisasi paksa ke "Otak" Coach AI
        try {
            const coachMemory = {
                hasAssessed: true,
                userName: detail.userName,
                dominantPersonality: detail.dominantPersonality,
                secondaryPersonality: detail.secondaryPersonality,
                scores: detail.scores,
                assessmentDate: new Date().toLocaleDateString('id-ID'),
                academyProgress: 15,
                currentLevel: 'Level Dasar'
            };

            // Menyimpan langsung ke sessionStorage dengan kunci yang dicari oleh Coach AI
            sessionStorage.setItem('tc_v2_personality_assessment_result', JSON.stringify(coachMemory));

            console.log("[PersonalityController] Hasil tes berhasil disinkronkan ke memori Coach AI.");
        } catch (e) {
            console.warn('[PersonalityController] Gagal menyinkronkan memori dengan Coach AI', e);
        }
    }
};

export default PersonalityController;