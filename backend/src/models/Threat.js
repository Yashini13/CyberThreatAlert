const mongoose = require('mongoose');

const threatSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['malware', 'intrusion', 'ddos', 'data_leak', 'unauthorized_access']
  },
  severity: {
    type: String,
    required: true,
    enum: ['critical', 'high', 'medium', 'low']
  },
  source: {
    ip: String,
    location: {
      country: String,
      coordinates: [Number]
    }
  },
  target: {
    asset: String,
    vulnerability: String
  },
  status: {
    type: String,
    enum: ['active', 'mitigated', 'false_positive'],
    default: 'active'
  },
  detectionTime: {
    type: Date,
    default: Date.now
  },
  mitigationTime: Date,
  description: String,
  indicators: [String],
  mitigation: {
    actions: [String],
    automated: Boolean
  }
}, { timestamps: true });

module.exports = mongoose.model('Threat', threatSchema);
