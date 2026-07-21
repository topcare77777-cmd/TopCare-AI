import Renderer from "./renderer.js";
import StatisticsService from "../services/statistics.service.js";


class StatisticsRenderer{


async init(){


const data =
await StatisticsService.all();



const html =
data.map(stat=>


`

<div class="stat-card">


<strong>

${stat.value}

</strong>


<span>

${stat.label}

</span>


</div>


`

).join("");



Renderer.render(
"#statistics",
html
);


}


}


export default new StatisticsRenderer();