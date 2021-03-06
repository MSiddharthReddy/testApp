var express = require('express');
var router = express.Router();

/* PostgreSQL and PostGIS module and connection setup */
var pg = require("pg"); // require Postgres module
var conString = "postgres://postgres:admin123!@localhost/cambridge"; // Your Database Connection

// Set up your database query to display GeoJSON
var coffee_query = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id, name)) As properties FROM cambridge_coffee_shops As lg) As f) As fc";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:300})
});

router.get('/data', function (req, res) {
  var client = new pg.Client(conString);
  client.connect();
  var query = client.query(coffee_query);
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    res.send(result.rows[0].row_to_json);
    res.end();
  });
});

module.exports = router;
