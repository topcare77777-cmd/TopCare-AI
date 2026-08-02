/**
 * TOPCARE AI PLATFORM V2 — MEMORY EXTRACTION ENGINE
 * Path: assets/js/services/memory/memory.extraction.engine.js
 * Status: ACTIVE (SPRINT D - LOCKED GOLDEN BASELINE)
 * Role: Extracts Candidate Facts from Conversation Text
 */

import { MEMORY_CATEGORIES, createMemoryCandidateDTO } from '../../core/memory/memory.dto.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const MemoryExtractionEngine = Object.freeze({
    /**
     * Extracts fact candidates from user conversation input.
     * @param {string} userMessageText
     * @returns {Array<Object>} List of MemoryCandidateDTOs
     */
    extractCandidates(userMessageText = '') {
        const text = String(userMessageText).trim();
        const candidates = [];

        // 1. Extract Career & Goal Facts
        if (/posisi|karier|target|belajar|jurusan|goal/i.test(text)) {
            candidates.push(createMemoryCandidateDTO({
                category: MEMORY_CATEGORIES.GOAL,
                factText: `User expressed career/learning goal in text: "${text}"`,
                initialConfidence: 0.60,
                sourcePhrase: text
            }));
        }

        // 2. Extract Communication & Formatting Preferences
        if (/markdown|poin|singkat|detail|ringkas|format/i.test(text)) {
            candidates.push(createMemoryCandidateDTO({
                category: MEMORY_CATEGORIES.PREFERENCE,
                factText: `User expressed explicit formatting preference in text: "${text}"`,
                initialConfidence: 0.75,
                sourcePhrase: text
            }));
        }

        // 3. Extract Skill Facts
        if (/bisa|keahlian|menguasai|paham|pengalaman/i.test(text)) {
            candidates.push(createMemoryCandidateDTO({
                category: MEMORY_CATEGORIES.SKILL,
                factText: `User stated domain skill/experience in text: "${text}"`,
                initialConfidence: 0.65,
                sourcePhrase: text
            }));
        }

        return deepFreezeDTO(candidates);
    }
});

export default MemoryExtractionEngine;
