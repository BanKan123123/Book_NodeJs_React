const express = require('express');
const router = express.Router();

const accountController = require('../app/Controller/AccountController');

router.get('/', accountController.getListAccount);
// router.post('/login', accountController.findOne);
router.post('/login', accountController.findOne);

router.post('/', accountController.addAccount);

module.exports = router;