var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/crucibledoctor';

router.post('/', function(req, res) {
  var newMap = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO maps (map) ' +
      'VALUES ($1)', [newMap.map],
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

router.get('/', function (req, res) {
  //var maps = req.params.maps;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT map FROM maps',
    //[id],
    function(err, result) {
    done();

    res.send(result.rows);

    });
  });
});

module.exports = router;
