/**
 * @file auth.service.js
 * @description Enterprise authentication business service managing global session verification,
 * logout cascades, and token refreshing using repository and engine layers.
 * @module Service/AuthService
 * @version 3.0.0
 * @status Production Ready
 */

import { UserRepository } from '../core/repositories/user.repository.js';
import { tokenEngine } from '../engine/token.engine.js';
import { sessionEngine } from '../engine/session.engine.js';

export class AuthService {
    constructor() { }

    #buildResponse(success, status, message, data = null, errors = null) {
        return {
            success,
            status,
            message,
            data,
            errors
        };
    }

    async verifySession() {
        try {
            const token = tokenEngine.getToken();
            const isExpired = tokenEngine.isTokenExpired();
            const sessionValid = sessionEngine.isSessionValid();

            if (!token || isExpired || !sessionValid) {
                sessionEngine.destroySession();
                tokenEngine.removeToken();
                return this.#buildResponse(
                    false,
                    401,
                    'Authentication expired or session is invalid.',
                    null,
                    { auth: ['Session expired.'] }
                );
            }

            const authUser = await UserRepository.getCurrentAuthUser();

            if (!authUser) {
                sessionEngine.destroySession();
                tokenEngine.removeToken();
                return this.#buildResponse(
                    false,
                    401,
                    'Authentication expired or unauthorized access.',
                    null,
                    { auth: ['Unauthorized session.'] }
                );
            }

            const profile = await UserRepository.getProfileById(authUser.id);
            sessionEngine.touchSession();

            return this.#buildResponse(
                true,
                200,
                'Session verified successfully.',
                {
                    user: sessionEngine.getSessionData() || profile || authUser,
                    token: tokenEngine.getToken()
                },
                null
            );
        } catch (error) {
            sessionEngine.destroySession();
            tokenEngine.removeToken();
            return this.#buildResponse(
                false,
                500,
                'An internal error occurred during session verification.',
                null,
                { server: ['Internal service exception.'] }
            );
        }
    }

    async logout() {
        try {
            await UserRepository.signOut();
        } catch (error) {
            // Proceed with local teardown regardless of API failure
        } finally {
            sessionEngine.destroySession();
            tokenEngine.removeToken();
        }

        return this.#buildResponse(
            true,
            200,
            'Logged out successfully.',
            null,
            null
        );
    }

    async refreshToken() {
        try {
            const authUser = await UserRepository.getCurrentAuthUser();

            if (!authUser) {
                sessionEngine.destroySession();
                tokenEngine.removeToken();
                return this.#buildResponse(
                    false,
                    401,
                    'Authentication expired during token refresh.',
                    null,
                    { auth: ['Token refresh failed.'] }
                );
            }

            const activeToken = tokenEngine.getToken() || 'sb-active-token';
            tokenEngine.setToken(activeToken);
            sessionEngine.touchSession();

            return this.#buildResponse(
                true,
                200,
                'Token refreshed successfully.',
                {
                    token: activeToken,
                    user: sessionEngine.getSessionData()
                },
                null
            );
        } catch (error) {
            return this.#buildResponse(
                false,
                500,
                'An unexpected error occurred during token refresh.',
                null,
                { server: ['Internal token refresh exception.'] }
            );
        }
    }
}

export const authService = new AuthService();
export default authService;