/**
 * TopCare AI Platform V2.0.0
 * Permission Engine
 * Path: assets/js/core/permission.engine.js
 */
const PermissionEngine = {
    roles: {
        admin: ['read', 'write', 'delete', 'execute'],
        user: ['read', 'write'],
        guest: ['read']
    },

    hasPermission(role, permission) {
        const allowed = this.roles[role] || [];
        return allowed.includes(permission);
    }
};

export default PermissionEngine;