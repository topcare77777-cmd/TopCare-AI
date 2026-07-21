/**
 * TopCare AI
 * Data Engine
 */


const DataEngine = {


    async get(name){

        const file =
            DataRegistry[name];


        if(!file){

            console.warn(
                "Unknown data:",
                name
            );

            return [];
        }



        return await DataLoader.load(
            file
        );

    },



    async find(
        name,
        callback
    ){

        const data =
            await this.get(name);


        if(!Array.isArray(data)){
            return null;
        }


        return data.find(
            callback
        );

    },



    async filter(
        name,
        callback
    ){

        const data =
            await this.get(name);


        if(!Array.isArray(data)){
            return [];
        }


        return data.filter(
            callback
        );

    }



};



window.DataEngine = DataEngine;