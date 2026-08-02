/**
 * TOPCARE AI PLATFORM V2 — DECLARATIVE RULE DTO FACTORY
 * Path: assets/js/core/rule/rule.dto.js
 * Status: ACTIVE (BUILD AC-020 Phase 1 - LOCKED GOLDEN BASELINE)
 * Role: Factory for Pure Declarative RuleDTO, ConditionDTO, and EffectDTO
 */

import { RULE_OPERATORS, RULE_PRIORITIES } from './rule.catalog.js';
import { deepFreezeDTO } from '../utils/dto.js';

export function createConditionDTO({
    field,
    operator = RULE_OPERATORS.EQUALS,
    value = null
}) {
    if (!field || typeof field !== 'string') {
        throw new Error('[RuleDTO] Condition field is required and must be a string.');
    }
    const upperOp = String(operator).toUpperCase();
    if (!Object.values(RULE_OPERATORS).includes(upperOp)) {
        throw new Error(`[RuleDTO] Uncataloged operator violation: "${operator}".`);
    }

    return deepFreezeDTO({
        field: String(field).trim(),
        operator: upperOp,
        value: value !== undefined ? value : null
    });
}

export function createEffectDTO({
    type,
    payload = {}
}) {
    if (!type || typeof type !== 'string') {
        throw new Error('[RuleDTO] Effect type is required and must be a string.');
    }

    return deepFreezeDTO({
        type: String(type).toUpperCase().trim(),
        payload: deepFreezeDTO({ ...payload })
    });
}

export function createRuleDTO({
    ruleId,
    priorityKey = 'NORMAL',
    group = 'GENERAL',
    enabled = true,
    conditions = [],
    effects = [],
    metadata = {}
}) {
    if (!ruleId || typeof ruleId !== 'string') {
        throw new Error('[RuleDTO] Rule ID is required and must be a string.');
    }

    const upperPriority = String(priorityKey).toUpperCase();
    if (!Object.keys(RULE_PRIORITIES).includes(upperPriority)) {
        throw new Error(`[RuleDTO] Invalid priority key violation: "${priorityKey}".`);
    }

    const frozenConditions = conditions.map(c => createConditionDTO(c));
    const frozenEffects = effects.map(e => createEffectDTO(e));

    return deepFreezeDTO({
        ruleId: String(ruleId).toLowerCase().trim(),
        priorityKey: upperPriority,
        group: String(group).toUpperCase().trim(),
        enabled: Boolean(enabled),
        conditions: Object.freeze(frozenConditions),
        effects: Object.freeze(frozenEffects),
        metadata: deepFreezeDTO({
            description: metadata.description || 'No description provided',
            tags: Array.isArray(metadata.tags) ? Object.freeze([...metadata.tags]) : Object.freeze([]),
            author: metadata.author || 'Platform Architecture',
            version: metadata.version || '1.0.0',
            introducedIn: metadata.introducedIn || 'AC-020',
            deprecated: Boolean(metadata.deprecated)
        })
    });
}
