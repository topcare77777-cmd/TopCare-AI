/**
 * @file register.service.js
 * @description Enterprise-grade user registration service handling payload validation, 
 * enterprise password complexity checks, email normalization, repository communication, 
 * token management, and session creation.
 * @module Service/RegisterService
 * @version 3.0.0
 * @status Production Ready
 */

import { UserRepository } from '../core/repositories/user.repository.js';
import { tokenEngine } from '../engine/token.engine.js';
import { sessionEngine } from '../engine/session.engine.js';

export class RegisterService {
    constructor() { }

    #normalizeEmail(email) {
        if (!email || typeof email !== 'string') return '';
        return email.trim().toLowerCase();
    }

    #validatePasswordStrength(password) {
        if (!password || typeof password !== 'string') {
            return { isValid: false, message: 'Password is required.' };
        }

        if (password.length < 6) {
            return { isValid: false, message: 'Password must be at least 6 characters long.' };
        }

        return { isValid: true, message: '' };
    }

    #sanitizePayload(payload) {
        const sanitized = { ...payload };
        delete sanitized.password;
        delete sanitized.confirmPassword;
        return sanitized;
    }

    #validatePayload(payload) {
        if (!payload || typeof payload !== 'object') {
            return { isValid: false, message: 'Invalid registration payload provided.', errors: { payload: ['Payload must be a valid object.'] } };
        }

        const errors = {};
        const name = typeof payload.name === 'string' ? payload.name.trim() : '';
        const email = typeof payload.email === 'string' ? payload.email.trim() : '';
        const password = typeof payload.password === 'string' ? payload.password : '';
        const confirmPassword = typeof payload.confirmPassword === 'string' ? payload.confirmPassword : '';

        if (!name) {
            errors.name = ['Full name is required.'];
        }

        if (!email) {
            errors.email = ['Email address is required.'];
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.email = ['Invalid email address format.'];
            }
        }

        const passwordCheck = this.#validatePasswordStrength(password);
        if (!passwordCheck.isValid) {
            errors.password = [passwordCheck.message];
        }

        if (confirmPassword && password !== confirmPassword) {
            errors.confirmPassword = ['Password and confirmation password do not match.'];
        }

        if (Object.keys(errors).length > 0) {
            return {
                isValid: false,
                message: 'Validation failed for registration input.',
                errors
            };
        }

        return { isValid: true, message: '', errors: null };
    }

    #buildResponse(success, status, message, data = null, errors = null) {
        return {
            success,
            status,
            message,
            data,
            errors
        };
    }

    async registerUser(payload) {
        const validation = this.#validatePayload(payload);
        if (!validation.isValid) {
            return this.#buildResponse(false, 400, validation.message, null, validation.errors);
        }

        const normalizedEmail = this.#normalizeEmail(payload.email);
        const metadata = {
            full_name: payload.name ? payload.name.trim() : ''
        };

        try {
            const { data, error } = await UserRepository.signUp(
                normalizedEmail,
                payload.password,
                metadata
            );

            if (error || !data) {
                return this.#buildResponse(
                    false,
                    400,
                    error?.message || 'Registration failed.',
                    null,
                    { general: [error?.message || 'Registration failed.'] }
                );
            }

            const token = data.session?.access_token;
            const user = data.user;

            if (token) {
                tokenEngine.setToken(token);
            }

            if (user) {
                const rememberMe = Boolean(payload.rememberMe);
                sessionEngine.createSession(user, rememberMe);
            }

            return this.#buildResponse(
                true,
                201,
                'Registration successful.',
                {
                    user: sessionEngine.getSessionData() || user,
                    token: tokenEngine.getToken() || token
                },
                null
            );
        } catch (error) {
            console.error('[RegisterService] Unexpected failure during registration execution:', error);
            return this.#buildResponse(
                false,
                500,
                'An unexpected error occurred during registration.',
                null,
                { server: ['Internal service error.'] }
            );
        }
    }

    async register(email, password, metadata = {}) {
        return await this.registerUser({
            name: metadata.full_name || email.split('@')[0],
            email,
            password,
            confirmPassword: password
        });
    }
}

export const registerService = new RegisterService();
export default registerService;