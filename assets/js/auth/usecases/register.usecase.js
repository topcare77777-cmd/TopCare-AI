/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/usecases/register.usecase.js
 * Layer        : Business Use Case Layer
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Orchestrates user registration logic, existence checks,
 *                user creation, and automatic session initialization.
 * -----------------------------------------------------------------
 */

import { LocalUserRepository } from "../repositories/local-user.repository.js";
import sessionManagerInstance from "../session/session.manager.js";

export class RegisterUseCase {
    constructor(userRepository = new LocalUserRepository(), sessionManager = sessionManagerInstance) {
        this.userRepository = userRepository;
        this.sessionManager = sessionManager;
    }

    async execute(dto) {
        if (!dto || !dto.email || !dto.username || !dto.password) {
            return {
                success: false,
                data: null,
                error: "INVALID_REQUEST_PAYLOAD"
            };
        }

        try {
            const emailExists = await this.userRepository.exists(dto.email);
            if (emailExists) {
                return {
                    success: false,
                    data: null,
                    error: "EMAIL_ALREADY_EXISTS"
                };
            }

            const usernameExists = await this.userRepository.exists(dto.username);
            if (usernameExists) {
                return {
                    success: false,
                    data: null,
                    error: "USERNAME_ALREADY_EXISTS"
                };
            }

            const createdUser = await this.userRepository.createUser({
                email: dto.email,
                username: dto.username,
                password: dto.password
            });

            if (!createdUser || !createdUser.id) {
                return {
                    success: false,
                    data: null,
                    error: "USER_CREATION_FAILED"
                };
            }

            const sessionStarted = await this.sessionManager.start(createdUser, Boolean(dto.rememberMe));
            if (!sessionStarted) {
                return {
                    success: false,
                    data: null,
                    error: "SESSION_START_FAILED"
                };
            }

            const { password: _, ...safeUser } = createdUser;
            return {
                success: true,
                data: safeUser,
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

export default RegisterUseCase;