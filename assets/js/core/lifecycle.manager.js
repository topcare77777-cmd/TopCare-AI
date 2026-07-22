/**
 * TopCare AI Platform V2.0.0
 * Lifecycle Manager
 * Path: assets/js/core/lifecycle.manager.js
 */
const LifecycleManager = {
    hooks: { mount: [], unmount: [] },
    add(type, fn) { this.hooks[type].push(fn); },
    trigger(type) { this.hooks[type].forEach(fn => fn()); }
};

export default LifecycleManager;