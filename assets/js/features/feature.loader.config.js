/**
 * file: assets/js/features/feature.loader.config.js
 * Status: APPROVED & FIXED (ADDED TEST-INTROVERT-EXTROVERT & TEST-MBTI ROUTES)
 */

import { FeatureLoaderService } from './feature.loader.service.js';

// Register feature manifests (Manifest-First Routing & Lazy Dynamic Import)
FeatureLoaderService.registerFeatureManifest({
    id: "personality",
    version: "1.0.0",
    dependencies: [],
    routes: [
        { path: '/personality', name: 'personality' },
        { path: '/personality-test', name: 'personality-test' },
        { path: '/test-introvert-extrovert', name: 'test-introvert-extrovert' },
        { path: '/test-mbti', name: 'test-mbti' }
    ],
    loader: () => import('./personality/personality.feature.js')
});