var http=require("http");
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response){
	var path = url.parse(request.url).pathname;
	var filetype = path.split('.')[1];
	
	if(path == "/"){
		fs.readFile("../html/index.html", function (err, data){
			if (err) {
				return console.log(err);
			} else {
				response.writeHead(200, {
					'Content-Type': 'text/html'
				});
				response.write(data);
				response.end();
			}
		});
	} else if (filetype == "html"){
		fs.readFile("../html/" + path, function (err, data){
			if (err) {
				return console.log(err);
			} else {
				response.writeHead(200, {
					'Content-Type': 'text/html'
				});
				response.write(data);
				response.end();
			}
		});
	} else if(filetype == "css") {

		fs.readFile("../" + path, function (err, data){
			if(err){
				return console.log(err);
			} else {
				response.writeHead(200, {
					'Content-Type': 'text/css'
				});
				response.write(data);
				response.end();
			}
		});
	} else if(filetype == "js") {

		fs.readFile("../" + path, function (err, data){
			if(err){
				return console.log(err);
			} else {
				response.writeHead(200, {
					'Content-Type': 'text/js'
				});
				response.write(data);
				response.end();
			}
		});
	} else if (filetype == "png"){

		fs.readFile("../" + path, function (err, data){
			if(err){
				return console.log(err);
			} else {
				response.writeHead(200, {
					'Content-Type': 'image/png'
				});
				response.end(data);
			}
		});
	} else {
		console.log("Non-html File trying to receive.");
		console.log(path + ": " + filetype);
		response.end();
	}
});
server.listen(9000);


