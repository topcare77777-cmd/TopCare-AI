/**
 * TopCare AI Platform V2.0.0
 * Unit Test for Provider Registry & Factory
 * Path: assets/js/auth/__tests__/auth.provider.factory.test.js
 */

function runProviderFactoryTests() {
    console.log("[Test] Running ProviderFactory tests...");
    const provider = AuthProviderFactory.create({ API_PROVIDER: "local" });
    if (provider instanceof LocalAuthProvider) {
        console.log("[Test] ProviderFactory tests PASSED.");
    } else {
        console.error("[Test] ProviderFactory tests FAILED.");
    }
}