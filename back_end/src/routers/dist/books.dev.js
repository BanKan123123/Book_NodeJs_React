"use strict";

var express = require('express');

var router = express.Router();

var booksController = require('../app/Controller/BooksController');

router["delete"]('/:id', booksController.deleteBook);
router.put('/:id', booksController.editBook);
router.get('/:id', booksController.getDetailBook);
router.get('/', booksController.getListBooks);
router.post('/', booksController.createBook);
module.exports = router;