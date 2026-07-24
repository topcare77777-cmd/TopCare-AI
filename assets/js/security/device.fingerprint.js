/**
 * TopCare AI Platform V2.0.0
 * Secure DeviceFingerprint Utility avoiding global prototype monkey patching
 * Path: assets/js/security/device.fingerprint.js
 */

class DeviceFingerprint {
    static generate(userAgent = '') {
        let hash = 0;
        const str = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : 'default-device');
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return `dev-${Math.abs(hash)}`;
    }
}