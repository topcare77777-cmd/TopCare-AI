/**
 * TOPCARE AI PLATFORM V3 — PLATFORM SERVICE
 * Path: assets/js/core/services/platform.service.js
 */

import { PlatformSettingsRepository } from '../repositories/platform-settings.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { PLATFORM_DEFAULT_CONFIG } from '../../config/platform.defaults.js';

export class PlatformService {
    static #sessionCache = null;
    static #sessionCacheTime = 0;
    static #configCache = null;
    static #configCacheTime = 0;
    static #SESSION_TTL_MS = 60 * 1000;       // 1 menit
    static #CONFIG_TTL_MS = 5 * 60 * 1000;    // 5 menit

    /**
     * Mengambil sesi aktif
     * @param {boolean} forceRefresh 
     */
    static async getCurrentUserSession(forceRefresh = false) {
        const now = Date.now();
        if (!forceRefresh && this.#sessionCache && (now - this.#sessionCacheTime < this.#SESSION_TTL_MS)) {
            return this.#sessionCache;
        }

        const authUser = await UserRepository.getCurrentAuthUser();
        if (!authUser) {
            this.clearSessionCache();
            return null;
        }

        const profile = await UserRepository.getProfileById(authUser.id);
        const sessionData = {
            id: authUser.id,
            email: authUser.email,
            name: profile?.full_name || authUser.email.split('@')[0],
            role: profile?.role || 'member',
            profile: profile
        };

        this.#sessionCache = sessionData;
        this.#sessionCacheTime = now;
        return sessionData;
    }

    /**
     * Mengambil konfigurasi platform dengan TTL caching dan fallback
     * @param {boolean} forceRefresh 
     */
    static async getPlatformConfig(forceRefresh = false) {
        const now = Date.now();
        if (!forceRefresh && this.#configCache && (now - this.#configCacheTime < this.#CONFIG_TTL_MS)) {
            return this.#configCache;
        }

        const dbSettings = await PlatformSettingsRepository.getSettings();
        const finalConfig = dbSettings ? { ...PLATFORM_DEFAULT_CONFIG, ...dbSettings } : { ...PLATFORM_DEFAULT_CONFIG };

        this.#configCache = finalConfig;
        this.#configCacheTime = now;
        return finalConfig;
    }

    /**
     * Update konfigurasi platform & dispatch internal event untuk re-rendering DOM aktif
     */
    static async updatePlatformConfig(payload) {
        const updated = await PlatformSettingsRepository.updateSettings(payload);
        this.#configCache = null; // Invalidate cache

        // Dispatch event lokal ringan untuk rerender komponen terkait di DOM
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('tcr:platform-settings-updated', { detail: updated }));
        }
        return updated;
    }

    /**
     * Mengambil daftar user terdaftar dengan paginasi
     */
    static async getRegisteredUsersList(options = { page: 1, limit: 50 }) {
        return await UserRepository.getProfilesPaginated(options);
    }

    static clearSessionCache() {
        this.#sessionCache = null;
        this.#sessionCacheTime = 0;
    }

    static async logout() {
        this.clearSessionCache();
        await UserRepository.signOut();
    }
}

export default PlatformService;