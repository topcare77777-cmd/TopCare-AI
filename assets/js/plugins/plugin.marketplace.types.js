/**
 * file: assets/js/plugins/plugin.marketplace.types.js
 */

export const MARKETPLACE_EVENTS = Object.freeze({
    FETCHING_CATALOG: 'plugin.marketplace.fetching_catalog',
    CATALOG_FETCHED: 'plugin.marketplace.catalog_fetched',
    DOWNLOADING: 'plugin.marketplace.downloading',
    VERIFYING: 'plugin.marketplace.verifying',
    DOWNLOADED: 'plugin.marketplace.downloaded',
    INSTALLATION_QUEUED: 'plugin.marketplace.installation_queued',
    INSTALLED: 'plugin.marketplace.installed',
    FAILED: 'plugin.marketplace.failed'
});

export const TRUST_LEVELS = Object.freeze({
    OFFICIAL: 'official',
    VERIFIED: 'verified',
    COMMUNITY: 'community',
    UNSIGNED: 'unsigned',
    DEPRECATED: 'deprecated'
});

export const UPDATE_CHANNELS = Object.freeze({
    STABLE: 'stable',
    BETA: 'beta',
    NIGHTLY: 'nightly',
    LTS: 'lts'
});