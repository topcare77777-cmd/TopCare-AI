class PerformanceMonitor{

start(){

this.startTime=performance.now();

}

end(name){

const end=performance.now();

console.log(

name,

(end-this.startTime).toFixed(2),

"ms"

);

}

}

export default new PerformanceMonitor();