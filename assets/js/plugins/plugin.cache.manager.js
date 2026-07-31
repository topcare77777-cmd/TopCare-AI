/**
 * file: assets/js/plugins/plugin.cache.manager.js
 */

import { Core } from '../core/index.js';
import { PluginContext } from './plugin.context.js';

export class PluginCacheManager {
    constructor(ttlMs = 30 * 60 * 1000, maxCacheSize = 30, hardTtlMs = 24 * 60 * 60 * 1000) {
        this._cache = new Map(); // pluginId -> { pluginWrapper, loadedAt, lastAccess, cachePolicy, hardExpiresAt }
        this._ttlMs = ttlMs;
        this._maxCacheSize = maxCacheSize;
        this._hardTtlMs = hardTtlMs;
        Object.seal(this);
    }

    has(pluginId) {
        return this._cache.has(pluginId);
    }

    get(pluginId) {
        if (!this.has(pluginId)) return null;

        const entry = this._cache.get(pluginId);
        const now = Core.Utils.now ? Core.Utils.now() : Date.now();

        // Check Hard TTL expiration (absolute upper limit forcing disposal)
        if (now > entry.hardExpiresAt) {
            Core.Logger.info(`Plugin hit Hard TTL expiration: ${pluginId}. Forcing disposal.`);
            this.evictAndDispose(pluginId, 'dispose');
            return null;
        }

        // Check Soft TTL expiration
        if (now - entry.loadedAt > this._ttlMs) {
            const policy = entry.cachePolicy || 'unload';
            const context = new PluginContext(entry.pluginWrapper.manifest);

            if (policy === 'retain') {
                // Soft TTL expired under retain policy, but honored up to Hard TTL
                entry.loadedAt = now;
                entry.lastAccess = now;
                return entry.pluginWrapper;
            } else {
                this.evictAndDispose(pluginId, policy);
                return null;
            }
        }

        entry.lastAccess = now;
        return entry.pluginWrapper;
    }

    set(pluginId, pluginWrapper, cachePolicy = 'unload') {
        this._enforceLRULimit();
        const now = Core.Utils.now ? Core.Utils.now() : Date.now();
        this._cache.set(pluginId, {
            pluginWrapper,
            loadedAt: now,
            lastAccess: now,
            cachePolicy,
            hardExpiresAt: now + this._hardTtlMs
        });
    }

    evictAndDispose(pluginId, policy = 'unload') {
        if (!this._cache.has(pluginId)) return;
        const entry = this._cache.get(pluginId);
        const context = new PluginContext(entry.pluginWrapper.manifest);

        if (policy === 'dispose') {
            entry.pluginWrapper.dispose(context).catch(() => { });
        } else {
            entry.pluginWrapper.unload(context).catch(() => { });
        }
        this._cache.delete(pluginId);
        Core.Logger.info(`Plugin cache evicted and policy '${policy}' applied: ${pluginId}`);
    }

    _enforceLRULimit() {
        if (this._cache.size >= this._maxCacheSize) {
            let lruKey = null;
            let oldestAccess = Infinity;
            for (const [id, entry] of this._cache.entries()) {
                if (entry.cachePolicy === 'retain') continue;
                if (entry.lastAccess < oldestAccess) {
                    oldestAccess = entry.lastAccess;
                    lruKey = id;
                }
            }
            if (lruKey) {
                this.evictAndDispose(lruKey, this._cache.get(lruKey).cachePolicy || 'unload');
            }
        }
    }
}