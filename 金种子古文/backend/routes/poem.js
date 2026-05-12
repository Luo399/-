const router = require('express').Router();
const controller = require('../controllers/poemController');
const { validateId } = require('../middleware/validator');

router.get('/list', controller.list);
router.get('/:id', validateId, controller.detail);

module.exports = router;