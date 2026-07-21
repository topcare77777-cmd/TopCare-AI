import Renderer from "../renderers/renderer.js";


class CreatorModule {


async init(){


Renderer.render(

"#creator",

`

<div class="creator-panel">


<h2>
Creator Studio
</h2>


<p>
Buat konten, jual produk,
dan pantau penghasilan.
</p>


</div>

`

);


}


}


export default new CreatorModule();