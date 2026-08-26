/**
 * TOPCARE AI PLATFORM V3 — PLATFORM SETTINGS REPOSITORY
 * Path: assets/js/core/repositories/platform-settings.repository.js
 */

import { supabase } from '../../config/supabase.config.js';

export class PlatformSettingsRepository {
    static CONFIG_ID = 'app_config';

    /**
     * Mengambil data platform settings dari Supabase
     */
    static async getSettings() {
        const { data, error } = await supabase
            .from('platform_settings')
            .select('id, app_version, contact_whatsapp, contact_email, tiktok_url, instagram_url, youtube_url, updated_at')
            .eq('id', this.CONFIG_ID)
            .single();

        if (error) {
            console.warn('[PlatformSettingsRepository] getSettings warn:', error.message);
            return null;
        }
        return data;
    }

    /**
     * Memperbarui platform settings di Supabase
     */
    static async updateSettings(settingsPayload) {
        const payload = {
            ...settingsPayload,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('platform_settings')
            .update(payload)
            .eq('id', this.CONFIG_ID)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }
}

export default PlatformSettingsRepository;