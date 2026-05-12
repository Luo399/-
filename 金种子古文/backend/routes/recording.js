const router = require('express').Router();
const controller = require('../controllers/recordingController');
const upload = require('../middleware/upload');
const { validateId } = require('../middleware/validator');

router.post('/upload', upload.single('audio_file'), controller.upload);
router.get('/:userId', validateId, controller.getByUserId);
router.delete('/:id', validateId, controller.delete);

module.exports = router;