var express = require('express');
var assert = require('assert');
// Required if we need to use HTTP query or post parameters
var bodyParser = require('body-parser');
// See documentation at https://github.com/chriso/validator.js
var validator = require('validator');

var app = express();

app.set('port', (process.env.PORT || 5000));


// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP query or post parameters

// Mongo initialization and connect to database
// process.env.MONGOLAB_URI is the environment variable on Heroku for the MongoLab add-on
// process.env.MONGOHQ_URL is the environment variable on Heroku for the MongoHQ add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the database
var mongoUri = process.env.MONGODB_URI ||
               process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               'mongodb://heroku_l0pzjq2h:heroku@ds139959.mlab.com:39959/heroku_l0pzjq2h';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    assert.equal(null, error);
    db = databaseConnection;
});

// serve static content
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
    response.send("Welcome to the root of m3m3l0rd!!");
});



app.listen(app.get('port'), function() {
    console.log('M3m3l0rd is running on port', app.get('port'));
});
