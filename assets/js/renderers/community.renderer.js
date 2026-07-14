export function communityRenderer(template,data){

let activities="";

data.activities.forEach(item=>{

activities+=`

<div
class="community-item card"
data-animate="animate-fade-up">

<div class="community-avatar">

${item.avatar}

</div>

<div class="community-content">

<h4>${item.name}</h4>

<p>${item.action}</p>

<span>${item.time}</span>

</div>

</div>

`;

});

let html=template;

html=html.replace("{{title}}",data.title);

html=html.replace("{{subtitle}}",data.subtitle);

html=html.replace("{{activities}}",activities);

html=html.replace("{{button}}",data.button);

return html;

}