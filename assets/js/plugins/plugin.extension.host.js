/**
 * file: assets/js/plugins/plugin.extension.host.js
 */

import { Core } from '../core/index.js';
import { CapabilityGate, CAPABILITY_PERMISSIONS } from './plugin.capability.gate.js';

export class ExtensionHostBridge {
    constructor(pluginId, workerInstance, manifest) {
        this.pluginId = pluginId;
        this.worker = workerInstance;
        this.manifest = manifest;
        this._pendingRequests = new Map(); // requestId -> { resolve, reject }
        this._requestIdCounter = 0;
        Object.seal(this);

        this._listen();
    }

    _listen() {
        this.worker.onmessage = async (event) => {
            const { requestId, type, action, payload, error } = event.data || {};

            // Penanganan respons RPC dari Worker
            if (requestId && this._pendingRequests.has(requestId)) {
                const { resolve, reject } = this._pendingRequests.get(requestId);
                this._pendingRequests.delete(requestId);
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(payload);
                }
                return;
            }

            // Penanganan panggilan balik Host API dari Worker Sandbox ke Host
            if (type === 'HOST_API_CALL') {
                this._handleHostApiCall(requestId, action, payload);
            }
        };

        this.worker.onerror = (err) => {
            Core.Logger.error(`[Extension Host] Worker Thread Error in plugin '${this.pluginId}': ${err.message}`);
        };
    }

    async _handleHostApiCall(requestId, action, payload) {
        try {
            let result;

            if (action === 'logger.info') {
                Core.Logger.info(`[WorkerPlugin:${this.pluginId}] ${payload.message}`);
                result = true;
            } else if (action === 'network.fetch') {
                // Diperiksa oleh Capability Gate sebelum dieksekusi di Host
                const authorized = CapabilityGate.authorize(this.manifest, CAPABILITY_PERMISSIONS.NETWORK_FETCH, { url: payload.url });
                if (!authorized) {
                    throw new Error(`Network fetch to '${payload.url}' blocked by Capability Gate.`);
                }
                const response = await fetch(payload.url, payload.options);
                result = await response.json();
            } else if (action === 'service.call') {
                const authorized = CapabilityGate.authorize(this.manifest, CAPABILITY_PERMISSIONS.SYSTEM_SERVICE, { service: payload.service });
                if (!authorized) {
                    throw new Error(`System service call '${payload.service}' blocked by Capability Gate.`);
                }
                result = { success: true, service: payload.service, status: 'mock_executed' };
            } else {
                throw new Error(`Unknown Host API Action: ${action}`);
            }

            this.worker.postMessage({ requestId, type: 'HOST_API_RESPONSE', payload: result });
        } catch (err) {
            this.worker.postMessage({ requestId, type: 'HOST_API_RESPONSE', error: err.message });
        }
    }

    sendRequest(action, payload = {}) {
        return new Promise((resolve, reject) => {
            const requestId = `rpc_${++this._requestIdCounter}_${Date.now()}`;
            this._pendingRequests.set(requestId, { resolve, reject });
            this.worker.postMessage({ requestId, type: 'PLUGIN_EXECUTE', action, payload });
        });
    }
}