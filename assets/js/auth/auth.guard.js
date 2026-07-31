/**
 * file: assets/js/auth/auth.guard.js
 */
import { Core } from '../core/index.js';
import { AUTH_EVENTS } from './auth.types.js';
import { AuthPolicy } from './auth.policy.js';

export class AuthGuard {
    static evaluate(user, permissionConstant) {
        const isAuthorized = AuthPolicy.can(user, permissionConstant);

        if (!isAuthorized) {
            Core.Logger.warn(`[AuthGuard] Access denied for user '${user?.id || 'guest'}' on permission '${permissionConstant}'.`);
            Core.Event.emit(AUTH_EVENTS.UNAUTHORIZED, {
                userId: user?.id || null,
                permission: permissionConstant,
                timestamp: Date.now()
            });
        }

        return isAuthorized;
    }
}