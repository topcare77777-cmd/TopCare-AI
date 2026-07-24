/**
 * TopCare AI Platform V2.0.0
 * Unit Test for EventBus with off() validation
 * Path: assets/js/auth/__tests__/browser.event.bus.test.js
 */

function runEventBusTests() {
    console.log("[Test] Running EventBus tests...");
    const bus = new MemoryEventBus();
    let count = 0;
    const cb = () => count++;
    bus.on("test_event", cb);
    bus.dispatch("test_event");
    bus.off("test_event", cb);
    bus.dispatch("test_event");

    if (count === 1) {
        console.log("[Test] EventBus tests PASSED.");
    } else {
        console.error("[Test] EventBus tests FAILED. Count:", count);
    }
}