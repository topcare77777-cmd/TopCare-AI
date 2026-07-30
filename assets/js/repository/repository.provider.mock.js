/**
 * file: assets/js/repository/repository.provider.mock.js
 */

import { Core } from '../core/index.js';

export class MockRepositoryProvider {
    constructor() {
        Object.seal(this);
    }

    async query(endpoint, options = {}) {
        Core.Logger.debug(`MockProvider QUERY endpoint: ${endpoint}`, options);

        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 300));

        if (endpoint === '/auth/profile') {
            return {
                success: true,
                data: { id: 1, name: 'TopCare Enterprise User', role: 'admin', email: 'user@topcare.ai' }
            };
        }

        return {
            success: true,
            data: { endpoint, timestamp: Date.now() }
        };
    }

    async mutate(endpoint, payload = {}, options = {}) {
        Core.Logger.debug(`MockProvider MUTATE endpoint: ${endpoint}`, { payload, options });

        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 400));

        if (endpoint === '/auth/login') {
            const username = payload.username || payload.email || 'User';
            return {
                success: true,
                token: 'mock_jwt_token_' + Date.now(),
                user: { id: 1, name: username, role: 'admin' }
            };
        }

        if (endpoint === '/auth/refresh') {
            return {
                success: true,
                token: 'refreshed_jwt_token_' + Date.now()
            };
        }

        if (endpoint === '/auth/logout') {
            return {
                success: true
            };
        }

        return {
            success: true,
            data: { endpoint, payload, timestamp: Date.now() }
        };
    }
}