/**
 * TopCare AI Platform V2.0.0
 * Search Engine
 * Path: assets/js/core/search.engine.js
 */
import Logger from './logger.js';

const SearchEngine = {
    index: [],

    buildIndex(dataArray) {
        this.index = dataArray;
        Logger.info("[SearchEngine] Index built successfully.");
    },

    search(query) {
        if (!query) return [];
        const q = query.toLowerCase();
        return this.index.filter(item => JSON.stringify(item).toLowerCase().includes(q));
    }
};

export default SearchEngine;