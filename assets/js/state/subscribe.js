const listeners=[];

export function subscribe(callback){

listeners.push(callback);

}

export function publish(state){

listeners.forEach(fn=>fn(state));

}