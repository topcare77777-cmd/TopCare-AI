/**
 * TopCare AI Platform V2.0.0
 * IUserRepository Contract Interface
 * Path: assets/js/auth/domain/user.repository.interface.js
 */

class IUserRepository {
    async findByEmail(email) { throw new Error("Not implemented"); }
    async findById(userId) { throw new Error("Not implemented"); }
    async create(userEntity) { throw new Error("Not implemented"); }
    async update(userEntity) { throw new Error("Not implemented"); }
    async delete(userId) { throw new Error("Not implemented"); }
}