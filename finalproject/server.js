//Setup Database and Tables if not already exist
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "node",
	password: "CSC317Section03!"
});

con.connect(function(err) {
	if(err) {
		throw err;
	} else {
		console.log("Successfully connected to MySQL localhost.");

	con.query("CREATE DATABASE IF NOT EXISTS vehicle_db;", function (err, result){
		if(err) throw err;
			console.log("Created Database: vehicle_db");
	});
	
	con.query("use vehicle_db;", function (err, result){
		if(err) throw err;
			console.log("Set Active Database to: vehicle_db");
	});

	/* Example queries:
	"INSERT INTO sessions ( name, width, active ) VALUES (  );"
	*/

	//con.query("SELECT * FROM vehicle_db.sessions;")


	con.query("DROP TABLE sessions;", function () {});
	con.query("DROP TABLE events;", function (){});

	con.query("CREATE TABLE sessions" +
		"( session_id int(11) not null auto_increment," +
		"name varchar(100) not null," +
		"width DECIMAL(10,6) not null," +
		"timestamp DATETIME not null default CURRENT_TIMESTAMP," + 
		"active tinyint(1) not null," + //1 or 0, true or false
		"constraint sessions_pk PRIMARY KEY (session_id));", //can't have multiple session_ids
	function (err, result) {
		if(err) throw err;
		console.log("Successfully created Table sessions!");
	});

	con.query("ALTER TABLE sessions AUTO_INCREMENT = 1000;", function (err, result) {}); //start auto incrementing at 1000
	
	//localhost:3000/wheels?left=5.0&right=5.0&time=00
	//session id, left, 5.0, 
	con.query("CREATE TABLE events" +
		"( session_id int(11) not null," +
		"item varchar(100) not null," +
		"val varchar(100) not null," +
		"time int(11) not null," + 
		"timestamp DATETIME not null default CURRENT_TIMESTAMP);",
	function (err, result) {
		if(err) throw err;
		console.log("Successfully created Data sessions!");
	});
	

	}
	con.end();
	
});

// Setup to use Express
let express = require('express');
let cookieParser = require('cookie-parser');
//setup express app
let app = express()

//Tell the application we want to utilize the cookie parser
app.use(cookieParser());


//basic route for homepage
app.get('/', (req, res)=>{
res.send('<html><body><h1>Hello World</h1></body></html>');
});

//JSON object to be added to cookie
let users = {
name : "Ritik",
Age : "18"
}

app.get('/register', (req, res)=>{
	registerNewUser(req, res);
});

function registerNewUser(req, res){
	//receive name
	//width
	//time
	var name = req.query.name.replace("\\","");
	var width = req.query.width.replace("\\","");
	
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "localhost",
		user: "node",
		password: "CSC317Section03!"
	});



	con.connect(function(err) {
	if(err) {
		throw err;
	} else {
	
		//Close any active sessions with that same user name
		con.query("update vehicle_db.sessions set active = 0 where name = '"+name+"';", function(err, result){
			if(err) {
				console.log(err);
			} else {
				console.log("Successfully closed old sessions.\n");
			}
			
		});

		con.query("INSERT INTO vehicle_db.sessions ( name, width, active ) VALUES ( '" + name + "', " + width + ", 1 );", 			function(err, result){
			if(err) {
				console.log(err);
			} else {
				console.log("Successfully added new session.\n");
			}
		});
		con.end();
		res.cookie('USER', name);
		res.send('Thank you for Registering, cookie adding: ' + name);
	}
	});
}
 

app.get('/line', (req, res)=>{
	
	addData(req, res);
});

app.get('/echo', (req, res)=>{
	addData(req, res);
	
});

app.get('/other', (req, res)=>{
	addData(req, res);
	
});

app.get('/wheels', (req, res)=>{
	
	addData(req, res);
});

function addData(req, res){

	var time = req.query.time;
	var username = req.cookies['USER'];
	
	//Got the User name, get the Session ID
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "localhost",
		user: "node",
		password: "CSC317Section03!"
	});
	
	con.connect(function(err, result) {
		
		if(err){
			result.send("Could not reconnect to database within addData() at url: " + req.url);
		} else {
			for(key in req.query){
				
			con.query(""+
"INSERT INTO vehicle_db.events (session_id, item, val, time) values ((select session_id from vehicle_db.sessions where name = '"+username+"' and active = 1), '"+key+"', '"+req.query[key]+"', "+time+");", function(err, result){
					if(err) console.log(err);
					
					});
					
					
			
			}	
		}
	});
		
}



//UI SECTION***************************

