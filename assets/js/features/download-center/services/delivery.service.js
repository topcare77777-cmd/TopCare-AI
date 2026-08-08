/**
 * TOPCARE AI PLATFORM V2 — PRODUCT DELIVERY SERVICE
 * Path: assets/js/features/download-center/services/delivery.service.js
 * Version: 135.7.2 (BUILD 135.7 — ENTERPRISE RELEASE CANDIDATE)
 * Status: APPROVED RELEASE CANDIDATE (PENDING INTEGRATION SUITE)
 * SRP: Computes package aggregates with a Cycle-Safe, WeakSet-guaranteed Deep Freeze Immutability Contract.
 */

import { ProductDeliveryManifest } from '../config/product-delivery-manifest.js';
import { DownloadManifest } from '../config/download-manifest.js';
import { licenseService } from '../domain/license.service.js';
import { downloadHistoryRepository } from '../domain/download-history.repository.js';

/**
 * Cycle-Safe Recursive Deep Freeze Utility
 * Handles circular references safely using WeakSet tracking.
 */
function deepFreeze(object, visited = new WeakSet()) {
    if (object === null || typeof object !== 'object') {
        return object;
    }

    if (visited.has(object)) {
        return object;
    }

    visited.add(object);

    const propNames = Object.getOwnPropertyNames(object);
    for (const name of propNames) {
        const value = object[name];
        if (value && typeof value === 'object') {
            deepFreeze(value, visited);
        }
    }

    return Object.freeze(object);
}

export class DeliveryServiceEngine {
    constructor() {
        this._buildAssetMap();
        this._staticPackageCache = new Map();
        Object.seal(this);
    }

    _buildAssetMap() {
        this._assetMap = new Map(DownloadManifest.map(asset => [asset.id, asset]));
    }

    parseFileSizeToMB(filesizeStr) {
        if (!filesizeStr || typeof filesizeStr !== 'string') return 0;
        const sanitized = filesizeStr.replace(/,/g, '').trim();
        const match = sanitized.match(/^([\d.]+)\s*([A-Za-z]+)?$/);
        if (!match) return 0;

        const value = parseFloat(match[1]);
        if (isNaN(value)) return 0;
        const unit = (match[2] || 'MB').toUpperCase();

        switch (unit) {
            case 'KB': return value / 1024;
            case 'GB': return value * 1024;
            case 'TB': return value * 1024 * 1024;
            case 'MB':
            default: return value;
        }
    }

    formatFileSize(totalMB) {
        if (totalMB >= 1024) return `${(totalMB / 1024).toFixed(1)} GB`;
        if (totalMB < 1.0 && totalMB > 0) return `${Math.round(totalMB * 1024)} KB`;
        return `${totalMB.toFixed(1)} MB`;
    }

    _getStaticPackage(productId) {
        if (this._staticPackageCache.has(productId)) {
            return this._staticPackageCache.get(productId);
        }

        const pkg = ProductDeliveryManifest.find(p => p.productId === productId);
        if (!pkg) return null;

        const assets = Array.isArray(pkg.assetIds)
            ? pkg.assetIds.map(id => this._assetMap.get(id)).filter(Boolean)
            : [];

        let totalSizeMB = 0;
        const formatsSet = new Set();

        assets.forEach(asset => {
            formatsSet.add(asset.extension.toUpperCase());
            totalSizeMB += this.parseFileSizeToMB(asset.filesize);
        });

        // Pre-freeze static structure ONCE at cache initialization time
        const staticPkg = deepFreeze({
            ...pkg,
            totalFiles: assets.length,
            totalSizeFormatted: this.formatFileSize(totalSizeMB),
            formatsSummary: Array.from(formatsSet).join(', '),
            assets: assets.map(a => ({ ...a }))
        });

        this._staticPackageCache.set(productId, staticPkg);
        return staticPkg;
    }

    getPackageByProductId(productId) {
        const staticPkg = this._getStaticPackage(productId);
        if (!staticPkg) return null;

        const hasLic = licenseService.hasLicense(staticPkg.productId) || licenseService.hasLicense(staticPkg.packageId);

        // Dynamic State Assembly
        const dynamicAssets = staticPkg.assets.map(a => {
            const history = downloadHistoryRepository.getHistoryByAssetId(a.id);
            return Object.freeze({
                ...a,
                downloadCount: history ? history.downloadCount : 0,
                lastDownloadedAt: history ? history.lastDownloadedAt : null
            });
        });

        // Fast Shallow Freeze on dynamic wrapper (nested items already pre-frozen by static cache)
        return Object.freeze({
            ...staticPkg,
            hasLicense: hasLic,
            assets: Object.freeze(dynamicAssets)
        });
    }

    getAllPackages() {
        return Object.freeze(
            ProductDeliveryManifest.map(pkg => this.getPackageByProductId(pkg.productId)).filter(Boolean)
        );
    }

    invalidate(productId) {
        this._staticPackageCache.delete(productId);
    }

    invalidateAll() {
        this._staticPackageCache.clear();
        this._buildAssetMap();
    }
}

export const DeliveryService = new DeliveryServiceEngine();
export default DeliveryService;