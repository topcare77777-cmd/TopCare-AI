/**
 * TOPCARE AI PLATFORM V2 — MBTI SCORING ENGINE
 * Path: assets/js/pages/mbti/mbti.engine.js
 * SRP: Deterministic scoring calculator and profile resolver.
 */

import { MBTI_PROFILES } from './mbti.data.js';

export class MBTIEngine {
    /**
     * Menghitung skor dari jawaban pengguna.
     * @param {Array<string>} userAnswers - Array trait (misal: ["E", "S", "T", "J", ...])
     * @returns {Object} Hasil kalkulasi meliputi kode MBTI, persentase, dan profil
     */
    static calculateResult(userAnswers) {
        const counts = {
            E: 0, I: 0,
            S: 0, N: 0,
            T: 0, F: 0,
            J: 0, P: 0
        };

        if (Array.isArray(userAnswers)) {
            userAnswers.forEach(trait => {
                if (counts[trait] !== undefined) {
                    counts[trait]++;
                }
            });
        }

        // Deterministic Tie-breaker Rules:
        // Jika E == I (3 vs 3) -> Default I (Introversion)
        // Jika S == N (3 vs 3) -> Default N (Intuition)
        // Jika T == F (3 vs 3) -> Default F (Feeling)
        // Jika J == P (3 vs 3) -> Default J (Judging)
        const dimEI = counts.E > counts.I ? 'E' : 'I';
        const dimSN = counts.S > counts.N ? 'S' : 'N';
        const dimTF = counts.T > counts.F ? 'T' : 'F';
        const dimJP = counts.J > counts.P ? 'J' : 'P';

        const code = `${dimEI}${dimSN}${dimTF}${dimJP}`;
        const totalPerDimension = 6;

        const percentages = {
            E: Math.round((counts.E / totalPerDimension) * 100),
            I: Math.round((counts.I / totalPerDimension) * 100),
            S: Math.round((counts.S / totalPerDimension) * 100),
            N: Math.round((counts.N / totalPerDimension) * 100),
            T: Math.round((counts.T / totalPerDimension) * 100),
            F: Math.round((counts.F / totalPerDimension) * 100),
            J: Math.round((counts.J / totalPerDimension) * 100),
            P: Math.round((counts.P / totalPerDimension) * 100),
        };

        const profile = MBTI_PROFILES[code] || MBTI_PROFILES.INTJ;

        return {
            code,
            counts,
            percentages,
            dominantTraits: {
                EI: { trait: dimEI, percent: dimEI === 'E' ? percentages.E : percentages.I },
                SN: { trait: dimSN, percent: dimSN === 'S' ? percentages.S : percentages.N },
                TF: { trait: dimTF, percent: dimTF === 'T' ? percentages.T : percentages.F },
                JP: { trait: dimJP, percent: dimJP === 'J' ? percentages.J : percentages.P }
            },
            profile
        };
    }

    /**
     * Menyimpan hasil MBTI ke localStorage untuk konsumsi fitur lain (seperti AI Coach).
     */
    static saveToStorage(result) {
        try {
            localStorage.setItem('user_mbti', result.code);
            localStorage.setItem('user_mbti_profile', JSON.stringify({
                code: result.code,
                name: result.profile.name,
                percentages: result.percentages,
                savedAt: new Date().toISOString()
            }));
        } catch (err) {
            console.warn('[MBTIEngine] Gagal menyimpan ke localStorage:', err);
        }
    }

    /**
     * Menghapus riwayat tes dari localStorage.
     */
    static clearStorage() {
        try {
            localStorage.removeItem('user_mbti');
            localStorage.removeItem('user_mbti_profile');
        } catch (err) {
            console.warn('[MBTIEngine] Gagal menghapus storage:', err);
        }
    }
}