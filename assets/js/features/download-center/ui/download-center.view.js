/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD CENTER VIEW
 * Path: assets/js/features/download-center/ui/download-center.view.js
 * Version: 135.7.0 (BUILD 135.7 — GOLDEN BASELINE FINALIZATION)
 * Status: APPROVED & LOCKED
 * SRP: View orchestrator with immutable render snapshots and pure non-destructive DOM patching.
 */

import { DeliveryService } from '../services/delivery.service.js';
import { downloadManager, DOWNLOAD_EVENTS } from '../services/download.manager.js';
import { DownloadCardTemplate } from './download-card.template.js';
import { ProductDetailPanelTemplate } from './product-detail-panel.template.js';
import { BodyLockManager } from '../utils/body-lock.manager.js';

export class DownloadCenterView {
    constructor(dependencies = {}) {
        this._logger = dependencies.logger || { error: console.error, info: console.info };

        this._container = null;
        this._mainWrapper = null;
        this._searchInput = null;
        this._modalHost = null;
        this._gridContainer = null;

        this._activeFilter = "ALL";
        this._searchQuery = "";
        this._activeModalProductId = null;
        this._previousActiveElement = null;
        this._modalButtonMap = new Map(); // O(1) Cache map

        this._isDestroyed = true;
        this._renderFrameId = null;
        this._renderVersion = 0;
        this._isRedirectingFocus = false;

        this._onKeyDown = this._onKeyDown.bind(this);
        this._onFocusIn = this._onFocusIn.bind(this);
        this._onContainerClick = this._onContainerClick.bind(this);
        this._onSearchInput = this._onSearchInput.bind(this);
        this._onDownloadStarted = this._onDownloadStarted.bind(this);
        this._onDownloadCompleted = this._onDownloadCompleted.bind(this);
    }

    mount(container) {
        if (!container) return;
        if (this._container === container && !this._isDestroyed) return;
        if (this._container) this.destroy();

        this._container = container;
        this._isDestroyed = false;
        this._renderVersion = 0;

        this._renderBaseLayout();

        this._mainWrapper = this._container.querySelector('#tc-dl-main-wrapper');
        this._searchInput = this._container.querySelector('#tc-dl-search');
        this._modalHost = this._container.querySelector('#tc-dl-modal-host');
        this._gridContainer = this._container.querySelector('#tc-dl-grid');

        this._bindEvents();
        this.renderCatalog();

        downloadManager.on(DOWNLOAD_EVENTS.STARTED, this._onDownloadStarted);
        downloadManager.on(DOWNLOAD_EVENTS.COMPLETED, this._onDownloadCompleted);
        document.addEventListener('keydown', this._onKeyDown);
        document.addEventListener('focusin', this._onFocusIn);
    }

    _renderBaseLayout() {
        this._container.innerHTML = `
            <div id="tc-dl-main-wrapper" class="tc-dl-main-wrapper">
                <section class="tc-dl-section" aria-label="Digital Product Delivery Center">
                    <header class="tc-dl-header">
                        <h1>My Digital Deliveries</h1>
                        <p>Akses dan unduh seluruh paket produk digital beserta bonus eksklusif Anda.</p>
                    </header>
                    <div class="tc-dl-toolbar">
                        <div class="tc-dl-search-box">
                            <span class="tc-dl-search-icon" aria-hidden="true">🔍</span>
                            <input type="search" id="tc-dl-search" class="tc-dl-search-input" placeholder="Cari berdasarkan judul, kategori, atau nama file..." aria-label="Pencarian" />
                        </div>
                        <div class="tc-dl-filter-bar" role="tablist" aria-label="Filter paket">
                            <button type="button" class="tc-dl-filter-btn active" data-filter="ALL" role="tab" aria-selected="true">Semua Paket</button>
                            <button type="button" class="tc-dl-filter-btn" data-filter="FREE" role="tab" aria-selected="false">Gratis</button>
                            <button type="button" class="tc-dl-filter-btn" data-filter="PURCHASED" role="tab" aria-selected="false">Telah Dibeli</button>
                        </div>
                    </div>
                    <div id="tc-dl-grid" class="tc-dl-grid" aria-live="polite"></div>
                </section>
            </div>
            <div id="tc-dl-modal-host"></div>
        `;
    }

