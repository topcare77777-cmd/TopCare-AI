/**
 * TOPCARE AI PLATFORM V2 — PERSONALITY PROFILE ENGINE
 * Path: assets/js/domain/personality/personality.profile.engine.js
 * Role: Constructs Comprehensive Human Personality Profile DTO (Pure Domain)
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

const TEMPERAMENT_CATALOG = Object.freeze({
    koleris: {
        temperament: 'Koleris',
        primaryType: 'Koleris',
        secondaryType: 'Sanguinis',
        strengths: Object.freeze(['Tegas', 'Berorientasi Target', 'Independen', 'Penuh Inisiatif']),
        blindSpots: Object.freeze(['Impulsif', 'Kurang Sabar', 'Cenderung Dominan']),
        communicationStyle: 'Direct, Concisely Structured, Result-Focused',
        motivation: 'Pencapaian Target dan Efisiensi',
        stressPattern: 'Menjadi Murka atau Frustrasi saat Terhambat',
        learningStyle: 'Action-Oriented, Case Studies, Practical Application',
        decisionStyle: 'Fast, Logical, Risk-Taking'
    },
    sanguinis: {
        temperament: 'Sanguinis',
        primaryType: 'Sanguinis',
        secondaryType: 'Plegmatis',
        strengths: Object.freeze(['Antusias', 'Komunikatif', 'Optimis', 'Kreatif']),
        blindSpots: Object.freeze(['Kurang Terorganisir', 'Mudah Terdistraksi']),
        communicationStyle: 'Warm, Enthusiastic, Story-Driven',
        motivation: 'Apresiasi Sosial dan Hubungan Positif',
        stressPattern: 'Menarik Diri saat Merasa Ditolak atau Bosan',
        learningStyle: 'Interactive, Visual, Discussion-Based',
        decisionStyle: 'Intuitive, People-Oriented'
    },
    melankolis: {
        temperament: 'Melankolis',
        primaryType: 'Melankolis',
        secondaryType: 'Plegmatis',
        strengths: Object.freeze(['Analitis', 'Tekun', 'Terencana', 'Detail-Oriented']),
        blindSpots: Object.freeze(['Terlalu Kritis', 'Perfeksionis Berlebihan']),
        communicationStyle: 'Detailed, Precise, Methodical',
        motivation: 'Kerapian, Kebenaran, dan Kualitas',
        stressPattern: 'Cemas saat Terjadi Ketidakpastian atau Kekacauan',
        learningStyle: 'Structured, Reading, Deep Analytical Reflection',
        decisionStyle: 'Cautious, Fact-Based, Deliberate'
    },
    plegmatis: {
        temperament: 'Plegmatis',
        primaryType: 'Plegmatis',
        secondaryType: 'Melankolis',
        strengths: Object.freeze(['Tenang', 'Diplomatis', 'Pendengar Baik', 'Stabil']),
        blindSpots: Object.freeze(['Ragu-ragu', 'Cenderung Menghindari Konflik']),
        communicationStyle: 'Calm, Supportive, Patient',
        motivation: 'Kedamaian, Harmoni, dan Stabilitas',
        stressPattern: 'Pasif-Agresif saat Ditekan Menerus',
        learningStyle: 'Step-by-Step, Guided Practice, Low-Pressure',
        decisionStyle: 'Consensus-Seeking, Risk-Averse'
    }
});

export const PersonalityProfileEngine = (() => {

    function resolveProfile(rawInput) {
        const key = (typeof rawInput === 'string' ? rawInput : rawInput?.type || rawInput?.personality || 'plegmatis').toLowerCase();
        const matchedProfile = TEMPERAMENT_CATALOG[key] || TEMPERAMENT_CATALOG['plegmatis'];

        // Pure Domain DTO without platform release versioning
        return deepFreezeDTO({ ...matchedProfile });
    }

    return Object.freeze({
        resolveProfile
    });
})();

export default PersonalityProfileEngine;
