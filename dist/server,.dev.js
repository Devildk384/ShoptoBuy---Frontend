"use strict";

var express = require('express');

var compression = require('compression');

var path = require('path');

var app = express();
app.use(compression());
app.use(express["static"](path.join(__dirname, 'build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("App is running on port ".concat(PORT));
});