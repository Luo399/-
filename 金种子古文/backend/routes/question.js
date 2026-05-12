const router = require('express').Router();
const controller = require('../controllers/questionController');

router.get('/:poemId', controller.getByPoemId);

module.exports = router;