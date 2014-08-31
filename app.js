var express = require('express');
var app = express();

//var pg = require('pg');
//var connstring = 'pg://postgres:potatogate369@localhost:5432/mydb'
//var client = new pg.Client(connstring);
//client.connect();

//client.query("CREATE TABLE IF NOT EXISTS daysalive(name varchar(64), dob date, days smallint, submitted timestamp)");

//serve the static html page
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/'));


//handle data from the page form fields
//app.use(express.bodyParser());

app.post('/form', function(req, res){
	//var user = req.body.name;
	//var dob = req.body.dob;

	//var days = Date.UTC(2012, dob.getMonth(), dob.getDate(), 0,0,0);
	//var date = new Date();

	//client.query("INSERT INTO birthdates(username) values($1)", [user]);
	//client.query("INSERT INTO daysalive(name, dob) VALUES ($1, $2)", [user, dob]);
});





//nodejs console output upon connecting
app.listen(app.get('port'), function(){
	console.log('Server running at localhost:' + app.get('port'));
})