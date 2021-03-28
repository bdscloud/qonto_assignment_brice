const request = require('request');

var api = "https://api.giphy.com/v1/gifs/trending?" ;
var api_key = "&api_key=XG886kbVNTrJZf09J6mhV93jKxzBiGgs" ;
var limit = "&limit=5" ;
//var query = "&q=bob" ;


var url_giphy = api + api_key + limit ;



function getData(url){
	request(url, { json: true }, (err, res, body) => {
  		if (err) { return console.log(err); }
  		//print(body)
  		printFiltered(body);

  		
	});

} 

function print(value){
	var json_output = [] ;
  	for ( var i = 0 ; i < value.data.length ; i++)
    	json_output.push({
      		type: value.data[i].type ,
     		id : value.data[i].id ,
     		url : value.data[i].url , 
      		title : value.data[i].title , 
      		rating : value.data[i].rating })
    console.log(json_output);
}

function printFiltered(value){
	var json_output = [] ;
  	for ( var i = 0 ; i < value.data.length ; i++)
    	json_output.push({
      		type: value.data[i].type ,
     		id : value.data[i].id ,
     		url : value.data[i].url , 
      		title : value.data[i].title , 
      		rating : value.data[i].rating })

    var json_filtered = json_output.filter(function(i){
    return i.rating !== 'r' ;})
    console.log(json_filtered);
}



getData(url_giphy);





