/**
 * TopCare AI Platform V2.0.0
 * RefreshToken UseCase
 * Path: assets/js/auth/usecases/refresh-token.usecase.js
 */

class RefreshTokenUseCase {
    constructor(sessionManager, eventBus) {
        this.sessionManager = sessionManager;
        this.eventBus = eventBus || globalAuthEventBus;
    }

    async execute() {
        const token = this.sessionManager.getToken();
        if (!token) {
            this.eventBus.dispatch(AUTH_EVENTS.TOKEN_REFRESH_FAILED, { error: "No token found." });
            throw new UnauthorizedError("No token available to refresh.");
        }

        try {
            const strategy = TokenStrategyFactory.create(token);
            const expired = strategy.isExpired(token);
            if (expired) {
                throw new SessionExpiredError("Token is expired.");
            }
            this.eventBus.dispatch(AUTH_EVENTS.TOKEN_REFRESH, { token });
            return { success: true, token };
        } catch (error) {
            this.eventBus.dispatch(AUTH_EVENTS.TOKEN_REFRESH_FAILED, { error: error.message });
            throw error;
        }
    }
}