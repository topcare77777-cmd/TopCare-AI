/**
 * file: assets/js/ui/plugin.marketplace.portal.component.js
 */

import { Core } from '../core/index.js';
import { PluginMarketplaceClient, MARKETPLACE_CATEGORIES, TRUST_LEVELS } from '../plugins/index.js';

export class TopCareMarketplacePortalComponent {
    constructor(containerElement) {
        this.container = containerElement;
        this.activeCategory = null;
        this.activeLicense = null;
        this.searchQuery = '';
        Object.seal(this);
    }

    async render() {
        this.container.innerHTML = `
            <div class="tc-marketplace-portal">
                <div class="tc-portal-header">
                    <h2>🏥 TopCare AI Plugin Marketplace</h2>
                    <input type="text" class="tc-search-input" placeholder="Search plugins, AI decision models, EHR connectors..." />
                </div>
                <div class="tc-filter-bar">
                    <button class="tc-filter-btn active" data-category="ALL">All Categories</button>
                    <button class="tc-filter-btn" data-category="${MARKETPLACE_CATEGORIES.CLINICAL_ANALYTICS}">Clinical Analytics</button>
                    <button class="tc-filter-btn" data-category="${MARKETPLACE_CATEGORIES.AI_ASSISTANT}">AI Decision Support</button>
                    <button class="tc-filter-btn" data-category="${MARKETPLACE_CATEGORIES.SECURITY_AUDIT}">Security & Compliance</button>
                </div>
                <div class="tc-catalog-grid" id="tc-catalog-grid">
                    <div class="tc-spinner">Loading Catalog...</div>
                </div>
            </div>
        `;
        this.bindEvents();
        await this.loadCatalog();
    }

    async loadCatalog() {
        const grid = this.container.querySelector('#tc-catalog-grid');
        try {
            const results = await PluginMarketplaceClient.searchPlugins({
                query: this.searchQuery,
                category: this.activeCategory !== 'ALL' ? this.activeCategory : null
            });
            grid.innerHTML = results.map(item => this.renderCard(item)).join('');
        } catch (err) {
            grid.innerHTML = `<div class="tc-error">Failed to load marketplace catalog: ${err.message}</div>`;
        }
    }

    renderCard(item) {
        const trustBadgeClass = item.trustLevel === TRUST_LEVELS.OFFICIAL ? 'badge-official' : 'badge-community';
        return `
            <div class="tc-card" data-id="${item.id}">
                <div class="tc-card-header">
                    <span class="tc-card-title">${item.name}</span>
                    <span class="tc-badge ${trustBadgeClass}">${item.trustLevel || 'community'}</span>
                </div>
                <p class="tc-card-desc">${item.description}</p>
                <div class="tc-card-meta">
                    <span>v${item.version}</span> | <span>★ ${item.rating || '5.0'}</span> | <span>License: ${item.license || 'MIT'}</span>
                </div>
                <button class="tc-install-btn" onclick="TopCareMarketplacePortalComponent.install('${item.id}')">
                    Secure Install
                </button>
            </div>
        `;
    }

    static async install(pluginId) {
        Core.Logger.info(`[Portal UI] User initiated secure installation for: ${pluginId}`);
        await PluginMarketplaceClient.downloadAndInstall(pluginId);
        alert(`Successfully installed extension: ${pluginId}`);
    }

    bindEvents() {
        const input = this.container.querySelector('.tc-search-input');
        input.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.loadCatalog();
        });

        const filterBtns = this.container.querySelectorAll('.tc-filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.activeCategory = e.target.getAttribute('data-category');
                this.loadCatalog();
            });
        });
    }
}