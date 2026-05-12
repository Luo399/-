const router = require('express').Router();
const controller = require('../controllers/answerController');
const { validateId } = require('../middleware/validator');

router.post('/submit', controller.submit);
router.get('/:userId', validateId, controller.getByUserId);

module.exports = router;