/**
 * TopCare AI Platform V2.0.0
 * Persistent LocalStorageUserRepository featuring Optimistic Concurrency Control with Generation & Version
 * Path: assets/js/auth/adapters/local.storage.user.repository.js
 */

class LocalStorageUserRepository extends IUserRepository {
    constructor(storageKey = 'topcare_users_db_v3', tokenGenerator = new CryptoTokenGenerator()) {
        super();
        this.storageKey = storageKey;
        this.tokenGenerator = tokenGenerator;
    }

    _loadStorage() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return { schemaVersion: 2, users: {} };
            const parsed = JSON.parse(raw);
            return parsed.schemaVersion ? parsed : { schemaVersion: 2, users: parsed };
        } catch (e) {
            return { schemaVersion: 2, users: {} };
        }
    }

    _saveStorage(db) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(db));
        } catch (e) {
            throw new PersistenceException("Failed to persist user state to LocalStorage.");
        }
    }

    async findByEmail(email) {
        if (!email) return null;
        const db = this._loadStorage();
        const targetEmail = email.toLowerCase().trim();
        const foundData = Object.values(db.users).find(u => u.email === targetEmail);
        if (!foundData) return null;

        return new User(foundData, this.tokenGenerator);
    }

    async findById(userId) {
        const db = this._loadStorage();
        const foundData = db.users[userId];
        if (!foundData) return null;

        return new User(foundData, this.tokenGenerator);
    }

    async create(userEntity) {
        const db = this._loadStorage();
        if (db.users[userEntity.userId]) {
            throw new ConcurrentModificationException("User ID conflict detected during creation.");
        }
        db.users[userEntity.userId] = {
            userId: userEntity.userId,
            fullName: userEntity.fullName,
            email: userEntity.email,
            passwordHash: userEntity.passwordHash,
            membershipType: userEntity.membershipType,
            accountStatus: userEntity.accountStatus,
            version: userEntity.version,
            generation: userEntity.generation,
            createdAt: userEntity.createdAt,
            updatedAt: userEntity.updatedAt
        };
        this._saveStorage(db);
        return userEntity;
    }

    async update(userEntity, expectedVersion, expectedGeneration) {
        const db = this._loadStorage();
        const current = db.users[userEntity.userId];
        if (!current) {
            throw new RepositoryException("User not found for update.");
        }

        if (expectedVersion !== undefined && current.version !== expectedVersion) {
            throw new ConcurrentModificationException("Update conflict: Version mismatch detected.");
        }
        if (expectedGeneration !== undefined && current.generation !== expectedGeneration) {
            throw new ConcurrentModificationException("Update conflict: Generation mismatch detected.");
        }

        userEntity.version++;
        userEntity.generation++;
        db.users[userEntity.userId] = {
            userId: userEntity.userId,
            fullName: userEntity.fullName,
            email: userEntity.email,
            passwordHash: userEntity.passwordHash,
            membershipType: userEntity.membershipType,
            accountStatus: userEntity.accountStatus,
            version: userEntity.version,
            generation: userEntity.generation,
            createdAt: userEntity.createdAt,
            updatedAt: userEntity.updatedAt
        };
        this._saveStorage(db);
        return userEntity;
    }

    async delete(userId) {
        const db = this._loadStorage();
        if (db.users[userId]) {
            delete db.users[userId];
            this._saveStorage(db);
            return true;
        }
        return false;
    }
}