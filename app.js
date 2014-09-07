var express = require('express');
var app = express();

var pg = require('pg');
var connstring = process.env.DATABASE_URL || 'postgres://localhost:5432/mydb'	//'pg://postgres:potatogate369@localhost:5432/mydb'
var client = new pg.Client(connstring);
client.connect();

client.query("CREATE TABLE IF NOT EXISTS daysalive(name varchar(64), dob date, days smallint, submitted timestamp)");

//serve the static html page
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));


//handle data from the page form fields
app.use(express.bodyParser());

app.post('/form', function(req, res){
	var user = req.body.name;
	var dob = req.body.dob;

	//calculate days between dob and today
	var mdy = dob.split('/');
	var date1 = new Date(mdy[2], mdy[1], mdy[0]);
	var date2 = new Date();
	var oneDay = 24*60*60*1000;
	var coutDays = Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));

	client.query("INSERT INTO daysalive(name, dob, days, submitted) VALUES ($1, $2, $3, $4)", [user, dob, coutDays, date2]);
});





//nodejs console output upon connecting
app.listen(app.get('port'), function(){
	console.log('Server running at localhost:' + app.get('port'));
})