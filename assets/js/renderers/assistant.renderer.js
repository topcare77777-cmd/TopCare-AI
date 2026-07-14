export function assistantRenderer(template,data){

let suggestions="";

data.suggestions.forEach(item=>{

suggestions+=`

<div class="assistant-chip">

${item}

</div>

`;

});

let html=template;

html=html.replace("{{title}}",data.title);

html=html.replace("{{subtitle}}",data.subtitle);

html=html.replace("{{placeholder}}",data.placeholder);

html=html.replace("{{button}}",data.button);

html=html.replace("{{suggestions}}",suggestions);

return html;

}