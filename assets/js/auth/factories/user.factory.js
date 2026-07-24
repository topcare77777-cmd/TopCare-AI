/**
 * TopCare AI Platform V2.0.0
 * UserFactory to normalize and create UserModel
 * Path: assets/js/auth/factories/user.factory.js
 */

class UserFactory {
    static create(data = {}) {
        const normalizedData = {
            ...data,
            email: (data.email || "").trim().toLowerCase(),
            username: (data.username || "").trim()
        };
        return new UserModel(normalizedData);
    }
}