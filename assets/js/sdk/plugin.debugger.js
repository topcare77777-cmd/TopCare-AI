/**
 * file: assets/js/sdk/plugin.debugger.js
 */

import { Core } from '../core/index.js';

export class PluginDebugger {
    constructor(pluginId) {
        this.pluginId = pluginId;
        this._timeline = [];
        this._active = false;
        Object.seal(this);
    }

    startTracing() {
        this._active = true;
        this.recordEvent('DEBUGGER_STARTED', { pluginId: this.pluginId });
        Core.Logger.info(`[Debugger] Telemetry tracing active for: ${this.pluginId}`);
    }

    recordEvent(eventType, payload = {}) {
        if (!this._active) return;

        const traceEntry = {
            pluginId: this.pluginId,
            eventType,
            payload,
            timestamp: Date.now()
        };

        this._timeline.push(traceEntry);
        Core.Event.emit('plugin.debugger.trace', traceEntry);
    }

    getTimeline() {
        return Core.Utils.clone(this._timeline);
    }

    stopTracing() {
        this.recordEvent('DEBUGGER_STOPPED', { pluginId: this.pluginId });
        this._active = false;
    }
}