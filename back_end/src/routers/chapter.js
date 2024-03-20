const express = require('express');
const router = express.Router();
const chapterController = require('../app/Controller/ChapterController');

router.get('/', chapterController.getListChapter);
router.get('/:slug', chapterController.getDetailChapter);
router.post('/', chapterController.createChapter);
router.delete('/:slug', chapterController.deleteChapter);
router.put('/:slug', chapterController.editChapter);

module.exports = router;