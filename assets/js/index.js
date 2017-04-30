// index.js
// By: Bianca Capretta and Kingsley Bowen
// Purpose: in charge of getting username from textbox, getting user's current
//          and adding this new user to the server. When submit is clicked,
//			go to lobby page

var myLat = 0;
var myLng = 0;
var curr_user = "";

var express = require('express');
var app = express();

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    db = databaseConnection;
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Header", "Origin, X-Requested-Width, Content-Type, Accept");
});

app.use(express.static(__dirname + '/public'));

window.onclick = function render_user_info() {
	console.log("should be sending my location and username");
	getMyLocation();
	getUsername();

	// send username, myLat and myLng some way to database
	// do you need to do app.post to lobby??
	/*db.collection('user_table', function(error, coll) {
		coll.insert({"username" : username, "lat" : myLat, "lng" : myLng});
	}); */ 

	$.post("https://m3m3l0rd.herokuapp.com/geolocation", {"username" : curr_user, "lat" : myLat, "lng" : myLng});

	// go to next page
	window.location.href = "https://www.m3m3l0rd.herokuapp.com/lobby";
}

function getMyLocation()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

function getUsername()
{
	username = document.getElementById('curr_user').id;
	console.log("username is : " + username);
}


