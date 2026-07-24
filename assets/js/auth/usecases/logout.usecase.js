/**
 * TopCare AI Platform V2.0.0
 * Logout UseCase
 * Path: assets/js/auth/usecases/logout.usecase.js
 */

class LogoutUseCase {
    constructor(sessionManager, eventBus) {
        this.sessionManager = sessionManager;
        this.eventBus = eventBus || globalAuthEventBus;
    }

    execute() {
        this.eventBus.dispatch(AUTH_EVENTS.LOGOUT_STARTED, {});
        this.sessionManager.destroySession(AUTH_EVENTS.LOGOUT);
        return { success: true };
    }
}