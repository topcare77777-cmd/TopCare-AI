/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/runtime/post-login.navigator.js
 * Status: MIGRATED TO AUTHORITATIVE APP-ROUTER
 */
import { appRouter } from '../core/router/app-router.js';

export class PostLoginNavigator {
    static navigateToDashboard() {
        appRouter.navigate('/home');
    }
    static redirect(path) {
        appRouter.navigate(path);
    }
}
export default PostLoginNavigator;