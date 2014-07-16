//Load necessary servers var sys = require('sys'); var fs = require('fs'); var http = require('http');
var connect = require('connect');
var express = require('express');
var url = require('url');
var numPostRequests = 0;
var numStatusRequests = 0;
var timeRunning = 0;
var lastStart = -1;
var wet = false;
var engines = require('consolidate');
var demo = true;
app = express();

app.set('views', __dirname + '/templates');
app.engine('html',require('ejs').renderFile);

//app.use(express.json());
//app.use(express.urlencoded());





app.get('/',function(request,response){
	//response.write(returnStandardHead());
	console.log('THIS IS A WEB PAGE REQUEST'); 
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
	//console.log(url_parts);
	console.log(wet);

	console.log('status request: ' + numStatusRequests);
	numStatusRequests = numStatusRequests + 1; 
	var out =  wet ? '~on':'~off';
	if(!demo){
		var date = new Date();
		if(date.getHours() > 6 || date.getHours() < 4){
			out = '~off';
		}
	}
	response.header('Access-Control-Allow-Origin','*');
	response.header( 'Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type');
	response.send(out);
});
app.post('/',function(request,response){

	
	var url_parts = url.parse(request.url,true);
	var query = url_parts.query;
	if(query.status == 'wet'){
		wet = true;
		lastStart = new Date().getTime();
		
	}
	else{
		wet = false;
		timeRunning += new Date().getTime() - lastStart;
		
	}
	console.log("request: " + numPostRequests + '\n');
	console.log('the sensor is ' + (wet ? 'wet':'dry'));
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
