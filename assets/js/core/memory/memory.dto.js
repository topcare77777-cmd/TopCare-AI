/**
 * TOPCARE AI PLATFORM V2 — MEMORY INTELLIGENCE DTOS & CATALOG SSOT
 * Path: assets/js/core/memory/memory.dto.js & memory.catalog.js
 * Status: ACTIVE (SPRINT D - LOCKED GOLDEN BASELINE)
 */

import { KNOWN_SCHEMA_TYPES } from '../schema/schema.catalog.js';
import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const MEMORY_SCHEMA_VERSION = '2.0.0';

export const MEMORY_CATEGORIES = deepFreezeDTO({
    PREFERENCE: 'PREFERENCE',
    GOAL: 'GOAL',
    IDENTITY: 'IDENTITY',
    RELATIONSHIP: 'RELATIONSHIP',
    PROJECT: 'PROJECT',
    SKILL: 'SKILL',
    TASK: 'TASK',
    TEMPORARY: 'TEMPORARY'
});

/** 1. MemoryCandidateDTO (Raw extraction result) */
export function createMemoryCandidateDTO({
    category = MEMORY_CATEGORIES.PREFERENCE,
    factText,
    initialConfidence = 0.40,
    sourcePhrase = ''
}) {
    if (!factText || typeof factText !== 'string') {
        throw new Error('[MemoryCandidateDTO] factText is required.');
    }
    return deepFreezeDTO({
        schemaType: 'MemoryCandidateDTO',
        schemaVersion: MEMORY_SCHEMA_VERSION,
        category: MEMORY_CATEGORIES[category] || MEMORY_CATEGORIES.PREFERENCE,
        factText: String(factText).trim(),
        initialConfidence: Number(initialConfidence),
        sourcePhrase: String(sourcePhrase).trim()
    });
}

/** 2. MemoryRecordDTO (Validated, stored, and confidence-scored memory unit) */
export function createMemoryRecordDTO({
    memoryId,
    category = MEMORY_CATEGORIES.PREFERENCE,
    factText,
    confidence = 0.50,
    sourceCount = 1,
    decayScore = 0.0,
    lastConfirmedAt = null,
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'MemoryRecordDTO',
        schemaVersion: MEMORY_SCHEMA_VERSION,
        memoryId: memoryId || `mem_${timeProvider.now().toString(36)}_${Math.random().toString(36).substr(2, 4)}`,
        category: MEMORY_CATEGORIES[category] || MEMORY_CATEGORIES.PREFERENCE,
        factText: String(factText).trim(),
        confidence: Math.min(1.0, Math.max(0.0, Number(confidence))),
        sourceCount: Number(sourceCount),
        decayScore: Math.min(1.0, Math.max(0.0, Number(decayScore))),
        lastConfirmedAt: lastConfirmedAt || timeProvider.iso(),
        createdAt: timeProvider.iso()
    });
}

/** 3. MemoryInsightDTO (Dynamically generated reasoning summary) */
export function createMemoryInsightDTO({
    insightId,
    summaryText,
    derivedFromRecordIds = [],
    confidence = 0.80,
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'MemoryInsightDTO',
        schemaVersion: MEMORY_SCHEMA_VERSION,
        insightId: insightId || `ins_${timeProvider.now().toString(36)}`,
        summaryText: String(summaryText).trim(),
        derivedFromRecordIds: Object.freeze([...derivedFromRecordIds]),
        confidence: Number(confidence),
        generatedAt: timeProvider.iso()
    });
}

/** 4. MemoryRecallDTO (Precision relevant facts attached to ContextSnapshotDTO) */
export function createMemoryRecallDTO({
    recallId,
    activeIntent = 'GENERAL',
    relevanceScore = 100,
    recalledRecords = [],
    recalledInsights = [],
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'MemoryRecallDTO',
        schemaVersion: MEMORY_SCHEMA_VERSION,
        recallId: recallId || `rec_${timeProvider.now().toString(36)}`,
        activeIntent: String(activeIntent),
        relevanceScore: Number(relevanceScore),
        recalledRecords: Object.freeze([...recalledRecords]),
        recalledInsights: Object.freeze([...recalledInsights]),
        recalledAt: timeProvider.iso()
    });
}
