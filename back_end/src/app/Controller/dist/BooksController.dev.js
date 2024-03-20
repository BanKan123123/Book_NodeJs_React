"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ninhnv_novel_en'
});

var BooksController =
/*#__PURE__*/
function () {
  function BooksController() {
    _classCallCheck(this, BooksController);
  }

  _createClass(BooksController, [{
    key: "getListBooks",
    //[GET] /books
    value: function getListBooks(req, res, json) {
      var query = "SELECT * FROM books";
      db.query(query, function (err, data) {
        if (err) return res.json(err);
        return res.json(data);
      });
    } //[GET] /books/:slug

  }, {
    key: "getDetailBook",
    value: function getDetailBook(req, res, next) {
      var query = "SELECT * FROM books WHERE slug = ?";
      var slugBook = req.params.slug;
      db.query(query, [slugBook], function (err, data) {
        if (err) return res.json(err);
        return res.json(data);
      });
    }
  }, {
    key: "createBook",
    value: function createBook(req, res, next) {
      var query = "INSERT INTO books (title, description, imageThumbnail, rate, authorId) VALUES(?)";
      var value = [req.body.title, req.body.description, req.body.imageThumbnail, req.body.rate, req.body.authorId];
      db.query(query, [value], function (err, data) {
        if (err) return res.json(err);
        return res.json("Book have been created successfully");
      });
    }
  }, {
    key: "deleteBook",
    value: function deleteBook(req, res, next) {
      var query = "DELETE FROM books WHERE id = ?";
      var idBook = req.params.id;
      db.query(query, [idBook], function (err, data) {
        if (err) return res.json(err);
        return res.json("Book have been deleted successfully");
      });
    }
  }, {
    key: "editBook",
    value: function editBook(req, res, next) {
      var query = "UPDATE books SET `title = ` ?, `description` = ?, `imageThumbnail` = ?, `rate` = ?, `authorId` = ? WHERE id = ?";
      var value = [req.body.title, req.body.description, req.body.imageThumbnail, req.body.rate, req.body.authorId];
      var idBook = req.params.id;
      db.query(query, [].concat(value, [idBook]), function (err, data) {
        if (err) return res.json(err);
        return res.json("Book have been updated successfully");
      });
    }
  }]);

  return BooksController;
}();

module.exports = new BooksController();