import Widget from "../dashboard/widget.js";

import Layout from "../dashboard/layout.js";

class DashboardModule{

async mount(){

Layout.setTitle("Dashboard");

let html="";

html+=Widget.card(

"Members",

0

);

html+=Widget.card(

"Creators",

0

);

html+=Widget.card(

"Ebooks",

0

);

html+=Widget.card(

"Revenue",

"Rp0"

);

Layout.content(html);

}

}

export default new DashboardModule();