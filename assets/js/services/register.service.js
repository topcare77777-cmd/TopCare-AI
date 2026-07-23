/**
 * @file register.service.js
 * @description Enterprise-grade user registration service handling payload validation, 
 * enterprise password complexity checks, email normalization, repository communication, 
 * token management, and session creation.
 * @module Service/RegisterService
 * @version 3.0.0
 * @status Production Ready
 */

import { userRepository } from '../repository/user.repository.js';
import { tokenEngine } from '../engine/token.engine.js';
import { sessionEngine } from '../engine/session.engine.js';

export class RegisterService {
    /**
     * Creates an instance of RegisterService.
     */
    constructor() {}

    /**
     * Normalizes the user's email address by trimming and lowering case.
     * @private
     * @param {string} email - Raw email input.
     * @returns {string} Normalized email string.
     */
    #normalizeEmail(email) {
        if (!email || typeof email !== 'string') return '';
        return email.trim().toLowerCase();
    }

    /**
     * Validates enterprise password complexity policy.
     * Minimum 12 characters, containing uppercase, lowercase, number, and special character.
     * @private
     * @param {string} password - Plain text password string.
     * @returns {Object} Result object { isValid: boolean, message: string }.
     */
    #validatePasswordStrength(password) {
        if (!password || typeof password !== 'string') {
            return { isValid: false, message: 'Password is required.' };
        }

        if (password.length < 12) {
            return { isValid: false, message: 'Password must be at least 12 characters long.' };
        }

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
            return {
                isValid: false,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
            };
        }

        return { isValid: true, message: '' };
    }

    /**
     * Sanitizes the registration payload, removing sensitive unencrypted fields prior to repository call.
     * @private
     * @param {Object} payload - Raw registration payload.
     * @returns {Object} Sanitized payload copy.
     */
    #sanitizePayload(payload) {
        const sanitized = { ...payload };
        delete sanitized.password;
        delete sanitized.confirmPassword;
        return sanitized;
    }

    /**
     * Validates the complete registration payload for syntax, schema, and consistency rules.
     * @private
     * @param {Object} payload - Registration payload.
     * @returns {Object} Validation result { isValid: boolean, message: string, errors: Object|null }.
     */
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

        if (password !== confirmPassword) {
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

    /**
     * Builds a standardized response envelope.
     * @private
     * @param {boolean} success - Operation success flag.
     * @param {number} status - HTTP status code.
     * @param {string} message - Response message.
     * @param {Object|null} data - Response payload data.
     * @param {Object|null} errors - Response error details.
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
     * Executes the complete user registration workflow.
     * @param {Object} payload - Registration data containing name, email, password, confirmPassword, and optional role/rememberMe.
     * @returns {Promise<Object>} Standardized response envelope.
     */
    async registerUser(payload) {
        const validation = this.#validatePayload(payload);
        if (!validation.isValid) {
            return this.#buildResponse(false, 400, validation.message, null, validation.errors);
        }

        const normalizedEmail = this.#normalizeEmail(payload.email);
        const registrationData = {
            ...payload,
            email: normalizedEmail
        };

        const repositoryPayload = this.#sanitizePayload(registrationData);
        // Include password explicitly for repository execution (never logged or exposed)
        repositoryPayload.password = payload.password;

        try {
            const response = await userRepository.registerApi(repositoryPayload);

            if (!response.success || !response.data) {
                return this.#buildResponse(
                    false,
                    response.status || 400,
                    response.message || 'Registration failed.',
                    null,
                    response.errors || { general: [response.message || 'Registration failed.'] }
                );
            }

            const responseData = response.data;
            const token = responseData.token || responseData.accessToken || responseData.bearer;
            const user = responseData.user || responseData.profile || responseData;

            if (token) {
                tokenEngine.setToken(token);
            }

            if (user) {
                const rememberMe = Boolean(payload.rememberMe);
                sessionEngine.createSession(user, rememberMe);
            }

            return this.#buildResponse(
                true,
                response.status || 201,
                response.message || 'Registration successful.',
                {
                    user: sessionEngine.getSessionData() || user,
                    token: tokenEngine.getToken()
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
}

export const registerService = new RegisterService();