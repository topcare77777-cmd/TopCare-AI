/**
 * TopCare AI Platform V2.0.0
 * Error Boundary & Global Crash Recovery
 * Path: assets/js/core/error.boundary.js
 */
import NotificationEngine from './notification.engine.js';

const ErrorBoundary = {
    init() {
        window.addEventListener('error', (event) => {
            console.error('[ErrorBoundary] Uncaught error:', event.error);
            NotificationEngine.show('An unexpected platform error occurred. Recovery initiated.', 'error');
            event.preventDefault();
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('[ErrorBoundary] Unhandled promise rejection:', event.reason);
            NotificationEngine.show('Async operation failed safely.', 'warning');
            event.preventDefault();
        });
    }
};

export default ErrorBoundary;