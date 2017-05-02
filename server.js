// server.js
// Purpose: to hold the tables in the database and all the get/post requests




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

    // response.sendFile(path.join(__dirname + '/public/index.html'));
    response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/lobby', function(request, response) {
    // TODO
    console.log("INSIDE LOBBY GET");
	response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    // console.log("should be sending you to lobby");
    response.sendFile(path.join(__dirname + '/public/lobby.html'));
});

app.post('/geolocation', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    var curr_user = request.body.username;
    var myLat = parseFloat(request.body.lat);
    var myLng = parseFloat(request.body.lng);

    db.collection('users', function(error, coll) {
        coll.insert( { username: curr_user, lat : myLat, lng : myLng });
    });
});

/*app.get('/geolocation', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    var user = request.query.username;
    db.collection('users', function(error, collection) {
        collection.find({"username" : user}).toArray(function(err, results) {
            response.send({results});
        });
    });
}); */

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
        if (!err) {
            collection.find().toArray(function(err, results) {
                // first four people added to database will get to play
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

    response.sendFile(path.join(__dirname + '/public/round.html'));
});

app.post('/round', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    var story = request.body.story;
    response.send(story);
});

app.post('/game_Table', function (request, response){
    var username = request.body.username;
    var roundNum = request.body.roundNum;
    var sentenceNum = request.body.sentenceNum;
    var wpm = request.body.wpm;

    wpm = parseFloat(wpm);
    roundNum = parseFloat(roundNum);
    sentenceNum = parseFloat(sentenceNum);

    var toInsert = {
        "username": username,
        "roundNum" : roundNum,
        "sentenceNum" : sentenceNum,
        "wpm" : wpm
    }

    if((!username) || isNaN(roundNum) || isNaN(sentenceNum) || !(roundNum) || !(sentenceNum) || isNaN(wpm) || !(wpm)){
        response.send("Something is wrong with the data");
    }

    else {
        db.collection('game_Table', function(error, collection){
            collection.update({username:toInsert.username}, {username:toInsert.username, roundNum:toInsert.roundNum, sentenceNum:toInsert.sentenceNum, wpm:toInsert.wpm}, {upsert:true})
        });
    }
});

app.post('/stories_Table', function (request, response){
    var paragraph = request.body.paragraph;
    var paragraphNum = request.body.paragraphNum;
    var storyName = request.body.storyName;

    paragraphNum = parseFloat(paragraphNum);

    var toInsert = {
        "storyName":storyName,
        "paragraph":paragraph,
        "paragraphNum":paragraphNum
    }

    if(!(storyName) || !(paragraph) || isNaN(paragraphNum) || !(paragraphNum)){
        response.send({"error":"Something is wrong with the data"});
    }
    else {
        db.collection('stories_Table', function (error, collection){
            collection.update({storyName:toInsert.storyName}, {storyName:toInsert.storyName, paragraph:toInsert.paragraph, paragraphNum:toInsert.paragraphNum}, {upsert:true})
            response.send("got it");
        });
    }
});

app.get('/memelord', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    gamename = request.query;
    db.collection('games', function(er, coll) {
       collection.find(gamename).toArray(function(err, results) {
        //  if (results.memelord == )
       });
    });
    response.send();
});

app.get('/score', function(request, response) {
	response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    // TODO: Change this to be stored in the db
    var wpm = request.query.wpm;

    response.sendFile(path.join(__dirname + '/public/score.html'));
});

// path handler to return user info for populating score page
app.get('/userInfo', function(req, res) {
    db.collection('round', function(error, collection) {
        if (error) {
            res.send(error);
        }
        collection.find().toArray(function(error, cursor) {
            if (error) {
                res.send(error);
            }
            res.send({"user1": 1, "user2": 2, "user3": 3, "user4": 4});
            // TODO -- EXTRACT DATA FROM ROUND DB
            // ROUND COLLECTION = Username | round number | score | OTHERS?
        });
    });
});

app.listen(process.env.PORT || 5000);
