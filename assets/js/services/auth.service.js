/**
 * @file auth.service.js
 * @description Enterprise authentication business service managing global session verification,
 * logout cascades, and token refreshing using repository and engine layers.
 * @module Service/AuthService
 * @version 3.0.0
 * @status Production Ready
 */

import { userRepository } from '../repository/user.repository.js';
import { tokenEngine } from '../engine/token.engine.js';
import { sessionEngine } from '../engine/session.engine.js';

export class AuthService {
    /**
     * Creates an instance of AuthService.
     */
    constructor() {}

    /**
     * Builds a standardized response object envelope.
     * @private
     * @param {boolean} success - Success status flag.
     * @param {number} status - HTTP status code or operational status.
     * @param {string} message - Human-readable response message.
     * @param {any} [data=null] - Response data payload.
     * @param {any} [errors=null] - Structured error information.
     * @returns {Object} Standardized envelope.
     */
    #buildResponse(success, status, message, data = null, errors = null) {
        return {
            success,
            status,
            message,
            data,
            errors
        };
    }

    /**
     * Verifies the active session and token state against the backend profile API.
     * @returns {Promise<Object>} Standardized response envelope.
     */
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

            const response = await userRepository.fetchProfileApi();

            if (!response.success) {
                if (response.status === 401 || response.status === 403) {
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

                return this.#buildResponse(
                    false,
                    response.status,
                    response.message || 'Failed to verify session.',
                    null,
                    response.errors
                );
            }

            sessionEngine.touchSession();

            return this.#buildResponse(
                true,
                200,
                'Session verified successfully.',
                {
                    user: sessionEngine.getSessionData() || response.data,
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

    /**
     * Terminates the active session globally, clearing storage, timers, tokens, and backend state.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async logout() {
        try {
            await userRepository.logoutApi();
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

    /**
     * Requests an updated access token from the backend and updates the TokenEngine.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async refreshToken() {
        try {
            const response = await userRepository.refreshTokenApi();

            if (!response.success || !response.data) {
                if (response.status === 401 || response.status === 403) {
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

                return this.#buildResponse(
                    false,
                    response.status || 400,
                    response.message || 'Failed to refresh token.',
                    null,
                    response.errors
                );
            }

            const responseData = response.data;
            const newToken = responseData.token || responseData.accessToken || responseData.bearer;

            if (!newToken) {
                return this.#buildResponse(
                    false,
                    500,
                    'Invalid token response received during refresh.',
                    null,
                    { token: ['Missing token in refresh response.'] }
                );
            }

            tokenEngine.setToken(newToken);
            sessionEngine.touchSession();

            return this.#buildResponse(
                true,
                200,
                'Token refreshed successfully.',
                {
                    token: newToken,
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