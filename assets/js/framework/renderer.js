export class Renderer{

    mount(selector,html){

        const element=document.querySelector(selector);

        if(!element) return;

        element.innerHTML=html;

    }

}