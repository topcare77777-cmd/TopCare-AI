/**
 * Storage Plugin
 */


import Storage
from "../../core/storage.js";



const StoragePlugin = {


name:"storage",




init(){


window.TopCareStorage =
Storage;


console.log(
"Storage Plugin Ready"
);


},




destroy(){


delete window.TopCareStorage;


}



};



export default StoragePlugin;