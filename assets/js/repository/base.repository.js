/**
 * TopCare AI
 * Base Repository
 * Semua repository turunan memakai ini
 */


import DataLoader from "../core/data-loader.js";


class BaseRepository {


constructor(source){

    this.source = source;

}





async all(){

    return await DataLoader.load(
        this.source
    );

}





async findById(id){


    const data =
    await this.all();


    if(!Array.isArray(data)){
        return null;
    }


    return data.find(
        item =>
        item.id == id
    );

}





async where(callback){


    const data =
    await this.all();


    if(!Array.isArray(data)){
        return [];
    }



    return data.filter(
        callback
    );


}





async first(){


    const data =
    await this.all();


    if(
        Array.isArray(data)
        &&
        data.length
    ){

        return data[0];

    }


    return null;


}


}


export default BaseRepository;