const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['vulnerability', 'compliance', 'configuration']
  },
  target: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['queued', 'in_progress', 'completed', 'failed'],
    default: 'queued'
  },
  findings: [{
    severity: String,
    description: String,
    recommendation: String,
    cvss: Number
  }],
  startTime: Date,
  endTime: Date,
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Scan', scanSchema);
