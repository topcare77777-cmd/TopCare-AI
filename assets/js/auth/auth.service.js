/**
 * file: assets/js/auth/auth.service.js
 * Version: 132.1.0
 * Status: APPROVED & LOCKED
 * SRP: Main Identity Application Service with explicit public getters and OAuth RFC flow.
 */

import { Core } from '../core/index.js';
import { AUTH_EVENTS } from './auth.types.js';
import { AuthRepository } from './auth.repository.js';
import { AuthTokenStorage } from './auth.storage.js';
import { AuthGuard } from './auth.guard.js';
import { User } from './auth.user.js';
import { Session } from './auth.session.js';
import { AuthToken } from './auth.token.js';

class AuthServiceBase {
    constructor() {
        this._currentUser = null;
        this._currentSession = null;
        this._currentToken = null;
        Object.seal(this);
    }

    // --- Public Readonly Accessors (Encapsulation Enforcement) ---
    getCurrentUser() {
        if (!this._currentUser) this.restoreSession();
        return this._currentUser;
    }

    getCurrentSession() {
        return this._currentSession;
    }

    getCurrentToken() {
        return this._currentToken;
    }

    _generateCorrelationId() {
        return (typeof crypto !== 'undefined' && crypto.randomUUID) 
            ? crypto.randomUUID() 
            : `corr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    }

    async login(username, password) {
        const correlationId = this._generateCorrelationId();
        Core.Event.emit(AUTH_EVENTS.LOGIN_BEGIN, { username, correlationId });

        try {
            const { userDto, sessionDto, tokenDto } = await AuthRepository.executeLogin(username, password, correlationId);

            this._currentUser = new User(userDto);
            this._currentSession = new Session(sessionDto);
            this._currentToken = new AuthToken(tokenDto);

            await AuthTokenStorage.saveSessionData({
                user: userDto,
                session: sessionDto,
                token: tokenDto
            });

            Core.Event.emit(AUTH_EVENTS.LOGIN_SUCCESS, {
                userId: this._currentUser.id,
                sessionId: this._currentSession.sessionId,
                correlationId
            });

            return { user: this._currentUser, session: this._currentSession, token: this._currentToken };
        } catch (err) {
            Core.Event.emit(AUTH_EVENTS.LOGIN_FAILED, { username, error: err.message, correlationId });
            throw err;
        }
    }

    async register(registrationData) {
        const correlationId = this._generateCorrelationId();
        Core.Event.emit('auth.register.begin', { username: registrationData.username, correlationId });

        try {
            // Dedicated Registration Flow via AuthRepository SSOT
            const responseDto = await AuthRepository.executeRegister(registrationData, correlationId);
            Core.Event.emit('auth.register.success', { username: registrationData.username, correlationId });
            return responseDto;
        } catch (err) {
            Core.Event.emit('auth.register.failed', { username: registrationData.username, error: err.message, correlationId });
            throw err;
        }
    }

    async rotateRefreshToken() {
        const correlationId = this._generateCorrelationId();
        if (!this._currentToken?.refreshToken) {
            throw new Error("No active refresh token available.");
        }

        Core.Event.emit(AUTH_EVENTS.REFRESH_BEGIN, { userId: this._currentUser?.id, correlationId });

        try {
            const { sessionDto, tokenDto } = await AuthRepository.executeRefreshToken(
                this._currentToken.refreshToken,
                correlationId
            );

            this._currentSession = new Session(sessionDto);
            this._currentToken = new AuthToken(tokenDto);

            await AuthTokenStorage.saveSessionData({
                user: this._currentUser,
                session: sessionDto,
                token: tokenDto
            });

            Core.Event.emit(AUTH_EVENTS.TOKEN_ROTATED, { sessionId: this._currentSession.sessionId, correlationId });
            Core.Event.emit(AUTH_EVENTS.REFRESH_SUCCESS, { sessionId: this._currentSession.sessionId, correlationId });

            return { session: this._currentSession, token: this._currentToken };
        } catch (err) {
            Core.Event.emit(AUTH_EVENTS.REFRESH_FAILED, { error: err.message, correlationId });
            this.logout();
            throw err;
        }
    }

    async can(permissionConstant, contextDetails = {}) {
        const user = this.getCurrentUser();
        if (!user) return false;

        if (this._currentToken?.isAccessTokenExpired) {
            Core.Logger.info("[AuthService] Access token expired during check. Auto-refreshing...");
            try {
                await this.rotateRefreshToken();
            } catch {
                return false;
            }
        }

        return AuthGuard.evaluate(user, permissionConstant, contextDetails);
    }

    async restoreSession() {
        const saved = await AuthTokenStorage.getSessionData();
        if (saved?.user && saved?.session && saved?.token) {
            this._currentUser = new User(saved.user);
            this._currentSession = new Session(saved.session);
            this._currentToken = new AuthToken(saved.token);

            if (this._currentSession.isExpired) {
                Core.Event.emit(AUTH_EVENTS.SESSION_EXPIRED, { userId: this._currentUser.id });
                this.logout();
                return false;
            }

            Core.Event.emit(AUTH_EVENTS.SESSION_RESTORED, { userId: this._currentUser.id });
            return true;
        }
        return false;
    }

    logout() {
        if (this._currentUser) {
            const correlationId = this._generateCorrelationId();
            AuthRepository.executeLogout(this._currentSession?.sessionId, correlationId);
            Core.Event.emit(AUTH_EVENTS.LOGOUT, { userId: this._currentUser.id, correlationId });
        }
        this._currentUser = null;
        this._currentSession = null;
        this._currentToken = null;
        AuthTokenStorage.clearSessionData();
    }
}

export const AuthService = Object.freeze(new AuthServiceBase());