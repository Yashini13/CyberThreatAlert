const Threat = require('../models/Threat');
const IntelligenceService = require('./intelligenceService');
const { createLogger } = require('../utils/logger');
const logger = createLogger('threat-service');

class ThreatService {
  async getSummary() {
    const activeThreats = await Threat.find({ status: 'active' });
    const criticalThreats = activeThreats.filter(t => t.severity === 'critical');
    
    return {
      total: activeThreats.length,
      critical: criticalThreats.length,
      recentThreats: await Threat.find()
        .sort({ detectionTime: -1 })
        .limit(10)
    };
  }

  async createThreat(threatData) {
    const enrichedData = await IntelligenceService.enrichThreatData(threatData);
    const threat = new Threat(enrichedData);
    await threat.save();
    return threat;
  }

  async mitigateThreat(threatId) {
    const threat = await Threat.findById(threatId);
    if (!threat) {
      throw new Error('Threat not found');
    }

    threat.status = 'mitigated';
    threat.mitigationTime = new Date();
    await threat.save();

    return { success: true, message: 'Threat mitigated successfully' };
  }
}

module.exports = new ThreatService();