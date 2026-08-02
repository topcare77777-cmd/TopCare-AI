/**
 * TOPCARE AI PLATFORM V2 — AUTHENTICATION SERVICE
 * Path: assets/js/auth/auth.service.js
 * Status: ACTIVE - FIX BUILD 138.5
 * SRP: Central Authentication Service handling login, logout, and token session orchestrations.
 */

import { Core } from '../core/index.js';
import { AuthRepository } from './auth.repository.js';
import { AUTH_EVENTS } from './auth.types.js';
import sessionManager from './session/session.manager.js';

// -----------------------------------------------------------------
// SAFEGUARD: Ensure Core.Event provides a safe emit() wrapper
// -----------------------------------------------------------------
function safeEmitEvent(eventName, payload) {
    if (!Core || !Core.Event) {
        console.warn(`[AuthService] Core.Event not available for event '${eventName}'`);
        return;
    }

    if (typeof Core.Event.emit === 'function') {
        Core.Event.emit(eventName, payload);
    } else if (typeof Core.Event.dispatch === 'function') {
        Core.Event.dispatch(eventName, payload);
    } else if (typeof Core.Event.publish === 'function') {
        Core.Event.publish(eventName, payload);
    } else if (typeof Core.Event.trigger === 'function') {
        Core.Event.trigger(eventName, payload);
    } else {
        console.log(`[AuthService] Event '${eventName}' dispatched:`, payload);
    }
}

class AuthServiceImpl {
    async login(username, password) {
        const correlationId = `corr_login_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        try {
            Core.Logger.info(`[AuthService] Initiating login sequence for '${username}' (CorrID: ${correlationId})`);

            // 1. Emit LOGIN_BEGIN Event
            safeEmitEvent(AUTH_EVENTS.LOGIN_BEGIN, { username, correlationId });

            // 2. Execute Login Request via AuthRepository
            const response = await AuthRepository.executeLogin(username, password, correlationId);

            if (!response || !response.userDto) {
                throw new Error("Respons login dari server tidak valid.");
            }

            const { userDto, sessionDto, tokenDto } = response;

            // 3. Save Session into SessionManager SSOT V2
            await sessionManager.start({
                id: userDto.id,
                username: userDto.username,
                email: userDto.email,
                fullName: userDto.fullName,
                roles: userDto.roles,
                permissions: userDto.permissions
            }, true);

            // 4. Save Tokens in V2 Storage SSOT
            try {
                if (tokenDto?.accessToken) {
                    localStorage.setItem('topcare.auth.token', tokenDto.accessToken);
                    localStorage.setItem('topcare_session', tokenDto.accessToken);
                }
                localStorage.setItem('topcare.auth.user', JSON.stringify(userDto));
                localStorage.setItem('topcare_user', JSON.stringify(userDto));
            } catch (storageErr) {
                Core.Logger.warn('[AuthService] Failed to persist auth token to local storage:', storageErr);
            }

            // 5. Emit LOGIN_SUCCESS Event
            safeEmitEvent(AUTH_EVENTS.LOGIN_SUCCESS, {
                userId: userDto.id,
                sessionId: sessionDto?.sessionId || `sess_${Date.now()}`,
                correlationId
            });

            Core.Logger.info(`[AuthService] Login successful for user '${userDto.id}'. Session initialized.`);

            return {
                success: true,
                user: userDto,
                sessionId: sessionDto?.sessionId,
                token: tokenDto?.accessToken
            };

        } catch (error) {
            Core.Logger.error(`[AuthService] Login failed for '${username}': ${error.message}`);

            safeEmitEvent(AUTH_EVENTS.LOGIN_FAILED, {
                username,
                error: error.message,
                correlationId
            });

            return {
                success: false,
                message: error.message || "Gagal melakukan autentikasi."
            };
        }
    }

    async logout() {
        try {
            const currentSession = sessionManager.current();
            const sessionId = currentSession ? currentSession.userId : 'unknown';

            Core.Logger.info(`[AuthService] Logging out session '${sessionId}'...`);

            await sessionManager.end();

            try {
                localStorage.removeItem('topcare.auth.token');
                localStorage.removeItem('topcare.auth.user');
                localStorage.removeItem('topcare_session');
                localStorage.removeItem('topcare_user');
            } catch (e) {
                // Ignore storage removal errors
            }

            safeEmitEvent(AUTH_EVENTS.LOGOUT, { sessionId });
            Core.Logger.info('[AuthService] Logout complete.');
            return true;
        } catch (err) {
            Core.Logger.error(`[AuthService] Logout error: ${err.message}`);
            return false;
        }
    }

    async getCurrentUser() {
        const session = sessionManager.current();
        if (!session) return null;
        return session;
    }

    async isAuthenticated() {
        return await sessionManager.isAuthenticated();
    }
}

export const AuthService = new AuthServiceImpl();
export default AuthService;
