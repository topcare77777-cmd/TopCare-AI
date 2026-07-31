/**
 * file: assets/js/plugins/plugin.marketplace.indexer.js
 */

import { Core } from '../core/index.js';
import { MarketplaceRankingEngine } from './plugin.marketplace.ranking.engine.js';
import { MARKETPLACE_CATEGORIES } from './plugin.marketplace.categories.js';

export class MarketplaceSearchEngine {
    constructor() {
        this._index = new Map(); // id -> indexed item
        this._categoryIndex = new Map(); // category -> Set of ids
        this._tagIndex = new Map(); // tag -> Set of ids
        Object.seal(this);
    }

    /**
     * Membangun indeks pencarian cepat dari katalog mentah.
     * @param {Array<Object>} catalog 
     */
    buildIndex(catalog = []) {
        Core.Logger.info(`[Marketplace Indexer] Indexing ${catalog.length} marketplace items...`);
        this._index.clear();
        this._categoryIndex.clear();
        this._tagIndex.clear();

        for (const item of catalog) {
            if (!item.id) continue;

            const indexedItem = {
                ...item,
                rankScore: MarketplaceRankingEngine.calculateScore(item)
            };

            this._index.set(item.id, indexedItem);

            // Index by Category
            const category = item.category || MARKETPLACE_CATEGORIES.UI_EXTENSION;
            if (!this._categoryIndex.has(category)) {
                this._categoryIndex.set(category, new Set());
            }
            this._categoryIndex.get(category).add(item.id);

            // Index by Tags
            const tags = Array.isArray(item.tags) ? item.tags : [];
            for (const tag of tags) {
                const cleanTag = tag.toLowerCase().trim();
                if (!this._tagIndex.has(cleanTag)) {
                    this._tagIndex.set(cleanTag, new Set());
                }
                this._tagIndex.get(cleanTag).add(item.id);
            }
        }

        Core.Logger.info(`[Marketplace Indexer] Full-text search index built successfully.`);
    }

    /**
     * Mencari plugin berdasarkan kueri teks, filter kategori, dan kriteria urutan.
     * @param {Object} queryOptions 
     * @returns {Array<Object>} Search Results
     */
    search(queryOptions = {}) {
        const { query = '', category = null, tag = null, trustLevel = null, limit = 20 } = queryOptions;
        let candidateIds = new Set(this._index.keys());

        // Filter by Category if provided
        if (category && this._categoryIndex.has(category)) {
            const categoryMatches = this._categoryIndex.get(category);
            candidateIds = new Set([...candidateIds].filter(id => categoryMatches.has(id)));
        }

        // Filter by Tag if provided
        if (tag && this._tagIndex.has(tag.toLowerCase())) {
            const tagMatches = this._tagIndex.get(tag.toLowerCase());
            candidateIds = new Set([...candidateIds].filter(id => tagMatches.has(id)));
        }

        const results = [];
        const cleanQuery = query.toLowerCase().trim();

        for (const id of candidateIds) {
            const item = this._index.get(id);

            // Trust level filter
            if (trustLevel && item.trustLevel !== trustLevel) continue;

            // Full-text match against ID, name, description, and publisher
            if (cleanQuery) {
                const matchText = `${item.id} ${item.name} ${item.description || ''} ${item.publisher || ''}`.toLowerCase();
                if (!matchText.includes(cleanQuery)) {
                    continue;
                }
            }

            results.push(item);
        }

        // Rank search results using RankingEngine
        results.sort((a, b) => b.rankScore - a.rankScore);

        return results.slice(0, limit);
    }
}

export const GlobalMarketplaceSearchEngine = Object.freeze(new MarketplaceSearchEngine());