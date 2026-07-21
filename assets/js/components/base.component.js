/**
 * TopCare AI
 * Base Component
 */


class BaseComponent {


constructor(selector){

    this.selector = selector;

}





getElement(){

    return document.querySelector(
        this.selector
    );

}





render(html){


    const element =
    this.getElement();


    if(!element){
        console.warn(
            "Component target not found:",
            this.selector
        );

        return;
    }



    element.innerHTML = html;


}





clear(){

    const element =
    this.getElement();


    if(element){

        element.innerHTML="";

    }

}



}


export default BaseComponent;