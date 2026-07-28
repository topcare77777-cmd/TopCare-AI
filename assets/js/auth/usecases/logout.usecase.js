/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/usecases/logout.usecase.js
 * Layer        : Business Use Case Layer
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Orchestrates session termination cleanly without side effects
 *                such as DOM manipulation or UI redirects.
 * -----------------------------------------------------------------
 */

import sessionManagerInstance from "../session/session.manager.js";

export class LogoutUseCase {
    constructor(sessionManager = sessionManagerInstance) {
        this.sessionManager = sessionManager;
    }

    async execute() {
        try {
            await this.sessionManager.end();
            return {
                success: true,
                data: null,
                error: null
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                error: "SESSION_END_FAILED"
            };
        }
    }
}

export default LogoutUseCase;