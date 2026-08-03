// assets/js/core/topcare-app.js

import { Router } from '../router/router.js';
import { CoachController } from '../coach/coach.js';
import { MobileMenu } from '../core/mobile-menu.js';


export const TopCareApp = {

    initialized: false,


    start() {


        if (this.initialized) {
            return;
        }



        const rootContainer =
            document.getElementById(
                'main-content'
            );



        if (!rootContainer) {

            console.warn(
                '[TopCareApp] Main content container missing.'
            );

            return;

        }



        /*
         * Mobile navigation layer
         */
        MobileMenu.init();



        /*
         * Canonical Router initialization
         */
        Router.init();



        /*
         * AI Coach Home Event Bridge
         *
         * Home Widget
         *        |
         *        v
         * Custom Event
         *        |
         *        v
         * Canonical Router
         */
        document.addEventListener(
            'topcare:open-coach',
            () => {

                Router.navigate(
                    '/coach'
                );

            }
        );



        /*
         * Legacy Home Coach Controller
         */
        const coachContainer =
            document.getElementById(
                'topcare-ai-coach-container'
            );



        if (coachContainer) {

            CoachController.init(
                coachContainer
            );

        }



        this.initialized = true;


        console.log(
            '[TopCareApp] Application initialized.'
        );

    }

};


export default TopCareApp;
