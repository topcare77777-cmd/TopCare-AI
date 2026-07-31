/**
 * file: assets/js/plugins/plugin.types.js
 * Peristiwa (Events) dengan pola penamaan yang konsisten dan terstandarisasi.
 */
export const PLUGIN_EVENTS = Object.freeze({
    INSTALL_BEGIN: 'plugin.install.begin',
    INSTALL_SUCCESS: 'plugin.install.success',
    INSTALL_FAILED: 'plugin.install.failed',

    ACTIVATE_BEGIN: 'plugin.activate.begin',
    ACTIVATE_SUCCESS: 'plugin.activate.success',
    ACTIVATE_FAILED: 'plugin.activate.failed',

    REMOVE_BEGIN: 'plugin.remove.begin',
    REMOVE_SUCCESS: 'plugin.remove.success',
    REMOVE_FAILED: 'plugin.remove.failed',

    UPDATE_BEGIN: 'plugin.update.begin',
    UPDATE_SUCCESS: 'plugin.update.success',
    UPDATE_FAILED: 'plugin.update.failed'
});