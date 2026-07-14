export function fadeIn(element){

    if(!element) return;

    element.animate(

        [

            {

                opacity:0,

                transform:"translateY(40px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],

        {

            duration:600,

            easing:"ease"

        }

    );

}