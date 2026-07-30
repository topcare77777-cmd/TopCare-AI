/**
 * TOPCARE CORE RUNTIME (TCR) — THEME.INTERFACE.JS
 * Strict contract interface ensuring 100% API consistency across theme resolution engines.
 * Zero implementation, zero DOM awareness, pure abstract definition.
 */

export class ThemeInterface {
    resolveVariant(variant) {
        throw new Error('Method "resolveVariant()" must be implemented.');
    }

    resolveSize(size) {
        throw new Error('Method "resolveSize()" must be implemented.');
    }

    resolveState(state) {
        throw new Error('Method "resolveState()" must be implemented.');
    }

    resolveSurface(surface) {
        throw new Error('Method "resolveSurface()" must be implemented.');
    }

    resolve(category, key) {
        throw new Error('Method "resolve()" must be implemented.');
    }

    has(category, key) {
        throw new Error('Method "has()" must be implemented.');
    }
}