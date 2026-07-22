/**
 * TopCare AI Platform V2.0.0
 * Enterprise Logger V2
 * Path: assets/js/core/enterprise.logger.v2.js
 */
const EnterpriseLoggerV2 = {
    log(msg, meta = {}) { console.log(`[ENTERPRISE] ${msg}`, meta); },
    error(msg, err = {}) { console.error(`[ENTERPRISE ERROR] ${msg}`, err); }
};

export default EnterpriseLoggerV2;