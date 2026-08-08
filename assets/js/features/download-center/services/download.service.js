/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD SERVICE
 * Path: assets/js/features/download-center/services/download.service.js
 * Version: 135.0.0 (BUILD 135.0 — DIGITAL PRODUCT DELIVERY CENTER)
 * Status: APPROVED & LOCKED
 * SRP: Locates asset manifests, validates availability and license permissions.
 */

import { DownloadManifest } from '../config/download-manifest.js';
import { licenseService } from '../domain/license.service.js';
import { downloadHistoryRepository } from '../domain/download-history.repository.js';

export class DownloadService {
    /**
     * Retrieves all asset manifests enriched with status and download history.
     * @returns {Array<Object>}
     */
    getEnrichedCatalog() {
        return DownloadManifest.map(asset => {
            const hasLic = licenseService.hasLicense(asset);
            const history = downloadHistoryRepository.getHistoryByAssetId(asset.id);

            let status = "AVAILABLE";
            if (!hasLic) {
                status = "PURCHASE REQUIRED";
            } else if (history && history.downloadCount > 0) {
                status = "DOWNLOADED";
            }

            return {
                ...asset,
                status,
                hasLicense: hasLic,
                downloadCount: history ? history.downloadCount : 0,
                lastDownloadedAt: history ? history.lastDownloadedAt : null
            };
        });
    }

    /**
     * Validates and generates download payload object for execution.
     * @param {string} assetId
     * @returns {Object} Result payload
     */
    prepareDownload(assetId) {
        const asset = DownloadManifest.find(item => item.id === assetId);

        if (!asset) {
            return { success: false, error: "Asset manifest tidak ditemukan." };
        }

        const isAuthorized = licenseService.hasLicense(asset);
        if (!isAuthorized) {
            return { success: false, error: "Lisensi diperlukan untuk mengunduh berkas ini." };
        }

        return {
            success: true,
            asset,
            downloadUrl: asset.downloadRoute,
            filename: asset.filename
        };
    }
}

export const downloadService = new DownloadService();
export default downloadService;
