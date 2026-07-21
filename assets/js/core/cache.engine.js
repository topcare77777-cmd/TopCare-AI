import CacheConfig from "../../config/cache.config.js";

class CacheEngine{

constructor(){

this.cache=new Map();

}

set(key,value){

this.cache.set(key,{

value,

time:Date.now()

});

}

get(key){

const item=this.cache.get(key);

if(!item)return null;

if(Date.now()-item.time>CacheConfig.ttl){

this.cache.delete(key);

return null;

}

return item.value;

}

clear(){

this.cache.clear();

}

size(){

return this.cache.size;

}

}

export default new CacheEngine();