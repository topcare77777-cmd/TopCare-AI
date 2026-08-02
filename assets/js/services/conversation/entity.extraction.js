/**
 * TOPCARE AI PLATFORM V2
 * ENTITY EXTRACTION NODE
 *
 * Path:
 * assets/js/services/conversation/entity.extraction.js
 */


import { deepFreezeDTO }
    from '../../core/utils/dto.js';



export const EntityExtraction = Object.freeze({

    extractEntities(userMessageText = '') {


        const text =
            String(userMessageText)
                .trim();


        const entities = {};



        const roleMatch =
            text.match(
                /(posisi|sebagai|role)\s+([A-Za-z\s]+)/i
            );


        if (
            roleMatch &&
            roleMatch[2]
        ) {

            entities.targetRole =
                roleMatch[2].trim();

        }



        if (
            /stres|cemas|khawatir|down/i
                .test(text)
        ) {

            entities.emotion =
                'stress';


        } else if (
            /senang|semangat|antusias/i
                .test(text)
        ) {

            entities.emotion =
                'enthusiastic';

        }



        return deepFreezeDTO(
            entities
        );

    }

});


export default EntityExtraction;
