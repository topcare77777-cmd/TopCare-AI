export class MailchimpProvider {
    constructor() { this.name = 'mailchimp'; }
    validateEnvironment() {
        if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID) {
            throw new Error('[MailchimpProvider] Missing MAILCHIMP_API_KEY or MAILCHIMP_LIST_ID.');
        }
        return {
            apiKey: process.env.MAILCHIMP_API_KEY.trim(),
            listId: process.env.MAILCHIMP_LIST_ID.trim(),
            apiUrl: process.env.MAILCHIMP_API_URL || 'https://us1.api.mailchimp.com/3.0/lists'
        };
    }
}