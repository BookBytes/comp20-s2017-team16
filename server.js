var express = require('express');
var assert = require('assert');
// Required if we need to use HTTP query or post parameters
var bodyParser = require('body-parser');
// See documentation at https://github.com/chriso/validator.js
var validator = require('validator');

var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 5000));


// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP query or post parameters

// Mongo initialization and connect to database
var mongoUri = process.env.MONGODB_URI ||
               process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               'mongodb://localhost/memelord';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    assert.equal(null, error);
    db = databaseConnection;
});

// serve static content
app.use(express.static(__dirname + '/assets'));

// See https://devcenter.heroku.com/articles/mean-apps-restful-api#create-a-restful-api-server-with-node-js-and-express
function handleError(response, reason, message, code) {
  response.status(code || 500).json({"error": message});
}

app.get('/', function(request, response) {
	response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/lobby', function(request, response) {
	response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    response.sendFile(path.join(__dirname + '/public/lobby.html'));
});

/*app.post('/lobby', function(request, response) {
  response.set('Content-Type', 'text/html');
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");

  response.sendFile(path.join(__dirname + 'public/lobby.html'));

}); */

app.get('/round', function(request, response) {
	response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    response.send(path.join(__dirname + '/public/round.html'));
});

app.get('/score', function(request, response) {
	response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    response.sendFile(path.join(__dirname + '/public/score.html'));
});



app.listen(process.env.PORT || 5000);
