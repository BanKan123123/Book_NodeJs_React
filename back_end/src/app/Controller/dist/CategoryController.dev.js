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

var CategoryController =
/*#__PURE__*/
function () {
  function CategoryController() {
    _classCallCheck(this, CategoryController);
  }

  _createClass(CategoryController, [{
    key: "getListCategories",
    value: function getListCategories(req, res, next) {
      var query = "SELECT * FROM category";
      db.query(query, function (err, data) {
        if (err) return res.json(err);
        return res.json(data);
      });
    }
  }]);

  return CategoryController;
}();

module.exports = new CategoryController();