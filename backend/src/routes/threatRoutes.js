
// src/routes/threatRoutes.js
import express from 'express'
const router = express.Router();
const threatController = require('../controllers/threatController');
const auth = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimit');
const { threatValidation } = require('../utils/validator');
const validate = require('../middleware/validate');

router.get('/summary', auth, apiLimiter, threatController.getThreatSummary);
router.post('/', auth, apiLimiter, threatValidation, validate, threatController.createThreat);
router.post('/:id/mitigate', auth, apiLimiter, threatController.mitigateThreat);

module.exports = router;