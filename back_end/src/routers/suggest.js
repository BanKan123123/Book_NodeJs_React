const express = require('express');
const router = express.Router();
const suggesterController = require('../app/Controller/SuggesterController');

router.get('/:id', suggesterController.findOneSuggest);
router.get('/', suggesterController.findAllSuggests);

module.exports = router;