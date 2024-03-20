"use strict";

var booksRouter = require('../routers/books');

var categoryRouter = require('../routers/category');

function route(app) {
  app.use('/books', booksRouter);
  app.use('/categories', categoryRouter);
  app.use('/', function (req, res, next) {
    return res.json("Connection Success");
  });
}

module.exports = route;