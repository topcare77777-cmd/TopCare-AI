class Notification{

items=[];

add(title,message){

this.items.unshift({

id:Date.now(),

title,

message,

time:new Date()

});

}

all(){

return this.items;

}

count(){

return this.items.length;

}

clear(){

this.items=[];

}

}

export default new Notification();