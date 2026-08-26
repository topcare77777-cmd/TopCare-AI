/**
 * TOPCARE AI PLATFORM V3 — USER REPOSITORY
 * Path: assets/js/core/repositories/user.repository.js
 */

import { supabase } from '../../config/supabase.config.js';

export class UserRepository {
    /**
     * Mengambil session user yang sedang aktif dari Supabase Auth
     */
    static async getCurrentAuthUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) return null;
        return user;
    }

    /**
     * Mengambil data profil user berdasarkan ID
     */
    static async getProfileById(userId) {
        if (!userId) return null;
        const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, email, role, created_at, updated_at')
            .eq('id', userId)
            .single();

        if (error) {
            console.warn('[UserRepository] getProfileById warn:', error.message);
            return null;
        }
        return data;
    }

    /**
     * Mengambil daftar profil pengguna dengan pagination/limit contract
     * @param {Object} options 
     * @param {number} options.page 
     * @param {number} options.limit 
     */
    static async getProfilesPaginated({ page = 1, limit = 50 } = {}) {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabase
            .from('profiles')
            .select('id, full_name, email, role, created_at', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('[UserRepository] getProfilesPaginated error:', error.message);
            throw new Error(error.message);
        }

        return {
            users: data || [],
            total: count || 0,
            page,
            limit
        };
    }

    /**
     * Update data profil user
     */
    static async updateProfile(userId, updates) {
        if (!userId) throw new Error('User ID diperlukan');
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    /**
     * Sign out auth session & bersihkan hanya auth/session storage token
     */
    static async signOut() {
        try {
            await supabase.auth.signOut();
        } finally {
            // Hapus HANYA key session Supabase / App Token spesifik tanpa menghapus cache & preferensi user
            const authPrefixes = ['sb-', 'supabase.auth', 'topcare_session', 'topcare_auth'];
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && authPrefixes.some(prefix => key.startsWith(prefix))) {
                    localStorage.removeItem(key);
                }
            }
            sessionStorage.removeItem('tcr_active_session');
        }
    }
}

export default UserRepository;