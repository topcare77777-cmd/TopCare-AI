/**
 * TopCare AI Platform V2.0.0
 * Route Guard
 * Path: assets/js/core/route.guard.js
 */
import SessionEngine from './session.engine.js';
import PermissionEngine from './permission.engine.js';

const RouteGuard = {
    canActivate(requiredRole) {
        const user = SessionEngine.getUser();
        if (!user) return false;
        if (!requiredRole) return true;
        return PermissionEngine.hasPermission(user.role, requiredRole);
    }
};

export default RouteGuard;