/**
 * TopCare AI Platform V2.0.0
 * Immutable Value Object UserModel
 * Path: assets/js/auth/auth.model.js
 */

class UserModel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.email = data.email || "";
        this.name = data.name || "";
        this.username = data.username || "";
        this.phone = data.phone || "";
        this.avatar = data.avatar || "";
        this.role = data.role || "Member";
        this.membership = data.membership || "Free";
        this.status = data.status || "active";
        this.createdAt = data.createdAt || Date.now();
        this.updatedAt = data.updatedAt || Date.now();
        this.lastLogin = data.lastLogin || null;
        this.emailVerified = data.emailVerified || false;
        this.phoneVerified = data.phoneVerified || false;
        
        this.preferences = deepFreeze(data.preferences || {
            language: "id",
            theme: "dark",
            notifications: true
        });
        this.metadata = deepFreeze(data.metadata || {});
        this.permissions = deepFreeze(data.permissions || ["read:content", "use:ai"]);

        deepFreeze(this);
    }

    isValid() {
        return Boolean(this.id && this.email);
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            username: this.username,
            phone: this.phone,
            avatar: this.avatar,
            role: this.role,
            membership: this.membership,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            lastLogin: this.lastLogin,
            emailVerified: this.emailVerified,
            phoneVerified: this.phoneVerified,
            preferences: this.preferences,
            metadata: this.metadata,
            permissions: this.permissions
        };
    }
}