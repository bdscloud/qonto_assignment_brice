const request = require('request');

var sql = "select customers.id , customers.firstname, products.category, REPLACE(addresses.city, ' ', '%20') as trimed_city  , transactions.id as trid, customers.id as id  \
		from customers left join transactions on customers.id = transactions.customer_id \
		left join transaction_status on transactions.status_code = transaction_status.code \
		left join products on transactions.product_id = products.id \
		left join addresses on customers.id = addresses.customer_id \
		where transaction_status.status = 'Completed' " ;

var api = "https://api.giphy.com/v1/gifs/search?" ;
var api_key = "&api_key=XG886kbVNTrJZf09J6mhV93jKxzBiGgs" ;
var limit = "&limit=1" 
var rating = "&rating!=r" 

var api_url = api + api_key + limit + rating ;

const {Client} = require('pg');
const client = new Client({
  user : "postgres" ,
  password : "test" ,
  host : "localhost",
  port : 5432,
  database : "BriceVeyredeSoras"
})




async function executeSQLQuery(){
  try{
    await client.connect()
    console.log("Connected successfuly")
    const results = await client.query(sql);
    return results;
  }
  catch(err){
    console.log(err)
  }
  finally{
    await client.end()
    console.log("Client disconnected") 
  }
}


async function getGiphy(table){
  var returnList = [];
  var promiseList = [];
  var newPromise = null;
  for(var i = 0 ; i < table.rows.length - 1 ; i++){
    var query = table.rows[i].firstname.toString().trim() + "%20" + table.rows[i].category.toString().trim() + "%20" + table.rows[i].trimed_city.toString().trim() ;
    //var simple_query = table.rows[i].firstname.toString().trim() + " " + table.rows[i].category.toString().trim() ;
    
    newPromise = null;
    newPromise = createPromise(query , table.rows[i].trid , table.rows[i].id);
    promiseList.push(newPromise);     
  }


  await Promise.all(promiseList).then((body) => { 
    body.forEach(i => {
      if (i) 
        returnList.push(i)
    })
  }).catch(err => console.log(err))
  
  return returnList


}


function createPromise(query , tr_id , cstmr_id) {
    var urli = api_url + '&q=' + query ;
    return new Promise((resolve, reject) => {
      request({
         uri: urli,
         method: 'GET' ,
         json : true
      },
      (err, res, body) => {  
      var json_output = [] ;
      for ( var i = 0 ; i < body.data.length  ; i++){
        json_output.push({
          type: body.data[i].type ,
          id : body.data[i].id ,
          url : body.data[i].url , 
          title : body.data[i].title , 
          rating : body.data[i].rating ,
          query : query ,
          transaction_id : tr_id ,
          customer_id : cstmr_id 
          })
      }

      resolve(json_output)
      })
   })
}




async function execute() {

  const resultDB = await executeSQLQuery();

  const resultGIPHY = await getGiphy(resultDB);

  console.log(resultGIPHY);

}

   



execute(); 


