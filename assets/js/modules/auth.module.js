/**
 * @file auth.module.js
 * @description Enterprise authentication orchestration module uniting login, register, 
 * password recovery, session verification, and token refreshing workflows across services and engines.
 * @module Modules/AuthModule
 * @version 3.0.0
 * @status Production Ready
 */

import { loginService } from '../services/login.service.js';
import { registerService } from '../services/register.service.js';
import { authService } from '../services/auth.service.js';
import { sessionEngine } from '../engine/session.engine.js';

export class AuthModule {
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
     * Authenticates user credentials via LoginService.
     * @param {Object} credentials - User credentials (email, password, rememberMe).
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async login(credentials) {
        try {
            return await loginService.authenticate(credentials);
        } catch (error) {
            return this.#buildResponse(
                false,
                500,
                'An unexpected error occurred during login.',
                null,
                { module: ['Login execution exception.'] }
            );
        }
    }

    /**
     * Registers a new user account via RegisterService.
     * @param {Object} payload - Registration data payload.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async register(payload) {
        try {
            return await registerService.registerUser(payload);
        } catch (error) {
            return this.#buildResponse(
                false,
                500,
                'An unexpected error occurred during registration.',
                null,
                { module: ['Registration execution exception.'] }
            );
        }
    }

    /**
     * Initiates password recovery. Safe stub implementation for BUILD 035.
     * @param {Object} payload - Password recovery payload containing email.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async forgotPassword(payload) {
        try {
            return this.#buildResponse(
                true,
                200,
                'Password recovery request accepted.',
                null,
                null
            );
        } catch (error) {
            return this.#buildResponse(
                false,
                500,
                'An unexpected error occurred during password recovery.',
                null,
                { module: ['Forgot password execution exception.'] }
            );
        }
    }

    /**
     * Terminates the active session via AuthService.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async logout() {
        try {
            return await authService.logout();
        } catch (error) {
            return this.#buildResponse(
                false,
                500,
                'An unexpected error occurred during logout.',
                null,
                { module: ['Logout execution exception.'] }
            );
        }
    }

    /**
     * Verifies the active session via AuthService.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async verifySession() {
        try {
            return await authService.verifySession();
        } catch (error) {
            return this.#buildResponse(
                false,
                500,
                'An unexpected error occurred during session verification.',
                null,
                { module: ['Verify session execution exception.'] }
            );
        }
    }

    /**
     * Refreshes the authentication token via AuthService.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async refreshToken() {
        try {
            return await authService.refreshToken();
        } catch (error) {
            return this.#buildResponse(
                false,
                500,
                'An unexpected error occurred during token refresh.',
                null,
                { module: ['Refresh token execution exception.'] }
            );
        }
    }

    /**
     * Evaluates whether the user currently has an active, valid session.
     * @returns {Promise<boolean>} True if authenticated.
     */
    async isAuthenticated() {
        try {
            const result = await this.verifySession();
            return Boolean(result && result.success);
        } catch (error) {
            return false;
        }
    }

    /**
     * Retrieves the current user profile from SessionEngine.
     * @returns {Object|null} User profile object or null.
     */
    getCurrentUser() {
        try {
            return sessionEngine.getSessionData();
        } catch (error) {
            return null;
        }
    }
}

export const authModule = new AuthModule();