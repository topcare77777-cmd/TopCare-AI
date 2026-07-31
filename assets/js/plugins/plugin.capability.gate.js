/**
 * file: assets/js/plugins/plugin.capability.gate.js
 */

import { Core } from '../core/index.js';

export const CAPABILITY_PERMISSIONS = Object.freeze({
    NETWORK_FETCH: 'network.fetch',
    STORAGE_READ: 'storage.read',
    STORAGE_WRITE: 'storage.write',
    DOM_MANIPULATION: 'dom.manipulate',
    SYSTEM_SERVICE: 'system.service'
});

export class CapabilityGate {
    /**
     * Memeriksa apakah plugin memiliki izin spesifik yang dideklarasikan dalam manifesnya.
     * @param {Object} manifest 
     * @param {string} requiredCapability 
     * @param {Object} contextDetails 
     * @returns {boolean}
     */
    static authorize(manifest, requiredCapability, contextDetails = {}) {
        if (!manifest) {
            Core.Logger.error("[Capability Gate] Access denied: Missing plugin manifest.");
            return false;
        }

        const permissions = manifest.permissions || {};
        const capabilities = manifest.capabilities || [];

        // 1. Verifikasi Izin Jaringan
        if (requiredCapability === CAPABILITY_PERMISSIONS.NETWORK_FETCH) {
            const allowedDomains = permissions.network || [];
            const targetUrl = contextDetails.url || '';

            if (allowedDomains.includes('*')) return true;

            const domainMatch = allowedDomains.some(domain => targetUrl.includes(domain));
            if (!domainMatch) {
                Core.Logger.warn(`[Capability Gate] Denied network fetch to '${targetUrl}' for plugin '${manifest.id}'. Permission missing in manifest.`);
                return false;
            }
            return true;
        }

        // 2. Verifikasi Izin Layanan Sistem
        if (requiredCapability === CAPABILITY_PERMISSIONS.SYSTEM_SERVICE) {
            const allowedServices = permissions.services || [];
            const targetService = contextDetails.service || '';

            if (allowedServices.includes('*') || allowedServices.includes(targetService)) {
                return true;
            }
            Core.Logger.warn(`[Capability Gate] Denied service resolution '${targetService}' for plugin '${manifest.id}'. Permission missing.`);
            return false;
        }

        // 3. Verifikasi Izin Kapabilitas Umum
        const hasCap = capabilities.includes(requiredCapability) || capabilities.includes('*');
        if (!hasCap) {
            Core.Logger.warn(`[Capability Gate] Denied capability '${requiredCapability}' for plugin '${manifest.id}'.`);
        }
        return hasCap;
    }

    /**
     * Membungkus fungsi dengan pemeriksaan Capability Gate otomatis.
     * @param {Function} fn 
     * @param {Object} manifest 
     * @param {string} requiredCapability 
     * @returns {Function} Protected Function
     */
    static enforce(fn, manifest, requiredCapability) {
        return function (...args) {
            const authorized = CapabilityGate.authorize(manifest, requiredCapability, { args });
            if (!authorized) {
                throw new Error(`CapabilityGateError: Plugin '${manifest.id}' lacks unauthorized capability '${requiredCapability}'.`);
            }
            return fn.apply(this, args);
        };
    }
}