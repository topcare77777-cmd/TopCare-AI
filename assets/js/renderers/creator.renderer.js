export function creatorRenderer(template,data){

let cards="";

data.products.forEach(product=>{

cards+=`

<div
class="card creator-card"
data-animate="animate-fade-up">

<div class="creator-cover">

${product.cover}

</div>

<span class="creator-category">

${product.category}

</span>

<h3>

${product.title}

</h3>

<div class="creator-meta">

<span>

⭐ ${product.rating}

</span>

<strong>

${product.price}

</strong>

</div>

<a
href="#"
class="btn btn-primary">

Lihat Detail

</a>

</div>

`;

});

let html=template;

html=html.replace("{{title}}",data.title);

html=html.replace("{{subtitle}}",data.subtitle);

html=html.replace("{{products}}",cards);

html=html.replace("{{button}}",data.button);

return html;

}