var express = require('express');
var app = express();

var pg = require('pg');
var connstring = process.env.DATABASE_URL || 'postgres://localhost:5432/mydb'
var client = new pg.Client(connstring);
client.connect();


//serve the static html page
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));


app.use(express.bodyParser());


//get stuff from the table
app.post('/db', function (request, response) {
  
	var user = request.body.fname;
	var dob = request.body.dob;

	//calculate days between dob and today
	var mdy = dob.split('-');
	var date1 = new Date(mdy[0], mdy[1], mdy[2]);
	var datetoday = new Date();
	var oneDay = 24*60*60*1000;
	var numdays = Math.round(Math.abs((date1.getTime() - datetoday.getTime())/(oneDay)));

  	//original single table insertion of all column fields
  	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  		client.query("CREATE TABLE IF NOT EXISTS daysalive(name varchar(64), dob date, days smallint, submitted timestamp)");
  		client.query("INSERT INTO daysalive(name, dob, days, submitted) VALUES ($1, $2, $3, $4)", [user, dob, numdays, datetoday], function(err, result)
		{ 
			done(); 
			if(err)
			{
				console.error(err);
				response.send("Error " + err);
			}
		});
    	client.query('SELECT * FROM daysalive', function(err, result) 
    	{
	      	done();
	      	if (err)
	       	{ 
	       		console.error(err); response.send("Error " + err); 
	       	}
	      	else
	       	{ 
	       		response.send(result.rows); 
	       	}
    	});
  	});
});




//nodejs console output upon connecting
app.listen(app.get('port'), function(){
	console.log('Server running at localhost:' + app.get('port'));
});