/**
 * TOPCARE AI PLATFORM V2 — AUTH USER COMPATIBILITY BRIDGE
 * Path: assets/js/auth/auth.user.js
 * Status: ACTIVE - FIX BUILD 138.3
 * SRP: Robust Bridge Adapter linking legacy imports to V2 Domain Entity (user.entity.js)
 */

import * as UserEntityModule from './domain/user.entity.js';

// Resolve class from default export or named export (User / UserEntity)
const DomainUserClass = UserEntityModule.default
                     || UserEntityModule.User
                     || UserEntityModule.UserEntity;

export class User {
    constructor(options = {}) {
        if (DomainUserClass) {
            const instance = new DomainUserClass(options);
            Object.assign(this, instance);
            this._domainInstance = instance;
        } else {
            // Fallback lightweight structure if domain class fails to resolve
            this.id = options.id || options.userId || `usr_${Date.now()}`;
            this.username = options.username || '';
            this.email = options.email || '';
            this.fullName = options.fullName || options.name || '';
            this.roles = options.roles || ['USER'];
            this.permissions = options.permissions || [];
        }
    }

    static fromDTO(dto = {}) {
        if (DomainUserClass && typeof DomainUserClass.fromDTO === 'function') {
            return DomainUserClass.fromDTO(dto);
        }
        return new User(dto);
    }

    static create(data = {}) {
        if (DomainUserClass && typeof DomainUserClass.create === 'function') {
            return DomainUserClass.create(data);
        }
        return new User(data);
    }

    toPlainObject() {
        if (this._domainInstance && typeof this._domainInstance.toPlainObject === 'function') {
            return this._domainInstance.toPlainObject();
        }
        return { ...this };
    }
}

export default User;
