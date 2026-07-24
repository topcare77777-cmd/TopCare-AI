/**
 * TopCare AI Platform V2.0.0
 * LocalAuthRepository returning Result.ok() and Result.fail() consistently
 * Path: assets/js/auth/repositories/local.auth.repository.js
 */

class LocalAuthRepository extends AuthRepositoryInterface {
    constructor(provider, cacheProvider) {
        super();
        this.provider = provider;
        this.cacheProvider = cacheProvider;
        this.cacheKey = "user_profile_cache";
    }

    async login(email, password) {
        try {
            const result = await this.provider.login(email, password);
            const userModel = UserFactory.create(result.user);
            this.cacheProvider.set(this.cacheKey, userModel.toJSON());
            return Result.ok({ user: userModel.toJSON(), token: result.token });
        } catch (e) {
            return Result.fail(e.message || "Login repository failed.");
        }
    }

    async register(name, email, password) {
        try {
            const result = await this.provider.register(name, email, password);
            const userModel = UserFactory.create(result.user);
            this.cacheProvider.set(this.cacheKey, userModel.toJSON());
            return Result.ok({ user: userModel.toJSON(), token: result.token });
        } catch (e) {
            return Result.fail(e.message || "Register repository failed.");
        }
    }

    async forgotPassword(email) {
        try {
            const res = await this.provider.forgotPassword(email);
            return Result.ok(res);
        } catch (e) {
            return Result.fail(e.message || "Forgot password repository failed.");
        }
    }
}