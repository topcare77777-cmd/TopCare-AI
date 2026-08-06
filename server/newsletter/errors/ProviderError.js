import { GatewayError } from './GatewayError.js';

export class ProviderError extends GatewayError {
    constructor(statusCode = 502, code = 'PROVIDER_ERROR', message = 'Gagal memproses pendaftaran ke penyedia.') {
        super(statusCode, code, message);
        this.name = 'ProviderError';
    }
}