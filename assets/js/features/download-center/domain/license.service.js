/**
 * TOPCARE AI PLATFORM V2 — LICENSE SERVICE CONTRACT
 * Path: assets/js/features/download-center/domain/license.service.js
 * Version: 135.0.0 (BUILD 135.0 — DIGITAL PRODUCT DELIVERY CENTER)
 * Status: APPROVED & LOCKED
 * SRP: Provides license validation contract returning false by default except for FREE products.
 */

export class LicenseService {
    constructor() {
        this._activeLicenses = new Set();
        Object.seal(this);
    }

    /**
     * Validates if user possesses an active license for a product or asset.
     * @param {Object} asset
     * @returns {boolean}
     */
    hasLicense(asset) {
        if (!asset) return false;

        // FREE products bypass license check automatically
        if (asset.isFree || asset.requiresLicense === false) {
            return true;
        }

        return this._activeLicenses.has(asset.productId) || this._activeLicenses.has(asset.id);
    }

    /**
     * Activates a product license (Extension point for BUILD 137).
     * @param {string} licenseKey
     * @param {string} targetId
     * @returns {boolean}
     */
    activate(licenseKey, targetId) {
        if (!licenseKey || !targetId) return false;
        this._activeLicenses.add(targetId);
        return true;
    }

    /**
     * Deactivates a product license.
     * @param {string} targetId
     * @returns {boolean}
     */
    deactivate(targetId) {
        return this._activeLicenses.delete(targetId);
    }
}

export const licenseService = new LicenseService();
export default licenseService;
