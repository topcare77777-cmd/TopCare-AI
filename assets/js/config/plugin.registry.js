/**
 * TopCare AI
 * Plugin Registry
 */


import PluginManager
from "../kernel/plugin.js";


import AIPlugin
from "../plugins/ai/index.js";


import AnalyticsPlugin
from "../plugins/analytics/index.js";


import StoragePlugin
from "../plugins/storage/index.js";




PluginManager.register(
"ai",
AIPlugin
);



PluginManager.register(
"analytics",
AnalyticsPlugin
);



PluginManager.register(
"storage",
StoragePlugin
);



export default PluginManager;