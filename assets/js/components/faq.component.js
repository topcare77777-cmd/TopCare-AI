import BaseComponent
from "./base.component.js";


import DataLoader
from "../core/data-loader.js";



class FAQComponent
extends BaseComponent{


constructor(){

super(
"#faq"
);

}




async mount(){


const data =
await DataLoader.load(
"homepage/faq"
);



let html="";



data.forEach(item=>{


html += `


<div class="faq-item">


<h4>
${item.question}
</h4>


<p>
${item.answer}
</p>


</div>


`;



});



this.render(html);



}



}



export default new FAQComponent();