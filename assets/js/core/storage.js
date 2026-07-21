/**
 * Local Storage Service
 */

class StorageService{


set(key,value){

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}



get(key){

    const data =
        localStorage.getItem(key);


    if(!data){
        return null;
    }


    return JSON.parse(data);

}



remove(key){

    localStorage.removeItem(key);

}


clear(){

    localStorage.clear();

}


}


export default new StorageService();