const Threat = require('../models/Threat');
const { createLogger } = require('../utils/logger');
const logger = createLogger('threat-controller');

class ThreatController {
  async getThreatSummary(req, res) {
    try {
      const summary = await ThreatService.getSummary();
      res.json(summary);
    } catch (error) {
      logger.error('Error getting threat summary:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createThreat(req, res) {
    try {
      const threat = await ThreatService.createThreat(req.body);
      res.status(201).json(threat);
    } catch (error) {
      logger.error('Error creating threat:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async mitigateThreat(req, res) {
    try {
      const result = await ThreatService.mitigateThreat(req.params.id);
      res.json(result);
    } catch (error) {
      logger.error('Error mitigating threat:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ThreatController();
