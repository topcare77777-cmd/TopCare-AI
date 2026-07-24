/**
 * TopCare AI Platform V2.0.0
 * AuthRepository abstracting Provider and Storage layer from UseCases
 * Path: assets/js/auth/repositories/auth.repository.js
 */

class AuthRepository {
    constructor(provider, storage) {
        this.provider = provider;
        this.storage = storage;
    }

    async login(email, password) {
        return await this.provider.login(email, password);
    }

    async register(name, email, password) {
        return await this.provider.register(name, email, password);
    }

    async forgotPassword(email) {
        return await this.provider.forgotPassword(email);
    }
}