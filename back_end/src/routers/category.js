const express = require('express');
const router = express.Router();
const categoryController = require('../app/Controller/CategoryController');

router.get('/:id', categoryController.findOneCategory);
router.delete('/:id', categoryController.deleteCategory);
router.put('/:id', categoryController.updateCategory);
router.get('/', categoryController.getListCategories);
router.post('/', categoryController.createCategory);


module.exports = router;