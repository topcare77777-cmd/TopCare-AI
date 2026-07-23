/**
 * TopCare AI Platform V2.0.0
 * Developer Dashboard
 * Path: assets/js/dev/dashboard.js
 */
import EnterpriseConfig from '../config/enterprise.config.js';
import Logger from '../core/logger.js';

const Dashboard = {
    init() {
        if (!EnterpriseConfig.debug) return;
        Logger.info("[Dashboard] Dev dashboard initialized.");
    }
};

export default Dashboard;