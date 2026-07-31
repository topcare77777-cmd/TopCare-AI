/**
 * file: assets/js/sdk/plugin.docs.engine.js
 */

import { Core } from '../core/index.js';

export class PluginDocsEngine {
    /**
     * Mengekstrak manifes dan metadata plugin untuk menghasilkan dokumentasi API terstruktur (Markdown / JSON).
     * @param {Object} manifest 
     * @returns {string} Markdown Structured API Documentation
     */
    static generateMarkdownDocs(manifest) {
        if (!manifest) return "# Error: Invalid Manifest";

        const permissions = manifest.permissions || {};
        const services = Array.isArray(permissions.services) ? permissions.services.join(', ') : 'None';
        const capabilities = Array.isArray(manifest.capabilities) ? manifest.capabilities.join(', ') : 'Standard';

        return `
# Plugin API Documentation: ${manifest.name} (\`${manifest.id}\`)

**Version:** \`${manifest.version}\`  
**Publisher ID:** \`${manifest.publisherId || 'Unknown'}\`  
**Description:** ${manifest.description || 'No description provided.'}

---

## 🔒 Security & Capability Requirements

- **Requested Services:** \`${services}\`
- **Capabilities Granted:** \`${capabilities}\`
- **Cache Policy:** \`${manifest.cachePolicy || 'unload'}\`

---

## 📦 Dependencies

\`\`\`json
${JSON.stringify(manifest.dependencies || {}, null, 2)}
\`\`\`

---
*Generated automatically by TopCare AI Platform Docs Engine v135.0*
`.trim();
    }
}