/**
 * TOPCARE AI PLATFORM V2 — CONFIDENCE ENGINE & ISOLATED MEMORY STORE
 * Path: assets/js/services/memory/confidence.engine.js & memory.store.js
 * Status: ACTIVE (SPRINT D - LOCKED GOLDEN BASELINE)
 */

import { createMemoryRecordDTO } from '../../core/memory/memory.dto.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const ConfidenceEngine = Object.freeze({
    /**
     * Consolidates a new MemoryCandidateDTO into MemoryRecordDTOs store.
     * Boosts confidence if fact is repeated; calculates decay.
     */
    consolidate(candidateDTO, existingRecords = []) {
        const matchingRecord = existingRecords.find(
            r => r.category === candidateDTO.category && r.factText.toLowerCase() === candidateDTO.factText.toLowerCase()
        );

        if (matchingRecord) {
            // Boost confidence for repeated verification
            const newSourceCount = matchingRecord.sourceCount + 1;
            const newConfidence = Math.min(0.99, matchingRecord.confidence + 0.15);

            return createMemoryRecordDTO({
                memoryId: matchingRecord.memoryId,
                category: matchingRecord.category,
                factText: matchingRecord.factText,
                confidence: newConfidence,
                sourceCount: newSourceCount,
                decayScore: Math.max(0.0, matchingRecord.decayScore - 0.10),
                lastConfirmedAt: TimeProvider.iso()
            });
        }

        // Create new Record
        return createMemoryRecordDTO({
            category: candidateDTO.category,
            factText: candidateDTO.factText,
            confidence: candidateDTO.initialConfidence,
            sourceCount: 1,
            decayScore: 0.0,
            lastConfirmedAt: TimeProvider.iso()
        });
    }
});

export const MemoryStore = (() => {
    /** @type {Map<string, Object>} Map<memoryId, MemoryRecordDTO> */
    const recordsMap = new Map();

    function upsertRecord(recordDTO) {
        recordsMap.set(recordDTO.memoryId, recordDTO);
    }

    function getActiveRecords() {
        // Filter out decayed or low-confidence facts (confidence >= 0.30 & decay <= 0.80)
        const active = Array.from(recordsMap.values()).filter(
            r => r.confidence >= 0.30 && r.decayScore <= 0.80
        );
        return deepFreezeDTO(active);
    }

    function clear() {
        recordsMap.clear();
    }

    return Object.freeze({
        upsertRecord,
        getActiveRecords,
        clear
    });
})();

export default MemoryStore;
