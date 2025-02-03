import express from 'express'
const router = express.Router();
const scanController = require('../controllers/scanController');
const auth = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimit');
const { scanValidation } = require('../utils/validator');
const validate = require('../middleware/validate');

// Start new scan
router.post('/', auth, apiLimiter, scanValidation, validate, scanController.startScan);

// Get specific scan results
router.get('/:id/results', auth, apiLimiter, scanController.getScanResults);

// Get all scans with optional filtering
router.get('/', auth, apiLimiter, scanController.getAllScans);

// Stop running scan
router.post('/:id/stop', auth, apiLimiter, scanController.stopScan);

// Schedule a scan
router.post('/schedule', auth, apiLimiter, scanValidation, validate, scanController.scheduleScan);

// Get scan statistics
router.get('/stats', auth, apiLimiter, scanController.getScanStats);

// Delete scan record
router.delete('/:id', auth, apiLimiter, scanController.deleteScan);

// Export scan results
router.get('/:id/export', auth, apiLimiter, scanController.exportScanResults);

module.exports = router;
