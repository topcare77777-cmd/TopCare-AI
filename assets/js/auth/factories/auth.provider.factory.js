/**
 * TopCare AI Platform V2.0.0
 * AuthProviderFactory utilizing ProviderRegistry
 * Path: assets/js/auth/factories/auth.provider.factory.js
 */

const globalProviderRegistry = new ProviderRegistry();
globalProviderRegistry.register("local", () => new LocalAuthProvider());
globalProviderRegistry.register("firebase", () => typeof FirebaseAuthProvider !== 'undefined' ? new FirebaseAuthProvider() : new LocalAuthProvider());
globalProviderRegistry.register("supabase", () => typeof SupabaseAuthProvider !== 'undefined' ? new SupabaseAuthProvider() : new LocalAuthProvider());
globalProviderRegistry.register("rest", () => typeof RestAuthProvider !== 'undefined' ? new RestAuthProvider() : new LocalAuthProvider());

class AuthProviderFactory {
    static create(config) {
        const type = config && config.API_PROVIDER ? config.API_PROVIDER : "local";
        if (!globalProviderRegistry.exists(type)) {
            return globalProviderRegistry.resolve("local");
        }
        return globalProviderRegistry.resolve(type);
    }

    static getRegistry() {
        return globalProviderRegistry;
    }
}