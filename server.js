'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var api = require('./app/api/imagesearch.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var session = require('express-session');

var app = express();
require('dotenv').load();


mongoose.connect(process.env.MONGO_URI);

app.use('/public', express.static(process.cwd() + '/public'));

var searchschema = mongoose.Schema({
    term: String,
    when: String
});

var searchStr = mongoose.model('searchStr', searchschema);

routes(app);
api(app, searchStr);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});