class SecureStorage {



constructor(){

this.prefix =
"topcare_secure_";


}



set(key,value){


const data={


value:value,


time:
Date.now()


};



localStorage.setItem(

this.prefix+key,

btoa(
JSON.stringify(data)
)

);


}



get(key){


const item =
localStorage.getItem(

this.prefix+key

);



if(!item)

return null;



try{


return JSON.parse(

atob(item)

).value;



}

catch(e){


return null;


}



}



remove(key){


localStorage.removeItem(

this.prefix+key

);


}



}



export default new SecureStorage();