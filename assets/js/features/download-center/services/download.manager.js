/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD MANAGER
 * Path: assets/js/features/download-center/services/download.manager.js
 * Version: 135.6.0 (BUILD 135.6 — ENTERPRISE RUNTIME FINALIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Robust async download execution emitting fully self-contained payloads (CQRS safe).
 */

import { downloadService } from './download.service.js';
import { downloadHistoryRepository } from '../domain/download-history.repository.js';

export const DOWNLOAD_EVENTS = Object.freeze({
    STARTED: 'download:start',
    COMPLETED: 'download:complete',
    FAILED: 'download:error',
    CANCELLED: 'download:cancelled'
});

export class DownloadManager {
    constructor() {
        this._activeDownloads = new Set();
        this._abortControllers = new Map();
        this._listeners = new Map();
        Object.seal(this);
    }

    on(eventName, callback) {
        if (!this._listeners.has(eventName)) this._listeners.set(eventName, new Set());
        this._listeners.get(eventName).add(callback);
    }

    off(eventName, callback) {
        if (this._listeners.has(eventName)) {
            this._listeners.get(eventName).delete(callback);
        }
    }

    _dispatchEvent(eventName, detail) {
        if (this._listeners.has(eventName)) {
            const snapshot = [...this._listeners.get(eventName)];
            snapshot.forEach(cb => {
                try {
                    cb(detail);
                } catch (e) {
                    console.error(`[DownloadManager] Event listener exception for ${eventName}:`, e);
                }
            });
        }
    }

    async startDownload(assetId) {
        if (this._activeDownloads.has(assetId)) {
            return { success: false, reason: "Proses unduhan sedang berjalan." };
        }

        const preparation = downloadService.prepareDownload(assetId);
        if (!preparation.success) {
            this._dispatchEvent(DOWNLOAD_EVENTS.FAILED, { assetId, error: preparation.error });
            return preparation;
        }

        this._activeDownloads.add(assetId);
        const controller = new AbortController();
        this._abortControllers.set(assetId, controller);

        this._dispatchEvent(DOWNLOAD_EVENTS.STARTED, { assetId, asset: preparation.asset });

        try {
            await new Promise((resolve, reject) => {
                const timeoutId = setTimeout(resolve, 800);
                controller.signal.addEventListener('abort', () => {
                    clearTimeout(timeoutId);
                    reject(new DOMException('Persiapan unduhan dibatalkan.', 'AbortError'));
                });
            });

            const link = document.createElement('a');
            link.href = preparation.downloadUrl;
            link.download = preparation.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Mutate data layer
            downloadHistoryRepository.recordDownload(preparation.asset);

            // Read fresh data strictly for event payload to avoid View querying Data Layer again
            const freshHistory = downloadHistoryRepository.getHistoryByAssetId(assetId);
            const newCount = freshHistory ? freshHistory.downloadCount : 1;

            this._dispatchEvent(DOWNLOAD_EVENTS.COMPLETED, {
                assetId,
                asset: preparation.asset,
                newDownloadCount: newCount
            });
            return { success: true };

        } catch (err) {
            if (err.name === 'AbortError') {
                this._dispatchEvent(DOWNLOAD_EVENTS.CANCELLED, { assetId, reason: err.message });
                return { success: false, cancelled: true };
            }

            this._dispatchEvent(DOWNLOAD_EVENTS.FAILED, { assetId, error: err.message });
            return { success: false, error: err.message };

        } finally {
            this._activeDownloads.delete(assetId);
            this._abortControllers.delete(assetId);
        }
    }

    cancelDownload(assetId) {
        if (this._abortControllers.has(assetId)) {
            this._abortControllers.get(assetId).abort();
        }
    }

    isDownloading(assetId) {
        return this._activeDownloads.has(assetId);
    }
}

export const downloadManager = new DownloadManager();
export default downloadManager;