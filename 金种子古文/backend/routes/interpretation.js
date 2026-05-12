const router = require('express').Router();
const controller = require('../controllers/interpretationController');

router.get('/:poemId', controller.getByPoemId);

module.exports = router;