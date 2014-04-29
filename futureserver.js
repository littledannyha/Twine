//Load necessary servers var sys = require('sys'); var fs = require('fs'); var http = require('http');
var connect = require('connect');
var express = require('express');
var url = require('url')
var numPostRequests = 0;
var onOrOff = false;
var engines = require('consolidate');

app = express();

app.set('views', __dirname + '/templates');
app.engine('html',require('ejs').renderFile);

//app.use(express.json());
//app.use(express.urlencoded());

app.get('/',function(request,response){
	//response.write(returnStandardHead());
	console.log('THIS IS A GET REQUEST'); 
	var url_parts = url.parse(request.url,true);
	console.log(url_parts);

//	response.write("<h1>this is an h1 tag</h1>");
//	response.write("<script>document.write(" + onOrOff + ");</script>");

	//response.write(returnEndOfBody());
	//response.send("hi!");
	response.render("index.html");
//	response.send();
});

app.get('/status',function(request,response){
	
	var url_parts = url.parse(request.url,true);
	console.log(url_parts);

	var out = onOrOff ? 'on':'off';
	response.send(out);
});
app.post('/',function(request,response){

	
	var url_parts = url.parse(request.url,true);
	var query = url_parts.query;
	if(query.status == 'wet'){
		onOrOff = true;
	}
	else{
		onOrOff = false;
	}
	console.log("request" + numPostRequests);
	console.log(url_parts);
	console.log('\n');
	numPostRequests = numPostRequests + 1;
});

app.listen(8080,function(){
	console.log('server started');
});

//returns every tag up until the starting body tag
function returnStandardHead(){
	return "<html> <head> <title> Your Sprinkler </title> </head> <body>";
}

function returnEndOfBody(){
	return "</body></html>";
}
