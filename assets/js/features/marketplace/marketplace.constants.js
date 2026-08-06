/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE CONSTANTS
 * Path: assets/js/features/marketplace/marketplace.constants.js
 * Version: 133.0.0 (BUILD 133.0 — MARKETPLACE FOUNDATION)
 * Status: APPROVED & LOCKED
 * SRP: Single Source of Truth for Marketplace selectors, categories, CSS classes, and defaults.
 */

export const MARKETPLACE_SELECTORS = Object.freeze({
    CONTAINER: "#marketplace-root",
    SEARCH_INPUT: "#tc-mp-search-input",
    SEARCH_CLEAR: "#tc-mp-search-clear",
    CATEGORY_LIST: "#tc-mp-category-list",
    PRICE_FILTER: "#tc-mp-price-filter",
    GRID_CONTAINER: "#tc-mp-grid-container",
    STATE_CONTAINER: "#tc-mp-state-container",
    RESET_BTN: "#tc-mp-reset-btn"
});

export const MARKETPLACE_CLASSES = Object.freeze({
    GRID: "tc-mp-grid",
    CARD: "tc-mp-card",
    CARD_BADGE: "tc-mp-badge",
    CARD_TITLE: "tc-mp-title",
    CARD_PRICE: "tc-mp-price",
    BTN_PRIMARY: "btn-primary",
    ACTIVE_CATEGORY: "active",
    HIDDEN: "tc-hidden"
});

export const DEFAULT_MARKETPLACE_STATE = Object.freeze({
    searchQuery: "",
    selectedCategory: "all",
    selectedPriceRange: "all",
    isLoading: false,
    error: null
});

export const WHATSAPP_CONFIG = Object.freeze({
    PHONE_NUMBER: "6282293047592",
    BASE_URL: "https://wa.me/"
});