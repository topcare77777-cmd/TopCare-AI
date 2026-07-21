class Widget{

card(title,value,icon=""){

return `

<div class="dashboard-card">

<div class="icon">

${icon}

</div>

<h3>${title}</h3>

<h2>${value}</h2>

</div>

`;

}

}

export default new Widget();