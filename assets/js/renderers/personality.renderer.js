export function personalityRenderer(template,data){

let cards="";

data.types.forEach(item=>{

cards+=`

<div
class="card personality-card"
data-animate="animate-fade-up">

<div
class="personality-icon"
style="background:${item.color};">

${item.icon}

</div>

<h3>

${item.name}

</h3>

<p>

${item.tagline}

</p>

<a
href="#"
class="btn btn-primary">

${data.button}

</a>

</div>

`;

});

let html=template;

html=html.replace("{{title}}",data.title);

html=html.replace("{{subtitle}}",data.subtitle);

html=html.replace("{{cards}}",cards);

return html;

}