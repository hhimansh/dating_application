// requiring express
var express = require('express');
// requiring mysql
var mysql = require('mysql');
// requiring body_parser
var bodyParser = require('body-parser');

var app = express();


// this is configuring our express
app.set("view engine", "ejs");
// using the body parser
app.use(bodyParser.urlencoded({extended: true}));
// this is how express will know about app.css file beside putting <link> in ejs/ html file
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database : 'dating'
});

app.get("/", function(req,res){
	console.log("requested home page!!!");
	var q = "select count(*) as count from dating";
	connection.query(q, function(err,results){
		if(err) throw err;
		var count = results[0].count;
		res.render("date", {count:count});
	});
});

app.post("/register", function(req,res){
	console.log("user created profile!!!")
	var info = {
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		age : req.body.age,
		gender : req.body.gender
	}
	var w = "insert into dating SET ?";
	connection.query(w,info,function(err,results){
		if(err) throw err;
		res.redirect("/");
	});
});


app.post("/check", function(req,res){
	var user = {
		user : req.body.user
	}
	//console.log(req.body.user);
	var cc = "select first_name as fname, last_name as lname, age as age, gender as gender from dating where id  = " + [req.body.user];
	connection.query(cc, function(err,results){
		if(err) throw err;
		var fname = results[0].fname;
		var lname = results[0].lname;
		var age = results[0].age;
		var gender = results[0].gender;
		//console.log(des);
		res.render("check",{fname : fname, lname : lname, age : age, gender: gender});
	})
});


app.listen(3000, function(){
	console.log("server running on port 3000");
});
