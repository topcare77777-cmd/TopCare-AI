/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD CARD TEMPLATE (MULTI-ASSET INTEGRATION)
 * Path: assets/js/features/download-center/ui/download-card.template.js
 * Version: 137.7.0 (BUILD 137.7 — ASSET PATH RECONCILIATION)
 * Status: APPROVED & LOCKED
 * SRP: Renders Download Cards with package summary counters and Product Detail Panel triggers.
 */

export class DownloadCardTemplate {
    static render(pkg, isDownloading = false) {
        let badgeClass = "tc-dl-badge-available";
        let statusLabel = "AVAILABLE";

        if (!pkg.hasLicense) {
            badgeClass = "tc-dl-badge-locked";
            statusLabel = "LOCKED";
        }

        return `
            <article class="tc-dl-card" data-package-id="${pkg.packageId}" aria-labelledby="title-${pkg.packageId}">
                <div class="tc-dl-card-media">
                    <img src="assets/images/logos/topcare-logo.svg" alt="" class="tc-dl-card-img" width="64" height="64" loading="lazy" />
                    <div class="tc-dl-badge-group">
                        <span class="tc-dl-badge ${badgeClass}">${statusLabel}</span>
                        ${pkg.isFree ? '<span class="tc-dl-badge tc-dl-badge-available">FREE</span>' : ''}
                    </div>
                </div>
                <div class="tc-dl-card-body">
                    <h2 id="title-${pkg.packageId}" class="tc-dl-card-title">${pkg.title}</h2>
                    <div class="tc-dl-meta-list">
                        <div class="tc-dl-meta-item"><span>Versi:</span> ${pkg.version}</div>
                        <div class="tc-dl-meta-item"><span>Isi Paket:</span> ${pkg.totalFiles} File</div>
                        <div class="tc-dl-meta-item"><span>Total Ukuran:</span> ${pkg.totalSizeFormatted}</div>
                        <div class="tc-dl-meta-item"><span>Lisensi:</span> ${pkg.licenseType}</div>
                    </div>
                </div>
                <div class="tc-dl-card-footer">
                    <button type="button"
                            class="tc-dl-btn tc-dl-btn-available"
                            data-action="open-detail"
                            data-product-id="${pkg.productId}"
                            aria-label="Lihat Rincian Paket ${pkg.title}">
                        📦 lihat Rincian & Unduh (${pkg.totalFiles} File)
                    </button>
                </div>
            </article>
        `;
    }
}