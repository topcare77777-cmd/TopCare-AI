/**
 * TopCare AI Assistant Plugin
 */


const AIPlugin = {



name:"ai",




init(){


window.TopCareAI = {


ask(question){


return {


answer:
"AI Assistant belum terhubung API. Mode lokal aktif.",
question


};


}



};



console.log(
"AI Assistant Plugin Ready"
);



},




destroy(){


delete window.TopCareAI;


}



};



export default AIPlugin;