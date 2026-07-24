/**
 * TopCare AI Platform V2.0.0
 * Immutable UserSnapshot DTO for safe boundary export
 * Path: assets/js/auth/domain/user.snapshot.js
 */

class UserSnapshot {
    constructor(userEntity) {
        this.userId = userEntity.userId;
        this.fullName = userEntity.fullName;
        this.email = userEntity.email;
        this.membershipType = userEntity.membershipType;
        this.accountStatus = userEntity.accountStatus;
        this.createdAt = userEntity.createdAt;
        this.updatedAt = userEntity.updatedAt;
        if (typeof deepFreeze === 'function') {
            deepFreeze(this);
        } else {
            Object.freeze(this);
        }
    }
}