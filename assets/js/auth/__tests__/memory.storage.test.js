/**
 * TopCare AI Platform V2.0.0
 * Unit Test for MemoryStorage
 * Path: assets/js/auth/__tests__/memory.storage.test.js
 */

function runMemoryStorageTests() {
    console.log("[Test] Running MemoryStorage tests...");
    const storage = new MemoryStorage({ STORAGE_PREFIX: "test_" });
    storage.setItem("foo", "bar");
    if (storage.getItem("foo") === "bar" && storage.size() === 1) {
        console.log("[Test] MemoryStorage tests PASSED.");
    } else {
        console.error("[Test] MemoryStorage tests FAILED.");
    }
}