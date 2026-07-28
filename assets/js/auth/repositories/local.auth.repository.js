/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 *File         : assets/js/auth/repositories/local.auth.repository.js
 * Layer        : Auth Repository Local Implementation
 * Status       : ACTIVE
 * Version      : 2.2.0
 * Architecture : Development Constitution v1.1
 * Description  : Concrete implementation handling authentication verification 
 *                leveraging user repository query methods for lookup.
 * -----------------------------------------------------------------
 */

import { LocalUserRepository } from "./local-user.repository.js";

export class LocalAuthRepository {
    constructor(userRepository = new LocalUserRepository()) {
        this.userRepository = userRepository;
    }

    _comparePassword(inputPassword, storedPassword) {
        // Abstracted password comparison to support future hashing algorithms (bcrypt/argon2)
        return inputPassword === storedPassword;
    }

    async verifyCredentials(identifier, password) {
        if (!identifier || !password) {
            return null;
        }
        const target = identifier.trim();

        // Memanfaatkan method pencarian terpusat pada user repository
        const user = target.includes("@")
            ? await this.userRepository.findUserByEmail(target)
            : await this.userRepository.findUserByUsername(target);

        if (!user || !this._comparePassword(password, user.password)) {
            return null; // Business outcome: credential mismatch returns null, not exception
        }

        // Return user payload without password for security
        const { password: _, ...safeUser } = user;
        return safeUser;
    }

    async changePassword(userId, newPassword) {
        if (!userId || !newPassword) {
            throw new Error("User ID and new password are required.");
        }
        return await this.userRepository.changePassword(userId, newPassword);
    }
}

export default LocalAuthRepository;