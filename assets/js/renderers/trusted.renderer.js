import Renderer from "./renderer.js";


class TrustedRenderer{


async init(){


const response =
await fetch(
"/assets/json/trusted.json"
);


const data =
await response.json();



const html =
data.map(item=>


`

<img

src="${item.logo}"

alt="${item.name}"

loading="lazy"

/>


`

).join("");



Renderer.render(
"#trusted",
html
);


}


}


export default new TrustedRenderer();