/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/auth/runtime/auth.observer.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../../core/router/app-router.js';

export class AuthObserver {
    static init() {
        window.addEventListener('auth:logout', () => {
            appRouter.navigate('/login');
        });
        window.addEventListener('auth:unauthorized', () => {
            appRouter.navigate('/login');
        });
    }
}
export default AuthObserver;