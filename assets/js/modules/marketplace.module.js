import EbookService from "../services/ebook.service.js";
import Renderer from "../renderers/renderer.js";


class MarketplaceModule {


async init(){


const products =
await EbookService.products();



Renderer.render(

"#marketplace",

products.map(product=>`


<div class="product-card">


<h3>

${product.title}

</h3>


<p>

${product.price ?? ""}

</p>


</div>


`).join("")

);



}


}


export default new MarketplaceModule();