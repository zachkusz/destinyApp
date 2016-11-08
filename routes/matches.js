var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/crucibledoctor';

router.post('/', function(req, res) {
  var newMatch = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO matches (map_name, game_type, vs_fireteam, kd, kad) ' +
      'VALUES ($1, $2, $3, $4, $5)', [newMatch.mapName, newMatch.gameType,
      newMatch.vsFireteam, newMatch.kd, newMatch.kad],
      function(err, result) {
        done();
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(201);
      }
    );
  });
});

module.exports = router;
