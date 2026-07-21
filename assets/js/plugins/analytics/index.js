/**
 * Analytics Plugin
 */


const AnalyticsPlugin = {



name:"analytics",




init(){


window.TopCareAnalytics = {



track(
event,
data={}
){


console.log(
"Analytics:",
event,
data
);


}



};



console.log(
"Analytics Plugin Ready"
);



},




destroy(){


delete window.TopCareAnalytics;


}



};



export default AnalyticsPlugin;