app.get('/active', (req, res)=>{
	//Got the User name, get the Session ID
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "localhost",
		user: "node",
		password: "CSC317Section03!"
	});

	con.connect(function(err) {
		
		if(err){
			res.send("Could not reconnect to database within /active at url: " + req.url);
		} else {
			con.query("SELECT * from vehicle_db.sessions where active = 1;", function(err, result, fields){
				if(err) {
				console.log(err);
				} else {
					res.writeHead(200, {
					'Content-Type': 'text/html'
					});
					var table = "<table class='sortable'>";
					table += "<thead><tr><th>session_id</th>";
					table += "<th>name</th>";
					table += "<th>width</th>";
					table += "<th>timestamp</th>";
					table += "<th>active</th></tr></thead>";
					for(let i = 0; i < result.length; i++){
						table += "<tr><td>" + result[i].session_id + "</td>";
						table += "<td>" + result[i].name + "</td>";
						table += "<td>" + result[i].width + "</td>";
						table += "<td>" + result[i].timestamp + "</td>";
						table += "<td>" + result[i].active + "</td></tr>";
					}
					con.end();
					table += "</table>";
					var html = "<html><style>table {width: 75%; margin-left: 12.5%;}</style><body style='width:100%; text-align: center;'><h1>ACTIVE SESSION SECTION</h1>";
					html = html + table;
					html = html + "</body></html>";
					res.write(html);
					res.end();
				}
			});		
		}
	});
});

app.get('/review', (req, res)=>{
	//Got the User name, get the Session ID
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "localhost",
		user: "node",
		password: "CSC317Section03!"
	});

	con.connect(function(err) {
		
		if(err){
			res.send("Could not reconnect to database within addData() at url: " + req.url);
		} else {
			con.query("SELECT * from vehicle_db.sessions;", function(err, result, fields){
				if(err) {
				console.log(err);
				} else {
					res.writeHead(200, {
					'Content-Type': 'text/html'
					});
					var table = "<table class='sortable'>";
					table += "<thead><tr><th>session_id</th>";
					table += "<th>name</th>";
					table += "<th>width</th>";
					table += "<th>timestamp</th>";
					table += "<th>active</th></tr></thead>";
					for(let i = 0; i < result.length; i++){
						table += "<tr><td>" + result[i].session_id + "</td>";
						table += "<td>" + result[i].name + "</td>";
						table += "<td>" + result[i].width + "</td>";
						table += "<td>" + result[i].timestamp + "</td>";
						table += "<td>" + result[i].active + "</td></tr>";
					}
					table += "</table>";
					con.end();
					var html = "<html><style>table {width: 75%; margin-left: 12.5%;}</style><body style='width:100%; text-align: center;'><h1>SESSION REVIEW SECTION</h1>";
					html = html + table;
					html = html + "</body></html>";
					res.write(html);
					res.end();
				}
			});		
		}
	});
});

app.get('/datareview', (req, res)=>{
	
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "localhost",
		user: "node",
		password: "CSC317Section03!"
	});

	con.connect(function(err) {
		
		if(err){
			res.send("Could not reconnect to database within datareview at url: " + req.url);
		} else {
			con.query("SELECT * from vehicle_db.events;", function(err, result, fields){
				if(err) {
				console.log(err);
				} else {
					res.writeHead(200, {
					'Content-Type': 'text/html'
					});
					var table = "<table class='sortable'>";
					table += "<thead><tr><th>session_id</th>";
					table += "<th>Item</th>";
					table += "<th>Value</th>";
					table += "<th>Time(ms)</th>";
					table += "<th>Timestamp Recorded</th></tr></thead><tbody>";
					for(let i = 0; i < result.length; i++){
						table += "<tr><td>" + result[i].session_id + "</td>";
						table += "<td>" + result[i].item + "</td>";
						table += "<td>" + result[i].val + "</td>";
						table += "<td>" + result[i].time + "</td>";
						table += "<td>" + result[i].timestamp + "</td></tr>";
					}
					table += "</tbody></table>";
					con.end();
					var html = "<html><style>table {width: 75%; margin-left: 12.5%;}</style><body style='width:100%; text-align: center;'><h1>DATA REVIEW SECTION</h1>";
					html = html + table;
					html = html + "</body></html>";
					res.write(html);
					res.end();
				}
			});		
		}
	});
	
});

app.get('/end', (req, res)=>{
	var output = "";
	var time = req.query.time;
	time = time.split("--cookie")[0];
	var url = req.url;
	var arr = url.split("--cookie");
	var username = arr[1];
	username = username.replace("%20%22USER=", "");
	username = username.replace("%22","");
	//%20%22USER=bob%22
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "localhost",
		user: "node",
		password: "CSC317Section03!"
	});

	con.connect(function(err) {
		con.query("update vehicle_db.sessions set value active = 0 where name = '"+username+"';", function(err, result, fields){
				if(err) {
				console.log(err);
				} else {
				res.send("Thank you for sending your data! Session is now ended.");
				}
		});
		con.end();
	});
});
//server listens to port 3001
app.listen(3000, (err)=>{
if(err)
throw err;
console.log('listening on port 3000');
});