    renderCatalog() {
        if (this._isDestroyed) return;

        this._renderVersion++;

        // Fully immutable payload ensures deterministic state upon frame execution
        const snapshot = Object.freeze({
            version: this._renderVersion,
            query: this._searchQuery,
            filter: this._activeFilter,
            packages: DeliveryService.getAllPackages()
        });

        if (this._renderFrameId) cancelAnimationFrame(this._renderFrameId);

        this._renderFrameId = requestAnimationFrame(() => {
            if (this._isDestroyed || snapshot.version !== this._renderVersion || !this._gridContainer) return;
            this._executeRenderCatalog(snapshot);
        });
    }

    _executeRenderCatalog(snapshot) {
        let packages = snapshot.packages;

        if (snapshot.query.trim() !== '') {
            const q = snapshot.query.toLowerCase();
            packages = packages.filter(p =>
                p.title.toLowerCase().includes(q) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                (p.category && p.category.toLowerCase().includes(q)) ||
                p.assets.some(a => a.filename.toLowerCase().includes(q))
            );
        }

        if (snapshot.filter === "FREE") {
            packages = packages.filter(p => p.isFree);
        } else if (snapshot.filter === "PURCHASED") {
            packages = packages.filter(p => p.hasLicense && !p.isFree);
        }

        if (packages.length === 0) {
            this._gridContainer.innerHTML = `
                <div class="tc-dl-empty-state">
                    <span class="tc-dl-empty-icon">📁</span>
                    <p>Tidak ada data yang ditemukan.</p>
                    <button type="button" class="tc-dl-btn tc-dl-btn-available" data-action="reset-filter" style="width:auto; margin: 1rem auto 0 auto;">Reset Filter & Pencarian</button>
                </div>
            `;
            return;
        }

        this._gridContainer.innerHTML = packages.map(pkg => DownloadCardTemplate.render(pkg)).join('');
    }

    openDetailPanel(productId, saveFocus = true) {
        if (this._isDestroyed || !this._modalHost) return;
        const packageData = DeliveryService.getPackageByProductId(productId);
        if (!packageData) return;

        if (saveFocus) this._previousActiveElement = document.activeElement;

        this._activeModalProductId = productId;
        this._modalHost.innerHTML = ProductDetailPanelTemplate.render(packageData);

        // Pre-build O(1) Update Map
        this._modalButtonMap.clear();
        this._modalHost.querySelectorAll('[data-asset-id]').forEach(btn => {
            this._modalButtonMap.set(btn.getAttribute('data-asset-id'), btn);
        });

        BodyLockManager.acquire();

        if (this._mainWrapper) {
            if ('inert' in HTMLElement.prototype) {
                this._mainWrapper.inert = true;
            } else {
                this._mainWrapper.setAttribute('aria-hidden', 'true');
                this._mainWrapper.style.pointerEvents = 'none';
            }
        }

        const modalContent = this._modalHost.querySelector('.tc-dl-modal-content');
        if (modalContent) {
            modalContent.tabIndex = -1;
            modalContent.focus();
        }
    }

    closeDetailPanel() {
        if (!this._activeModalProductId || !this._modalHost) return;

        this._modalHost.innerHTML = '';
        this._activeModalProductId = null;
        this._modalButtonMap.clear();

        BodyLockManager.release();

        if (this._mainWrapper) {
            if ('inert' in HTMLElement.prototype) {
                this._mainWrapper.inert = false;
            } else {
                this._mainWrapper.removeAttribute('aria-hidden');
                this._mainWrapper.style.pointerEvents = '';
            }
        }

        if (this._previousActiveElement && document.contains(this._previousActiveElement)) {
            this._previousActiveElement.focus();
        }
        this._previousActiveElement = null;
    }

    _onFocusIn(e) {
        if (this._isDestroyed || !this._activeModalProductId || !this._modalHost || this._isRedirectingFocus) return;
        const modalContent = this._modalHost.querySelector('.tc-dl-modal-content');
        if (modalContent && !modalContent.contains(e.target)) {
            const focusable = modalContent.querySelector('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable && document.activeElement !== focusable) {
                this._isRedirectingFocus = true;
                focusable.focus();
                queueMicrotask(() => { this._isRedirectingFocus = false; });
            }
        }
    }

