/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/usecases/login.usecase.js
 * Layer        : Business Use Case Layer
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Orchestrates credential verification and active session
 *                initialization upon successful login.
 * -----------------------------------------------------------------
 */

import { LocalAuthRepository } from "../repositories/local.auth.repository.js";
import sessionManagerInstance from "../session/session.manager.js";

export class LoginUseCase {
    constructor(authRepository = new LocalAuthRepository(), sessionManager = sessionManagerInstance) {
        this.authRepository = authRepository;
        this.sessionManager = sessionManager;
    }

    async execute(dto) {
        if (!dto || !dto.identifier || !dto.password) {
            return {
                success: false,
                data: null,
                error: "INVALID_REQUEST_PAYLOAD"
            };
        }

        try {
            const user = await this.authRepository.verifyCredentials(dto.identifier, dto.password);
            if (!user) {
                return {
                    success: false,
                    data: null,
                    error: "INVALID_CREDENTIALS"
                };
            }

            const sessionStarted = await this.sessionManager.start(user, Boolean(dto.rememberMe));
            if (!sessionStarted) {
                return {
                    success: false,
                    data: null,
                    error: "SESSION_START_FAILED"
                };
            }

            return {
                success: true,
                data: user,
                error: null
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                error: "UNKNOWN_ERROR"
            };
        }
    }
}

export default LoginUseCase;