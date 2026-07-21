/**
 * ==========================================================
 * TopCare AI CMS Search Engine
 * ==========================================================
 *
 * File    : search.js
 * Version : 1.0.0
 *
 * Features:
 * - Async Search
 * - Debounce
 * - Cache
 * - Abort Control
 * - Result Normalize
 *
 * ==========================================================
 */

"use strict";

import CMS from "./cms.js";


class SearchEngine {

    #config = {
        delay:300,
        cache:true,
        maxCache:100
    };

    #provider = null;
    #timer = null;
    #cache = new Map();
    #controller = null;
    #loading = false;


    constructor(config = {}) {
        this.#config = {
            ...this.#config,
            ...config
        };
    }


    /**
     * Set search provider
     *
     * async(query)=>[]
     */
    setProvider(provider) {
        if (typeof provider !== "function") {
            throw new Error(
                "Search provider harus berupa function."
            );
        }

        this.#provider = provider;
        return this;
    }


    /**
     * Search with debounce
     */
    search(query) {
        return new Promise((resolve,reject)=>{

            clearTimeout(this.#timer);

            this.#timer = setTimeout(async()=>{

                try {
                    const result = await this.execute(query);
                    resolve(result);
                } catch(error) {
                    reject(error);
                }

            },this.#config.delay);

        });
    }


    /**
     * Execute search
     */
    async execute(query) {

        query = String(query ?? "").trim();

        if (!query) {
            return [];
        }


        if (
            this.#config.cache &&
            this.#cache.has(query)
        ) {

            const cached = this.#cache.get(query);

            CMS.emit(
                "search.cache",
                cached
            );

            return cached;
        }


        if (!this.#provider) {
            throw new Error(
                "Search provider belum tersedia."
            );
        }


        this.abort();

        this.#controller = new AbortController();

        this.setLoading(true);


        try {

            const response = await this.#provider(
                query,
                {
                    signal:
                        this.#controller.signal
                }
            );


            const result =
                this.normalize(response);


            this.saveCache(
                query,
                result
            );


            CMS.emit(
                "search.success",
                {
                    query,
                    result
                }
            );


            return result;


        } catch(error) {

            if (
                error.name === "AbortError"
            ) {
                return [];
            }


            CMS.emit(
                "search.error",
                error
            );


            throw error;

        } finally {

            this.setLoading(false);

        }

    }


    /**
     * Normalize result
     */
    normalize(result) {

        if (!result) {
            return [];
        }


        if (Array.isArray(result)) {
            return result;
        }


        if (
            Array.isArray(result.data)
        ) {
            return result.data;
        }


        return [result];

    }


    /**
     * Cache handler
     */
    saveCache(query,result) {

        if (!this.#config.cache) {
            return;
        }


        this.#cache.set(
            query,
            result
        );


        if (
            this.#cache.size >
            this.#config.maxCache
        ) {

            const first =
                this.#cache.keys().next().value;

            this.#cache.delete(first);

        }

    }
    
    /**
     * Highlight keyword
     */
    highlight(text, keyword) {

        if (!text || !keyword) {
            return text ?? "";
        }

        const escaped = String(keyword)
            .replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

        return String(text).replace(
            new RegExp(
                `(${escaped})`,
                "gi"
            ),
            "<mark>$1</mark>"
        );

    }


    /**
     * Set loading state
     */
    setLoading(status = false) {

        this.#loading = status;

        CMS.emit(
            "search.loading",
            status
        );

        return this;

    }


    /**
     * Current loading state
     */
    loading() {

        return this.#loading;

    }


    /**
     * Clear cache
     */
    clearCache() {

        this.#cache.clear();

        CMS.emit(
            "search.cache.clear"
        );

        return this;

    }


    /**
     * Remove specific cache
     */
    removeCache(query) {

        return this.#cache.delete(
            query
        );

    }


    /**
     * Abort running search
     */
    abort() {

        if (this.#controller) {

            this.#controller.abort();

            this.#controller = null;

        }

        return this;

    }


    /**
     * Cache information
     */
    cacheInfo() {

        return {

            size:
                this.#cache.size,

            enabled:
                this.#config.cache

        };

    }


    /**
     * Destroy instance
     */
    destroy() {

        clearTimeout(
            this.#timer
        );

        this.abort();

        this.clearCache();

        this.#provider = null;

        CMS.emit(
            "search.destroyed"
        );

        return this;

    }


    /**
     * Static factory
     */
    static create(config = {}) {

        return new SearchEngine(
            config
        );

    }

}


/**
 * Export
 */
export {
    SearchEngine
};

export default SearchEngine;