/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/repositories/auth.repository.interface.js
 * Layer        : Auth Repository Interface Layer
 * Status       : ACTIVE
 * Version      : 2.1.0
 * Architecture : Development Constitution v1.1
 * Description  : Abstract interface defining authentication and user 
 *                data contracts without concrete implementations.
 * -----------------------------------------------------------------
 */

export class AuthRepositoryInterface {
    async createUser(user) { throw new Error("Not implemented"); }
    async findUserByEmail(email) { throw new Error("Not implemented"); }
    async findUserByUsername(username) { throw new Error("Not implemented"); }
    async updateUser(user) { throw new Error("Not implemented"); }
    async deleteUser(userId) { throw new Error("Not implemented"); }
    async verifyCredentials(identifier, password) { throw new Error("Not implemented"); }
    async exists(identifier) { throw new Error("Not implemented"); }
    async getAllUsers() { throw new Error("Not implemented"); }
    async changePassword(userId, newPassword) { throw new Error("Not implemented"); }
}

export default AuthRepositoryInterface;