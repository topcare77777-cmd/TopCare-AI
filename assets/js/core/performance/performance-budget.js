/**
 * TOPCARE AI PLATFORM V2 — PERFORMANCE BUDGET SPECIFICATION
 * Path: assets/js/core/performance/performance-budget.js
 * Version: 138.11.0 (BUILD 138C — EMPIRICAL AUDIT REFINEMENT)
 * Status: APPROVED & LOCKED
 * SRP: Single Source of Truth for Service Level Agreements (SLA) and Performance Budgets.
 */

export const PERFORMANCE_BUDGET = Object.freeze({
    // Core Runtime SLA (in milliseconds)
    BOOTSTRAP_MAX_MS: 50,
    ROUTER_DISPATCH_MAX_MS: 5,
    VIEW_MANAGER_MOUNT_MAX_MS: 15,
    MARKETPLACE_INIT_MAX_MS: 20,
    REPOSITORY_FETCH_MAX_MS: 10,

    // Page Load & Rendering Budget
    JS_PARSE_EVAL_MAX_MS: 60,
    FIRST_PAINT_MAX_MS: 1000,
    DOM_CONTENT_LOADED_MAX_MS: 250,

    // Resource & Asset Budget
    MAX_CSS_BUNDLE_KB: 60,
    MAX_RESOURCE_LATENCY_MS: 100,

    // Memory & Main-Thread Health
    PEAK_HEAP_HOME_MB: 15,
    PEAK_HEAP_MARKETPLACE_MB: 20,
    MAX_LONG_TASKS_ALLOWED: 0
});