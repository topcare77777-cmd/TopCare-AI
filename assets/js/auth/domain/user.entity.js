/**
 * TopCare AI Platform V2.0.0
 * Pure Mutable User Aggregate Root strictly isolated from system clock and token generators
 * Path: assets/js/auth/domain/user.entity.js
 */

class User {
    constructor(options = {}) {
        if (!options.email) {
            throw new ValidationException("User email is mandatory.");
        }
        if (!options.userId) {
            throw new ValidationException("User ID metadata is required.");
        }
        if (!options.createdAt || !options.updatedAt) {
            throw new ValidationException("Timestamp metadata is required.");
        }
        
        this.userId = options.userId;
        this.fullName = options.fullName || 'Enterprise User';
        this.email = options.email.toLowerCase().trim();
        this.passwordHash = options.passwordHash || '';
        this.membershipType = options.membershipType || MembershipTier.STANDARD;
        this.accountStatus = options.accountStatus || 'ACTIVE';
        this.version = options.version || 1;
        this.generation = options.generation || 1;
        this.createdAt = options.createdAt;
        this.updatedAt = options.updatedAt;
    }

    updateProfile(fullName, email, timestampIso) {
        if (!timestampIso) throw new ValidationException("Timestamp metadata is required for update.");
        if (fullName) this.fullName = fullName.trim();
        if (email) this.email = email.toLowerCase().trim();
        this.updatedAt = timestampIso;
        this.version++;
    }

    changePassword(newPasswordHash, timestampIso) {
        if (!timestampIso) throw new ValidationException("Timestamp metadata is required for password change.");
        if (!newPasswordHash) throw new ValidationException("Password hash required.");
        this.passwordHash = newPasswordHash;
        this.updatedAt = timestampIso;
        this.version++;
    }

    updateMembership(newType, timestampIso) {
        if (!timestampIso) throw new ValidationException("Timestamp metadata is required for membership update.");
        if (!MembershipPolicy.canUpgrade(this.membershipType, newType)) {
            throw new DomainRuleException(`Invalid membership transition from ${this.membershipType} to ${newType}.`);
        }
        this.membershipType = newType;
        this.updatedAt = timestampIso;
        this.version++;
    }

    toSnapshot() {
        return new UserSnapshot(this);
    }
}