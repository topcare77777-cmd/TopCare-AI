/**
 * TOPCARE AI PLATFORM V2 — RULE DECISION DTO FACTORY
 * Path: assets/js/core/rule/rule.decision.dto.js
 * Status: ACTIVE (BUILD AC-020 Phase 2 - LOCKED GOLDEN BASELINE)
 * Role: Creates Standardized Immutable RuleDecisionDTO Packets
 */

import { deepFreezeDTO } from '../utils/dto.js';

export function createRuleDecisionDTO({
    ruleId,
    matched = false,
    numericPriority = 500,
    matchedConditions = [],
    failedCondition = null,
    effects = [],
    conflicts = []
}) {
    return deepFreezeDTO({
        schemaVersion: '2.0.0',
        ruleId: String(ruleId),
        matched: Boolean(matched),
        numericPriority: Number(numericPriority),
        matchedConditions: Object.freeze([...matchedConditions]),
        failedCondition: failedCondition ? deepFreezeDTO({ ...failedCondition }) : null,
        effects: Object.freeze([...effects]),
        conflicts: Object.freeze([...conflicts])
    });
}
