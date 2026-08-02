/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE CATALOG UI RENDERER
 * Path: assets/js/ui/marketplace/marketplace.ui.renderer.js
 * Status: ACTIVE (SPRINT G - LOCKED GOLDEN BASELINE)
 * Role: Interactive Extension Marketplace Catalog UI
 */

export const MarketplaceUIRenderer = Object.freeze({
    /**
     * Renders Marketplace UI Catalog into target container element.
     */
    renderMarketplace(containerEl, availableManifestsList = [], installedStatesMap = {}) {
        if (!containerEl) return;

        let itemsHTML = '';
        for (const manifest of availableManifestsList) {
            const state = installedStatesMap[manifest.id] || 'NOT_INSTALLED';
            const isInstalled = state === 'ACTIVE';

            itemsHTML += `
                <div class="tc-plugin-card" style="background:#1E293B; border:1px solid #334155; padding:16px; border-radius:8px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4 style="margin:0; color:#3B82F6;">${manifest.displayName} <span style="font-size:11px; color:#64748B;">v${manifest.version}</span></h4>
                        <span style="font-size:11px; padding:2px 8px; border-radius:4px; background:${isInstalled ? '#10B981' : '#334155'}; color:#FFF;">${state}</span>
                    </div>
                    <p style="font-size:12px; color:#94A3B8; margin:8px 0;">${manifest.description}</p>
                    <div style="font-size:11px; color:#64748B; margin-bottom:12px;">
                        <strong>Requested Permissions:</strong> ${manifest.permissions.join(', ') || 'None'}
                    </div>
                    <button class="tc-plugin-btn" data-plugin-id="${manifest.id}" style="background:${isInstalled ? '#EF4444' : '#3B82F6'}; color:#FFF; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">
                        ${isInstalled ? 'Deactivate Plugin' : 'Install & Activate'}
                    </button>
                </div>
            `;
        }

        containerEl.innerHTML = `
            <div class="topcare-marketplace-container" style="background:#0F172A; color:#F8FAFC; padding:20px; font-family:sans-serif; min-height:100vh;">
                <header style="border-bottom:1px solid #334155; padding-bottom:12px; margin-bottom:20px;">
                    <h2 style="margin:0; color:#F8FAFC;">TopCare AI Extension Marketplace</h2>
                    <p style="margin:4px 0 0 0; font-size:12px; color:#94A3B8;">Discover and install sandboxed capabilities, personas, and widgets.</p>
                </header>
                <main class="tc-marketplace-list">${itemsHTML}</main>
            </div>
        `;
    }
});

export default MarketplaceUIRenderer;
