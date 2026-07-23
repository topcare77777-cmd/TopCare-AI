class PerformanceMonitor {



start(){


this.time =
performance.now();


}



end(){


const result =
performance.now()
-
this.time;



if(result>1000){


console.warn(

"Slow loading:",
result+"ms"

);


}



return result;



}



}



export default new PerformanceMonitor();