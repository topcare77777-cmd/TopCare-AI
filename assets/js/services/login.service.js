/**
 * @file login.service.js
 * @description Enterprise login service handling credential validation, repository communication, 
 * token persistence via TokenEngine, and session creation via SessionEngine.
 * @module Service/LoginService
 * @version 3.0.0
 * @status Production Ready
 */

import { UserRepository } from '../core/repositories/user.repository.js';
import { tokenEngine } from '../engine/token.engine.js';
import { sessionEngine } from '../engine/session.engine.js';

export class LoginService {
    constructor() { }

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
        const { data, error } = await UserRepository.signIn(
            credentials.email.trim(),
            credentials.password
        );

        if (error || !data) {
            return {
                success: false,
                status: 401,
                message: error?.message || 'Authentication failed.',
                data: null,
                errors: { credentials: [error?.message || 'Invalid credentials.'] }
            };
        }

        const token = data.session?.access_token;
        const user = data.user;

        if (token) {
            tokenEngine.setToken(token);
        }

        if (user) {
            sessionEngine.createSession(user, rememberMe);
        }

        return {
            success: true,
            status: 200,
            message: 'Authentication successful.',
            data: {
                user: sessionEngine.getSessionData() || user,
                token: tokenEngine.getToken() || token
            },
            errors: null
        };
    }

    async login(email, password) {
        return await this.authenticate({ email, password });
    }
}

export const loginService = new LoginService();
export default loginService;