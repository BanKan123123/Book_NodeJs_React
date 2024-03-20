"use strict";

var express = require('express');

var router = express.Router();

var categoryController = require('../app/Controller/CategoryController');

router.get('/', categoryController.getListCategories);
module.exports = router;