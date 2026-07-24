/**
 * TopCare AI Platform V2.0.0
 * Composition Root (main.js) instantiating dependencies for pure Dependency Injection
 * Path: assets/js/auth/main.js
 */

const appConfig = AUTH_CONFIG;
const appEventBus = new BrowserEventBus();
const appStorage = new AuthStorage(appConfig);
const appSessionManager = new SessionManager(appStorage, appConfig, appEventBus);
const appProvider = AuthProviderFactory.create(appConfig);

const authManagerInstance = new AuthManager({
    config: appConfig,
    eventBus: appEventBus,
    storage: appStorage,
    sessionManager: appSessionManager,
    provider: appProvider
});

window.TopCareAuth = authManagerInstance;