    _onKeyDown(e) {
        if (this._isDestroyed || !this._activeModalProductId || !this._modalHost) return;

        if (e.key === 'Escape') {
            this.closeDetailPanel();
            return;
        }

        if (e.key === 'Tab') {
            const modalContent = this._modalHost.querySelector('.tc-dl-modal-content');
            if (!modalContent) return;

            const focusableEls = modalContent.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableEls.length === 0) return;

            const firstElement = focusableEls[0];
            const lastElement = focusableEls[focusableEls.length - 1];

            if (!modalContent.contains(document.activeElement)) {
                e.preventDefault();
                firstElement.focus();
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    _onSearchInput(e) {
        if (this._isDestroyed) return;
        this._searchQuery = e.target.value;
        this.renderCatalog();
    }

    async _onContainerClick(e) {
        if (this._isDestroyed) return;

        const resetBtn = e.target.closest('[data-action="reset-filter"]');
        if (resetBtn) {
            this._searchQuery = '';
            this._activeFilter = "ALL";
            if (this._searchInput) this._searchInput.value = '';

            const filterBar = this._container.querySelector('.tc-dl-filter-bar');
            if (filterBar) {
                filterBar.querySelectorAll('.tc-dl-filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                const allBtn = filterBar.querySelector('[data-filter="ALL"]');
                if (allBtn) {
                    allBtn.classList.add('active');
                    allBtn.setAttribute('aria-selected', 'true');
                }
            }
            this.renderCatalog();
            return;
        }

        const openDetailBtn = e.target.closest('[data-action="open-detail"]');
        if (openDetailBtn) {
            const productId = openDetailBtn.getAttribute('data-product-id');
            this.openDetailPanel(productId, true);
            return;
        }

        const closeModalBtn = e.target.closest('[data-action="close-modal"]');
        if (closeModalBtn || e.target.classList.contains('tc-dl-modal-overlay')) {
            this.closeDetailPanel();
            return;
        }

        const filterBtn = e.target.closest('[data-filter]');
        if (filterBtn) {
            const filterBar = this._container.querySelector('.tc-dl-filter-bar');
            if (filterBar) {
                filterBar.querySelectorAll('.tc-dl-filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                filterBtn.classList.add('active');
                filterBtn.setAttribute('aria-selected', 'true');
                this._activeFilter = filterBtn.getAttribute('data-filter');
                this.renderCatalog();
            }
            return;
        }

        const downloadSingleBtn = e.target.closest('[data-action="download-single"]');
        if (downloadSingleBtn) {
            const assetId = downloadSingleBtn.getAttribute('data-asset-id');
            try {
                downloadSingleBtn.classList.add('tc-dl-btn-downloading');
                downloadSingleBtn.innerHTML = '<span class="tc-dl-spinner"></span> Mengunduh...';
                await downloadManager.startDownload(assetId);
            } catch (error) {
                if (this._logger) this._logger.error(`[DownloadCenter] Fetch failed for ${assetId}:`, error);
            }
        }
    }

    _bindEvents() {
        if (!this._container) return;
        this._container.addEventListener('click', this._onContainerClick);
        if (this._searchInput) {
            this._searchInput.addEventListener('input', this._onSearchInput);
        }
    }

    _onDownloadStarted() {
        // Safe to ignore re-renders on start. Visual feedback is handled via CSS / direct DOM patch.
    }

    _onDownloadCompleted(detail) {
        if (this._isDestroyed || !detail || !detail.asset) return;

        // Pure Non-Destructive O(1) DOM Patching
        if (this._activeModalProductId && this._modalHost) {
            const btn = this._modalButtonMap.get(detail.asset.id);
            if (btn && detail.newDownloadCount) {
                btn.textContent = `Unduh (${detail.newDownloadCount}x)`;
                btn.className = `tc-dl-btn tc-dl-btn-sm ${detail.newDownloadCount > 0 ? 'tc-dl-btn-downloaded' : 'tc-dl-btn-available'}`;
            }
        }

        // Package card in the grid remains structurally identical after an internal asset download.
        // No grid re-render triggered. Observers and state preserved entirely.
    }

    destroy() {
        if (this._isDestroyed) return;

        this.closeDetailPanel();
        this._isDestroyed = true;

        if (this._renderFrameId) {
            cancelAnimationFrame(this._renderFrameId);
            this._renderFrameId = null;
        }

        document.removeEventListener('keydown', this._onKeyDown);
        document.removeEventListener('focusin', this._onFocusIn);
        downloadManager.off(DOWNLOAD_EVENTS.STARTED, this._onDownloadStarted);
        downloadManager.off(DOWNLOAD_EVENTS.COMPLETED, this._onDownloadCompleted);

        if (this._container) {
            this._container.removeEventListener('click', this._onContainerClick);
            this._container.innerHTML = '';
        }

        if (this._searchInput) {
            this._searchInput.removeEventListener('input', this._onSearchInput);
        }

        this._container = null;
        this._mainWrapper = null;
        this._searchInput = null;
        this._modalHost = null;
        this._gridContainer = null;
        this._previousActiveElement = null;
        this._modalButtonMap.clear();
    }
}