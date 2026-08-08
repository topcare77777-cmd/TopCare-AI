/**
 * TOPCARE AI PLATFORM V2 — PRODUCT DETAIL PANEL TEMPLATE
 * Path: assets/js/features/download-center/ui/product-detail-panel.template.js
 * Version: 135.6.0 (BUILD 135.6 — ENTERPRISE RUNTIME FINALIZATION)
 * Status: APPROVED & LOCKED
 * SRP: Strictly renders modal HTML payload.
 */

export class ProductDetailPanelTemplate {
    static render(packageData) {
        if (!packageData) return '';

        const contentsListHtml = packageData.contentsSummary.map(item => `
            <li class="tc-dl-detail-list-item">✅ ${item}</li>
        `).join('');

        const bonusListHtml = packageData.bonuses.length > 0
            ? packageData.bonuses.map(b => `
                <div class="tc-dl-bonus-pill">🎁 <strong>${b.name}</strong> (${b.filesize} - ${b.format})</div>
            `).join('')
            : '<span class="tc-dl-text-muted">Tidak ada bonus tambahan dalam paket ini.</span>';

        let filesSectionHtml = '';
        if (packageData.hasLicense) {
            const filesList = packageData.assets.map(asset => `
                <div class="tc-dl-file-row">
                    <div class="tc-dl-file-info">
                        <span class="tc-dl-file-icon">📄</span>
                        <div>
                            <div class="tc-dl-file-name">${asset.title} ${asset.isBonus ? '<span class="tc-dl-bonus-badge">BONUS</span>' : ''}</div>
                            <div class="tc-dl-file-sub">${asset.filename} • ${asset.filesize}</div>
                        </div>
                    </div>
                    <button type="button"
                            class="tc-dl-btn tc-dl-btn-sm ${asset.downloadCount > 0 ? 'tc-dl-btn-downloaded' : 'tc-dl-btn-available'}"
                            data-action="download-single"
                            data-asset-id="${asset.id}"
                            aria-label="Unduh ${asset.title}">
                        Unduh (${asset.downloadCount}x)
                    </button>
                </div>
            `).join('');

            filesSectionHtml = `
                <div class="tc-dl-detail-section">
                    <h4 class="tc-dl-detail-subtitle">📁 Isi Berkas Dalam Paket (${packageData.totalFiles} File)</h4>
                    <div class="tc-dl-files-container">${filesList}</div>
                </div>
            `;
        } else {
            filesSectionHtml = `
                <div class="tc-dl-detail-section tc-dl-locked-box">
                    <p>🔒 <strong>Lisensi Belum Aktif:</strong> Beli produk ini di Marketplace untuk membuka akses unduhan ${packageData.totalFiles} berkas.</p>
                    <a href="#/marketplace" class="tc-dl-btn tc-dl-btn-available" style="display:inline-block; margin-top:8px; text-decoration:none;">Beli di Marketplace</a>
                </div>
            `;
        }

        return `
            <div class="tc-dl-modal-overlay" id="tc-dl-detail-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div class="tc-dl-modal-content">
                    <header class="tc-dl-modal-header">
                        <div>
                            <span class="tc-dl-badge tc-dl-badge-available">${packageData.licenseType}</span>
                            <h3 id="modal-title" class="tc-dl-modal-title">${packageData.title}</h3>
                        </div>
                        <button type="button" class="tc-dl-modal-close" data-action="close-modal" aria-label="Tutup Detail Panel">&times;</button>
                    </header>

                    <div class="tc-dl-modal-body">
                        <div class="tc-dl-meta-grid">
                            <div class="tc-dl-meta-card"><span>Versi Paket:</span> <strong>${packageData.version}</strong></div>
                            <div class="tc-dl-meta-card"><span>Total File:</span> <strong>${packageData.totalFiles} File</strong></div>
                            <div class="tc-dl-meta-card"><span>Ukuran Paket:</span> <strong>${packageData.totalSizeFormatted}</strong></div>
                            <div class="tc-dl-meta-card"><span>Format File:</span> <strong>${packageData.formatsSummary}</strong></div>
                            <div class="tc-dl-meta-card"><span>Kebijakan Update:</span> <strong>${packageData.updatePolicy}</strong></div>
                        </div>

                        <div class="tc-dl-detail-section">
                            <h4 class="tc-dl-detail-subtitle">📦 Rincian Isi Paket</h4>
                            <ul class="tc-dl-detail-list">${contentsListHtml}</ul>
                        </div>

                        <div class="tc-dl-detail-section">
                            <h4 class="tc-dl-detail-subtitle">🎁 Bonus Eksklusif</h4>
                            <div class="tc-dl-bonus-container">${bonusListHtml}</div>
                        </div>

                        ${filesSectionHtml}
                    </div>
                </div>
            </div>
        `;
    }
}
