/**
 * TopCare AI
 * Loader Service
 */


const LoaderService = (() => {


    let counter = 0;



    function start(){


        counter++;


        document
        .body
        .classList
        .add(
            "is-loading"
        );


    }





    function stop(){


        counter--;


        if(counter <= 0){

            counter = 0;


            document
            .body
            .classList
            .remove(
                "is-loading"
            );


        }


    }





    function show(element){


        const target =
        document.querySelector(
            element
        );


        if(target){

            target.innerHTML =
            `
            <div class="skeleton-loader">
                Loading...
            </div>
            `;

        }


    }







    function hide(element){


        const target =
        document.querySelector(
            element
        );


        if(target){

            target.innerHTML="";

        }


    }






    return {

        start,
        stop,
        show,
        hide

    };



})();



window.LoaderService =
LoaderService;