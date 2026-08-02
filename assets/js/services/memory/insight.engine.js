/**
 * TOPCARE AI PLATFORM V2 — DYNAMIC INSIGHT GENERATION ENGINE
 * Path: assets/js/services/memory/insight.engine.js
 * Status: ACTIVE (SPRINT D - LOCKED GOLDEN BASELINE)
 * Role: Computes Dynamic Reasoning Insights from Stored Memory Records
 */

import { createMemoryInsightDTO } from '../../core/memory/memory.dto.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const InsightEngine = Object.freeze({
    /**
     * Generates dynamic insights from active MemoryRecordDTOs.
     * Pure Reasoning: Insight is computed on the fly, NOT stored as raw fact.
     */
    generateInsights(activeRecords = []) {
        const insights = [];

        const goals = activeRecords.filter(r => r.category === 'GOAL');
        const skills = activeRecords.filter(r => r.category === 'SKILL');

        if (goals.length > 0 && skills.length > 0) {
            const goalText = goals.map(g => g.factText).join('; ');
            const skillText = skills.map(s => s.factText).join('; ');

            insights.push(createMemoryInsightDTO({
                summaryText: `User is actively aligning existing skills (${skillText}) toward strategic goals (${goalText}).`,
                derivedFromRecordIds: [...goals.map(g => g.memoryId), ...skills.map(s => s.memoryId)],
                confidence: 0.88
            }));
        }

        return deepFreezeDTO(insights);
    }
});

export default InsightEngine;
