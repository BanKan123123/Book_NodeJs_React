const express = require('express');
const router = express.Router();
const booksController = require('../app/Controller/BooksController');

router.delete('/:id', booksController.deleteBook);
router.put('/:id', booksController.editBook);
router.get('/chapter/:id', booksController.getDetailBookChapter);
router.get('/:id', booksController.getDetailBook);
router.get('/', booksController.getListBooks);
router.post('/:id', booksController.suggesterBook);
router.post('/', booksController.createBook);

module.exports = router;