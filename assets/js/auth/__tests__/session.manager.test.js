/**
 * TopCare AI Platform V2.0.0
 * Unit Test for SessionManager lifecycle & timer
 * Path: assets/js/auth/__tests__/session.manager.test.js
 */

function runSessionManagerTests() {
    console.log("[Test] Running SessionManager tests...");
    const storage = new MemoryStorage();
    const bus = new MemoryEventBus();
    const sessionMgr = new SessionManager(storage, { SESSION_TIMEOUT_MS: 5000 }, bus);
    
    sessionMgr.createSession({ id: "1" }, "token");
    if (sessionMgr.isAuthenticated()) {
        console.log("[Test] SessionManager tests PASSED.");
    } else {
        console.error("[Test] SessionManager tests FAILED.");
    }
    sessionMgr.destroy();
}