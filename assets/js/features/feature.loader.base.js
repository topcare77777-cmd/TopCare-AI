/**
 * TOPCARE AI PLATFORM V2 — FEATURE LOADER BASE
 * Path: assets/js/features/feature.loader.base.js
 * Version: 131.1.0 (BUILD 131 — RECONCILED CANONICAL LAZY LOADER)
 * Status: PENDING LOCK
 */

import { FeatureManifestRegistry } from './feature.manifest.registry.js';
import { FeatureRegistry } from './feature.registry.js';
import { DependencyGraphService } from './dependency.graph.service.js';
import { FeatureBootstrap } from './feature.bootstrap.js';
import { Core } from '../core/index.js';

export class FeatureLoaderBaseEngine {
    constructor() {
        this._states = new Map();
        this._cache = new Map();
        this._loading = new Map(); // SATU-SATUNYA authoritative pending Promise cache
        this.TTL = 3600000;
        this.maxCacheSize = 50;
        Object.seal(this);
    }

    isLoaded(featureId) {
        return this._states.get(featureId) === 'LOADED' || FeatureRegistry.has(featureId);
    }

    getState(featureId) {
        return this._states.get(featureId) || 'UNINITIALIZED';
    }

    async load(featureId) {
        if (!featureId) throw new Error('[FeatureLoaderBase] featureId is required.');

        const normalizedId = featureId.toLowerCase();

        // 1. Cache hit (berhasil dimuat sebelumnya)
        if (this.isLoaded(normalizedId)) {
            return this._cache.get(normalizedId) || FeatureRegistry.resolve(normalizedId);
        }

        // 2. Promise Deduplication (Concurrent request sharing)
        if (this._loading.has(normalizedId)) {
            return this._loading.get(normalizedId);
        }

        this._states.set(normalizedId, 'LOADING');

        // 3. Initiate Load Pipeline
        const loadPromise = this._executeLoad(normalizedId).finally(() => {
            // Hapus dari pending map terlepas dari sukses/gagal agar bisa di-retry
            this._loading.delete(normalizedId);
        });

        this._loading.set(normalizedId, loadPromise);

        return loadPromise;
    }

    async prefetch(featureId) {
        try {
            await this.load(featureId);
        } catch (e) {
            Core.Logger.warn(`[FeatureLoaderBase] Prefetch failed for ${featureId}, silenced.`);
        }
    }

    async _executeLoad(featureId) {
        // MENGGUNAKAN API ACTUAL: getById()
        const manifest = FeatureManifestRegistry.getById(featureId);
        if (!manifest) {
            this._states.set(featureId, 'FAILED');
            throw new Error(`[FeatureLoaderBase] Manifest not found for feature: '${featureId}'`);
        }

        // Jalankan dependency graph eksisting jika ada
        if (DependencyGraphService && typeof DependencyGraphService.resolveDependencies === 'function') {
            await DependencyGraphService.resolveDependencies(featureId);
        }

        let pageMod;

        // BACKWARD COMPATIBILITY: Dukung loader() DAN modulePath
        if (typeof manifest.loader === 'function') {
            pageMod = await manifest.loader();
        } else if (manifest.modulePath) {
            pageMod = await import(manifest.modulePath);
        } else {
            this._states.set(featureId, 'FAILED');
            throw new Error(`[FeatureLoaderBase] Manifest for '${featureId}' lacks modulePath or loader function.`);
        }

        // Feature Extraction
        const targetView = pageMod.default ||
            pageMod[`${manifest.id}Page`] ||
            pageMod.LoginPage ||
            pageMod.RegisterPage ||
            pageMod;

        const featureDefinition = {
            id: manifest.id,
            path: manifest.path,
            view: targetView,
            isProtected: Boolean(manifest.isProtected),
            aliases: manifest.aliases || []
        };

        // Feature Bootstrap Integration
        if (FeatureBootstrap && typeof FeatureBootstrap.initialize === 'function') {
            await FeatureBootstrap.initialize(featureDefinition);
        }

        // Final Registration (ViewRegistry syncs via FeatureRegistry)
        FeatureRegistry.register(manifest.id, featureDefinition);

        this._cache.set(featureId, featureDefinition);
        this._states.set(featureId, 'LOADED');

        Core.Logger.info(`[FeatureLoaderBase] Lazily loaded: '${featureId}'`);
        return featureDefinition;
    }
}

export const FeatureLoaderBase = FeatureLoaderBaseEngine;
export default FeatureLoaderBase;
