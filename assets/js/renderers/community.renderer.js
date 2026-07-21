import Renderer from "./renderer.js";
import CommunityService from "../services/community.service.js";


class CommunityRenderer{


async init(){


const data =
await CommunityService.all();



const html =
data.map(item=>


`

<div class="community-card">


<h3>

${item.title}

</h3>


<p>

${item.description}

</p>


</div>


`

).join("");



Renderer.render(
"#community",
html
);


}


}


export default new CommunityRenderer();