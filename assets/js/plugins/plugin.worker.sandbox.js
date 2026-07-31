/**
 * file: assets/js/plugins/plugin.worker.sandbox.js
 */

import { Core } from '../core/index.js';
import { ExtensionHostBridge } from './plugin.extension.host.js';

export class WebWorkerPluginSandbox {
    /**
     * Membuat lingkungan eksekusi Worker terisolasi dari biner JavaScript plugin.
     * @param {Object} manifest 
     * @param {string} codePayload 
     * @returns {Promise<Object>} Sandbox Interface Handler
     */
    static async createSandbox(manifest, codePayload) {
        Core.Logger.info(`[Worker Sandbox] Initializing isolated Web Worker Realm for plugin: ${manifest.id}`);

        // Template Script Worker terisolasi
        const workerScriptText = `
            const manifest = ${JSON.stringify(manifest)};
            let pluginInstance = null;

            // Proxy Host Facade untuk API Worker
            const HostFacade = {
                logger: {
                    info: (msg) => callHost('logger.info', { message: msg })
                },
                fetch: (url, options) => callHost('network.fetch', { url, options }),
                callService: (service, params) => callHost('service.call', { service, params })
            };

            let reqCounter = 0;
            const pendingHostCalls = new Map();

            function callHost(action, payload) {
                return new Promise((resolve, reject) => {
                    const requestId = 'w_req_' + (++reqCounter) + '_' + Date.now();
                    pendingHostCalls.set(requestId, { resolve, reject });
                    self.postMessage({ type: 'HOST_API_CALL', requestId, action, payload });
                });
            }

            self.onmessage = async (e) => {
                const { requestId, type, action, payload, error } = e.data || {};

                if (type === 'HOST_API_RESPONSE') {
                    if (pendingHostCalls.has(requestId)) {
                        const { resolve, reject } = pendingHostCalls.get(requestId);
                        pendingHostCalls.delete(requestId);
                        if (error) reject(new Error(error));
                        else resolve(payload);
                    }
                    return;
                }

                if (type === 'PLUGIN_EXECUTE') {
                    try {
                        if (action === 'initialize') {
                            // Evaluasi kode plugin di dalam Worker Global Realm
                            const moduleExports = {};
                            const moduleObj = { exports: moduleExports };
                            const factory = new Function('exports', 'module', 'Host', ${JSON.stringify(codePayload)});
                            factory(moduleExports, moduleObj, HostFacade);
                            pluginInstance = moduleObj.exports.default || moduleObj.exports;
                            
                            if (pluginInstance && typeof pluginInstance.initialize === 'function') {
                                await pluginInstance.initialize(HostFacade);
                            }
                            self.postMessage({ requestId, payload: true });
                        } else if (action === 'activate') {
                            if (pluginInstance && typeof pluginInstance.activate === 'function') {
                                await pluginInstance.activate(HostFacade);
                            }
                            self.postMessage({ requestId, payload: true });
                        } else if (action === 'dispose') {
                            if (pluginInstance && typeof pluginInstance.dispose === 'function') {
                                await pluginInstance.dispose(HostFacade);
                            }
                            self.postMessage({ requestId, payload: true });
                        } else {
                            throw new Error('Unknown Sandbox Method: ' + action);
                        }
                    } catch (err) {
                        self.postMessage({ requestId, error: err.message });
                    }
                }
            };
        `;

        const blob = new Blob([workerScriptText], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        const workerInstance = new Worker(workerUrl);

        const bridge = new ExtensionHostBridge(manifest.id, workerInstance, manifest);

        return {
            manifest,
            bridge,
            worker: workerInstance,
            initialize: async () => bridge.sendRequest('initialize'),
            activate: async () => bridge.sendRequest('activate'),
            dispose: async () => {
                try {
                    await bridge.sendRequest('dispose');
                } finally {
                    workerInstance.terminate();
                    URL.revokeObjectURL(workerUrl);
                    Core.Logger.info(`[Worker Sandbox] Worker thread terminated for plugin: ${manifest.id}`);
                }
            }
        };
    }
}