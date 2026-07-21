class CSRF {



constructor(){

this.token =
this.generate();

}



generate(){


return crypto
.randomUUID();



}



get(){


return this.token;


}



refresh(){


this.token =
this.generate();


return this.token;


}



}



export default new CSRF();