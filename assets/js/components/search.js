class Search {


filter(data,keyword){


return data.filter(item=>


JSON.stringify(item)
.toLowerCase()
.includes(
keyword.toLowerCase()
)


);


}


}


export default new Search();