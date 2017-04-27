var express = require('express');
var assert = require('assert');
// Required if we need to use HTTP query or post parameters
var bodyParser = require('body-parser');
// See documentation at https://github.com/chriso/validator.js
var validator = require('validator');
var app = express();


var mongoUri = process.env.MONGODB_URI ||
               process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               'mongodb://teddy:heroku@ds139959.mlab.com:39959/heroku_r1qgwh3n';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    assert.equal(null, error);
    db = databaseConnection;
});

db.collection('users', function(error, collection) {
    if (error) {

    }
})
