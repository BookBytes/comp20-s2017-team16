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
	response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    response.sendFile(path.join(__dirname + '/public/lobby.html'));
});

app.get('/ready', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    db.collection('game_Table', function(err, collection) {
        if (err) {
            response.send(false);
        }
        else {
            collection.find().toArray(function(err, results) {
                //if (results.length >= 4) { // checks if enough people are ready to play
                console.log("Length is: " + results.length);
                setTimeout(function() {
                    response.send(true);
                }, 2000);
            });
        }
    });
});

app.get('/goto', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    db.collection('game_Table', function(err, collection) {
        if (err) {
            console.log("ROGER: we encountered an error");
            response.send({});
        }
        else {
            collection.find().toArray(function(err, results) { // send top four players, two to test right now
                response.send({"P1":results[0]}); // testing with one player right now
                // ,"P2":results[1],"P3":results[2], "P4":results[3]
            });
        }
    });
});

app.get('/round', function(request, response) {
	response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    response.sendFile(path.join(__dirname + '/public/round.html'));
});

app.get('/game_Table', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    db.collection('game_Table', function(err, collection) {
        if (err) {
            response.send({});
        }
        else {
            collection.find().toArray(function(err, results) {
                response.send(results[0]);
            });
        }
    });
});

app.post('/game_Table', function (request, response){
    var username = request.body.username;
    var roundNum = request.body.roundNum;
    var sentenceNum = request.body.sentenceNum;
    var wpm = request.body.wpm;
    var storyName = request.body.storyName;
    var gameID = request.body.gameID;

    wpm = parseFloat(wpm);
    roundNum = parseFloat(roundNum);
    sentenceNum = parseFloat(sentenceNum);
    gameID = parseFloat(gameID);

    var toInsert = {
        "username": username,
        "roundNum" : roundNum,
        "sentenceNum" : sentenceNum,
        "wpm" : wpm,
        "storyName" : storyName,
        "gameID" : gameID
    }

    if((!username) || isNaN(roundNum) || !(storyName) || isNaN(sentenceNum) || !(roundNum) || !(sentenceNum) || isNaN(wpm) || !(wpm) || isNaN(gameID) || !(gameID)){
        response.send("Something is wrong with the data");
    }

    else {
        db.collection('game_Table', function(error, collection){
            collection.update({username:toInsert.username},{username:toInsert.username, roundNum:toInsert.roundNum, sentenceNum:toInsert.sentenceNum, wpm:toInsert.wpm, storyName:toInsert.storyName, gameID:toInsert.gameID}, {upsert:true})
            response.send("got it");
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
            collection.insert({storyName:toInsert.storyName, paragraph:toInsert.paragraph, paragraphNum:toInsert.paragraphNum});
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
            // SCHEMA FOR USERS DB?? NEED USERNAMES AND SCORES
        });
    });
});

app.listen(process.env.PORT || 5000);

/*app.post('/round', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    var story = request.body.story;
    response.send(story);
});*/

/*app.post('/geolocation', function(request, response) {
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

app.get('/geolocation', function(request, response) {
    response.set('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    var user = request.query.username;
    db.collection('users', function(error, collection) {
        collection.find({"username" : user}).toArray(function(err, results) {
            response.send({results});
        });
    });
}); 
 */
