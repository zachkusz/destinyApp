var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pgp = require('pg-promise')();
var connectionString = 'postgres://localhost:5432/crucibledoctor';

router.post('/', function(req, res) {
  var deaths = req.body;

  var thisWeaponName;
  var thisWeaponType;
  var thisTimeAlive;
  var error = false;

  for (var i = 0; i < deaths.length; i++) {
    thisWeaponName = deaths[i].weaponName;
    thisWeaponType = deaths[i].weaponType;
    thisTimeAlive = parseInt(deaths[i].timeAlive);
    console.log(thisWeaponName);

    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        error = true;
      }

      client.query('INSERT INTO deaths (killed_with, weapon_type, time_alive) ' +
        'VALUES ($1, $2, $3)', [thisWeaponName, thisWeaponType, thisTimeAlive],
        function(err, result) {
          done();
          if (err) {
            error = true;
          }
        }
      );
    });
  } //end of for loop

  if (error == true) {
    res.sendStatus(500);
  } else {
    res.sendStatus(201);
  }
});

/* old code used as blueprint for above
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
}); */

module.exports = router;
