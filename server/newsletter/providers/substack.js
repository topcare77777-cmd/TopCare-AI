export class SubstackProvider {
    constructor() { this.name = 'substack'; }
    validateEnvironment() {
        if (!process.env.SUBSTACK_EMBED_URL) {
            throw new Error('[SubstackProvider] Missing SUBSTACK_EMBED_URL.');
        }
        return { embedUrl: process.env.SUBSTACK_EMBED_URL.trim() };
    }
}