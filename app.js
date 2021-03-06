var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//server connection
var pg = require('pg');
var pgp = require('pg-promise')(); //unsure if necesary here
var connectionString = 'postgres://localhost:5432/crucibledoctor';

//Route inclusion
//var login = require('./routes/login');
var main = require('./routes/main');
var matches = require('./routes/matches');
var maps = require('./routes/maps');
var deathStats = require('./routes/deathStats');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Routes
//app.use('/musicBrainz/', musicBrainz);
app.use('/', main);
app.use('/matches/', matches);
app.use('/maps/', maps);
app.use('/deathStats', deathStats);

//set port and listen
app.set('port', process.env.PORT || 9000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
