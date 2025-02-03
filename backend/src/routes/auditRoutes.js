import express from 'express'
const router = express.Router();
const auditController = require('../controllers/auditController');
const auth = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimit');
const { auditValidation } = require('../utils/validator');
const validate = require('../middleware/validate');

// Create new audit log
router.post('/', auth, apiLimiter, auditValidation, validate, auditController.createAuditLog);

// Get audit logs with filtering and pagination
router.get('/', auth, apiLimiter, auditController.getAuditLogs);

// Get specific audit log details
router.get('/:id', auth, apiLimiter, auditController.getAuditLogDetails);

// Get audit statistics
router.get('/stats', auth, apiLimiter, auditController.getAuditStats);

// Export audit logs
router.get('/export', auth, apiLimiter, auditController.exportAuditLogs);

// Get audit logs by category
router.get('/category/:category', auth, apiLimiter, auditController.getAuditLogsByCategory);

// Get audit logs by date range
router.get('/timeframe', auth, apiLimiter, auditController.getAuditLogsByTimeframe);

// Get audit logs by user
router.get('/user/:userId', auth, apiLimiter, auditController.getAuditLogsByUser);

// Archive old audit logs
router.post('/archive', auth, apiLimiter, auditController.archiveAuditLogs);

module.exports = router;
