/**
 * TOPCARE AI PLATFORM V2
 *
 * INTENT RECOGNITION NODE
 *
 * Path:
 * assets/js/services/conversation/intent.recognition.js
 *
 * Status:
 * ACTIVE - SPRINT B GOLDEN BASELINE
 *
 * Role:
 * Detect user conversation intent.
 */


import { deepFreezeDTO }
    from '../../core/utils/dto.js';



export const IntentRecognition = Object.freeze({


    recognizeIntent(userMessageText = '') {


        const text =
            String(userMessageText)
                .toLowerCase()
                .trim();


        let recognizedIntent =
            'GENERAL_CONVERSATION';


        let confidence =
            0.5;



        if (
            text.includes('cv') ||
            text.includes('resume') ||
            text.includes('lamaran')
        ) {

            recognizedIntent =
                'OPTIMIZE_RESUME';


            confidence =
                0.95;


        } else if (
            text.includes('stres') ||
            text.includes('personality') ||
            text.includes('sifat') ||
            text.includes('karakter')
        ) {

            recognizedIntent =
                'ASSESS_PERSONALITY';


            confidence =
                0.90;

        }



        return deepFreezeDTO({

            intent:
                recognizedIntent,

            confidence,

            rawText:
                userMessageText

        });

    }


});


export default IntentRecognition;
