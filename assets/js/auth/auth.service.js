/**
 * TOPCARE AI PLATFORM V3 — SUPABASE AUTH SERVICE
 * Path: assets/js/auth/auth.service.js
 * Status: PRODUCTION INTEGRATED (Supabase Auth & RBAC)
 */

import { Core } from '../core/index.js';
import { supabase } from '../config/supabase.config.js';
import { AUTH_EVENTS } from './auth.types.js';

function safeEmitEvent(eventName, payload) {
    if (!Core || !Core.Event) return;
    if (typeof Core.Event.emit === 'function') Core.Event.emit(eventName, payload);
    else if (typeof Core.Event.dispatch === 'function') Core.Event.dispatch(eventName, payload);
    else if (typeof Core.Event.publish === 'function') Core.Event.publish(eventName, payload);
    else if (typeof Core.Event.trigger === 'function') Core.Event.trigger(eventName, payload);
}

class AuthServiceImpl {
    /**
     * Login using Supabase Auth and fetch user profile role.
     */
    async login(email, password) {
        const correlationId = `corr_${Date.now()}`;
        try {
            safeEmitEvent(AUTH_EVENTS.LOGIN_BEGIN, { username: email, correlationId });

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            const user = data.user;

            // Fetch Role from public.profiles table
            const { data: profile, error: profileErr } = await supabase
                .from('profiles')
                .select('full_name, role')
                .eq('id', user.id)
                .single();

            const userRole = profile?.role || 'member';
            const fullName = profile?.full_name || user.user_metadata?.full_name || email.split('@')[0];

            const userDto = {
                id: user.id,
                email: user.email,
                fullName: fullName,
                role: userRole,
                roles: [userRole],
                permissions: userRole === 'super_admin' ? ['*'] : ['member.view', 'dashboard.view']
            };

            // Persist Session to Local Storage
            localStorage.setItem('topcare.auth.token', data.session.access_token);
            localStorage.setItem('topcare.auth.user', JSON.stringify(userDto));
            localStorage.setItem('topcare_user', JSON.stringify(userDto));

            safeEmitEvent(AUTH_EVENTS.LOGIN_SUCCESS, {
                userId: user.id,
                sessionId: data.session.access_token,
                correlationId
            });

            return {
                success: true,
                user: userDto,
                token: data.session.access_token
            };
        } catch (err) {
            safeEmitEvent(AUTH_EVENTS.LOGIN_FAILED, {
                username: email,
                error: err.message,
                correlationId
            });
            return {
                success: false,
                message: err.message || 'Login gagal. Periksa kembali email dan kata sandi.'
            };
        }
    }

    /**
     * Register a new user in Supabase.
     */
    async register(email, password, fullName) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (error) throw error;

            return {
                success: true,
                user: data.user,
                message: 'Registrasi berhasil. Silakan cek email Anda untuk konfirmasi jika diperlukan.'
            };
        } catch (err) {
            return {
                success: false,
                message: err.message || 'Gagal melakukan pendaftaran akun.'
            };
        }
    }

    /**
     * Logout and purge local sessions.
     */
    async logout() {
        try {
            await supabase.auth.signOut();
            localStorage.removeItem('topcare.auth.token');
            localStorage.removeItem('topcare.auth.user');
            localStorage.removeItem('topcare_user');
            localStorage.removeItem('topcare_session');
            safeEmitEvent(AUTH_EVENTS.LOGOUT, {});
            return true;
        } catch (err) {
            return false;
        }
    }

    getCurrentUser() {
        try {
            const raw = localStorage.getItem('topcare.auth.user') || localStorage.getItem('topcare_user');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }

    async isAuthenticated() {
        const { data } = await supabase.auth.getSession();
        return Boolean(data?.session);
    }
}

export const AuthService = new AuthServiceImpl();
export default AuthService;