const express = require('express');
const router = express.Router();
const authorsController = require('../app/Controller/AuthorsController');

router.get('/:slug', authorsController.getDetailsAuthor);
router.get('/', authorsController.getListAuthors);

module.exports = router;