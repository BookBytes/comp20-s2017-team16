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

app.post('/geolocation', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    var username = request.body.username;
    console.log("username: " + username);
    var lat = request.body.lat;
    var lng = request.body.lng;
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    db.collection('users', function(error, coll) {
        coll.insert( { "username": username, "lat" : lat, "lng" : lng }, function(error, saved) {
            if (error) {
                response.send({"error": "Something is wrong with the data!"});
            }
            else {
                db.collection('users', function(error, coll) {
                    coll.find().toArray(function(error, results) {
                        response.send(results);
                    });
                });
            }
        });
    });


});

app.get('/geolocation', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    var user = request.query.username;

    db.collection('users', function(error, coll) {
        if (err) {
            response.send("Something went wrong!");
        }
        else {
            coll.find({username : user}).toArray(function(err, results) {
                response.send(results);
            });
        }
    });
});

app.get('/ready', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    // are there enough people close by?
    db.collection('users', function(err, collection) {
        if (err) {
            response.send(false);
        }
        else {
            collection.find().toArray(function(err, results) {
                if (results.length >= 4) {
                  response.send(true);
                }
                else {
                  response.send(false);
                }
            });
        }
    });
});

app.get('/goto', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    db.collection('users', function(err, collection) {
        if (err) {
            collection.find().toArray(function(err, results) {
                results.sort(); // is this sorting so that the closest members are together?
                response.send( {"P1" : results[0], "P2" : results[1], "P3" : results[2], "P4" : results[3]} );
            });
        }
        else {
            response.send({});
        }
    });
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
