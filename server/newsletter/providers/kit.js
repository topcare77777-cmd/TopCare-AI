export class KitProvider {
    constructor() { this.name = 'kit'; }
    validateEnvironment() {
        if (!process.env.KIT_API_KEY || !process.env.KIT_FORM_ID) {
            throw new Error('[KitProvider] Missing KIT_API_KEY or KIT_FORM_ID.');
        }
        return {
            apiKey: process.env.KIT_API_KEY.trim(),
            formId: process.env.KIT_FORM_ID.trim(),
            apiUrl: process.env.KIT_API_URL || 'https://api.convertkit.com/v3/forms'
        };
    }
}