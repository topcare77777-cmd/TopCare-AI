import { GatewayError } from './GatewayError.js';

export class ValidationError extends GatewayError {
    constructor(message = 'Format payload tidak valid.') {
        super(400, 'INVALID_EMAIL', message);
        this.name = 'ValidationError';
    }
}