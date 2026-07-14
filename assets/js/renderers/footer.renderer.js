export function footerRenderer(template,data){

let columns="";

data.columns.forEach(column=>{

let links="";

column.links.forEach(link=>{

links+=`

<li>

<a href="${link.url}">

${link.label}

</a>

</li>

`;

});

columns+=`

<div class="footer-column">

<h4>${column.title}</h4>

<ul>

${links}

</ul>

</div>

`;

});

return template

.replace("{{brand}}",data.brand)

.replace("{{tagline}}",data.tagline)

.replace("{{newsletterTitle}}",data.newsletter.title)

.replace("{{placeholder}}",data.newsletter.placeholder)

.replace("{{button}}",data.newsletter.button)

.replace("{{columns}}",columns)

.replace("{{copyright}}",data.copyright)

.replace("{{version}}",data.version);

}