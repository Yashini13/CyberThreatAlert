const ScanService = require('../services/scanService');
const { createLogger } = require('../utils/logger');
const logger = createLogger('scan-controller');

class ScanController {
  async startScan(req, res) {
    try {
      const scan = await ScanService.startScan(req.body);
      res.status(201).json(scan);
    } catch (error) {
      logger.error('Error starting scan:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getScanResults(req, res) {
    try {
      const results = await ScanService.getScanResults(req.params.id);
      res.json(results);
    } catch (error) {
      logger.error('Error getting scan results:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ScanController();