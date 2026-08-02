/**
 * TOPCARE AI PLATFORM V2 — RULE VALIDATOR GATEWAY
 * Path: assets/js/core/rule/rule.validator.js
 * Status: ACTIVE (BUILD AC-020 Phase 1 - LOCKED GOLDEN BASELINE)
 * Role: Validation Gate for RuleDTO Structural Integrity & Constitutional Compliance
 */

import { RULE_OPERATORS, RULE_PRIORITIES } from './rule.catalog.js';

function checkCircular(val, visited = new WeakSet(), path = 'rule') {
    if (val === null || typeof val !== 'object') return;
    if (visited.has(val)) {
        throw new Error(`[RuleValidator] Circular reference detected at path: ${path}`);
    }
    visited.add(val);

    if (Array.isArray(val)) {
        val.forEach((item, idx) => checkCircular(item, visited, `${path}[${idx}]`));
    } else {
        Object.keys(val).forEach(key => checkCircular(val[key], visited, `${path}.${key}`));
    }
}

export const RuleValidator = Object.freeze({
    validate(ruleDTO) {
        if (!ruleDTO || typeof ruleDTO !== 'object') {
            throw new Error('[RuleValidator] Target must be a valid RuleDTO object.');
        }

        if (!ruleDTO.ruleId || typeof ruleDTO.ruleId !== 'string') {
            throw new Error('[RuleValidator] RuleDTO must contain a non-empty ruleId.');
        }

        if (!Object.keys(RULE_PRIORITIES).includes(ruleDTO.priorityKey)) {
            throw new Error(`[RuleValidator] Invalid priorityKey: "${ruleDTO.priorityKey}".`);
        }

        if (!Array.isArray(ruleDTO.conditions) || ruleDTO.conditions.length === 0) {
            throw new Error('[RuleValidator] RuleDTO must contain at least one ConditionDTO.');
        }

        for (const cond of ruleDTO.conditions) {
            if (!cond.field || !Object.values(RULE_OPERATORS).includes(cond.operator)) {
                throw new Error(`[RuleValidator] Invalid ConditionDTO structure in rule: ${ruleDTO.ruleId}`);
            }
        }

        if (!Array.isArray(ruleDTO.effects) || ruleDTO.effects.length === 0) {
            throw new Error('[RuleValidator] RuleDTO must contain at least one EffectDTO.');
        }

        for (const eff of ruleDTO.effects) {
            if (!eff.type || typeof eff.type !== 'string') {
                throw new Error(`[RuleValidator] Invalid EffectDTO structure in rule: ${ruleDTO.ruleId}`);
            }
        }

        checkCircular(ruleDTO, new WeakSet(), `rule[${ruleDTO.ruleId}]`);

        return true;
    }
});

export default RuleValidator;
