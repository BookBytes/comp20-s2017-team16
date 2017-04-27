/* finalScore.js
 * Author: Teddy Laurita
 * Date: 3/30/17
 * Javascript file used to generate the finalScore.html page
 * NOTE: utilizes jquery:
 * https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
 */

var express = require('express');
var assert = require('assert');
var app = express();
// setup mongo
var mongoUri = process.env.MONGODB_URI ||
            process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://teddy:heroku@ds139959.mlab.com:39959/heroku_r1qgwh3n';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
 assert.equal(null, error);
 db = databaseConnection;
});


// --------------User Data-------------- \\
var getData = function() {
    db.collection('round', function(error, collection) {
        if (error) {
            $('body').prepend($('<p>', {id: "error", text: error}));
        }
        collection.find().toArray(function(error, cursor) {
            if (error) {
                $('body').prepend($('<p>', {id: "error", text: error}));
            }
            // TODO -- EXTRACT DATA FROM ROUND DB
            // ROUND COLLECTION = Username | round number | score | OTHERS?
        });
    });
}

// TODO: get real values
var userScores = {"Teddy": 1, "Had": 2, "Some": 3, "Berries": 4};
var userNames = [
    Object.keys(userScores)[0],
    Object.keys(userScores)[1],
    Object.keys(userScores)[2],
    Object.keys(userScores)[3]
];
var roundNumber = 1;



var $title = $("<h1>", {id: "title", text: "Congratulations!"});
var $scoreList = $("<div>", {id: "scoreList"});
$.each(userScores, function(key, value) {
    $scoreList.append("<p>User " + key + " scored " + value + "</p>");
});
// build chart url
var userNamesURL = "";
var userScoresURL = "";
$.each(userScores, function(key, value) {
    userNamesURL += key + "|";
    userScoresURL += value + ",";
});
// remove last special char from string
userNamesURL = userNamesURL.slice(0, -1);
userScoresURL = userScoresURL.slice(0, -1);
var $chart = $("<img>", {
    id: "chart",
    src: "https://chart.googleapis.com/chart?cht=bvs&chd=t:" +
         userScoresURL + "&chs=150x100&chl=" + userNamesURL
});

$(document).ready(function() {
    $("body").append($title);
    $("body").append($scoreList);
    $("body").append($chart);
});
