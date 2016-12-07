var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});



// CONTACTS API ROUTES BELOW
