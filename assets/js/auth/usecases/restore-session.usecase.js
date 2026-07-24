/**
 * TopCare AI Platform V2.0.0
 * RestoreSession UseCase
 * Path: assets/js/auth/usecases/restore-session.usecase.js
 */

class RestoreSessionUseCase {
    constructor(sessionManager, eventBus) {
        this.sessionManager = sessionManager;
        this.eventBus = eventBus || globalAuthEventBus;
    }

    execute() {
        const session = this.sessionManager.getSession();
        if (session) {
            this.eventBus.dispatch(AUTH_EVENTS.SESSION_RESTORED, { user: session.user });
            return session.user;
        }
        return null;
    }
}