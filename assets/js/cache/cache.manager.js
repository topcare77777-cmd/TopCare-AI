class CacheManager {


constructor(){

this.storage =
window.localStorage;

this.prefix =
"topcare_";

}



set(key,value,expire=3600000){


const data={

value:value,

expire:
Date.now()+expire

};


this.storage.setItem(

this.prefix+key,

JSON.stringify(data)

);


}



get(key){


const item =
this.storage.getItem(
this.prefix+key
);



if(!item){

return null;

}



try{


const data =
JSON.parse(item);



if(Date.now()>data.expire){


this.remove(key);

return null;


}



return data.value;



}

catch(e){


return null;


}



}



remove(key){


this.storage.removeItem(

this.prefix+key

);


}



clear(){


Object.keys(
this.storage
)

.filter(
x=>x.startsWith(this.prefix)
)

.forEach(
x=>this.storage.removeItem(x)
);



}



}



export default new CacheManager();