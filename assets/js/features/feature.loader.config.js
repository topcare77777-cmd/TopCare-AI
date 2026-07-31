/**
 * file: assets/js/features/feature.loader.config.js
 */

import { FeatureLoaderService } from './feature.loader.service.js';

// Register feature manifests (Manifest-First Routing & Lazy Dynamic Import)
FeatureLoaderService.registerFeatureManifest({
    id: "personality",
    version: "1.0.0",
    dependencies: [],
    routes: [
        { path: '/personality', name: 'personality' }
    ],
    loader: () => import('./personality/personality.feature.js')
});

FeatureLoaderService.registerFeatureManifest({
    id: "coach",
    version: "1.0.0",
    dependencies: [],
    routes: [
        { path: '/coach', name: 'coach' }
    ],
    loader: () => import('./coach/coach.feature.js')
});