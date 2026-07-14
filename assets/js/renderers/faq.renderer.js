export function faqRenderer(template,data){

let htmlItems="";

data.items.forEach(item=>{

htmlItems+=`

<div class="faq-item">

<button class="faq-question">

<span>${item.question}</span>

<span>+</span>

</button>

<div class="faq-answer">

<p>

${item.answer}

</p>

</div>

</div>

`;

});

let html=template;

html=html.replace("{{title}}",data.title);

html=html.replace("{{subtitle}}",data.subtitle);

html=html.replace("{{search}}",data.search);

html=html.replace("{{items}}",htmlItems);

return html;

}