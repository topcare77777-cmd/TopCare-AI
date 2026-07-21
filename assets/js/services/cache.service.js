/**
 * TopCare AI
 * Cache Service
 * Lightweight Client Cache
 */


const CacheService = (() => {


    const PREFIX = "topcare_cache_";



    function set(
        key,
        value,
        expiry = 3600000
    ){

        const payload = {

            data:value,

            expiry:
            Date.now() + expiry

        };


        try{

            localStorage.setItem(
                PREFIX + key,
                JSON.stringify(payload)
            );


        }catch(error){

            console.warn(
                "Cache storage unavailable"
            );

        }


    }





    function get(key){

        try{


            const item =
            localStorage.getItem(
                PREFIX + key
            );


            if(!item){
                return null;
            }



            const payload =
            JSON.parse(item);



            if(
                Date.now()
                >
                payload.expiry
            ){

                remove(key);

                return null;

            }



            return payload.data;



        }
        catch(error){

            return null;

        }


    }






    function remove(key){

        localStorage.removeItem(
            PREFIX + key
        );

    }





    function clear(){


        Object.keys(
            localStorage
        )
        .filter(
            key =>
            key.startsWith(PREFIX)
        )
        .forEach(
            key =>
            localStorage.removeItem(key)
        );


    }




    return {

        set,
        get,
        remove,
        clear

    };


})();



window.CacheService = CacheService;