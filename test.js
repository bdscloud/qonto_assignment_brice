const request = require('request');

var sql = "select customers.firstname, products.category, REPLACE(addresses.city, ' ', '%20') as trimed_city  , transactions.id as trid, customers.id as id  \
		from customers left join transactions on customers.id = transactions.customer_id \
		left join transaction_status on transactions.status_code = transaction_status.code \
		left join products on transactions.product_id = products.id \
		left join addresses on customers.id = addresses.customer_id \
		where transaction_status.status = 'Completed' " ;

var api = "https://api.giphy.com/v1/gifs/trending?" ;
var api_key = "&api_key=XG886kbVNTrJZf09J6mhV93jKxzBiGgs" ;
var limit = "&limit=5" ;

var url_giphy = api + api_key + limit ;

function print(value , q , tr_id , cstmr_id ){
	var json_output = [] ;
  	for ( var i = 0 ; i < value.data.length ; i++)
    	json_output.push({
      		type: value.data[i].type ,
     		id : value.data[i].id ,
     		url : value.data[i].url , 
      		title : value.data[i].title , 
      		rating : value.data[i].rating ,
      		query : q ,
      		transaction_id : tr_id ,
      		customer_id : cstmr_id 
      	})
    console.log(json_output);
}


const {Client} = require('pg');
const client = new Client({
  user : "postgres" ,
  password : "test" ,
  host : "localhost",
  port : 5432,
  database : "BriceVeyredeSoras"
})

client.connect()
.then(() => console.log("connected"))
.then(() => client.query(sql))
.then(results => console.log(results.rows))
.then(for (var i = 0 ; i <  5 ; i++){
		request(url_giphy, { json: true }, (err, res, body) => {
	  		if (err) { return console.log(err); }
	  		console.log(body);
	  	})}
	)

.catch(e => console.log(e))
.then(() => client.end())


/*

for (var i = 0 ; i < results.rows.length - 1 ; i++){
			var query = results.rows[i].firstname.toString().trim() + "%20" + results.rows[i].category.toString().trim() + "%20" + results.rows[i].trimed_city.toString().trim() ;
			url_giphy = api_url + "&q=" + query ;
			request(url_giphy, { json: true }, (err, res, body) => {
  				if (err) { return console.log(err); }
  				print(body , url_giphy , results.rows[i].trid , results.rows[i].id ); 
  		
			});
			

		}




*/ 

