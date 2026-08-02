/**
 * TOPCARE AI PLATFORM V2 — SMART RECALL ENGINE
 * Path: assets/js/services/memory/smart.recall.js
 * Status: ACTIVE (SPRINT D - LOCKED GOLDEN BASELINE)
 * Role: Retrieves Precision Relevant Memories Attached to ContextSnapshotDTO
 */

import { createMemoryRecallDTO } from '../../core/memory/memory.dto.js';
import MemoryStore from './memory.store.js';
import InsightEngine from './insight.engine.js';

export const SmartRecall = Object.freeze({
    /**
     * Retrieves relevant memories tailored to current active Intent & Capability.
     * Lean Recall: Excludes irrelevant memory categories.
     */
    recallRelevantMemory({ activeIntent = 'GENERAL', activeCapabilityId = null }) {
        const allRecords = MemoryStore.getActiveRecords();
        let targetCategories = ['PREFERENCE', 'GOAL'];

        if (activeCapabilityId === 'resume-optimizer' || activeIntent === 'OPTIMIZE_RESUME') {
            targetCategories = ['GOAL', 'SKILL', 'PROJECT', 'PREFERENCE'];
        } else if (activeCapabilityId === 'personality-assessment' || activeIntent === 'ASSESS_PERSONALITY') {
            targetCategories = ['IDENTITY', 'PREFERENCE', 'TEMPORARY'];
        }

        // Filter Records by target categories
        const relevantRecords = allRecords.filter(r => targetCategories.includes(r.category));

        // Generate Dynamic Insights on relevant records
        const dynamicInsights = InsightEngine.generateInsights(relevantRecords);

        return createMemoryRecallDTO({
            activeIntent,
            relevanceScore: relevantRecords.length > 0 ? 95 : 50,
            recalledRecords: relevantRecords,
            recalledInsights: dynamicInsights
        });
    }
});

export default SmartRecall;
