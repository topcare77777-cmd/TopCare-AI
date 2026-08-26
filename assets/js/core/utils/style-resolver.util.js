/**
 * TOPCARE AI PLATFORM V3 — DYNAMIC STYLE RESOLVER UTILITY
 * Path: assets/js/core/utils/style-resolver.util.js
 * Status: V3-FIX-05.1 REGISTRY LIFECYCLE MICRO-CORRECTION
 */

export class StyleResolverUtil {
    // Map untuk melacak path ke ID elemen: Map<normalizedPath, elementId>
    static #loadedStylesheets = new Map();

    /**
     * Memuat file CSS secara dinamis dan aman ke dalam <head>
     * @param {string} cssRelativePath - Path file CSS
     * @param {string} styleId - ID unik elemen <link>
     * @returns {Promise<boolean>}
     */
    static async loadStylesheet(cssRelativePath, styleId = null) {
        if (!cssRelativePath) return false;

        const normalizedPath = this.resolvePath(cssRelativePath);
        const uniqueId = styleId || `tcr-style-${normalizedPath.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

        // Cek apakah elemen <link> masih ada di DOM
        const existingElement = document.getElementById(uniqueId);

        if (this.#loadedStylesheets.has(normalizedPath) && existingElement) {
            return true;
        }

        // Jika registry tersisa tapi DOM sudah terhapus, bersihkan registry lama
        if (this.#loadedStylesheets.has(normalizedPath) && !existingElement) {
            this.#loadedStylesheets.delete(normalizedPath);
        }

        return new Promise((resolve) => {
            const link = document.createElement('link');
            link.id = uniqueId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = normalizedPath;

            link.onload = () => {
                this.#loadedStylesheets.set(normalizedPath, uniqueId);
                resolve(true);
            };

            link.onerror = (err) => {
                console.warn(`[StyleResolver] Failed to load stylesheet at: ${normalizedPath}`, err);
                this.#loadedStylesheets.delete(normalizedPath);
                resolve(false);
            };

            document.head.appendChild(link);
        });
    }

    /**
     * Normalisasi path CSS menjadi root-relative path yang aman untuk hosting statis Netlify
     * @param {string} rawPath 
     * @returns {string} Root-relative safe URL
     */
    static resolvePath(rawPath) {
        if (!rawPath) return '';
        let clean = rawPath.trim();

        if (clean.startsWith('http://') || clean.startsWith('https://')) {
            return clean;
        }

        clean = clean.replace(/^\.?\/+/, '');

        if (!clean.startsWith('assets/')) {
            clean = clean.startsWith('css/') ? `assets/${clean}` : `assets/css/${clean}`;
        }

        return `/${clean}`;
    }

    /**
     * Menghapus stylesheet dinamis dan menyinkronkan registry saat lifecycle destroy
     * @param {string} styleId 
     */
    static removeStylesheet(styleId) {
        if (!styleId) return;

        // Cari berdasarkan element ID di DOM
        const elem = document.getElementById(styleId);
        if (elem && elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }

        // Sinkronisasi pembersihan di Map registry
        for (const [path, id] of this.#loadedStylesheets.entries()) {
            if (id === styleId) {
                this.#loadedStylesheets.delete(path);
                break;
            }
        }
    }
}

export default StyleResolverUtil;