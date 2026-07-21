import app from "./core/app.js";

document.addEventListener("DOMContentLoaded", async () => {
try {
console.log("TopCare AI Platform V2.0.0 booting...");
await app.start();
console.log("TopCare AI Platform V2.0.0 Aplikasi berhasil dimuat tanpa error.");
} catch (error) {
console.error("Critical error during application bootstrap:", error);
}
});