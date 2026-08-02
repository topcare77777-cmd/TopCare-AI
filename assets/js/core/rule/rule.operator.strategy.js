/**
 * TOPCARE AI PLATFORM V2 — RULE OPERATOR STRATEGY ENGINE
 * Path: assets/js/core/rule/rule.operator.strategy.js
 * Status: ACTIVE (BUILD AC-020 Phase 2 - LOCKED GOLDEN BASELINE)
 * Role: Pure Comparison Operator Strategy Engine
 */

import { RULE_OPERATORS } from './rule.catalog.js';

export const OperatorStrategy = Object.freeze({
    /**
     * Evaluates comparison condition cleanly.
     * @param {string} operator - Operator key from RULE_OPERATORS.
     * @param {*} left - Resolved left value from context.
     * @param {*} right - Target condition value from RuleDTO.
     * @returns {boolean}
     */
    evaluate(operator, left, right) {
        const op = String(operator).toUpperCase();

        switch (op) {
            case RULE_OPERATORS.EQUALS:
                return left === right;
            case RULE_OPERATORS.NOT_EQUALS:
                return left !== right;
            case RULE_OPERATORS.GREATER_THAN:
                return typeof left === 'number' && typeof right === 'number' && left > right;
            case RULE_OPERATORS.LESS_THAN:
                return typeof left === 'number' && typeof right === 'number' && left < right;
            case RULE_OPERATORS.GREATER_THAN_OR_EQUAL:
                return typeof left === 'number' && typeof right === 'number' && left >= right;
            case RULE_OPERATORS.LESS_THAN_OR_EQUAL:
                return typeof left === 'number' && typeof right === 'number' && left <= right;
            case RULE_OPERATORS.CONTAINS:
                if (typeof left === 'string') return left.includes(String(right));
                if (Array.isArray(left)) return left.includes(right);
                return false;
            case RULE_OPERATORS.NOT_CONTAINS:
                return !this.evaluate(RULE_OPERATORS.CONTAINS, left, right);
            case RULE_OPERATORS.EXISTS:
                return left !== null && left !== undefined;
            case RULE_OPERATORS.NOT_EXISTS:
                return left === null || left === undefined;
            case RULE_OPERATORS.IN:
                return Array.isArray(right) ? right.includes(left) : false;
            case RULE_OPERATORS.NOT_IN:
                return Array.isArray(right) ? !right.includes(left) : true;
            case RULE_OPERATORS.BETWEEN:
                return Array.isArray(right) && right.length === 2 && typeof left === 'number'
                    ? left >= right[0] && left <= right[1]
                    : false;
            default:
                return false;
        }
    }
});

export default OperatorStrategy;
