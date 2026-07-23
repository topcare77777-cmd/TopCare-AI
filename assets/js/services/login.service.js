/**
 * @file login.service.js
 * @description Enterprise login service handling credential validation, repository communication, 
 * token persistence via TokenEngine, and session creation via SessionEngine.
 * @module Service/LoginService
 * @version 3.0.0
 * @status Production Ready
 */

import { userRepository } from '../repository/user.repository.js';
import { tokenEngine } from '../engine/token.engine.js';
import { sessionEngine } from '../engine/session.engine.js';

export class LoginService {
    /**
     * Creates an instance of LoginService.
     */
    constructor() {}

    /**
     * Validates local credential syntax before network transmission.
     * @private
     * @param {Object} credentials - Credential payload.
     * @returns {Object} Validation result { isValid, message }.
     */
    #validatePayload(credentials) {
        if (!credentials || typeof credentials !== 'object') {
            return { isValid: false, message: 'Invalid credentials payload provided.' };
        }

        const email = typeof credentials.email === 'string' ? credentials.email.trim() : '';
        const password = typeof credentials.password === 'string' ? credentials.password : '';

        if (!email) {
            return { isValid: false, message: 'Email address is required.' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, message: 'Invalid email address format.' };
        }

        if (!password) {
            return { isValid: false, message: 'Password is required.' };
        }

        return { isValid: true, message: '' };
    }

    /**
     * Executes the login authentication workflow.
     * @param {Object} credentials - Object containing email, password, and optional rememberMe boolean.
     * @returns {Promise<Object>} Standardized result envelope { success, status, message, data, errors }.
     */
    async authenticate(credentials) {
        const validation = this.#validatePayload(credentials);
        if (!validation.isValid) {
            return {
                success: false,
                status: 400,
                message: validation.message,
                data: null,
                errors: { credentials: [validation.message] }
            };
        }

        const rememberMe = Boolean(credentials.rememberMe);
        const response = await userRepository.loginApi({
            email: credentials.email.trim(),
            password: credentials.password
        });

        if (!response.success || !response.data) {
            return response;
        }

        const responseData = response.data;
        const token = responseData.token || responseData.accessToken || responseData.bearer;
        const user = responseData.user || responseData.profile || responseData;

        if (token) {
            tokenEngine.setToken(token);
        }

        if (user) {
            sessionEngine.createSession(user, rememberMe);
        }

        return {
            success: true,
            status: response.status,
            message: response.message || 'Authentication successful.',
            data: {
                user: sessionEngine.getSessionData(),
                token: tokenEngine.getToken()
            },
            errors: null
        };
    }
}

export const loginService = new LoginService();