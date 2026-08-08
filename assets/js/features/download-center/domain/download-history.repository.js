/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD HISTORY REPOSITORY
 * Path: assets/js/features/download-center/domain/download-history.repository.js
 * Version: 135.0.0 (BUILD 135.0 — DIGITAL PRODUCT DELIVERY CENTER)
 * Status: APPROVED & LOCKED
 * SRP: Manages user download history persistence using LocalStorage with fallback safety.
 */

export class DownloadHistoryRepository {
    constructor() {
        this.STORAGE_KEY = "tc_v2_download_history";
        Object.seal(this);
    }

    /**
     * Retrieves all recorded download history items.
     * @returns {Array<Object>}
     */
    getAllHistory() {
        try {
            const rawData = localStorage.getItem(this.STORAGE_KEY);
            return rawData ? JSON.parse(rawData) : [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Gets history record for a specific asset ID.
     * @param {string} assetId
     * @returns {Object|null}
     */
    getHistoryByAssetId(assetId) {
        const history = this.getAllHistory();
        return history.find(item => item.assetId === assetId) || null;
    }

    /**
     * Records or updates a download event.
     * @param {Object} assetManifest
     */
    recordDownload(assetManifest) {
        if (!assetManifest || !assetManifest.id) return;

        const history = this.getAllHistory();
        const existingIndex = history.findIndex(item => item.assetId === assetManifest.id);

        const nowIso = new Date().toISOString();

        if (existingIndex >= 0) {
            history[existingIndex].downloadCount = (history[existingIndex].downloadCount || 0) + 1;
            history[existingIndex].lastDownloadedAt = nowIso;
            history[existingIndex].lastVersion = assetManifest.version;
        } else {
            history.push({
                assetId: assetManifest.id,
                productId: assetManifest.productId,
                downloadCount: 1,
                firstDownloadedAt: nowIso,
                lastDownloadedAt: nowIso,
                lastVersion: assetManifest.version
            });
        }

        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
        } catch (e) {
            // LocalStorage quota or permission disabled fallback
        }
    }
}

export const downloadHistoryRepository = new DownloadHistoryRepository();
export default downloadHistoryRepository;
