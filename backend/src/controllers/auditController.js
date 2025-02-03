const AuditService = require('../services/intelligenceService');

/**
 * Get all audit logs
 */
const getAuditLogs = async (req, res) => {
    try {
        const audits = await AuditService.getAllAudits();
        res.status(200).json(audits);
    } catch (error) {
        res.status(500).json({ message: "Error fetching audit logs", error: error.message });
    }
};

/**
 * Get a single audit log by ID
 */
const getAuditById = async (req, res) => {
    try {
        const audit = await AuditService.getAuditById(req.params.id);
        if (!audit) {
            return res.status(404).json({ message: "Audit log not found" });
        }
        res.status(200).json(audit);
    } catch (error) {
        res.status(500).json({ message: "Error fetching audit log", error: error.message });
    }
};

/**
 * Create a new audit log
 */
const createAuditLog = async (req, res) => {
    try {
        const { user, action, details } = req.body;
        const audit = await AuditService.createAudit({ user, action, details });
        res.status(201).json(audit);
    } catch (error) {
        res.status(500).json({ message: "Error creating audit log", error: error.message });
    }
};

/**
 * Delete an audit log
 */
const deleteAuditLog = async (req, res) => {
    try {
        const result = await AuditService.deleteAudit(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Audit log not found" });
        }
        res.status(200).json({ message: "Audit log deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting audit log", error: error.message });
    }
};

module.exports = {
    getAuditLogs,
    getAuditById,
    createAuditLog,
    deleteAuditLog
};
