/**
 * TopCare AI Platform V2.0.0
 * Asset Validation Engine
 * Path: assets/js/core/asset.validator.js
 */
import AssetsRegistry from '../config/assets.registry.js';
import Logger from './logger.js';

const AssetValidator = {
    async run() {
        Logger.info("[AssetValidator] Running asset inventory verification...");
        let brokenCount = 0;
        let totalChecked = 0;

        const flattenRegistry = (obj, prefix = '') => {
            let list = [];
            for (const k in obj) {
                if (typeof obj[k] === 'string' && k !== 'init') {
                    list.push(obj[k]);
                } else if (typeof obj[k] === 'object' && obj[k] !== null) {
                    list = list.concat(flattenRegistry(obj[k], k));
                }
            }
            return list;
        };

        const assetPaths = flattenRegistry(AssetsRegistry);
        
        for (const path of assetPaths) {
            totalChecked++;
            try {
                const response = await fetch(path, { method: 'HEAD' });
                if (!response.ok && response.status !== 0) {
                    Logger.warn(`[AssetValidator] Broken or missing asset detected: ${path}`);
                    brokenCount++;
                }
            } catch {
                // Ignore local file protocol fetch quirks if running offline
            }
        }

        Logger.info(`[AssetValidator] Complete. Total Checked: ${totalChecked}, Broken/Missing: ${brokenCount}`);
        return { totalChecked, brokenCount };
    }
};

export default AssetValidator;