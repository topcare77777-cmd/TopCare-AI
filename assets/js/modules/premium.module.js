import Renderer from "../renderers/renderer.js";


class PremiumModule {


async init(){


Renderer.render(

"#premium",

`

<div class="premium-box">


<h2>

TopCare Premium

</h2>


<p>

Unlock fitur lanjutan

</p>


</div>

`

);


}


}


export default new PremiumModule();