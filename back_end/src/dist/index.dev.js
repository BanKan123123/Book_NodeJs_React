"use strict";

var express = require('express');

var cors = require('cors');

var path = require('path');

var route = require('./routers/router');

var app = express();
app.use(express.json());
app.use(cors());
app.use(express["static"](path.join(__dirname, '/src/routers')));
route(app);
app.listen(4000, function () {
  console.log("Connecting to server... success");
});