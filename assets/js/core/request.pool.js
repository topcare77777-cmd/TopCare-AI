class RequestPool{

constructor(limit=3){

this.limit=limit;

this.running=0;

this.queue=[];

}

async add(task){

return new Promise((resolve,reject)=>{

this.queue.push({

task,

resolve,

reject

});

this.next();

});

}

next(){

if(this.running>=this.limit)return;

const item=this.queue.shift();

if(!item)return;

this.running++;

item.task()

.then(result=>{

this.running--;

item.resolve(result);

this.next();

})

.catch(error=>{

this.running--;

item.reject(error);

this.next();

});

}

}

export default new RequestPool();